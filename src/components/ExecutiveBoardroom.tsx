import React from 'react';
import { GovernanceScores, MaturityLevelInfo, GovernanceDilemma, PlayerProfile } from '../types/game';
import { PhaseConfig } from '../data/governanceData';
import { Shield, Scale, Zap, AlertTriangle, Building2, Users, Cpu, FileCheck, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface ExecutiveBoardroomProps {
  currentPhase: PhaseConfig;
  currentDilemma: GovernanceDilemma | null;
  scores: GovernanceScores;
  maturity: MaturityLevelInfo;
  activePlayer: PlayerProfile;
  totalMissions: number;
  currentMissionIndex: number;
  decisionsCount?: number;
  onOpenDecision: () => void;
  onOpenSelfAssessment: () => void;
  onOpenProfiles: () => void;
  onOpenDownloadGuide: () => void;
  onReturnToMenu?: () => void;
  onPreviousDilemma?: () => void;
}

export const ExecutiveBoardroom: React.FC<ExecutiveBoardroomProps> = ({
  currentPhase,
  currentDilemma,
  scores,
  maturity,
  activePlayer,
  totalMissions,
  currentMissionIndex,
  decisionsCount = 0,
  onOpenDecision,
  onOpenSelfAssessment,
  onOpenProfiles,
  onOpenDownloadGuide,
  onReturnToMenu,
  onPreviousDilemma
}) => {
  return (
    <div className="relative w-full h-full p-3 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-none bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Top Banner: Mission Tracker */}
      <div className="max-w-5xl mx-auto w-full pt-1 sm:pt-3 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
              {currentMissionIndex + 1}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                Desafío {currentMissionIndex + 1} de {totalMissions}
              </span>
              <h2 className="text-base md:text-lg font-bold text-white">
                {currentPhase.name}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Anterior button in top banner */}
            {currentMissionIndex > 0 && onPreviousDilemma && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onPreviousDilemma();
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                title="Volver a revisar el desafío anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Desafío Anterior</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenSelfAssessment();
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-700/80 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Test Auto-Diagnóstico</span>
            </button>

            {onReturnToMenu && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onReturnToMenu();
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 hover:text-white border border-slate-700/80 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Volver al Menú</span>
              </button>
            )}
          </div>
        </div>

        {/* Center: Interactive Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dept 1: Asesoría Legal & Privacidad */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Legal & Privacidad (AAIP / GDPR)</span>
              </span>
              <span className={`text-[11px] font-mono font-bold ${
                decisionsCount === 0
                  ? 'text-sky-400'
                  : scores.compliance >= 60
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`}>
                {decisionsCount === 0 ? 'Por Evaluar' : scores.compliance >= 60 ? 'Bajo Control' : 'Riesgo Activo'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Monitoreo de la Ley 25.326, consentimientos informados y prevención de sanciones de la autoridad de control.
            </p>
          </div>

          {/* Dept 2: TI, Data Science & IA */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>IA, Algoritmos & MLOps</span>
              </span>
              <span className={`text-[11px] font-mono font-bold ${
                decisionsCount === 0
                  ? 'text-sky-400'
                  : scores.ethics >= 60
                  ? 'text-indigo-400'
                  : 'text-amber-400'
              }`}>
                {decisionsCount === 0 ? 'Por Evaluar' : scores.ethics >= 60 ? 'Auditado' : 'Sesgos Latentes'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Supervisión de redes neuronales, explicabilidad (SHAP), paridad demográfica y prevención de alucinaciones.
            </p>
          </div>

          {/* Dept 3: Operaciones & Negocio */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Negocio, Ventas & Clientes</span>
              </span>
              <span className={`text-[11px] font-mono font-bold ${
                decisionsCount === 0
                  ? 'text-sky-400'
                  : scores.efficiency >= 60
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}>
                {decisionsCount === 0 ? 'Por Evaluar' : scores.efficiency >= 60 ? 'Ágil y Rentable' : 'Fricción'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generación de valor, confianza del cliente en la marca y agilidad para lanzar productos sin deuda técnica.
            </p>
          </div>
        </div>

        {/* Central Incident War Room Card */}
        {currentDilemma && (
          <div className="bg-slate-900 border-2 border-sky-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/40 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>INCIDENTE CORPORATIVO EN CURSO</span>
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-sky-300 text-xs font-mono font-semibold">
                  {currentDilemma.category}
                </span>
              </div>

              <span className="text-xs text-slate-400 font-mono">
                Presiona <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-200 rounded border border-slate-700">Espacio</kbd>
              </span>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">
                {currentDilemma.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {currentDilemma.description}
              </p>
            </div>

            {/* Stakeholder tension alert */}
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <Users className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Conflicto de Intereses:</span>
                <span className="text-slate-400 font-normal">{currentDilemma.stakeholderConflict}</span>
              </div>
              <div className="text-[11px] font-mono text-sky-400 pt-1">
                <strong>Marco Legal:</strong> {currentDilemma.argentineLawRelevance}
              </div>
            </div>

            {/* CTA to evaluate, return to menu or previous dilemma */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                {currentMissionIndex > 0 && onPreviousDilemma && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onPreviousDilemma();
                    }}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
                    title="Volver a revisar el desafío anterior"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Desafío Anterior</span>
                  </button>
                )}

                {onReturnToMenu && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onReturnToMenu();
                    }}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
                    title="Volver al Menú Principal"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Volver al Menú</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenDecision();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 hover:from-sky-500 hover:to-emerald-400 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-sky-950/60 transform active:scale-95 transition-all cursor-pointer"
              >
                <span>EVALUAR Y TOMAR DECISIÓN ESTRATÉGICA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer corporate guidance */}
      <div className="max-w-5xl mx-auto w-full pt-4 text-center">
        <p className="text-[11px] text-slate-500 font-mono">
          GobernIA · Simulador para el análisis y concientización de Gobernanza de Datos e IA conforme a la Ley 25.326 y estándares globales.
        </p>
      </div>
    </div>
  );
};
