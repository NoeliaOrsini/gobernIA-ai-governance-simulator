import React, { useState } from 'react';
import { 
  HelpCircle, 
  X, 
  ShieldCheck, 
  Scale, 
  Zap, 
  Award, 
  Users, 
  Compass, 
  BrainCircuit, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  BookOpen,
  FileCheck
} from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface InstructionsModalProps {
  onClose: () => void;
  onStartSimulation?: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  onClose,
  onStartSimulation
}) => {
  const [activeTab, setActiveTab] = useState<'loop' | 'metrics' | 'scenarios' | 'maturity'>('loop');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md pointer-events-auto select-none">
      <div className="bg-slate-900 border border-slate-700/90 rounded-2xl max-w-2xl w-full p-5 md:p-6 shadow-2xl text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                Manual de Operaciones
              </span>
              <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                Cómo Jugar: Ciclo Central de GobernIA
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-3 pb-2 border-b border-slate-800/80 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('loop');
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'loop'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ciclo Central & Rol</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('metrics');
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Métricas & Leyes</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('scenarios');
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'scenarios'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>7 Misiones Críticas</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('maturity');
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'maturity'
                ? 'bg-sky-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Nivel de Madurez (1-5)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="py-4 overflow-y-auto space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed pr-1">
          {/* TAB 1: CICLO CENTRAL & ROL */}
          {activeTab === 'loop' && (
            <div className="space-y-4">
              {/* Role Card */}
              <div className="p-4 bg-gradient-to-r from-sky-950/40 via-slate-950 to-slate-900 border border-sky-500/40 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                      Tu Rol en el Directorio
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white">
                      Chief Data & AI Ethics Officer (CDO / DPD)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Asumes la máxima responsabilidad sobre los datos y la inteligencia artificial en la empresa. Tu desafío no es prohibir la tecnología ni permitir el caos desregulado, sino encontrar el equilibrio entre <strong className="text-emerald-300">cumplimiento legal estricto</strong> e <strong className="text-sky-300">innovación ética de alto impacto</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* The 4-step Core Loop Diagram */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                  El Bucle Principal de Juego (Core Loop)
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[10px] font-bold flex items-center justify-center border border-sky-500/40">
                        1
                      </span>
                      <span className="font-bold text-white text-xs">Afrontar el Dilema</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-7">
                      En cada misión estalla una crisis real con tensión entre áreas: Comercial quiere vender datos, TI quiere rapidez y Legal advierte sanciones.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[10px] font-bold flex items-center justify-center border border-sky-500/40">
                        2
                      </span>
                      <span className="font-bold text-white text-xs">Elegir la Estrategia</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-7">
                      Analiza 3 opciones estratégicas. Cada decisión altera inmediatamente las métricas corporativas y desencadena consecuencias a largo plazo.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[10px] font-bold flex items-center justify-center border border-sky-500/40">
                        3
                      </span>
                      <span className="font-bold text-white text-xs">Dictamen Jurídico Inmediato</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-7">
                      Recibe retroalimentación pedagógica instantánea explicando los artículos de ley vulnerados o defendidos (AEPD, AAIP, RGPD, AI Act).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[10px] font-bold flex items-center justify-center border border-sky-500/40">
                        4
                      </span>
                      <span className="font-bold text-white text-xs">Auditoría & Madurez Nivel 5</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pl-7">
                      Al completar las 7 misiones obtienes tu índice de madurez corporativa (1-5), matriz de riesgo y una Hoja de Ruta de implementación.
                    </p>
                  </div>
                </div>
              </div>

              {/* Goal Box */}
              <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-300 block">Objetivo de la Partida:</span>
                  <span className="text-slate-300">
                    Elevar el puntaje promedio por encima de <strong>75/100 puntos</strong> para certificar a tu organización en <strong>Nivel 4 o Nivel 5 de Madurez</strong> y blindarla legalmente.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MÉTRICAS & LEYES */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Cada opción que seleccionas modifica directamente las <strong className="text-white">3 Dimensiones Maestras</strong> de gobernanza en tiempo real:
              </p>

              <div className="space-y-2.5">
                {/* Metric 1 */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Cumplimiento Legal (Compliance)</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      0 - 100%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Mide el apego a la <strong>LOPD-GDD de España</strong> (Registro de Actividades RAT, DPD obligatorio, deber de notificación de brechas en 72h ante AEPD), la <strong>Ley 25.326 de Argentina</strong> (consentimiento expreso, límites a transferencias internacionales y Habeas Data) y el <strong>RGPD</strong>. Puntuaciones bajas disparan sumarios y multas de hasta el 4% de la facturación global.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-xs">
                      <Scale className="w-4 h-4 text-indigo-400" />
                      <span>Ética & IA Responsable</span>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                      0 - 100%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Evalúa la mitigación de sesgos algorítmicos en selección o crédito, explicabilidad matemática (SHAP/LIME), supervisión humana obligatoria (<em>Human-in-the-Loop</em>) y prohibición de prácticas inaceptables bajo el <strong>EU AI Act (supervisado por la AESIA en España)</strong>.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white text-xs">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Eficiencia Operativa & MLOps</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      0 - 100%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Garantiza que la seguridad no asfixie al negocio. Mide la calidad del dato bajo estándares <strong>DAMA DMBOK</strong>, velocidad de entrega, monitoreo de deriva conceptual (<em>Drift</em>) y el retorno de inversión de los modelos en producción.
                  </p>
                </div>
              </div>

              {/* Integrity Warning */}
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
                <span className="text-red-400 font-bold text-sm shrink-0 mt-0.5">⚠️</span>
                <div>
                  <strong className="text-red-300">Cuidado con las decisiones temerarias:</strong> Tomar decisiones que violen flagrantemente normas de orden público o despidan al DPD dañará la integridad de la red corporativa y hundirá tu organización al Nivel 1 (Caótico).
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 7 MISIONES CRÍTICAS */}
          {activeTab === 'scenarios' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                Durante tu gestión te enfrentarás a <strong className="text-white">7 crisis organizacionales progresivas</strong>:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Misión 1: Privacidad & Cesión de Bases</span>
                    <span className="text-slate-400 text-[11px]">Ventas quiere ceder 500.000 clientes con hash simple. ¿Lo permites?</span>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30 shrink-0">
                    Art. 5 Ley 25.326 / Art. 6 LOPDGDD
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Misión 2: Sesgo en Selección de Personal</span>
                    <span className="text-slate-400 text-[11px]">El algoritmo de RRHH penaliza perfiles del interior y madres trabajadoras.</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                    EU AI Act / AESIA
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Misión 3: Fuga de Secretos en LLMs</span>
                    <span className="text-slate-400 text-[11px]">Contratos y tarjetas se envían a APIs de IA extranjeras sin resguardos.</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                    Cap. V RGPD / Art. 12 Ley
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Misión 4: Biometría & Detección Emocional</span>
                    <span className="text-slate-400 text-[11px]">Cámaras con IA para medir el estrés en la oficina: ¿proporcional o ilícito?</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30 shrink-0">
                    Criterio AEPD / Art. 5 AI Act
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Misión 5: Deriva (Drift) & Derechos ARCO</span>
                    <span className="text-slate-400 text-[11px]">Clientes rechazados por error exigen la lógica de la decisión algorítmica.</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30 shrink-0">
                    Título III LOPDGDD / Habeas Data
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Misión 6: Jailbreak en Chatbots Oficiales</span>
                    <span className="text-slate-400 text-[11px]">Ataques de inyección extraen contratos confidenciales de la base vectorial.</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 shrink-0">
                    Notificación en 72h / OWASP
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">Misión 7: Veto Corporativo y CyberMonday</span>
                    <span className="text-slate-400 text-[11px]">El Directorio quiere lanzar en 48hs sin auditoría y despedir al DPD.</span>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30 shrink-0">
                    Art. 34-36 LOPDGDD / ISO 42001
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MADUREZ (1-5) */}
          {activeTab === 'maturity' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                La simulación evalúa tu <strong className="text-white">Índice de Madurez de Gobernanza</strong> según la escala corporativa internacional DAMA-DMBOK y CMMI (Nivel 1 al 5):
              </p>

              <div className="p-2.5 bg-sky-950/40 border border-sky-500/40 rounded-xl text-xs space-y-1">
                <span className="font-bold text-sky-300 block">💡 ¿Por qué la misión arranca en Nivel 2 y cuál es el Nivel 1?</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Comienzas con una base neutral de <strong>50/100 puntos</strong>, correspondiente al <strong>Nivel 2 (Emergente)</strong>. El <strong>Nivel 1 (Caótico, &lt;35 pts)</strong> representa una empresa en crisis crítica sin controles legales ni técnicos. Si tomas malas decisiones en los 7 desafíos, tu empresa <strong>colapsará a Nivel 1</strong>; si implementas salvaguardas y ética, ascenderás a <strong>Nivel 3, 4 o 5</strong>.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-950 border border-red-500/30 rounded-lg">
                  <span className="font-bold text-red-400 block mb-0.5">Nivel 1: Inicial / Caótico (&lt;35 pts)</span>
                  <p className="text-slate-400 text-[11px]">Gobernanza inexistente o reactiva. Infracciones graves inminentes ante la AEPD y AAIP.</p>
                </div>

                <div className="p-2.5 bg-slate-950 border border-amber-500/30 rounded-lg">
                  <span className="font-bold text-amber-400 block mb-0.5">Nivel 2: Emergente / En Silos (35-54 pts) · [Punto de Partida: 50 pts]</span>
                  <p className="text-slate-400 text-[11px]">Iniciativas técnicas aisladas sin estándar unificado ni comité formal de gobernanza.</p>
                </div>

                <div className="p-2.5 bg-slate-950 border border-yellow-500/30 rounded-lg">
                  <span className="font-bold text-yellow-400 block mb-0.5">Nivel 3: Definido / Institucionalizado (55-74 pts)</span>
                  <p className="text-slate-400 text-[11px]">Políticas estandarizadas, catálogo de datos, DPD operativo y respeto a los plazos legales.</p>
                </div>

                <div className="p-2.5 bg-slate-950 border border-emerald-500/30 rounded-lg">
                  <span className="font-bold text-emerald-400 block mb-0.5">Nivel 4: Gestionado Cuantitativamente (75-87 pts)</span>
                  <p className="text-slate-400 text-[11px]">Telemetría MLOps continua, KPIs de sesgo, ciberdefensa adversarial y candidato a ISO 42001.</p>
                </div>

                <div className="p-2.5 bg-slate-950 border border-sky-500/40 rounded-lg bg-sky-950/10">
                  <span className="font-bold text-sky-400 block mb-0.5">Nivel 5: Optimizado / Líder de Industria (88-100 pts)</span>
                  <p className="text-slate-300 text-[11px]">Máxima excelencia. La ética y la gobernanza son la mayor ventaja competitiva y de reputación de la empresa.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
            GobernIA · Misión Algoritmo
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg text-xs transition-colors"
            >
              Cerrar
            </button>

            {onStartSimulation && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  soundManager.playSuccess();
                  onClose();
                  onStartSimulation();
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow"
              >
                <span>¡Iniciar Misión!</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
