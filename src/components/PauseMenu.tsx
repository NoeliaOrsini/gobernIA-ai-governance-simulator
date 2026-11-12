import React from 'react';
import { GovernanceScores, MaturityLevelInfo, CompanyProfile, PlayerProfile } from '../types/game';
import { Play, Volume2, VolumeX, RotateCcw, FileText, User, Download, X, HelpCircle } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onViewReport: () => void;
  onOpenProfiles: () => void;
  onOpenDownloadGuide: () => void;
  onOpenInstructions: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  scores: GovernanceScores;
  maturity: MaturityLevelInfo;
  companyProfile: CompanyProfile;
  activePlayer: PlayerProfile;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onRestart,
  onViewReport,
  onOpenProfiles,
  onOpenDownloadGuide,
  onOpenInstructions,
  isMuted,
  onToggleMute,
  scores,
  maturity,
  companyProfile,
  activePlayer
}) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm pointer-events-auto select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">Simulación en Pausa</span>
            <h3 className="text-xl font-bold text-white">Centro de Mando GobernIA</h3>
          </div>
          <button
            onClick={onResume}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interim Diagnosis Snapshot */}
        <div className="my-5 p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Jugador Activo:</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span>{activePlayer.avatar}</span>
              <span>{activePlayer.name}</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Organización:</span>
            <span className="font-semibold text-white">{companyProfile.sector}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Madurez Actual:</span>
            <span
              className="font-mono font-bold px-2 py-0.5 rounded text-xs"
              style={{ backgroundColor: `${maturity.color}25`, color: maturity.color }}
            >
              {maturity.name}
            </span>
          </div>

          {/* 3 Master Scores */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-center">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Cumplimiento</span>
              <span className="font-bold text-emerald-400 text-sm tabular-nums">{Math.round(scores.compliance)}%</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Ética IA</span>
              <span className="font-bold text-indigo-400 text-sm tabular-nums">{Math.round(scores.ethics)}%</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Eficiencia</span>
              <span className="font-bold text-amber-400 text-sm tabular-nums">{Math.round(scores.efficiency)}%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              soundManager.playClick();
              onResume();
            }}
            className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Reanudar Simulación</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onViewReport();
            }}
            className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs md:text-sm flex items-center justify-center gap-2 transition-colors border border-slate-700"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Ver Dictamen & Reporte Ejecutivo Ahora</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenInstructions();
              }}
              className="py-2 px-3 bg-amber-950/30 border border-amber-500/40 hover:bg-amber-900/40 text-amber-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors col-span-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Cómo Jugar: Ciclo Central & Reglas de Decisión</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProfiles();
              }}
              className="py-2 px-3 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <User className="w-4 h-4 text-sky-400" />
              <span>Ver Perfil & Logros</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenDownloadGuide();
              }}
              className="py-2 px-3 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Cómo Descargar</span>
            </button>
          </div>

          <div className="pt-1">
            <button
              onClick={onToggleMute}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors mb-2"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
              <span>{isMuted ? 'Activar Sonido' : 'Silenciar'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onRestart();
              }}
              className="w-full py-2.5 px-4 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/50 text-emerald-200 font-bold rounded-lg text-xs md:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>Volver al Menú Principal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
