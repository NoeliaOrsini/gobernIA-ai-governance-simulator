import React, { useState } from 'react';
import { Share2, Copy, Check, X, Link, RotateCcw, Trash2 } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface ShareModalProps {
  onClose: () => void;
  resultScore?: number;
  maturityName?: string;
  onResetGame?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  onClose,
  resultScore,
  maturityName,
  onResetGame
}) => {
  const [copied, setCopied] = useState(false);
  const [localScore, setLocalScore] = useState<number | undefined>(resultScore);
  const [includeScore, setIncludeScore] = useState(false);

  // Automatically guarantee public URL by converting internal ais-dev- to public ais-pre-
  const publicShareUrl = (() => {
    const defaultPublicUrl = 'https://ais-pre-dcb3fhcx3tpdfq3qmhd33j-417411161966.us-west2.run.app';
    if (typeof window === 'undefined') return defaultPublicUrl;
    const origin = window.location.origin;
    if (origin.includes('ais-dev-')) {
      return origin.replace('ais-dev-', 'ais-pre-');
    }
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return defaultPublicUrl;
    }
    return origin || defaultPublicUrl;
  })();

  const cleanShareText = `Te invito a jugar a GobernIA: Misión Algoritmo, un simulador interactivo para evaluar la gobernanza de datos y ética de IA en las empresas: ${publicShareUrl}`;
  const scoreShareText = `Completé el diagnóstico de Gobernanza de Datos e IA en GobernIA: Misión Algoritmo con un puntaje de ${localScore}/100 (${maturityName || 'Evaluación Estratégica'}). ¡Pruébalo aquí!: ${publicShareUrl}`;

  const shareText = includeScore && localScore !== undefined ? scoreShareText : cleanShareText;

  // Robust copy function that works across desktop, mobile and iframes
  const handleCopy = async () => {
    soundManager.playClick();
    let success = false;

    // 1. Try modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(publicShareUrl);
        success = true;
      } catch {
        success = false;
      }
    }

    // 2. Fallback to execCommand (guarantees copy works in iframes and mobile webviews)
    if (!success && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = publicShareUrl;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '-9999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Native share sheet: user chooses WhatsApp, Mail, Telegram, etc.
  const handleNativeShare = async () => {
    soundManager.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GobernIA: Misión Algoritmo',
          text: shareText,
          url: publicShareUrl
        });
      } catch {
        // Fallback to copy if cancelled or dismissed
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleRestartGame = () => {
    soundManager.playClick();
    if (onResetGame) {
      onResetGame();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md pointer-events-auto select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 md:p-6 shadow-2xl text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                Difundir el Juego
              </span>
              <h3 className="text-base font-bold text-white">
                Compartir GobernIA
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs md:text-sm">
          <p className="text-slate-300 leading-relaxed text-xs">
            Copia este enlace o presiona compartir para invitar a tus colegas, directores o equipo de trabajo a jugar una partida limpia desde cualquier celular o computadora:
          </p>

          {/* Link Box */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                <Link className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                readOnly
                value={publicShareUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-sky-300 font-mono focus:outline-none truncate select-all cursor-text"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow cursor-pointer active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Enlace copiado al portapapeles!' : 'Copiar Enlace'}</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-sky-400" />
                <span>Compartir</span>
              </button>
            </div>
          </div>

          {/* Optional score management */}
          {localScore !== undefined && (
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
                  <span>Puntaje de tu última partida:</span>
                  <span className="font-mono text-sky-400 font-bold">{localScore}/100</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {includeScore ? 'Se incluirá en el mensaje a compartir.' : 'No se incluirá en el enlace (invitación limpia).'}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setIncludeScore(!includeScore);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all cursor-pointer ${
                    includeScore
                      ? 'bg-sky-950 border-sky-500/60 text-sky-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {includeScore ? '✓ Incluido' : '+ Incluir'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setLocalScore(undefined);
                    setIncludeScore(false);
                    if (onResetGame) {
                      onResetGame();
                    }
                  }}
                  className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 rounded-lg text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                  title="Borrar este resultado y reiniciar partida"
                >
                  <Trash2 className="w-3 h-3 text-rose-400" />
                  <span>Borrar</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions: Volver a Jugar & Cerrar */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          {onResetGame ? (
            <button
              onClick={handleRestartGame}
              className="px-3.5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white" />
              <span>Volver a Jugar (Borrar y Reiniciar)</span>
            </button>
          ) : <div />}

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
