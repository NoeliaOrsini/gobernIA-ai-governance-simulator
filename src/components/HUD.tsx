import React from 'react';
import { GovernanceScores, MaturityLevelInfo, PlayerProfile } from '../types/game';
import { PhaseConfig } from '../data/governanceData';
import { Shield, Scale, Zap, Volume2, VolumeX, Pause, Download, HelpCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface HUDProps {
  currentPhase: PhaseConfig;
  phaseTimeRemaining: number;
  scores: GovernanceScores;
  maturity: MaturityLevelInfo;
  decisionsCount?: number;
  networkIntegrity?: number;
  pendingDilemmaId?: string | null;
  activePlayer: PlayerProfile;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
  onOpenDecision?: () => void;
  onOpenProfiles: () => void;
  onOpenDownloadGuide: () => void;
  onOpenInstructions: () => void;
  onReturnToMenu?: () => void;
  onPreviousDilemma?: () => void;
  canGoPrevious?: boolean;
}

export const HUD: React.FC<HUDProps> = ({
  currentPhase,
  scores,
  maturity,
  decisionsCount = 0,
  activePlayer,
  isMuted,
  onToggleMute,
  onPause,
  onOpenProfiles,
  onOpenDownloadGuide,
  onOpenInstructions,
  onReturnToMenu,
  onPreviousDilemma,
  canGoPrevious = false
}) => {
  const getScoreColor = (val: number) => {
    if (val >= 75) return 'text-emerald-400';
    if (val >= 50) return 'text-sky-400';
    if (val >= 30) return 'text-amber-400';
    return 'text-red-400';
  };

  const currentDilemmaNumber = currentPhase.name.match(/\d+/)?.[0] || '1';

  return (
    <header className="w-full shrink-0 z-20 bg-slate-950/98 backdrop-blur-md border-b border-slate-800 px-2.5 sm:px-5 py-2 shadow-xl select-none">
      <div className="max-w-6xl mx-auto space-y-2">
        
        {/* Top Row: Mission Status, Previous Challenge, Level, and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Challenge Badge & Navigation */}
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            {/* Desafío Anterior Button (Visible whenever challenge > 1) */}
            {canGoPrevious && onPreviousDilemma && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onPreviousDilemma();
                }}
                className="px-2.5 py-1 bg-sky-950/80 hover:bg-sky-900 text-sky-200 hover:text-white border border-sky-500/50 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
                title="Volver al desafío anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Desafío Anterior</span>
              </button>
            )}

            {/* Current Challenge Badge (Full title, never truncated) */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-lg">
              <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-extrabold shrink-0">
                Desafío {currentDilemmaNumber} de 7
              </span>
              <span className="text-slate-500 text-xs">·</span>
              <span className="text-xs font-bold text-slate-200">
                {currentPhase.name.split(':')[1]?.trim() || currentPhase.name}
              </span>
            </div>
          </div>

          {/* Right: Level, Menu & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Nivel Badge (Displays 'Nivel 2', clickable for maturity guide) */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenInstructions();
              }}
              title="Nivel de Madurez de Gobernanza: Escala 1 (Caótico <35 pts) a 5 (Líder 88-100 pts). Inicia en Nivel 2 (Emergente con 50 pts). Clic para ver guía."
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-xs font-mono font-bold shrink-0 cursor-pointer transition-colors"
            >
              <span
                className="px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1"
                style={{ backgroundColor: `${maturity.color}25`, border: `1px solid ${maturity.color}60`, color: maturity.color }}
              >
                <span>Nivel {maturity.level}</span>
                <span className="text-[10px] font-medium hidden sm:inline">
                  ({maturity.name.split(':')[1]?.split('/')[0]?.trim() || maturity.name})
                </span>
              </span>
            </button>

            {/* Volver al Menú Button */}
            {onReturnToMenu && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onReturnToMenu();
                }}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 text-emerald-300 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow cursor-pointer transition-colors shrink-0"
                title="Volver al Menú Principal"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Menú</span>
              </button>
            )}

            {/* Perfil */}
            <button
              type="button"
              onClick={onOpenProfiles}
              title="Perfil y personaje"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500 rounded-lg p-1.5 sm:px-2 sm:py-1 flex items-center gap-1 transition-colors cursor-pointer text-xs shrink-0"
            >
              <span className="text-sm">{activePlayer.avatar}</span>
              <span className="text-xs font-semibold text-slate-200 hidden md:inline truncate max-w-[80px]">
                {activePlayer.name}
              </span>
            </button>

            {/* Guía */}
            <button
              type="button"
              onClick={onOpenInstructions}
              title="Cómo Jugar"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>

            {/* Descargar */}
            <button
              type="button"
              onClick={onOpenDownloadGuide}
              title="Descargar Guía"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            {/* Sonido */}
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
            </button>

            {/* Pausa */}
            <button
              type="button"
              onClick={onPause}
              aria-label="Pausar"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer shrink-0"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Row: 3 Master Dimension Scores (100% width 3-column grid, NEVER overflows on mobile!) */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 w-full bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 shadow-inner">
          {/* Dimensión 1: Cumplimiento */}
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs min-w-0" title="Cumplimiento Normativo (Ley 25.326 & GDPR)">
            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400 truncate hidden xs:inline">Cumplimiento:</span>
            <span className="text-slate-400 truncate xs:hidden">Cump:</span>
            <span className={`font-mono font-bold tabular-nums shrink-0 ${getScoreColor(scores.compliance)}`}>
              {Math.round(scores.compliance)}%
            </span>
          </div>

          {/* Dimensión 2: Ética IA */}
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs border-x border-slate-800 min-w-0" title="Ética & Transparencia (EU AI Act & AAIP)">
            <Scale className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-slate-400 truncate hidden xs:inline">Ética IA:</span>
            <span className="text-slate-400 truncate xs:hidden">Ética:</span>
            <span className={`font-mono font-bold tabular-nums shrink-0 ${getScoreColor(scores.ethics)}`}>
              {Math.round(scores.ethics)}%
            </span>
          </div>

          {/* Dimensión 3: Eficiencia (now safely inside grid-cols-3, CAN NEVER overflow!) */}
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs min-w-0" title="Eficiencia Operativa & Agilidad MLOps">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-400 truncate hidden xs:inline">Eficiencia:</span>
            <span className="text-slate-400 truncate xs:hidden">Efic:</span>
            <span className={`font-mono font-bold tabular-nums shrink-0 ${getScoreColor(scores.efficiency)}`}>
              {Math.round(scores.efficiency)}%
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
