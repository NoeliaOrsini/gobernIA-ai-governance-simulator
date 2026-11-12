import React, { useState, useEffect } from 'react';
import { Download, Terminal, Globe, Laptop, Smartphone, Check, Copy, X } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface DownloadGuideModalProps {
  onClose: () => void;
}

export const DownloadGuideModal: React.FC<DownloadGuideModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      alert('Para instalar desde Chrome/Edge: Haz clic en el ícono de instalar en la barra de direcciones del navegador o en el menú de 3 puntos -> Instalar aplicación.');
    }
  };

  const codeSnippet = `git clone <tu-repositorio-url>
cd gobernia
npm install
npm run dev`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    soundManager.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md pointer-events-auto select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-5 md:p-7 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                Guía de Acceso & Instalación
              </span>
              <h2 className="text-xl font-bold text-white">
                Cómo Descargar y Jugar a GobernIA
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Clear Ways to Play & Download */}
        <div className="my-5 space-y-4 text-xs md:text-sm">
          {/* Opción 1: Jugar Directo e Instalar como PWA */}
          <div className="p-4 bg-slate-950 border border-sky-500/40 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-white">Opción 1: Jugar Online o Instalar como App en 1 Clic (PWA)</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-mono">
                Recomendado
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              El juego funciona de forma nativa en cualquier navegador moderno sin necesidad de instalar nada. Además, puedes instalarlo como una aplicación independiente en tu PC, Mac, Android o iPhone:
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {!isInstalled ? (
                <button
                  onClick={handleInstallPWA}
                  className="px-4 py-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Instalar en este Dispositivo (PWA)</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <Check className="w-4 h-4" />
                  <span>¡Aplicación ya instalada en tu equipo!</span>
                </div>
              )}

              <span className="text-[11px] text-slate-400">
                (En Chrome/Edge: botón "Instalar" en la barra de URL; en iPhone/Safari: Compartir ➜ Agregar a pantalla de inicio).
              </span>
            </div>
          </div>

          {/* Opción 2: Descargar el Código Fuente y Correrlo Localmente */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white">Opción 2: Descargar Código y Ejecutar en tu Máquina Local</h3>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              Si deseas alojarlo en la intranet de tu empresa o correrlo 100% en local sin conexión a internet:
            </p>

            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 ml-1">
              <li>
                <strong className="text-white">Descarga el código fuente:</strong> Haz clic en el siguiente botón para descargar el archivo ZIP completo con todo el código listo para subir a GitHub o correr localmente:
              </li>
            </ol>

            {/* Direct ZIP download button */}
            <div className="pt-1">
              <a
                href="/gobernia-codigo-fuente.zip"
                download="gobernia-mision-algoritmo-source.zip"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>📦 Descargar Código Fuente Completo (.ZIP)</span>
              </a>
            </div>

            <ol start={2} className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 ml-1 pt-1">
              <li>
                <strong className="text-white">Requisitos:</strong> Descomprime la carpeta y asegúrate de tener <span className="text-sky-400 font-mono">Node.js</span> instalado.
              </li>
              <li>
                <strong className="text-white">Abre una terminal</strong> en la carpeta y ejecuta:
              </li>
            </ol>

            {/* Code Block with Copy Button */}
            <div className="relative p-3 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-emerald-400 flex items-center justify-between">
              <pre className="overflow-x-auto whitespace-pre-wrap">{codeSnippet}</pre>
              <button
                onClick={copyCode}
                className="ml-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center gap-1 shrink-0 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <p className="text-slate-400 text-[11px]">
              Una vez iniciado, abre tu navegador en <strong className="text-sky-400 font-mono">http://localhost:3000</strong> para jugar inmediatamente.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs"
          >
            Entendido, Volver al Juego
          </button>
        </div>
      </div>
    </div>
  );
};
