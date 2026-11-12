import React, { useEffect } from 'react';
import { DecisionFeedback } from '../types/game';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight, ArrowLeft, ShieldCheck, Scale, Zap, RotateCcw } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface FeedbackModalProps {
  feedback: DecisionFeedback;
  optionTitle: string;
  scenarioTitle: string;
  impact: {
    compliance: number;
    ethics: number;
    efficiency: number;
  };
  onContinue: () => void;
  onBackToMenu?: () => void;
  onBackToDilemma?: () => void;
  onPreviousDilemma?: () => void;
  canGoPrevious?: boolean;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  feedback,
  optionTitle,
  scenarioTitle,
  impact,
  onContinue,
  onBackToMenu,
  onBackToDilemma,
  onPreviousDilemma,
  canGoPrevious = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundManager.playClick();
        onContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onContinue]);

  const isExcellent = feedback.verdict === 'EXCELLENT';
  const isAcceptable = feedback.verdict === 'ACCEPTABLE';

  const formatSign = (val: number) => (val > 0 ? `+${val}` : `${val}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md pointer-events-auto select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-5 md:p-7 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Header Verdict Badge & Responsive Score Deltas */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              {isExcellent ? (
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : isAcceptable ? (
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Dictamen de Gobernanza Inmediato
                </span>
                <h3 className={`text-base font-bold leading-snug ${
                  isExcellent ? 'text-emerald-400' : isAcceptable ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {feedback.verdictTitle}
                </h3>
              </div>
            </div>

            {/* Score deltas strip: 3-column full-width grid on mobile, flex on desktop */}
            <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center w-full sm:w-auto text-xs font-mono shrink-0">
              <div className={`px-2 py-1 rounded-lg border text-center truncate ${
                impact.compliance >= 0 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <span className="hidden sm:inline">Cumplimiento </span>
                <span className="sm:hidden text-[10px]">Cump </span>
                <span className="font-bold">{formatSign(impact.compliance)}</span>
              </div>
              <div className={`px-2 py-1 rounded-lg border text-center truncate ${
                impact.ethics >= 0 ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <span className="hidden sm:inline">Ética </span>
                <span className="sm:hidden text-[10px]">Ética </span>
                <span className="font-bold">{formatSign(impact.ethics)}</span>
              </div>
              <div className={`px-2 py-1 rounded-lg border text-center truncate ${
                impact.efficiency >= 0 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <span className="hidden sm:inline">Eficiencia </span>
                <span className="sm:hidden text-[10px]">Efic </span>
                <span className="font-bold">{formatSign(impact.efficiency)}</span>
              </div>
            </div>
          </div>

          {/* Option Selected recap */}
          <div className="my-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Decisión seleccionada:</span>
            <div className="text-sm font-semibold text-white mt-0.5">{optionTitle}</div>
          </div>

          {/* Primary Principle & Explanation */}
          <div className="space-y-3 mb-4">
            <div className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-xl space-y-1.5">
              <span className="text-[10px] uppercase font-mono font-bold text-sky-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Principio de Gobernanza Aplicado / Vulnerado:</span>
              </span>
              <div className="text-xs md:text-sm font-semibold text-slate-200">
                {feedback.governancePrinciple}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                {feedback.whyGoodOrBad}
              </p>
            </div>

            {/* Legal context (Ley 25.326 Argentina / GDPR / AI Act) */}
            <div className="p-3 bg-sky-950/20 border border-sky-500/30 rounded-xl text-xs space-y-1">
              <span className="text-[10px] uppercase font-mono text-sky-400 font-bold flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Fundamento Legal & Criterio Regulatorio (AAIP · AEPD · RGPD):</span>
              </span>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                {feedback.legalContext}
              </p>
            </div>

            {/* Short-term vs Long-term Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
                  Impacto Inmediato:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {feedback.shortTermConsequence}
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
                  Consecuencia a Largo Plazo:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {feedback.longTermImpact}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA to continue, return to previous dilemma, or return to menu */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {canGoPrevious && onPreviousDilemma ? (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onPreviousDilemma();
                }}
                className="px-3.5 py-2 bg-sky-950 hover:bg-sky-900 text-sky-200 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 border border-sky-500/50 transition-all cursor-pointer shadow-sm active:scale-95"
                title="Volver a evaluar el desafío anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
                <span>⬅️ Desafío Anterior</span>
              </button>
            ) : null}

            {onBackToDilemma && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onBackToDilemma();
                }}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                title="Modificar la respuesta a este desafío"
              >
                <span>🔄 Cambiar Respuesta</span>
              </button>
            )}

            {onBackToMenu && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onBackToMenu();
                }}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer shadow-sm"
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
              onContinue();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-semibold rounded-lg text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Continuar Misión</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
