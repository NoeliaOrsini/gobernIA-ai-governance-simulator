import React, { useEffect, useRef } from 'react';
import { GameAnomaly, TopologyNode } from '../types/game';
import { soundManager } from '../audio/soundManager';

interface GameCanvasProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentPhaseId: number;
  onTriggerDilemma: (dilemmaId: string) => void;
  pendingDilemmaId: string | null;
  onAnomalyPatched: (type: string) => void;
  onNetworkDamage: (amount: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ScanWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  isPlaying,
  isPaused,
  currentPhaseId,
  onTriggerDilemma,
  pendingDilemmaId,
  onAnomalyPatched,
  onNetworkDamage
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Use refs for simulation state so React state updates never re-render the game loop
  const simRef = useRef({
    player: {
      x: 400,
      y: 300,
      vx: 0,
      vy: 0,
      angle: 0,
      targetAngle: 0,
      radius: 18,
      speed: 380,
      scanCooldown: 0,
      isScanning: false
    },
    keys: {
      w: false,
      a: false,
      s: false,
      d: false,
      space: false
    },
    justPressed: {
      space: false
    },
    anomalies: [] as GameAnomaly[],
    particles: [] as Particle[],
    scanWaves: [] as ScanWave[],
    nodes: [] as TopologyNode[],
    packets: [] as Array<{
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }>,
    cameraShake: 0,
    hitstopTimer: 0,
    lastTime: performance.now(),
    spawnTimer: 0,
    ambientTimer: 0,
    width: 800,
    height: 600
  });

  // Keep callback refs fresh
  const callbacksRef = useRef({
    onTriggerDilemma,
    pendingDilemmaId,
    onAnomalyPatched,
    onNetworkDamage,
    isPlaying,
    isPaused,
    currentPhaseId
  });

  useEffect(() => {
    callbacksRef.current = {
      onTriggerDilemma,
      pendingDilemmaId,
      onAnomalyPatched,
      onNetworkDamage,
      isPlaying,
      isPaused,
      currentPhaseId
    };
  }, [onTriggerDilemma, pendingDilemmaId, onAnomalyPatched, onNetworkDamage, isPlaying, isPaused, currentPhaseId]);

  // Window resize & canvas resolution sync
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      simRef.current.width = rect.width;
      simRef.current.height = rect.height;

      // Re-position topology nodes proportionally
      const w = rect.width;
      const h = rect.height;

      simRef.current.nodes = [
        {
          id: 'core',
          name: 'Nexus Gobernanza',
          quadrant: 'ai',
          x: w * 0.5,
          y: h * 0.5,
          radius: 32,
          health: 100,
          pulse: 0
        },
        {
          id: 'lake',
          name: 'Data Lake & Linaje',
          quadrant: 'quality',
          x: w * 0.22,
          y: h * 0.28,
          radius: 26,
          health: 95,
          pulse: 0
        },
        {
          id: 'security',
          name: 'Perímetro Zero-Trust & PII',
          quadrant: 'security',
          x: w * 0.78,
          y: h * 0.28,
          radius: 26,
          health: 90,
          pulse: 0
        },
        {
          id: 'models',
          name: 'Clusters LLM & Inferencia',
          quadrant: 'ai',
          x: w * 0.24,
          y: h * 0.75,
          radius: 26,
          health: 92,
          pulse: 0
        },
        {
          id: 'business',
          name: 'Gateway de Operaciones',
          quadrant: 'business',
          x: w * 0.76,
          y: h * 0.75,
          radius: 26,
          health: 96,
          pulse: 0
        }
      ];

      if (!simRef.current.player.x || simRef.current.player.x > w) {
        simRef.current.player.x = w * 0.5;
        simRef.current.player.y = h * 0.65;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard and window blur handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const sim = simRef.current;
      const key = e.key.toLowerCase();

      if (['arrowup', 'w'].includes(key)) {
        sim.keys.w = true;
      }
      if (['arrowleft', 'a'].includes(key)) {
        sim.keys.a = true;
      }
      if (['arrowdown', 's'].includes(key)) {
        sim.keys.s = true;
      }
      if (['arrowright', 'd'].includes(key)) {
        sim.keys.d = true;
      }
      if (key === ' ' || key === 'spacebar') {
        if (!sim.keys.space) {
          sim.justPressed.space = true;
        }
        sim.keys.space = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const sim = simRef.current;
      const key = e.key.toLowerCase();

      if (['arrowup', 'w'].includes(key)) sim.keys.w = false;
      if (['arrowleft', 'a'].includes(key)) sim.keys.a = false;
      if (['arrowdown', 's'].includes(key)) sim.keys.s = false;
      if (['arrowright', 'd'].includes(key)) sim.keys.d = false;
      if (key === ' ' || key === 'spacebar') sim.keys.space = false;
    };

    // Clear held keys on window blur to avoid stuck input
    const handleBlur = () => {
      const sim = simRef.current;
      sim.keys.w = false;
      sim.keys.a = false;
      sim.keys.s = false;
      sim.keys.d = false;
      sim.keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Trigger scan action helper
  const triggerScanAction = () => {
    const sim = simRef.current;
    if (sim.player.scanCooldown <= 0) {
      sim.player.scanCooldown = 0.35; // cooldown in seconds
      sim.scanWaves.push({
        x: sim.player.x,
        y: sim.player.y,
        radius: sim.player.radius,
        maxRadius: 160,
        alpha: 1
      });
      soundManager.playScan();

      // Check hits on anomalies within scan wave
      const scanRadius = 150;
      let patchedCount = 0;

      sim.anomalies.forEach((anomaly) => {
        const dx = anomaly.x - sim.player.x;
        const dy = anomaly.y - sim.player.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= scanRadius) {
          anomaly.hp -= 40;
          soundManager.playHit();

          // Particle burst
          for (let p = 0; p < 12; p++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 120 + 40;
            sim.particles.push({
              x: anomaly.x,
              y: anomaly.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              life: 0.45,
              maxLife: 0.45,
              color: '#38BDF8',
              size: Math.random() * 3 + 2
            });
          }

          if (anomaly.hp <= 0) {
            patchedCount++;
            callbacksRef.current.onAnomalyPatched(anomaly.type);
            soundManager.playSuccess();
            sim.cameraShake = 5;
            sim.hitstopTimer = 0.05; // 50ms hitstop

            for (let p = 0; p < 24; p++) {
              const angle = Math.random() * Math.PI * 2;
              const spd = Math.random() * 180 + 60;
              sim.particles.push({
                x: anomaly.x,
                y: anomaly.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life: 0.6,
                maxLife: 0.6,
                color: '#34D399',
                size: Math.random() * 4 + 2
              });
            }
          }
        }
      });

      // Filter dead anomalies
      sim.anomalies = sim.anomalies.filter((a) => a.hp > 0);
    }
  };

  // Click on canvas to scan or move toward target
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if clicked near an alert node with pending dilemma
    const sim = simRef.current;
    if (callbacksRef.current.pendingDilemmaId) {
      for (const node of sim.nodes) {
        const dist = Math.hypot(node.x - clickX, node.y - clickY);
        if (dist < node.radius + 25) {
          callbacksRef.current.onTriggerDilemma(callbacksRef.current.pendingDilemmaId);
          return;
        }
      }
    }

    // Otherwise trigger scanner
    triggerScanAction();
  };

  // Main 60fps Game Loop
  useEffect(() => {
    let animationFrameId: number;
    const sim = simRef.current;
    sim.lastTime = performance.now();

    const loop = (currentTime: number) => {
      const rawDt = (currentTime - sim.lastTime) / 1000;
      sim.lastTime = currentTime;
      // Clamp delta time to avoid large jumps on tab switch
      const dt = Math.min(rawDt, 0.05);

      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const w = sim.width;
      const h = sim.height;
      const state = callbacksRef.current;

      // Handle hitstop
      if (sim.hitstopTimer > 0) {
        sim.hitstopTimer -= dt;
      } else if (!state.isPaused) {
        // --- SIMULATION UPDATE ---

        // Scan trigger from justPressed
        if (sim.justPressed.space) {
          sim.justPressed.space = false;
          triggerScanAction();
        }

        // Cooldowns
        if (sim.player.scanCooldown > 0) {
          sim.player.scanCooldown -= dt;
        }

        // Input Vector
        let moveX = 0;
        let moveY = 0;
        if (sim.keys.w) moveY -= 1;
        if (sim.keys.s) moveY += 1;
        if (sim.keys.a) moveX -= 1;
        if (sim.keys.d) moveX += 1;

        if (moveX !== 0 && moveY !== 0) {
          moveX *= 0.7071;
          moveY *= 0.7071;
        }

        // Player Physics
        const targetVx = moveX * sim.player.speed;
        const targetVy = moveY * sim.player.speed;
        sim.player.vx += (targetVx - sim.player.vx) * Math.min(10 * dt, 1);
        sim.player.vy += (targetVy - sim.player.vy) * Math.min(10 * dt, 1);

        sim.player.x += sim.player.vx * dt;
        sim.player.y += sim.player.vy * dt;

        // Boundaries
        const margin = sim.player.radius + 10;
        sim.player.x = Math.max(margin, Math.min(w - margin, sim.player.x));
        sim.player.y = Math.max(margin + 50, Math.min(h - margin - 20, sim.player.y));

        if (Math.hypot(sim.player.vx, sim.player.vy) > 15) {
          sim.player.targetAngle = Math.atan2(sim.player.vy, sim.player.vx);
          // Emit thruster particles
          if (Math.random() < 0.6) {
            const backX = sim.player.x - Math.cos(sim.player.angle) * 16;
            const backY = sim.player.y - Math.sin(sim.player.angle) * 16;
            sim.particles.push({
              x: backX + (Math.random() - 0.5) * 6,
              y: backY + (Math.random() - 0.5) * 6,
              vx: -sim.player.vx * 0.2 + (Math.random() - 0.5) * 30,
              vy: -sim.player.vy * 0.2 + (Math.random() - 0.5) * 30,
              life: 0.3,
              maxLife: 0.3,
              color: '#38BDF8',
              size: Math.random() * 3 + 1.5
            });
          }
        }
        // Smooth rotation angle
        let angleDiff = sim.player.targetAngle - sim.player.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        sim.player.angle += angleDiff * Math.min(12 * dt, 1);

        // Spawn Network Packets (Data Lineage animation)
        sim.ambientTimer += dt;
        if (sim.ambientTimer > 0.4 && sim.nodes.length >= 5) {
          sim.ambientTimer = 0;
          const fromIdx = Math.floor(Math.random() * (sim.nodes.length - 1)) + 1;
          const toIdx = 0; // travel to/from core
          const colors = ['#38BDF8', '#34D399', '#818CF8', '#FBBF24'];
          sim.packets.push({
            fromIdx: Math.random() > 0.5 ? fromIdx : toIdx,
            toIdx: Math.random() > 0.5 ? toIdx : fromIdx,
            progress: 0,
            speed: Math.random() * 0.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }

        // Update Packets
        for (let i = sim.packets.length - 1; i >= 0; i--) {
          const p = sim.packets[i];
          p.progress += p.speed * dt;
          if (p.progress >= 1) {
            sim.packets.splice(i, 1);
          }
        }

        // Spawn Anomalies during gameplay
        if (state.isPlaying) {
          sim.spawnTimer += dt;
          const spawnInterval = Math.max(3.5 - state.currentPhaseId * 0.4, 1.8);

          if (sim.spawnTimer >= spawnInterval && sim.anomalies.length < 5) {
            sim.spawnTimer = 0;
            const targetNodeIdx = Math.floor(Math.random() * (sim.nodes.length - 1)) + 1;
            const targetNode = sim.nodes[targetNodeIdx];

            // Spawn from border
            const edge = Math.floor(Math.random() * 4);
            let spawnX = 0;
            let spawnY = 0;
            if (edge === 0) { spawnX = Math.random() * w; spawnY = -20; }
            else if (edge === 1) { spawnX = w + 20; spawnY = Math.random() * h; }
            else if (edge === 2) { spawnX = Math.random() * w; spawnY = h + 20; }
            else { spawnX = -20; spawnY = Math.random() * h; }

            const angle = Math.atan2(targetNode.y - spawnY, targetNode.x - spawnX);
            const speed = 40 + state.currentPhaseId * 8;

            const anomalyTypes: Array<'data_leak' | 'model_drift' | 'hallucination' | 'shadow_ai'> = [
              'data_leak', 'model_drift', 'hallucination', 'shadow_ai'
            ];
            const type = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
            const labels: Record<string, string> = {
              data_leak: 'Fuga PII',
              model_drift: 'Model Drift',
              hallucination: 'Alucinación',
              shadow_ai: 'Shadow AI'
            };

            sim.anomalies.push({
              id: `anomaly_${Date.now()}_${Math.random()}`,
              x: spawnX,
              y: spawnY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              radius: 14,
              type,
              label: labels[type],
              hp: 50,
              maxHp: 50,
              targetNodeIndex: targetNodeIdx,
              pulseTimer: 0,
              threatLevel: 1 + Math.floor(state.currentPhaseId / 2)
            });

            soundManager.playAlert();
          }
        }

        // Update Anomalies
        for (let i = sim.anomalies.length - 1; i >= 0; i--) {
          const a = sim.anomalies[i];
          a.x += a.vx * dt;
          a.y += a.vy * dt;
          a.pulseTimer += dt * 4;

          const targetNode = sim.nodes[a.targetNodeIndex];
          if (targetNode) {
            const dist = Math.hypot(targetNode.x - a.x, targetNode.y - a.y);
            if (dist < targetNode.radius + a.radius) {
              // Impact on node!
              callbacksRef.current.onNetworkDamage(6);
              soundManager.playHit();
              sim.cameraShake = 7;

              // Node impact particles
              for (let p = 0; p < 15; p++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 120 + 30;
                sim.particles.push({
                  x: a.x,
                  y: a.y,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  life: 0.4,
                  maxLife: 0.4,
                  color: '#EF4444',
                  size: 3
                });
              }

              sim.anomalies.splice(i, 1);
            }
          }
        }

        // Update Scan Waves
        for (let i = sim.scanWaves.length - 1; i >= 0; i--) {
          const wave = sim.scanWaves[i];
          wave.radius += 380 * dt;
          wave.alpha = 1 - (wave.radius / wave.maxRadius);
          if (wave.radius >= wave.maxRadius || wave.alpha <= 0) {
            sim.scanWaves.splice(i, 1);
          }
        }

        // Update Particles
        for (let i = sim.particles.length - 1; i >= 0; i--) {
          const p = sim.particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= dt;
          if (p.life <= 0) {
            sim.particles.splice(i, 1);
          }
        }

        // Decay Camera Shake
        if (sim.cameraShake > 0) {
          sim.cameraShake = Math.max(0, sim.cameraShake - 20 * dt);
        }
      }

      // --- RENDERING (HTML5 Canvas 2D) ---
      ctx.save();
      ctx.scale(dpr, dpr);

      // Apply camera shake if any
      if (sim.cameraShake > 0) {
        const shakeX = (Math.random() - 0.5) * sim.cameraShake * 2;
        const shakeY = (Math.random() - 0.5) * sim.cameraShake * 2;
        ctx.translate(shakeX, shakeY);
      }

      // 1. Deep Space Cyber Canvas Background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // 2. Subtle Grid Lines (Architectural perspective)
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      ctx.beginPath();
      for (let x = 0; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // 3. Topology Network Circuit Lines
      if (sim.nodes.length >= 5) {
        const core = sim.nodes[0];
        ctx.lineWidth = 1.5;

        for (let i = 1; i < sim.nodes.length; i++) {
          const node = sim.nodes[i];
          const grad = ctx.createLinearGradient(core.x, core.y, node.x, node.y);
          grad.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
          grad.addColorStop(1, 'rgba(56, 189, 248, 0.15)');

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(core.x, core.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }

        // Cross-connections between adjacent quadrants
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
        ctx.beginPath();
        ctx.moveTo(sim.nodes[1].x, sim.nodes[1].y);
        ctx.lineTo(sim.nodes[2].x, sim.nodes[2].y);
        ctx.lineTo(sim.nodes[4].x, sim.nodes[4].y);
        ctx.lineTo(sim.nodes[3].x, sim.nodes[3].y);
        ctx.closePath();
        ctx.stroke();
      }

      // 4. Render Data Packets
      sim.packets.forEach((p) => {
        const fromNode = sim.nodes[p.fromIdx];
        const toNode = sim.nodes[p.toIdx];
        if (!fromNode || !toNode) return;

        const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Render Topology Nodes
      sim.nodes.forEach((node) => {
        const isCore = node.id === 'core';
        const isAlert = state.pendingDilemmaId !== null;

        // Pulse wave around node
        const nodePulse = Math.sin(performance.now() * 0.003 + node.x) * 4;

        // Outer Aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6 + nodePulse, 0, Math.PI * 2);
        if (isAlert && !isCore) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.lineWidth = 2;
        } else {
          ctx.fillStyle = isCore ? 'rgba(56, 189, 248, 0.12)' : 'rgba(30, 41, 59, 0.6)';
          ctx.strokeStyle = isCore ? 'rgba(56, 189, 248, 0.6)' : 'rgba(71, 85, 105, 0.5)';
          ctx.lineWidth = 1.5;
        }
        ctx.fill();
        ctx.stroke();

        // Node Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isCore ? '#0284C7' : '#0F172A';
        ctx.fill();

        // Inner Core Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = isAlert && !isCore ? '#EF4444' : isCore ? '#38BDF8' : '#38BDF8';
        ctx.shadowColor = isAlert && !isCore ? '#EF4444' : '#38BDF8';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Label
        ctx.font = '500 11px Outfit, sans-serif';
        ctx.fillStyle = '#E2E8F0';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.radius + 16);

        // Alert prompt above node
        if (isAlert && !isCore) {
          ctx.font = '600 10px JetBrains Mono, monospace';
          ctx.fillStyle = '#EF4444';
          ctx.fillText('¡CRISIS DE GOBERNANZA!', node.x, node.y - node.radius - 8);
        }
      });

      // 6. Render Anomalies / Hazards
      sim.anomalies.forEach((anomaly) => {
        const pulse = Math.sin(anomaly.pulseTimer) * 2;
        const r = anomaly.radius + pulse;

        // Threat line to destination node
        const targetNode = sim.nodes[anomaly.targetNodeIndex];
        if (targetNode) {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(anomaly.x, anomaly.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Anomaly Glow
        ctx.shadowColor = anomaly.type === 'data_leak' ? '#EF4444' :
                         anomaly.type === 'model_drift' ? '#F59E0B' :
                         anomaly.type === 'hallucination' ? '#A855F7' : '#EC4899';
        ctx.shadowBlur = 10;

        ctx.fillStyle = anomaly.type === 'data_leak' ? '#DC2626' :
                        anomaly.type === 'model_drift' ? '#D97706' :
                        anomaly.type === 'hallucination' ? '#9333EA' : '#DB2777';

        ctx.beginPath();
        if (anomaly.type === 'data_leak') {
          // Sharp Diamond
          ctx.moveTo(anomaly.x, anomaly.y - r);
          ctx.lineTo(anomaly.x + r, anomaly.y);
          ctx.lineTo(anomaly.x, anomaly.y + r);
          ctx.lineTo(anomaly.x - r, anomaly.y);
          ctx.closePath();
        } else if (anomaly.type === 'model_drift') {
          // Hexagon
          for (let s = 0; s < 6; s++) {
            const a = (s * Math.PI) / 3;
            const px = anomaly.x + Math.cos(a) * r;
            const py = anomaly.y + Math.sin(a) * r;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        } else {
          // Pulsing Spike Circle
          ctx.arc(anomaly.x, anomaly.y, r, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Mini Health Bar
        const barW = 24;
        const barH = 3;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.fillRect(anomaly.x - barW / 2, anomaly.y - r - 8, barW, barH);
        ctx.fillStyle = '#EF4444';
        const healthPercent = Math.max(0, anomaly.hp / anomaly.maxHp);
        ctx.fillRect(anomaly.x - barW / 2, anomaly.y - r - 8, barW * healthPercent, barH);

        // Label
        ctx.font = '500 9px JetBrains Mono, monospace';
        ctx.fillStyle = '#F8FAFC';
        ctx.textAlign = 'center';
        ctx.fillText(anomaly.label, anomaly.x, anomaly.y + r + 11);
      });

      // 7. Render Scan Waves
      sim.scanWaves.forEach((wave) => {
        ctx.save();
        ctx.strokeStyle = `rgba(56, 189, 248, ${wave.alpha * 0.8})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // 8. Render Particles
      sim.particles.forEach((p) => {
        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 9. Render Player Sentinel Drone
      const p = sim.player;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      // Sentinel Radar Ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius + 12, 0, Math.PI * 2);
      ctx.stroke();

      // Scan Range Indicator
      if (p.scanCooldown > 0) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.beginPath();
        ctx.arc(0, 0, 70, 0, Math.PI * 2);
        ctx.fill();
      }

      // Drone Hull (Sleek aerodynamic delta wing)
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#0284C7';
      ctx.beginPath();
      ctx.moveTo(p.radius + 6, 0); // Nose tip
      ctx.lineTo(-p.radius, p.radius * 0.85); // Right wing
      ctx.lineTo(-p.radius * 0.4, 0); // Engine indent
      ctx.lineTo(-p.radius, -p.radius * 0.85); // Left wing
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cockpit / Sentinel Scanner Eye
      ctx.fillStyle = '#E0F2FE';
      ctx.beginPath();
      ctx.arc(p.radius * 0.2, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      // Dual Wingtip Lights
      ctx.fillStyle = '#34D399';
      ctx.fillRect(-p.radius + 1, p.radius * 0.7, 3, 3);
      ctx.fillRect(-p.radius + 1, -p.radius * 0.7 - 3, 3, 3);

      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="block w-full h-full cursor-crosshair"
      />
    </div>
  );
};
