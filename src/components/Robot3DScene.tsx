import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundManager } from '../audio/soundManager';

interface Robot3DSceneProps {
  isLaunching: boolean;
  onLaunchComplete: () => void;
}

export const Robot3DScene: React.FC<Robot3DSceneProps> = ({
  isLaunching,
  onLaunchComplete
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hudPhase, setHudPhase] = useState<'IDLE' | 'CHARGING' | 'DETONATION' | 'DONE'>('IDLE');
  const [hudStatusText, setHudStatusText] = useState<string>('SISTEMA EN ESPERA');

  // Track launching state in ref for the render loop
  const isLaunchingRef = useRef(isLaunching);
  const launchProgressRef = useRef(0);
  const onCompleteRef = useRef(onLaunchComplete);

  useEffect(() => {
    isLaunchingRef.current = isLaunching;
    onCompleteRef.current = onLaunchComplete;
  }, [isLaunching, onLaunchComplete]);

  useEffect(() => {
    if (!isLaunching) return;

    // Trigger audio sequence
    soundManager.playCharge();
    setHudPhase('CHARGING');
    setHudStatusText('SOBRECARGA DE NÚCLEO ÉTICO EN CURSO...');

    const timer1 = setTimeout(() => {
      soundManager.playBurst();
      setHudPhase('DETONATION');
      setHudStatusText('ESTALLIDO DE SINCRONIZACIÓN ALGORÍTMICA');
    }, 1100);

    const timer2 = setTimeout(() => {
      setHudPhase('DONE');
      onCompleteRef.current();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLaunching]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL detection according to Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Rig - Bright silver reflection & rim lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x38bdf8, 2.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 5.0);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const silverFill = new THREE.DirectionalLight(0xe0f2fe, 3.8);
    silverFill.position.set(-2, 3, 2);
    scene.add(silverFill);

    const cyanRim = new THREE.DirectionalLight(0x00f2fe, 4.0);
    cyanRim.position.set(-3, 1, 2);
    scene.add(cyanRim);

    const purpleRim = new THREE.DirectionalLight(0xc084fc, 3.0);
    purpleRim.position.set(3, -2, -1);
    scene.add(purpleRim);

    const coreLight = new THREE.PointLight(0x00f0ff, 6, 8);
    coreLight.position.set(0, 0, 0.5);
    scene.add(coreLight);

    // 4. Procedural 3D Robot Android Subject (Hierarchy: THREE.Group of 8+ parts)
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, 0, 0);
    robotGroup.scale.setScalar(0.95);
    scene.add(robotGroup);

    // Brilliant Liquid Silver Chrome & Titanium Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Polished silver chrome / plateado brillante
      metalness: 0.96, // Highly metallic reflection
      roughness: 0.12, // Smooth reflective chrome surface
      wireframe: false
    });

    const innerDarkMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Brushed titanium visor
      metalness: 0.90,
      roughness: 0.18
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25
    });

    const glowCyanMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true
    });

    const eyeSocketMat = new THREE.MeshStandardMaterial({
      color: 0x090d16, // Ultra-dark cybernetic obsidian bezel
      metalness: 0.95,
      roughness: 0.3
    });

    const eyeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff // Electric Neon Turquoise / Tech Cyan
    });

    const eyePupilMat = new THREE.MeshBasicMaterial({
      color: 0xffffff // Core white laser focus
    });

    // 4.1 Cranium / Head (Beveled Torus + Sphere combo)
    const headGroup = new THREE.Group();
    robotGroup.add(headGroup);

    const craniumGeom = new THREE.SphereGeometry(0.7, 32, 24);
    craniumGeom.scale(0.85, 1, 0.95);
    const craniumMesh = new THREE.Mesh(craniumGeom, chassisMat);
    headGroup.add(craniumMesh);

    // 4.2 Face Plate / Visor
    const facePlateGeom = new THREE.CylinderGeometry(0.55, 0.48, 0.5, 32, 1, false, -Math.PI / 2, Math.PI);
    facePlateGeom.rotateY(-Math.PI / 2);
    facePlateGeom.scale(1, 1, 0.7);
    const facePlate = new THREE.Mesh(facePlateGeom, innerDarkMat);
    facePlate.position.set(0, 0.05, 0.35);
    headGroup.add(facePlate);

    // 4.3 High-Tech Glowing Cybernetic Eyes (Protruding Neon Turquoise Optics)
    const socketGeom = new THREE.TorusGeometry(0.13, 0.03, 16, 32);
    const eyeGeom = new THREE.SphereGeometry(0.12, 24, 24);
    eyeGeom.scale(1.08, 0.9, 0.9);
    const pupilGeom = new THREE.SphereGeometry(0.055, 16, 16);

    // Left Eye Assembly (Bezel Socket + Glowing Turquoise Lens + Pupil + Point Light)
    const leftSocket = new THREE.Mesh(socketGeom, eyeSocketMat);
    leftSocket.position.set(-0.25, 0.12, 0.74);
    headGroup.add(leftSocket);

    const leftEye = new THREE.Mesh(eyeGeom, eyeGlowMat);
    leftEye.position.set(-0.25, 0.12, 0.755);
    headGroup.add(leftEye);

    const leftPupil = new THREE.Mesh(pupilGeom, eyePupilMat);
    leftPupil.position.set(-0.25, 0.12, 0.835);
    headGroup.add(leftPupil);

    const leftEyeLight = new THREE.PointLight(0x00f5ff, 2.8, 2.2);
    leftEyeLight.position.set(-0.25, 0.12, 0.92);
    headGroup.add(leftEyeLight);

    // Right Eye Assembly (Bezel Socket + Glowing Turquoise Lens + Pupil + Point Light)
    const rightSocket = new THREE.Mesh(socketGeom, eyeSocketMat);
    rightSocket.position.set(0.25, 0.12, 0.74);
    headGroup.add(rightSocket);

    const rightEye = new THREE.Mesh(eyeGeom, eyeGlowMat);
    rightEye.position.set(0.25, 0.12, 0.755);
    headGroup.add(rightEye);

    const rightPupil = new THREE.Mesh(pupilGeom, eyePupilMat);
    rightPupil.position.set(0.25, 0.12, 0.835);
    headGroup.add(rightPupil);

    const rightEyeLight = new THREE.PointLight(0x00f5ff, 2.8, 2.2);
    rightEyeLight.position.set(0.25, 0.12, 0.92);
    headGroup.add(rightEyeLight);

    // 4.4 Ear / Sensor Ports (Cylinders on sides)
    const earGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16);
    earGeom.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earGeom, goldAccentMat);
    leftEar.position.set(-0.65, 0.05, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeom, goldAccentMat);
    rightEar.position.set(0.65, 0.05, 0);
    headGroup.add(rightEar);

    // 4.5 Neck & Collar Assembly
    const neckGeom = new THREE.CylinderGeometry(0.28, 0.36, 0.35, 20);
    const neck = new THREE.Mesh(neckGeom, innerDarkMat);
    neck.position.set(0, -0.75, 0);
    robotGroup.add(neck);

    const collarGeom = new THREE.TorusGeometry(0.48, 0.07, 12, 32);
    collarGeom.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeom, goldAccentMat);
    collar.position.set(0, -0.85, 0);
    robotGroup.add(collar);

    // 4.6 Floating AI Neural Core (Chest / Holographic Core)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, -0.2, 0);
    robotGroup.add(coreGroup);

    const innerCoreGeom = new THREE.IcosahedronGeometry(0.35, 2);
    const innerCore = new THREE.Mesh(innerCoreGeom, new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.8
    }));
    coreGroup.add(innerCore);

    const wireCoreGeom = new THREE.IcosahedronGeometry(0.48, 1);
    const wireCore = new THREE.Mesh(wireCoreGeom, glowCyanMat);
    coreGroup.add(wireCore);

    // 4.7 Multi-Axis Holographic Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.8 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.7 });

    const ring1Geom = new THREE.TorusGeometry(1.05, 0.015, 8, 48);
    const ring1 = new THREE.Mesh(ring1Geom, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    robotGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.25, 0.012, 8, 48);
    const ring2 = new THREE.Mesh(ring2Geom, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    robotGroup.add(ring2);

    // 5. Floating Orbital Data Particle Cloud (300 particles)
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBaseRadius = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      particleBaseRadius[i] = radius;
      particleSpeeds[i] = 0.4 + Math.random() * 0.8;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 6. Explosion / Estallido Particle System (Hidden initially, triggered on launch)
    const burstCount = 650;
    const burstGeom = new THREE.BufferGeometry();
    const burstPositions = new Float32Array(burstCount * 3);
    const burstVelocities = new Float32Array(burstCount * 3);
    const burstColors = new Float32Array(burstCount * 3);

    const colorCyan = new THREE.Color(0x00f2fe);
    const colorViolet = new THREE.Color(0xc084fc);
    const colorGold = new THREE.Color(0xfef08a);

    for (let i = 0; i < burstCount; i++) {
      burstPositions[i * 3] = 0;
      burstPositions[i * 3 + 1] = 0;
      burstPositions[i * 3 + 2] = 0;

      // Spherical explosive distribution with high velocity
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 2.5 + Math.random() * 7.5;

      burstVelocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      burstVelocities[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      burstVelocities[i * 3 + 2] = speed * Math.cos(phi) + (Math.random() * 3.0); // Bias toward camera

      const pickedColor = Math.random() > 0.6 ? colorCyan : Math.random() > 0.3 ? colorViolet : colorGold;
      burstColors[i * 3] = pickedColor.r;
      burstColors[i * 3 + 1] = pickedColor.g;
      burstColors[i * 3 + 2] = pickedColor.b;
    }

    burstGeom.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
    burstGeom.setAttribute('color', new THREE.BufferAttribute(burstColors, 3));

    const burstMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    const burstSystem = new THREE.Points(burstGeom, burstMat);
    scene.add(burstSystem);

    // Expanding shockwave ring
    const shockwaveGeom = new THREE.RingGeometry(0.1, 0.22, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const shockwaveRing = new THREE.Mesh(shockwaveGeom, shockwaveMat);
    shockwaveRing.position.set(0, 0, 0);
    scene.add(shockwaveRing);

    // 7. Interactive Mouse Look / Cursor tracking (Strictly forward-facing)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const winW = window.innerWidth || 1;
      const winH = window.innerHeight || 1;
      // Normalize cursor relative to full window center [-1, 1]
      const nx = (e.clientX / winW) * 2 - 1;
      const ny = -((e.clientY / winH) * 2 - 1);
      // Strictly clamp target angles so the head NEVER turns more than ±22 degrees (±0.38 rad)
      // This guarantees the face and glowing eyes ALWAYS stay facing forward and never turn around to the back!
      targetMouseX = THREE.MathUtils.clamp(nx * 0.38, -0.38, 0.38);
      targetMouseY = THREE.MathUtils.clamp(ny * 0.22, -0.22, 0.22);
    };

    const handlePointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);

    // 8. Animation Loop
    let frameId = 0;
    let clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Exponential smooth damping for mouse look
      currentMouseX = THREE.MathUtils.damp(currentMouseX, targetMouseX, 4.0, delta);
      currentMouseY = THREE.MathUtils.damp(currentMouseY, targetMouseY, 4.0, delta);

      const launching = isLaunchingRef.current;

      if (!launching) {
        // Idle ambient animation - locked forward facing
        robotGroup.position.x = 0;
        robotGroup.position.y = Math.sin(elapsed * 1.5) * 0.05;
        robotGroup.rotation.set(0, 0, 0); // Always face forward
        headGroup.rotation.y = currentMouseX; // Strictly within [-0.38, 0.38]
        headGroup.rotation.x = -currentMouseY; // Strictly within [-0.22, 0.22]
        headGroup.rotation.z = 0;

        // Rotating neural core and rings
        innerCore.rotation.x = elapsed * 0.8;
        innerCore.rotation.y = elapsed * 1.2;
        wireCore.rotation.x = -elapsed * 0.5;
        wireCore.rotation.z = elapsed * 0.7;

        ring1.rotation.z = elapsed * 0.6;
        ring2.rotation.x = elapsed * 0.5;

        // Orbiting particles
        particles.rotation.y = elapsed * 0.15;

        // High-tech subtle eye pulse
        const eyePulse = 2.4 + Math.sin(elapsed * 4.5) * 0.6;
        leftEyeLight.intensity = eyePulse;
        rightEyeLight.intensity = eyePulse;
      } else {
        // LAUNCH SEQUENCE
        launchProgressRef.current += delta;
        const p = launchProgressRef.current;

        if (p < 1.1) {
          // Phase 1: Charge-up & Intense overcharge
          const chargeRatio = p / 1.1;
          robotGroup.rotation.y = 0;
          headGroup.rotation.set(0, 0, 0);

          // Violent energy oscillation
          const jitter = (Math.random() - 0.5) * 0.06 * chargeRatio;
          robotGroup.position.x = jitter;
          robotGroup.position.y = jitter;

          // Accelerated spin
          const spinSpeed = 2.0 + chargeRatio * 20.0;
          ring1.rotation.z += delta * spinSpeed;
          ring2.rotation.x += delta * spinSpeed;
          innerCore.rotation.y += delta * spinSpeed;

          // Blinding light intensity
          coreLight.intensity = 4 + chargeRatio * 25;
          coreLight.color.setHex(chargeRatio > 0.8 ? 0xffffff : 0x00f2fe);
          innerCore.scale.setScalar(1 + chargeRatio * 0.6);

          // Overcharged cybernetic eyes
          leftEyeLight.intensity = 2.8 + chargeRatio * 18;
          rightEyeLight.intensity = 2.8 + chargeRatio * 18;
          if (chargeRatio > 0.85) {
            leftEyeLight.color.setHex(0xffffff);
            rightEyeLight.color.setHex(0xffffff);
          }

          camera.position.z = THREE.MathUtils.damp(camera.position.z, 3.2, 3.0, delta);
        } else {
          // Phase 2: DETONATION / ESTALLIDO
          const burstTime = p - 1.1;

          // Hide robot mesh after detonation flash
          robotGroup.visible = burstTime < 0.15;
          robotGroup.scale.multiplyScalar(0.92);

          // Shockwave ring explosion
          shockwaveMat.opacity = Math.max(0, 1.0 - burstTime * 1.3);
          shockwaveRing.scale.addScalar(delta * 18.0);

          // Exploding particle cloud
          burstMat.opacity = Math.max(0, 1.0 - burstTime * 0.8);
          burstMat.size = 0.09 * (1.0 + burstTime * 0.5);

          const positions = burstGeom.attributes.position.array as Float32Array;
          for (let i = 0; i < burstCount; i++) {
            positions[i * 3] += burstVelocities[i * 3] * delta;
            positions[i * 3 + 1] += burstVelocities[i * 3 + 1] * delta;
            positions[i * 3 + 2] += burstVelocities[i * 3 + 2] * delta;
          }
          burstGeom.attributes.position.needsUpdate = true;

          // Camera push-back shock
          camera.position.z = THREE.MathUtils.damp(camera.position.z, 5.0, 5.0, delta);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries and materials
      craniumGeom.dispose();
      facePlateGeom.dispose();
      socketGeom.dispose();
      eyeGeom.dispose();
      pupilGeom.dispose();
      earGeom.dispose();
      neckGeom.dispose();
      collarGeom.dispose();
      innerCoreGeom.dispose();
      wireCoreGeom.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      particleGeom.dispose();
      burstGeom.dispose();
      shockwaveGeom.dispose();

      chassisMat.dispose();
      innerDarkMat.dispose();
      eyeSocketMat.dispose();
      goldAccentMat.dispose();
      glowCyanMat.dispose();
      eyeGlowMat.dispose();
      eyePupilMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleMat.dispose();
      burstMat.dispose();
      shockwaveMat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-visible flex items-center justify-center pointer-events-none select-none">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Futuristic Telemetry HUD Overlay during Launch / Estallido */}
      {isLaunching && (
        <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50 select-none bg-slate-950/60 backdrop-blur-sm">
          {hudPhase === 'DETONATION' && (
            <div className="fixed inset-0 bg-sky-400/30 animate-ping duration-300 pointer-events-none" />
          )}

          <div className="bg-slate-950/80 border border-sky-500/50 rounded-2xl px-6 py-4 shadow-2xl backdrop-blur-md text-center max-w-md w-full mx-4 space-y-2 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
              <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase">
                GobernIA Sentinel Core 3.0
              </span>
            </div>

            <div className="text-base md:text-lg font-black text-white tracking-wide font-mono">
              {hudStatusText}
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div 
                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: hudPhase === 'CHARGING' ? '65%' : hudPhase === 'DETONATION' ? '100%' : '10%' }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
              <span>SINCRO: LOPDGDD / RGPD / AAIP</span>
              <span className="text-emerald-400 font-bold">100% ONLINE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
