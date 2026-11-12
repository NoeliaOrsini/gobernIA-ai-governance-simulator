import React, { useEffect, useState } from 'react';
import { GovernanceDilemma, DecisionOption } from '../types/game';
import { AlertCircle, Scale, Users, ShieldAlert, ArrowRight, ArrowLeft, RotateCcw, X } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface DecisionModalProps {
  dilemma: GovernanceDilemma;
  onSelectOption: (option: DecisionOption) => void;
  onBackToMenu: () => void;
  onPrevious?: () => void;
  canGoPrevious?: boolean;
  onClose?: () => void;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  dilemma,
  onSelectOption,
  onBackToMenu,
  onPrevious,
  canGoPrevious = false,
  onClose
}) => {
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);

  // Keyboard shortcut: Keys 1, 2, 3 and Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1' && dilemma.options[0]) {
        handleConfirm(dilemma.options[0]);
      } else if (e.key === '2' && dilemma.options[1]) {
        handleConfirm(dilemma.options[1]);
      } else if (e.key === '3' && dilemma.options[2]) {
        handleConfirm(dilemma.options[2]);
      } else if (e.key === 'Escape' && onClose) {
        soundManager.playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dilemma, onClose]);

  const handleConfirm = (option: DecisionOption) => {
    soundManager.playClick();
    onSelectOption(option);
  };

  const formatImpact = (val: number) => {
    if (val > 0) return `+${val}%`;
    return `${val}%`;
  };

  const getImpactColor = (val: number) => {
    if (val > 0) return 'text-emerald-400 font-semibold';
    if (val < 0) return 'text-red-400 font-semibold';
    return 'text-slate-400';
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md pointer-events-auto select-none overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full p-4 sm:p-6 md:p-7 shadow-2xl text-slate-100 max-h-[94vh] overflow-y-auto flex flex-col justify-between my-auto">
        {/* Header: Phase, Scenario Number, Category & Navigation */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-800">
            {/* Left: Scenario badge and category */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
                Desafío {dilemma.scenarioNumber} de 7
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-indigo-300 font-semibold">{dilemma.category}</span>
            </div>

            {/* Right: Quick Navigation & Close */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Volver al Desafío Anterior */}
              {onPrevious && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onPrevious();
                  }}
                  disabled={!canGoPrevious}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    canGoPrevious
                      ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border-slate-700 cursor-pointer shadow'
                      : 'bg-slate-900/60 text-slate-600 border-slate-800/60 cursor-not-allowed opacity-40'
                  }`}
                  title={canGoPrevious ? 'Volver al desafío anterior' : 'Ya estás en el primer desafío'}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desafío Anterior</span>
                  <span className="sm:hidden">Anterior</span>
                </button>
              )}

              {/* Volver al Menú */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onBackToMenu();
                }}
                className="px-2.5 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer shadow"
                title="Volver al Menú Principal"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Volver al Menú</span>
              </button>

              {/* Botón Salir / Cerrar Modal */}
              {onClose && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="px-2 sm:px-2.5 py-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 hover:border-rose-500/50 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer shadow"
                  title="Cerrar y volver a la sala de crisis"
                >
                  <X className="w-3.5 h-3.5 text-slate-400 hover:text-rose-300" />
                  <span>Salir</span>
                </button>
              )}
            </div>
          </div>

          {/* Dilemma Title */}
          <div className="flex items-center gap-2 mt-3 mb-1">
            <span className="flex items-center gap-1 text-[11px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
              <AlertCircle className="w-3 h-3" />
              <span>Decisión Crítica Requerida</span>
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1 mb-2 tracking-tight">
            {dilemma.title}
          </h2>

          {/* Stakeholder Tension */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            <Users className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-semibold text-slate-300">Tensión Organizacional:</span>
            <span className="text-slate-300">{dilemma.stakeholderConflict}</span>
          </div>

          {/* Scenario Prose */}
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-3">
            {dilemma.description}
          </p>

          {/* Argentine & Spanish LOPDGDD / RGPD Regulatory Highlights */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {dilemma.argentineLawRelevance && (
              <div className="p-2.5 bg-sky-950/30 border border-sky-500/30 rounded-lg text-xs font-mono text-sky-300 flex items-start gap-2">
                <Scale className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-200">🇦🇷 Ley 25.326 (Argentina):</span>{' '}
                  <span className="text-slate-300">{dilemma.argentineLawRelevance}</span>
                </div>
              </div>
            )}
            {dilemma.spanishLawRelevance && (
              <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs font-mono text-amber-300 flex items-start gap-2">
                <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-200">🇪🇸 LOPDGDD & RGPD (España/UE):</span>{' '}
                  <span className="text-slate-300">{dilemma.spanishLawRelevance}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Strategy Decision Cards */}
        <div className="space-y-3 mb-4">
          {dilemma.options.map((option, index) => {
            const isHovered = hoveredOptionId === option.id;

            return (
              <div
                key={option.id}
                onMouseEnter={() => {
                  setHoveredOptionId(option.id);
                  soundManager.playClick();
                }}
                onMouseLeave={() => setHoveredOptionId(null)}
                onClick={() => handleConfirm(option)}
                className={`group cursor-pointer p-3.5 md:p-4 rounded-xl border transition-all text-left ${
                  isHovered
                    ? 'bg-slate-800/90 border-sky-500/80 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-sky-400 shrink-0 border border-slate-700">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                        {option.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirm(option);
                    }}
                    className="shrink-0 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1 shadow cursor-pointer"
                  >
                    <span>Elegir</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Rationale and Projected Impacts on the 3 Master Dimensions */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-[11px] text-slate-400 italic max-w-md">
                    {option.rationale}
                  </div>

                  {/* Impact pills */}
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span title="Impacto en Cumplimiento Normativo" className={getImpactColor(option.scoreImpact.compliance)}>
                      Cumplimiento: {formatImpact(option.scoreImpact.compliance)}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span title="Impacto en Ética e IA Responsable" className={getImpactColor(option.scoreImpact.ethics)}>
                      Ética IA: {formatImpact(option.scoreImpact.ethics)}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span title="Impacto en Eficiencia y ROI" className={getImpactColor(option.scoreImpact.efficiency)}>
                      Eficiencia: {formatImpact(option.scoreImpact.efficiency)}
                    </span>
                  </div>
                </div>

                {/* Regulatory Note */}
                <div className="mt-2 text-[10px] text-sky-400/90 font-mono flex items-center gap-1.5">
                  <ShieldAlert className="w-3 h-3 text-sky-400 shrink-0" />
                  <span>{option.regulatoryNote}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Hint and Full Navigation (Volver al anterior, Volver al Menú, Salir) */}
        <div className="pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {onPrevious && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onPrevious();
                }}
                disabled={!canGoPrevious}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  canGoPrevious
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border-slate-700 cursor-pointer shadow'
                    : 'bg-slate-900/60 text-slate-600 border-slate-800/60 cursor-not-allowed opacity-40'
                }`}
                title={canGoPrevious ? 'Volver al desafío anterior' : 'Ya estás en el primer desafío'}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Anterior</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onBackToMenu();
              }}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-emerald-300 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
              title="Volver al Menú Principal"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Volver al Menú</span>
            </button>

            {onClose && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-3 py-2 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
                title="Cerrar y volver a la sala de crisis"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
                <span>Cerrar</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-center sm:text-right">
            Presiona <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">1</kbd>, <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">2</kbd> o <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">3</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

