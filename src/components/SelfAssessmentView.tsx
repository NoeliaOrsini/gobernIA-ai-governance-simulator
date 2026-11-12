import React, { useState } from 'react';
import { 
  SELF_ASSESSMENT_QUESTIONS, 
  SelfAssessmentQuestion, 
  MATRIX_PILLARS, 
  MatrixPillar, 
  MatrixCheckItem 
} from '../data/selfAssessmentData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Share2, 
  Layers, 
  CheckSquare, 
  Square, 
  Info, 
  Award,
  ChevronDown,
  ChevronUp,
  Trash2
} from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface SelfAssessmentViewProps {
  onBackToTitle: () => void;
  onStartSimulation: () => void;
  onOpenShare: (score?: number, maturity?: string) => void;
}

export const SelfAssessmentView: React.FC<SelfAssessmentViewProps> = ({
  onBackToTitle,
  onStartSimulation,
  onOpenShare
}) => {
  // Mode selection: 'matrix' (4-quadrant checklist from course) or 'detailed' (step-by-step 8-question legal audit)
  const [activeTab, setActiveTab] = useState<'matrix' | 'detailed'>('matrix');

  // Matrix state (12 check items across 4 pillars) - starts clean
  const [matrixChecked, setMatrixChecked] = useState<Record<string, boolean>>({});
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Detailed Questionnaire State (8 deep questions)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailedAnswers, setDetailedAnswers] = useState<Record<string, number>>({});
  const [isDetailedFinished, setIsDetailedFinished] = useState(false);

  // -------------------------------------------------------------
  // Matrix Calculations
  // -------------------------------------------------------------
  const totalMatrixItems = 12;
  const checkedMatrixCount = Object.values(matrixChecked).filter(Boolean).length;
  const matrixScorePercent = Math.round((checkedMatrixCount / totalMatrixItems) * 100);

  let matrixStatusTitle = '🔴 Nivel Crítico: Sin Salvaguardas Mínimas';
  let matrixStatusSummary = 'Tu empresa opera con IA sin directivas claras ni controles de sesgo. Alto riesgo de sanciones de la AAIP (Ley 25.326), multas del RGPD y fallas operativas graves.';
  let matrixBadgeColor = 'bg-red-500/20 text-red-400 border-red-500/30';

  if (checkedMatrixCount >= 10) {
    matrixStatusTitle = '🟢 Nivel 5: Líder en Gobernanza & Ética de IA';
    matrixStatusSummary = '¡Excelente! Tu organización integra gobernanza activa, supervisión humana, cultura crítica y está alineada con ISO/IEC 42001 y el EU AI Act.';
    matrixBadgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  } else if (checkedMatrixCount >= 7) {
    matrixStatusTitle = '🟡 Nivel 3-4: Gobernanza Operativa en Desarrollo';
    matrixStatusSummary = 'Cuentan con bases formales y buenas prácticas, pero aún existen brechas en reporte de Shadow AI, formalización de pilotos o sostenibilidad de modelos.';
    matrixBadgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  } else if (checkedMatrixCount >= 4) {
    matrixStatusTitle = '🟠 Nivel 2: Esfuerzos Aislados sin Estandarización';
    matrixStatusSummary = 'Iniciativas departamentales sin marco común. Falta supervisión de liderazgo, canales de reporte y clasificación de riesgos de casos de uso.';
    matrixBadgeColor = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  }

  const handleToggleMatrixCheck = (itemId: string) => {
    soundManager.playClick();
    setMatrixChecked((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleClearAll = () => {
    soundManager.playClick();
    setMatrixChecked({});
    setDetailedAnswers({});
    setCurrentIndex(0);
    setIsDetailedFinished(false);
  };

  const handleSelectAllMatrix = (check: boolean) => {
    soundManager.playClick();
    const newChecked: Record<string, boolean> = {};
    MATRIX_PILLARS.forEach((p) => {
      p.items.forEach((item) => {
        newChecked[item.id] = check;
      });
    });
    setMatrixChecked(newChecked);
  };

  // -------------------------------------------------------------
  // Detailed Questionnaire Calculations
  // -------------------------------------------------------------
  const currentQ = SELF_ASSESSMENT_QUESTIONS[currentIndex];
  const totalDetailedQuestions = SELF_ASSESSMENT_QUESTIONS.length;
  let totalDetailedScore = 0;
  let optimalCount = 0;
  let mediumCount = 0;
  let criticalCount = 0;

  SELF_ASSESSMENT_QUESTIONS.forEach((q) => {
    const selectedIdx = detailedAnswers[q.id];
    if (selectedIdx !== undefined) {
      const opt = q.options[selectedIdx];
      totalDetailedScore += opt.score;
      if (opt.status === 'OPTIMAL') optimalCount++;
      if (opt.status === 'MEDIUM_RISK') mediumCount++;
      if (opt.status === 'CRITICAL_RISK') criticalCount++;
    }
  });

  const detailedPercentScore = Math.round(totalDetailedScore / totalDetailedQuestions);

  const handleSelectDetailedAnswer = (questionId: string, optionIndex: number) => {
    soundManager.playClick();
    const updated = { ...detailedAnswers, [questionId]: optionIndex };
    setDetailedAnswers(updated);

    if (currentIndex + 1 < SELF_ASSESSMENT_QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      soundManager.playSuccess();
      setIsDetailedFinished(true);
    }
  };

  const handleRestartDetailed = () => {
    soundManager.playClick();
    setDetailedAnswers({});
    setCurrentIndex(0);
    setIsDetailedFinished(false);
  };

  // -------------------------------------------------------------
  // Comprehensive Export (.md)
  // -------------------------------------------------------------
  const handleExportFullDiagnosis = () => {
    soundManager.playClick();
    const dateStr = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });

    let content = `# INFORME EJECUTIVO DE GOBERNANZA & ÉTICA DE LA INTELIGENCIA ARTIFICIAL
Fecha de Emisión: ${dateStr}
Desarrollado por: Noelia Orsini | Especialista en Gobernanza y Ética de IA
Marco Normativo: Ley 25.326 & AAIP (Argentina) · LOPDGDD & AEPD (España) · EU AI Act & AESIA (UE) · ISO/IEC 42001 (AIMS)

===================================================================
1. EVALUACIÓN DE MATRIZ OPERATIVA (4 CUADRANTES DE MADUREZ)
===================================================================
Puntaje Global: ${checkedMatrixCount} de 12 Controles Verificados (${matrixScorePercent}%)
Calificación: ${matrixStatusTitle}

Diagnóstico Ejecutivo:
${matrixStatusSummary}

Detalle por Cuadrantes:
`;

    MATRIX_PILLARS.forEach((pillar) => {
      const pillarChecks = pillar.items.filter((item) => matrixChecked[item.id]).length;
      content += `\n[${pillar.title}] - ${pillar.subtitle} (${pillarChecks}/${pillar.items.length} verificados):\n`;
      pillar.items.forEach((item, idx) => {
        const isOk = !!matrixChecked[item.id];
        content += `  ${idx + 1}. [${isOk ? 'X' : ' '}] ${item.text}\n`;
        content += `     - Fundamento Legal: ${item.legalAnchor}\n`;
        content += `     - Guía Práctica: ${item.guide}\n`;
      });
    });

    if (Object.keys(detailedAnswers).length > 0) {
      content += `\n===================================================================
2. AUDITORÍA REGULATORIA DETALLADA (ARTÍCULOS Y SANCIONES)
===================================================================
Índice de Cumplimiento Normativo: ${detailedPercentScore}/100
Controles Óptimos: ${optimalCount} | Riesgo Medio: ${mediumCount} | Brechas Críticas: ${criticalCount}

`;
      SELF_ASSESSMENT_QUESTIONS.forEach((q, idx) => {
        const chosenIdx = detailedAnswers[q.id];
        if (chosenIdx !== undefined) {
          const opt = q.options[chosenIdx];
          content += `${idx + 1}. ${q.question}
   - Respuesta Seleccionada: ${opt.text}
   - Estado: ${opt.status} (${opt.score} pts)
   - Referencia Legal: ${q.legalReference}
   - Dictamen: ${opt.feedback}\n\n`;
        }
      });
    }

    content += `===================================================================
3. ROADMAP ESTRATÉGICO Y PRÓXIMOS PASOS RECOMENDADOS
===================================================================
1. ARGENTINA (Ley 25.326 & AAIP):
   - Inscribir/actualizar las bases de datos de entrenamiento en el Registro Nacional de Bases de Datos de la AAIP.
   - Formalizar directiva corporativa alineada con la Res. 161/2023 (Guía de IA Responsable de Argentina).

2. ESPAÑA & UNIÓN EUROPEA (LOPDGDD · RGPD · EU AI Act):
   - Clasificar cada caso de uso según el nivel de riesgo del EU AI Act (AESIA).
   - Firmar Cláusulas Contractuales Tipo (CCT / SCC) para cualquier LLM o API alojada fuera del Espacio Económico Europeo.
   - Habilitar canal de supervisión humana (Human-in-the-Loop) para decisiones automatizadas de alto riesgo.

3. ESTÁNDARES INTERNACIONALES (ISO/IEC 42001 & ISO 27001):
   - Estructurar el Sistema de Gestión de Inteligencia Artificial (SGIA) bajo la norma internacional ISO/IEC 42001 (AIMS).
   - Implementar defensas de ciberseguridad adversarial y protocolos de mitigación de Shadow AI.
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Matriz_Gobernanza_Etica_IA_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col p-2.5 sm:p-6 md:p-8 bg-slate-950 overflow-y-auto text-slate-100 pointer-events-auto select-none">
      <div className="max-w-5xl mx-auto w-full my-1 sm:my-auto space-y-4 sm:space-y-5 py-2 sm:py-4">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0 shadow-lg shadow-sky-500/10">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-sky-400 font-bold block leading-tight">
                  Módulo de Concientización & Diagnóstico
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950/80 border border-sky-500/30 text-sky-300 font-mono hidden md:inline">
                  AR · ES · UE · ISO
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-wide leading-tight">
                ¿Tiene mi empresa Gobernanza y Ética de IA?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                soundManager.playClick();
                handleClearAll();
              }}
              className="px-2.5 sm:px-3 py-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/40 border border-rose-500/40 hover:bg-rose-900/60 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              title="Borrar todas las respuestas marcadas"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Borrar Respuestas</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                handleClearAll();
                onBackToTitle();
              }}
              className="px-3 sm:px-3.5 py-1.5 text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Volver al Menú</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation: Matrix vs Deep Regulatory Audit */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-1 sm:p-1.5 flex flex-col sm:flex-row gap-1.5 sm:gap-2 text-xs font-semibold">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('matrix');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg flex items-center justify-between sm:justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Layers className="w-4 h-4 text-sky-300 shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">Matriz 4 Cuadrantes</span>
                <span className="hidden sm:inline">Matriz de 4 Cuadrantes (Gobernanza · Cultura · Implementación · Ética)</span>
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-slate-950/60 rounded font-mono text-sky-300 shrink-0">
              {checkedMatrixCount}/12
            </span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('detailed');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg flex items-center justify-between sm:justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'detailed'
                ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-lg shadow-indigo-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Scale className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="truncate">
                <span className="sm:hidden">Auditoría Legal (8 Preguntas)</span>
                <span className="hidden sm:inline">Auditoría Legal Regulatoria (8 Preguntas Ley 25.326 · LOPDGDD · ISO)</span>
              </span>
            </div>
            {isDetailedFinished && (
              <span className="text-[10px] px-1.5 py-0.5 bg-emerald-950/80 rounded font-mono text-emerald-300 shrink-0">
                {detailedPercentScore}%
              </span>
            )}
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: 4-QUADRANT MATRIX CHECKLIST (FROM USER IMAGE)     */}
        {/* ========================================================= */}
        {activeTab === 'matrix' && (
          <div className="space-y-3 sm:space-y-4 animate-fade-in">
            {/* Live Readiness Bar */}
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1 text-center md:text-left w-full md:w-auto">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest">
                    Madurez Global:
                  </span>
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold font-mono border ${matrixBadgeColor}`}>
                    {matrixStatusTitle}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {matrixStatusSummary}
                </p>
              </div>

              {/* Score Gauge & Quick Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t border-slate-800/80 md:border-0">
                <div className="text-center bg-slate-950/80 border border-slate-800 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-inner flex-1 sm:flex-none">
                  <div className="text-xl sm:text-2xl font-black font-mono text-sky-400">
                    {checkedMatrixCount} <span className="text-xs sm:text-sm font-normal text-slate-500">/ 12</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                    {matrixScorePercent}% Cumplido
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
                  <button
                    onClick={() => handleSelectAllMatrix(checkedMatrixCount < totalMatrixItems)}
                    className="px-2.5 py-1 text-[10px] sm:text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono transition-colors cursor-pointer text-center"
                  >
                    {checkedMatrixCount < totalMatrixItems ? 'Marcar Todos' : 'Desmarcar Todos'}
                  </button>
                  <button
                    onClick={handleExportFullDiagnosis}
                    className="px-2.5 py-1 text-[10px] sm:text-[11px] bg-sky-950/60 hover:bg-sky-900/70 border border-sky-500/40 text-sky-300 rounded font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 shrink-0" />
                    <span>Descargar .md</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Quadrants Grid (2x2 matching image layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {MATRIX_PILLARS.map((pillar) => {
                const pillarCheckedCount = pillar.items.filter((it) => matrixChecked[it.id]).length;
                const isComplete = pillarCheckedCount === pillar.items.length;

                return (
                  <div
                    key={pillar.id}
                    className={`bg-slate-900/90 border rounded-2xl p-3.5 sm:p-5 shadow-xl transition-all duration-200 flex flex-col justify-between min-w-0 max-w-full overflow-hidden break-words ${pillar.colorScheme.border}`}
                    style={{
                      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 15, 30, 0.95) 100%)'
                    }}
                  >
                    {/* Pillar Header */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-800/80 gap-2 min-w-0">
                        <div className="flex items-center gap-2 min-w-0 flex-wrap">
                          <span className={`text-sm sm:text-base font-black tracking-wider uppercase font-mono break-words ${pillar.colorScheme.headerText}`}>
                            {pillar.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono break-words">
                            · {pillar.subtitle}
                          </span>
                        </div>

                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold shrink-0 ${
                          isComplete ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : pillar.colorScheme.badgeBg
                        }`}>
                          {pillarCheckedCount}/{pillar.items.length}
                        </span>
                      </div>

                      {/* Checklist Items */}
                      <div className="space-y-3 min-w-0">
                        {pillar.items.map((item) => {
                          const isChecked = !!matrixChecked[item.id];
                          const isExpanded = expandedItem === item.id;

                          return (
                            <div
                              key={item.id}
                              className={`p-3 rounded-xl border transition-all cursor-pointer min-w-0 max-w-full overflow-hidden break-words ${
                                isChecked 
                                  ? 'bg-slate-950/80 border-slate-700/80 shadow-md' 
                                  : 'bg-slate-950/40 border-slate-800/60 hover:border-slate-700 hover:bg-slate-950/60'
                              }`}
                              onClick={() => handleToggleMatrixCheck(item.id)}
                            >
                              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                                {/* Interactive Square Checkbox matching the image */}
                                <div className="pt-0.5 shrink-0">
                                  <div
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                      isChecked
                                        ? pillar.colorScheme.checkboxActive
                                        : 'border-slate-600 bg-slate-900/80 hover:border-sky-400'
                                    }`}
                                  >
                                    {isChecked && (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                    )}
                                  </div>
                                </div>

                                {/* Question Text & Legal anchor */}
                                <div className="flex-1 min-w-0 space-y-1.5 break-words">
                                  <p className={`text-xs sm:text-sm font-semibold leading-relaxed transition-colors break-words ${
                                    isChecked ? 'text-white' : 'text-slate-300'
                                  }`}>
                                    {item.text}
                                  </p>

                                  {/* Quick Guide and Legal Anchor - cleanly wrapped */}
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between text-[11px] text-slate-400 pt-1.5 gap-1.5 border-t border-slate-800/60 mt-1 min-w-0">
                                    <div className="font-mono text-[10px] text-sky-400/90 leading-tight break-words flex-1 min-w-0">
                                      ⚖️ {item.legalAnchor}
                                    </div>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedItem(isExpanded ? null : item.id);
                                      }}
                                      className="text-slate-400 hover:text-slate-200 text-[10px] flex items-center gap-0.5 shrink-0 underline py-0.5 px-1.5 rounded hover:bg-slate-800 self-end sm:self-start transition-colors cursor-pointer"
                                    >
                                      <span>{isExpanded ? 'Menos' : 'Guía'}</span>
                                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>
                                  </div>

                                  {isExpanded && (
                                    <div 
                                      className="mt-2 p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 space-y-1 animate-fade-in min-w-0 break-words"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="font-bold text-sky-300 text-[11px] flex items-center gap-1">
                                        <Info className="w-3 h-3 shrink-0" />
                                        <span>Criterio Técnico & Aplicación Práctica:</span>
                                      </div>
                                      <p className="text-[11px] text-slate-300 leading-normal break-words">
                                        {item.guide}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom pillar tagline */}
                    <div className="pt-3 mt-3 border-t border-slate-800/60 text-[10px] text-slate-400 font-mono italic break-words min-w-0">
                      💡 {pillar.tagline}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Matrix Action Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xl">
              {/* Secondary Actions: 2x2 Grid on Mobile, Flex on Desktop */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
                <button
                  onClick={handleClearAll}
                  className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border border-rose-500/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 shrink-0" />
                  <span>Borrar Respuestas</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    handleClearAll();
                    onBackToTitle();
                  }}
                  className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-emerald-950/50 hover:bg-emerald-900/70 text-emerald-200 border border-emerald-500/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                  <span>Volver a Jugar</span>
                </button>

                <button
                  onClick={handleExportFullDiagnosis}
                  className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 shadow transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                  <span>Descargar (.md)</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenShare();
                  }}
                  className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-sky-950/40 hover:bg-sky-900/50 text-sky-200 border border-sky-500/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                  <span>Compartir</span>
                </button>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('detailed');
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Auditoría Legal Paso a Paso</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onStartSimulation();
                  }}
                  className="px-5 py-3 sm:py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all cursor-pointer transform active:scale-95"
                >
                  <span>Jugar Simulación de Crisis</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: STEP-BY-STEP DEEP REGULATORY LEGAL AUDIT          */}
        {/* ========================================================= */}
        {activeTab === 'detailed' && (
          <div>
            {!isDetailedFinished ? (
              /* QUESTION CARD */
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 animate-fade-in">
                {/* Progress Step */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-400 font-bold">
                    Pregunta {currentIndex + 1} de {totalDetailedQuestions}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {currentQ.category}
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sky-400 to-indigo-400 h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalDetailedQuestions) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug">
                    {currentQ.question}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-1">
                    {currentQ.description}
                  </p>
                  <span className="inline-block text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-md border border-sky-500/30">
                    ⚖️ Marco Legal: {currentQ.legalReference}
                  </span>
                </div>

                {/* Options */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectDetailedAnswer(currentQ.id, optIdx)}
                      className="w-full p-4 rounded-xl text-left bg-slate-950/70 border border-slate-800 hover:border-sky-500/80 hover:bg-slate-800/50 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="space-y-1 pr-3">
                        <div className="text-sm font-semibold text-slate-200 group-hover:text-white">
                          {opt.text}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => {
                        soundManager.playClick();
                        setCurrentIndex(currentIndex - 1);
                      }}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1 ${
                        currentIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white bg-slate-800'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Anterior</span>
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        handleClearAll();
                        onBackToTitle();
                      }}
                      className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Volver al Menú</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('matrix');
                    }}
                    className="text-xs text-slate-400 hover:text-sky-300 underline font-mono cursor-pointer"
                  >
                    Volver a la Matriz de 4 Cuadrantes
                  </button>
                </div>
              </div>
            ) : (
              /* DETAILED RESULTS REPORT CARD */
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 text-center animate-fade-in">
                <div className="space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-1">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white">
                    Auditoría Regulatoria Completada
                  </h3>

                  {/* Score Gauge */}
                  <div className="inline-flex items-baseline gap-1 font-mono text-4xl font-extrabold text-sky-400">
                    <span>{detailedPercentScore}</span>
                    <span className="text-base text-slate-500 font-normal">/100</span>
                  </div>

                  <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                    Evaluado contra la Ley 25.326 y Resoluciones de la AAIP (Argentina), LOPDGDD y AEPD (España), EU AI Act (AESIA) e ISO/IEC 42001.
                  </p>
                </div>

                {/* Stat Pills */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
                    <span className="text-emerald-400 font-bold block text-lg">{optimalCount}</span>
                    <span className="text-slate-400 text-[11px]">Controles Óptimos</span>
                  </div>
                  <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl">
                    <span className="text-amber-400 font-bold block text-lg">{mediumCount}</span>
                    <span className="text-slate-400 text-[11px]">Riesgos Medios</span>
                  </div>
                  <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl">
                    <span className="text-red-400 font-bold block text-lg">{criticalCount}</span>
                    <span className="text-slate-400 text-[11px]">Brechas Críticas</span>
                  </div>
                </div>

                {/* Detailed answers review */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 text-left">
                  <h4 className="text-xs font-bold text-slate-300 uppercase font-mono">
                    Desglose por Pregunta y Criterio Legal:
                  </h4>
                  {SELF_ASSESSMENT_QUESTIONS.map((q) => {
                    const chosenIdx = detailedAnswers[q.id] ?? 0;
                    const opt = q.options[chosenIdx];
                    return (
                      <div key={q.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{q.category}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            opt.status === 'OPTIMAL' ? 'bg-emerald-500/20 text-emerald-400' :
                            opt.status === 'MEDIUM_RISK' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {opt.status === 'OPTIMAL' ? 'Óptimo' : opt.status === 'MEDIUM_RISK' ? 'Riesgo Medio' : 'Crítico'}
                          </span>
                        </div>
                        <div className="text-slate-300 text-[11px]">{opt.text}</div>
                        <div className="text-slate-400 text-[11px] italic pt-1">{opt.feedback}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        handleClearAll();
                        onBackToTitle();
                      }}
                      className="px-3.5 py-2 bg-emerald-950/50 hover:bg-emerald-900/70 text-emerald-200 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Volver al Menú</span>
                    </button>

                    <button
                      onClick={handleRestartDetailed}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Repetir Auditoría</span>
                    </button>

                    <button
                      onClick={handleExportFullDiagnosis}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar (.md)</span>
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onOpenShare(detailedPercentScore, 'Auditoría Regulatoria');
                      }}
                      className="px-3.5 py-2 bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 border border-sky-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Compartir</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onStartSimulation();
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold rounded-lg text-xs md:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Jugar la Simulación de Crisis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
