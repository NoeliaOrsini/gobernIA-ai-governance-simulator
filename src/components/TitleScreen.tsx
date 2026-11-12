import React, { useState, useEffect } from 'react';
import { CompanyProfile, PlayerProfile } from '../types/game';
import { Shield, Sparkles, Building2, ChevronRight, ChevronDown, BookOpen, Volume2, VolumeX, User, Download, FileCheck, Play, Share2, HelpCircle, Linkedin, Github, Globe } from 'lucide-react';
import { soundManager } from '../audio/soundManager';
import { Robot3DScene } from './Robot3DScene';

interface TitleScreenProps {
  onStartGame: (profile: CompanyProfile) => void;
  onOpenSelfAssessment: () => void;
  activePlayer: PlayerProfile;
  onOpenProfiles: () => void;
  onOpenDownloadGuide: () => void;
  onOpenShare: () => void;
  onOpenInstructions: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onOpenSelfAssessment,
  activePlayer,
  onOpenProfiles,
  onOpenDownloadGuide,
  onOpenShare,
  onOpenInstructions,
  isMuted,
  onToggleMute
}) => {
  const [sector, setSector] = useState('Fintech & Banca');
  const [size, setSize] = useState('Empresa Mediana (250-1000 empleados)');
  const [showMethodology, setShowMethodology] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const triggerLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
  };

  const handleLaunchComplete = () => {
    onStartGame({
      sector,
      size,
      startingMaturity: 'Evaluación Inicial'
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showMethodology || isLaunching) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerLaunch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMethodology, isLaunching]);

  return (
    <div className="absolute inset-0 h-full w-full flex flex-col justify-between overflow-hidden z-20 pointer-events-auto bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950 select-none">
      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-2 flex flex-col justify-start sm:justify-between relative z-10 min-h-0">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 max-w-5xl mx-auto w-full mb-1 sm:mb-2">
          {/* Brand & Mobile Quick Tools Row */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-base sm:text-lg shadow-lg shrink-0">
                🤖
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-sky-400 font-mono font-semibold block leading-tight">
                  Simulador & Diagnóstico Empresarial
                </span>
                <div className="text-xs sm:text-base font-extrabold text-white tracking-tight leading-tight">
                  GobernIA <span className="text-sky-400">·</span> Misión Algoritmo
                </div>
              </div>
            </div>

            {/* Mobile-only Quick Controls: Instructions, Share, Mute */}
            <div className="flex sm:hidden items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenInstructions();
                }}
                className="p-1.5 text-amber-300 bg-amber-950/50 border border-amber-500/50 rounded-lg hover:bg-amber-900/60"
                title="Cómo Jugar"
                aria-label="Cómo Jugar"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenShare();
                }}
                className="p-1.5 text-sky-300 bg-sky-950/50 border border-sky-500/50 rounded-lg hover:bg-sky-900/60"
                title="Compartir"
                aria-label="Compartir"
              >
                <Share2 className="w-4 h-4 text-sky-400" />
              </button>
              <button
                onClick={onToggleMute}
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                className="p-1.5 text-slate-300 bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-800"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
              </button>
            </div>
          </div>

          {/* Right Tools & Character Selector */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
            {/* Player Character Selector Dropdown */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProfiles();
              }}
              className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 px-2.5 py-1 text-xs font-semibold text-slate-200 bg-slate-900/95 border border-sky-500/50 hover:border-sky-400 hover:bg-slate-800 rounded-lg transition-all shadow-md group cursor-pointer"
              title="Haz clic para elegir o cambiar tu personaje"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-sky-400 font-mono uppercase tracking-wider font-bold leading-none mb-0.5">
                  Elegí tu Personaje:
                </span>
                <span className="flex items-center gap-1.5 text-white font-bold text-xs">
                  <span>{activePlayer.avatar}</span>
                  <span className="truncate max-w-[130px] sm:max-w-[140px]">{activePlayer.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-sky-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
                </span>
              </div>
            </button>

            {/* Desktop-only How to Play */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenInstructions();
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-500/50 rounded-lg hover:bg-amber-900/60 transition-colors shadow"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Cómo Jugar</span>
            </button>

            {/* Desktop-only Share */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenShare();
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-sky-300 bg-sky-950/50 border border-sky-500/50 rounded-lg hover:bg-sky-900/60 transition-colors shadow"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Compartir</span>
            </button>

            {/* Download Guide Button (Responsive) */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenDownloadGuide();
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Cómo Descargar</span>
              <span className="sm:hidden text-[11px]">Guía</span>
            </button>

            {/* Regulatory Button (Responsive) */}
            <button
              onClick={() => {
                soundManager.playClick();
                setShowMethodology(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="hidden md:inline">Leyes & ISO (AR · ES · UE · ISO)</span>
              <span className="md:hidden text-[11px]">Leyes</span>
            </button>

            {/* Desktop-only Mute Button */}
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              className="hidden sm:block p-1.5 text-slate-300 bg-slate-900/90 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
            </button>
          </div>
        </div>

        {/* Hero & Game Modes Selection */}
        <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center my-1 sm:my-auto py-1">
          {/* 3D Robot Hero Stage: 100% visible, centered, looking at cursor */}
          <div className="w-44 h-28 sm:w-64 sm:h-40 relative mx-auto flex items-center justify-center -mb-1 sm:-mb-2 z-20">
            <Robot3DScene isLaunching={isLaunching} onLaunchComplete={handleLaunchComplete} />
          </div>

          {/* 3D Sentinel Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-900/90 border border-sky-400/50 text-sky-300 text-[10px] sm:text-xs font-mono font-semibold mb-2 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>CENTINELA 3D INTELIGENTE EN LÍNEA</span>
          </div>

          {/* Transparent Regulatory Box with Argentina prioritized at top */}
          <div className="w-full max-w-3xl mx-auto bg-slate-900/30 border border-slate-700/50 rounded-2xl p-2.5 sm:p-4 shadow-xl backdrop-blur-sm mb-2.5 sm:mb-3.5 text-center">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-1.5 sm:mb-2 text-balance drop-shadow-md leading-snug">
              ¿Tiene tu Empresa Gobernanza de Datos e IA?
            </h1>
            
            <p className="text-[11px] sm:text-sm text-slate-100 font-medium max-w-2xl mx-auto mb-2 sm:mb-2.5 leading-relaxed">
              Simulador interactivo y auto-diagnóstico corporativo para evaluar el cumplimiento ético y legal frente a las normativas de referencia:
            </p>

            {/* Clear, High-Contrast Regulatory Badges: ARGENTINA PRIMERO + ISO */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono">
              {/* 1° PRIORIDAD: LEY ARGENTINA */}
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-950/80 border-2 border-sky-400 text-sky-200 font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                <span className="text-xs sm:text-sm">🇦🇷</span>
                <span className="text-white">Ley 25.326 & AAIP (Argentina)</span>
              </span>

              {/* 2° ESPAÑA */}
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-950/70 border border-amber-400/70 text-amber-300 font-semibold flex items-center gap-1 sm:gap-1.5 shadow-md">
                <span className="text-xs sm:text-sm">🇪🇸</span>
                <span>LOPDGDD & RGPD (España · AEPD)</span>
              </span>

              {/* 3° UNIÓN EUROPEA */}
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-950/70 border border-emerald-400/70 text-emerald-300 font-semibold flex items-center gap-1 sm:gap-1.5 shadow-md">
                <span className="text-xs sm:text-sm">🇪🇺</span>
                <span>EU AI Act (AESIA)</span>
              </span>

              {/* 4° ESTÁNDAR INTERNACIONAL ISO */}
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-950/70 border border-indigo-400/70 text-indigo-300 font-semibold flex items-center gap-1 sm:gap-1.5 shadow-md">
                <span className="text-xs sm:text-sm">🌐</span>
                <span>ISO/IEC 42001 & ISO 27001 (AIMS)</span>
              </span>
            </div>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold mb-2 sm:mb-3 flex items-center justify-center gap-2">
            <span>⚡ Selecciona cómo deseas comenzar ⚡</span>
          </div>

          {/* 2 Clear Game Modes - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-4xl mb-3 sm:mb-4 text-left">
            {/* Mode 1: Interactive Corporate Crisis Simulation */}
            <div className="bg-slate-900/95 border-2 border-sky-500 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(56,189,248,0.25)] flex flex-col justify-between space-y-3 hover:border-sky-400 transition-all backdrop-blur-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/30 text-sky-200 border border-sky-400/50 text-[10px] font-mono font-bold uppercase tracking-wide">
                    MODALIDAD 1 · SIMULADOR DE DESAFÍOS
                  </span>
                  <span className="text-xs text-sky-300 font-mono font-semibold">7 Misiones</span>
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Simulador de Desafíos & Crisis</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ponte en el rol de Oficial de Datos e IA y resuelve 7 casos críticos: fuga de datos en ChatGPT, sesgo algorítmico, cesión indebida Ley 25.326 y veto ético. Toma decisiones y recibe retroalimentación formativa inmediata.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={triggerLaunch}
                  disabled={isLaunching}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-80 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl hover:shadow-sky-500/40 transition-all transform active:scale-95 cursor-pointer"
                >
                  <span>{isLaunching ? 'INICIANDO PROTOCOLO...' : '🎮 JUGAR SIMULADOR DE DESAFÍOS'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    onOpenInstructions();
                  }}
                  className="w-full text-center text-[11px] text-sky-300 hover:text-white font-medium transition-colors py-0.5"
                >
                  ¿Cómo se juega? Ver reglas y rol de Oficial de IA
                </button>
              </div>
            </div>

            {/* Mode 2: Real Company Self-Assessment */}
            <div className="bg-slate-900/95 border-2 border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(16,185,129,0.25)] flex flex-col justify-between space-y-3 hover:border-emerald-400 transition-all backdrop-blur-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 text-[10px] font-mono font-bold uppercase tracking-wide">
                    MODALIDAD 2 · AUTO-DIAGNÓSTICO REAL
                  </span>
                  <span className="text-xs text-emerald-300 font-mono font-semibold">3 Minutos</span>
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Test de Diagnóstico de mi Empresa</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Responde 7 preguntas sobre el estado real de tu compañía (registro ante la AAIP, uso de LLMs en colaboradores, políticas internas y designación de DPO) y obtén un semáforo de riesgo legal con plan de acción.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenSelfAssessment();
                  }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl hover:shadow-emerald-500/40 transition-all transform active:scale-95 cursor-pointer"
                >
                  <span>📋 TEST & MATRIZ DE GOBERNANZA IA</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="w-full text-center text-[11px] text-emerald-300/90 font-medium py-0.5">
                  Checklist 4 cuadrantes (Gobernanza · Cultura · Implementación · Ética)
                </div>
              </div>
            </div>
          </div>

          {/* Company Profile Configuration Bar */}
          <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 text-xs text-slate-300 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                Sector Empresa:
              </span>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="bg-slate-950 border border-slate-600 rounded px-2 py-1.5 text-slate-100 text-xs focus:border-sky-400 outline-none w-full sm:w-auto"
              >
                <option value="Fintech & Banca">Fintech & Banca (Riesgo Alto)</option>
                <option value="Salud & Farma">Salud & Farma (Datos Sensibles)</option>
                <option value="Retail & E-Commerce">Retail & E-Commerce (Omnicanal)</option>
                <option value="Tecnología & SaaS">Tecnología & SaaS (Modelos LLM)</option>
                <option value="Manufactura & Logística">Manufactura & Logística (IoT)</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
              <span className="text-slate-300">Colaboradores:</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-slate-950 border border-slate-600 rounded px-2 py-1.5 text-slate-100 text-xs focus:border-sky-400 outline-none w-full sm:w-auto"
              >
                <option value="Startup / Scaleup (50-250 colaboradores)">50-250 colaboradores</option>
                <option value="Empresa Mediana (250-1000 empleados)">250-1000 empleados</option>
                <option value="Corporación Global (+1000 empleados)">+1000 empleados</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Permanently Pinned Footer with Noelia Orsini Attribution and Links */}
      <footer className="w-full bg-slate-950/95 border-t border-slate-800/90 py-2 sm:py-2.5 px-3 sm:px-4 z-40 shrink-0 shadow-[0_-10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-2.5 text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-slate-200">
            <span className="text-slate-400 text-xs">Desarrollado por</span>
            <span className="text-white font-black text-xs sm:text-sm tracking-wide bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Noelia Orsini
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-[10px] sm:text-[11px] text-sky-400 font-mono">Gobernanza de Datos & Ética de IA</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <a
              href="https://www.linkedin.com/in/noelia-orsini"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de LinkedIn de Noelia Orsini"
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-sky-950/80 border border-sky-500/60 hover:bg-sky-900 hover:border-sky-400 text-sky-200 transition-all shadow hover:shadow-sky-500/30 text-[11px] sm:text-xs font-bold"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/NoeliaOrsini"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Noelia Orsini"
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:border-white text-slate-100 transition-all shadow hover:shadow-slate-500/30 text-[11px] sm:text-xs font-bold"
            >
              <Github className="w-3.5 h-3.5 text-white shrink-0" />
              <span>GitHub</span>
            </a>

            <a
              href="https://noelia-orsini-portafolio.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portafolio de Noelia Orsini"
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-purple-950/80 to-sky-950/80 border border-purple-500/60 hover:border-purple-400 text-purple-200 transition-all shadow hover:shadow-purple-500/30 text-[11px] sm:text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Portafolio</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Methodology Modal */}
      {showMethodology && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm select-none">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 text-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-bold text-white">Marcos Normativos & Metodología</h3>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowMethodology(false);
                }}
                className="text-slate-400 hover:text-white px-2 py-1 text-sm rounded bg-slate-800"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-3.5 text-xs md:text-sm text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-950/70 rounded-lg border-2 border-sky-400/60 shadow-lg">
                <h4 className="font-bold text-sky-300 mb-1 flex items-center gap-2">
                  <span className="text-base">🇦🇷</span>
                  <span className="text-white">1. Ley 25.326 de Protección de Datos Personales (Argentina) & AAIP</span>
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Marco legal argentino fundamental bajo fiscalización de la Agencia de Acceso a la Información Pública (AAIP). Exige consentimiento previo, libre, expreso e informado (Art. 5), prohíbe la cesión no autorizada a terceros (Art. 11), resguarda datos sensibles como biometría y perfiles (Art. 7) y fija límites a transferencias internacionales (Art. 12). Directrices éticas y legales bajo la Res. 161/2023 (Guía de IA Responsable), medidas de seguridad obligatorias (Res. 47/2018) e inscripción de bases de datos de la AAIP.
                </p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-amber-500/30">
                <h4 className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                  <span>🇪🇸</span>
                  <span>2. Ley Orgánica 3/2018 (LOPD-GDD España) & RGPD (UE) · AEPD</span>
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Marco español de referencia junto al RGPD. Exige consentimiento inequívoco sin casillas premarcadas (Art. 6), Registro de Actividades de Tratamiento obligatorio (RAT, Art. 31), designación y comunicación del Delegado de Protección de Datos (DPD, Art. 34), ejercicio de derechos ARCO-POL en plazo máximo de 1 mes, notificación de brechas de seguridad en 72 horas ante la AEPD (Art. 33 RGPD) y el Título X de Garantía de los Derechos Digitales (intimidad frente a videovigilancia laboral, geolocalización y derecho a la desconexión digital).
                </p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-emerald-500/30">
                <h4 className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <span>🇪🇺</span>
                  <span>3. Reglamento de Inteligencia Artificial (EU AI Act) & AESIA (España)</span>
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  España es sede de la primera Agencia Española de Supervisión de la IA (AESIA) y pionera en el sandbox regulatorio europeo. Regula la categorización por niveles de riesgo, la prohibición expresa de IA de inferencia emocional en el trabajo (Art. 5), la mitigación de sesgos algorítmicos en selección laboral y scoring de crédito, y la obligatoriedad de supervisión humana (Human-in-the-Loop).
                </p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-indigo-500/30">
                <h4 className="font-semibold text-indigo-400 mb-1 flex items-center gap-1.5">
                  <span>🌐</span>
                  <span>4. ISO/IEC 42001 (AIMS) & Estándares DAMA DMBOK</span>
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Marcos internacionales para la implantación de un Sistema de Gestión de IA certificable, trazabilidad y linaje del dato, catálogo corporativo con glosario semántico y observabilidad continua del ciclo MLOps.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowMethodology(false);
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg text-xs"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
