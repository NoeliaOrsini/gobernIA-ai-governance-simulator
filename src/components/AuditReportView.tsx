import React, { useState } from 'react';
import { GovernanceScores, MaturityLevelInfo, CompanyProfile, DecisionHistoryEntry, PlayerProfile } from '../types/game';
import {
  Shield,
  Scale,
  Zap,
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Building,
  User,
  ExternalLink,
  BookOpen,
  Share2,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface AuditReportViewProps {
  scores: GovernanceScores;
  maturity: MaturityLevelInfo;
  companyProfile: CompanyProfile;
  activePlayer: PlayerProfile;
  decisionHistory: DecisionHistoryEntry[];
  onRestart: () => void;
  onOpenProfiles: () => void;
  onOpenDownloadGuide: () => void;
  onOpenShare: (score?: number, maturity?: string) => void;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({
  scores,
  maturity,
  companyProfile,
  activePlayer,
  decisionHistory,
  onRestart,
  onOpenProfiles,
  onOpenDownloadGuide,
  onOpenShare
}) => {
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'roadmap' | 'decisions' | 'aiConsultant'>('diagnosis');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReport, setAiReport] = useState<any | null>(null);

  const averageScore = Math.round((scores.compliance + scores.ethics + scores.efficiency) / 3);

  // Generate or request AI consultation from backend
  const handleFetchAiAudit = async () => {
    setAiLoading(true);
    soundManager.playClick();

    try {
      const res = await fetch('/api/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyProfile,
          scores,
          decisions: decisionHistory,
          maturityLevel: maturity
        })
      });

      const data = await res.json();
      if (data.available && data.auditReport) {
        setAiReport(data.auditReport);
        soundManager.playSuccess();
      } else {
        // Fallback: Rich procedural strategic synthesis with Argentine Law & Global Frameworks
        setAiReport({
          executiveSummary: `La organización ha alcanzado un nivel de madurez ${maturity.name} con un índice ponderado de ${averageScore}/100. En el marco de la Ley 25.326 de Argentina (LPDP), la LOPDGDD de España (Ley Orgánica 3/2018), el RGPD de la Unión Europea y el EU AI Act (supervisado por AESIA), se observan fortalezas clave pero persisten desafíos para blindar las transferencias internacionales, el registro de actividades (RAT) y el monitoreo continuo de deriva (Drift).`,
          strengths: [
            scores.compliance >= 60
              ? 'Rigurosidad en consentimiento informado, granularidad según LOPDGDD/RGPD y resguardo contra cesiones ilegítimas de datos personales.'
              : 'Sensibilidad ante los riesgos de sanciones administrativas de la AEPD y la AAIP.',
            scores.ethics >= 60
              ? 'Compromiso con la paridad demográfica y mecanismos de supervisión humana (HITL) exigidos por el EU AI Act.'
              : 'Conciencia de la necesidad de explicabilidad algorítmica y atención a derechos ARCO-POL en decisiones que impactan a las personas.',
            scores.efficiency >= 60
              ? 'Capacidad para implementar guardrails técnicos sin paralizar la operación comercial.'
              : 'Reconocimiento de la gobernanza como habilitador de negocios confiables.'
          ],
          criticalGaps: [
            scores.compliance < 70
              ? 'Vulnerabilidad potencial en transferencias internacionales de datos hacia terceros países (Art. 12 Ley 25.326 / Cap. V RGPD).'
              : 'Formalización del Registro de Actividades de Tratamiento (RAT) bajo Art. 31 LOPDGDD y Registro de Bases de la AAIP.',
            scores.ethics < 70
              ? 'Riesgo de sesgos demográficos ocultos mediante variables proxy en modelos predictivos de empleo o crédito.'
              : 'Falta de auditorías independientes de tercera parte en software de proveedores externos de IA.',
            scores.efficiency < 70
              ? 'Fricción organizacional entre el Delegado de Protección de Datos (DPD) y los equipos ágiles de producto.'
              : 'Necesidad de automatizar chequeos de calidad en el pipeline CI/CD (DataOps / MLOps).'
          ],
          roadmap: {
            shortTerm: 'Formalizar el Registro de Actividades de Tratamiento (RAT) bajo la LOPDGDD y el registro ante la AAIP; desplegar Enterprise AI Gateway con enmascaramiento PII.',
            mediumTerm: 'Estandarizar fichas técnicas (Model Cards), telemetría de drift y dotar al DPD y Comité de Ética de facultades vinculantes.',
            longTerm: 'Preparación para certificación ISO/IEC 42001 (AIMS) y participación en los sandboxes de la AESIA.'
          },
          regulatoryReadiness: {
            ley25326: scores.compliance >= 70 ? 'Alineación Alta con Jurisprudencia y Resoluciones AAIP' : 'Riesgo de Sumario Administrativo y Habeas Data',
            lopdgdd: scores.compliance >= 70 ? 'Conforme con RAT, DPD y Derechos ARCO-POL (AEPD)' : 'Riesgo de Sanción Muy Grave bajo LOPDGDD/RGPD',
            euAiAct: scores.ethics >= 70 ? 'Preparado para Sistemas de Alto Riesgo (AESIA)' : 'Brecha Crítica en Explicabilidad y Supervisión Humana',
            damaDmbok: 'Nivel 3 Institucionalizado en Gobierno de Metadatos'
          }
        });
        soundManager.playSuccess();
      }
    } catch {
      // Fallback
      setAiReport({
        executiveSummary: `Diagnóstico Estratégico: Nivel ${maturity.name}. La empresa avanza con paso firme hacia un modelo de gobernanza integral y sustentable.`,
        strengths: ['Compromiso activo con la privacidad del usuario'],
        criticalGaps: ['Mejorar la telemetría continua en agentes conversacionales autónomos'],
        roadmap: {
          shortTerm: 'Formalización de Data Stewards y políticas de IA generativa',
          mediumTerm: 'Monitoreo de Concept Drift y guardrails semánticos',
          longTerm: 'Liderazgo de industria y cultura de datos'
        }
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Export Executive Report as Text / Markdown File
  const handleExportReport = () => {
    soundManager.playClick();
    const dateStr = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
    const content = `# INFORME EJECUTIVO DE GOBERNANZA DE DATOS E INTELIGENCIA ARTIFICIAL
Simulador GobernIA: Misión Algoritmo
Fecha de Auditoría: ${dateStr}
Jugador / Auditor: ${activePlayer.name} (${activePlayer.role}) - ${activePlayer.company}
Organización Evaluada: ${companyProfile.sector} (${companyProfile.size})
Nivel de Madurez Global: ${maturity.name} (Índice Compuesto: ${averageScore}/100)

===================================================================
1. EVALUACIÓN POR DIMENSIONES MAESTRAS (0 - 100)
===================================================================
- Cumplimiento Normativo (Ley 25.326 Argentina / GDPR / AAIP): ${Math.round(scores.compliance)}/100
- Ética, Equidad & Transparencia (EU AI Act / Paridad): ${Math.round(scores.ethics)}/100
- Eficiencia Operativa, MLOps & ROI (DAMA DMBOK): ${Math.round(scores.efficiency)}/100

===================================================================
2. DIAGNÓSTICO EJECUTIVO Y ESTADO DE SITUACIÓN
===================================================================
${maturity.fullDiagnosis}

===================================================================
3. HOJA DE RUTA ESTRATÉGICA (ROADMAP DE GOBERNANZA)
===================================================================
${maturity.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

===================================================================
4. AUDITORÍA DE DECISIONES TOMADAS EN LOS 7 ESCENARIOS
===================================================================
${decisionHistory.map((d, i) => `[Escenario ${d.scenarioNumber}] ${d.title}
   - Decisión adoptada: ${d.selectedOptionTitle}
   - Calificación: ${d.verdict}
   - Principio aplicado: ${d.feedback.governancePrinciple}
   - Marco Legal: ${d.regulatoryNote}
   - Impacto a Largo Plazo: ${d.feedback.longTermImpact}
`).join('\n')}

Informe certificado generado por GobernIA: Misión Algoritmo.
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dictamen_GobernIA_${activePlayer.name.replace(/\s+/g, '_')}_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col p-4 md:p-8 bg-slate-950 overflow-y-auto text-slate-100 pointer-events-auto select-none">
      <div className="max-w-5xl mx-auto w-full space-y-6 pb-12">
        {/* Top Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-sky-400">
                Auditoría Corporativa Finalizada
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 font-mono">Ley 25.326 Argentina · EU AI Act · GDPR</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Dictamen de Gobernanza de Datos e IA
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-base">{activePlayer.avatar}</span>
                <span className="font-semibold text-white">{activePlayer.name}</span>
                <span className="text-slate-500">({activePlayer.role})</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-sky-400" />
                <span>{companyProfile.sector}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Overall Maturity Level Badge & Volver al Menú */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl shrink-0 shadow-lg">
              <div className="text-right">
                <div className="text-[11px] uppercase font-mono text-slate-400">Índice Global</div>
                <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  {averageScore}<span className="text-sm text-slate-400 font-normal">/100</span>
                </div>
              </div>

              <div className="w-[1px] h-10 bg-slate-800" />

              <div>
                <div className="text-[11px] uppercase font-mono text-slate-400">Madurez</div>
                <div
                  className="font-bold text-sm px-2.5 py-1 rounded font-mono inline-block"
                  style={{ backgroundColor: `${maturity.color}25`, color: maturity.color, border: `1px solid ${maturity.color}60` }}
                >
                  Nivel {maturity.level}: {maturity.name.split(':')[1]?.trim() || maturity.name}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onRestart();
              }}
              className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Volver al Menú Principal</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('diagnosis');
              }}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'diagnosis' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Diagnóstico por Dimensiones
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('roadmap');
              }}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'roadmap' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hoja de Ruta Estratégica
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('decisions');
              }}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'decisions' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Auditoría de Decisiones ({decisionHistory.length})
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('aiConsultant');
                if (!aiReport && !aiLoading) {
                  handleFetchAiAudit();
                }
              }}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'aiConsultant'
                  ? 'bg-sky-600/30 text-sky-300 border border-sky-500/40 shadow'
                  : 'text-sky-400 hover:text-sky-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Dictamen Inteligente (IA)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pr-1">
            <button
              onClick={onOpenProfiles}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-700/80 rounded-lg hover:border-sky-500 transition-colors flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Ver Perfil & Logros</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DIAGNÓSTICO POR DIMENSIONES */}
        {activeTab === 'diagnosis' && (
          <div className="space-y-6">
            {/* 3 Master Dimension Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dimensión 1: Cumplimiento Normativo (Ley 25.326 / GDPR) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">Cumplimiento Normativo</h3>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                    {Math.round(scores.compliance)}/100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${scores.compliance}%` }} />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scores.compliance >= 75
                    ? 'Excelente apego a la Ley 25.326 de Argentina y GDPR. Los consentimientos son expresos, las transferencias internacionales seguras y se respetan los plazos de Habeas Data.'
                    : scores.compliance >= 50
                    ? 'Cumplimiento moderado. Se evitan las infracciones más graves pero persisten zonas grises en transferencias de datos a LLMs y cláusulas contractuales.'
                    : 'Riesgo regulatorio inminente. Prácticas reñidas con la Ley 25.326 que exponen a la empresa a investigaciones de la AAIP, demandas judiciales y clausura.'}
                </p>
                <div className="text-[10px] font-mono text-emerald-400/90 pt-1">
                  Ley 25.326 Arts. 5, 11, 12, 14 & Res. AAIP
                </div>
              </div>

              {/* Dimensión 2: Ética & Transparencia (EU AI Act) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-bold text-sm text-white">Ética & Transparencia IA</h3>
                  </div>
                  <span className="font-mono font-bold text-indigo-400 text-sm tabular-nums">
                    {Math.round(scores.ethics)}/100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${scores.ethics}%` }} />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scores.ethics >= 75
                    ? 'Sistemas de IA explicables, libres de sesgos discriminatorios y con supervisión humana efectiva (HITL). Totalmente alineado con el EU AI Act.'
                    : scores.ethics >= 50
                    ? 'Nivel intermedio. Existen comités éticos pero carecen de facultades de veto vinculantes en todos los lanzamientos.'
                    : 'Opacidad algorítmica crítica. Modelos de alto riesgo operan como cajas negras sin salvaguardas contra discriminación indirecta.'}
                </p>
                <div className="text-[10px] font-mono text-indigo-400/90 pt-1">
                  EU AI Act Arts. 10-14 & Guía IA de la AAIP
                </div>
              </div>

              {/* Dimensión 3: Eficiencia & MLOps (DAMA DMBOK) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm text-white">Eficiencia Operativa & ROI</h3>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm tabular-nums">
                    {Math.round(scores.efficiency)}/100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${scores.efficiency}%` }} />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scores.efficiency >= 75
                    ? 'Gobernanza ágil (Governance by Design). Los controles están automatizados en el pipeline CI/CD, permitiendo innovar a gran velocidad sin deuda técnica.'
                    : scores.efficiency >= 50
                    ? 'Eficiencia aceptable con cierta fricción burocrática entre áreas técnicas y de negocio.'
                    : 'Parálisis o caos. O bien se prohíbe todo frenando el negocio, o bien reina el Shadow IT descontrolado.'}
                </p>
                <div className="text-[10px] font-mono text-amber-400/90 pt-1">
                  DAMA DMBOK & Ciclo MLOps Continuo
                </div>
              </div>
            </div>

            {/* Argentine Law & Global Compliance Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Matriz de Diagnóstico Legal & Regulatorio</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                    <span>🇪🇸</span>
                    <span>LOPDGDD & RGPD (España)</span>
                  </div>
                  <div className="text-slate-400 mb-2 text-[11px]">AEPD · RAT (Art. 31) · DPD · Derechos ARCO</div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    scores.compliance >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {scores.compliance >= 70 ? 'Conforme con Criterios AEPD' : 'Riesgo Sancionador LOPDGDD'}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                    <span>🇦🇷</span>
                    <span>Ley 25.326 (Argentina)</span>
                  </div>
                  <div className="text-slate-400 mb-2 text-[11px]">AAIP · Consentimiento · Cesión & Habeas Data</div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    scores.compliance >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {scores.compliance >= 70 ? 'Conformidad con AAIP' : 'Riesgo de Sanción / Habeas Data'}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                    <span>🇪🇺</span>
                    <span>EU AI Act & AESIA</span>
                  </div>
                  <div className="text-slate-400 mb-2 text-[11px]">Alto Riesgo · Supervisión Humana · Explicabilidad</div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    scores.ethics >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {scores.ethics >= 70 ? 'Alineado con AESIA / Alto Riesgo' : 'Requiere Mitigación de Sesgos'}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                    <span>🌐</span>
                    <span>ISO 42001 & DMBOK</span>
                  </div>
                  <div className="text-slate-400 mb-2 text-[11px]">Gestión de IA (AIMS) · Calidad y Metadatos</div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    averageScore >= 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {averageScore >= 75 ? 'Candidato a Certificación AIMS' : 'Fase de Estandarización'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOJA DE RUTA ESTRATÉGICA */}
        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-2">
                Hoja de Ruta de Gobernanza Corporativa para {companyProfile.sector}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 mb-6 leading-relaxed">
                Plan de acción estructurado en 3 fases para elevar el nivel de madurez y consolidar la ventaja competitiva en el mercado.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950/80 border border-sky-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-xs border border-sky-500/40">
                      1
                    </span>
                    <h4 className="font-bold text-sm text-white">Fase Inmediata (0 - 90 Días): Control Perimetral & Ley 25.326</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 ml-8 list-disc">
                    <li>Registro y actualización de bases ante la AAIP (Ley 25.326 Art. 21).</li>
                    <li>Despliegue del Enterprise AI Gateway con anonimización de datos en vuelo.</li>
                    <li>Firma de Cláusulas Contractuales Tipo (CCT) para transferencias internacionales seguras.</li>
                    <li>Designación formal de Data Stewards y Oficial de Protección de Datos (DPO).</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-950/80 border border-indigo-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs border border-indigo-500/40">
                      2
                    </span>
                    <h4 className="font-bold text-sm text-white">Fase de Consolidación (90 - 180 Días): Ética & MLOps Continuo</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 ml-8 list-disc">
                    <li>Publicación del Catálogo Corporativo de Datos con glosario semántico unificado.</li>
                    <li>Integración de pruebas automáticas de drift y métricas de paridad en CI/CD.</li>
                    <li>Estatuto con poder de veto vinculante para el Comité de Ética de IA.</li>
                    <li>Protocolo ágil de respuesta ante solicitudes de Habeas Data (plazo de 5 y 10 días).</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-950/80 border border-emerald-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/40">
                      3
                    </span>
                    <h4 className="font-bold text-sm text-white">Fase de Excelencia (180 - 360 Días): Liderazgo & ISO 42001</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 ml-8 list-disc">
                    <li>Certificación internacional en Sistemas de Gestión de IA (ISO/IEC 42001).</li>
                    <li>Red Teaming continuo y ciberdefensa adversarial en agentes conversacionales.</li>
                    <li>Programa corporativo integral de Data & AI Literacy para todo el personal.</li>
                    <li>Publicación del Reporte Anual de Transparencia Algorítmica.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUDITORÍA DE DECISIONES CON FEEDBACK */}
        {activeTab === 'decisions' && (
          <div className="space-y-3">
            {decisionHistory.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-xl">
                No se registraron decisiones en esta sesión.
              </div>
            ) : (
              decisionHistory.map((entry, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono font-bold">
                      Escenario #{entry.scenarioNumber}: {entry.phase}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      entry.verdict === 'EXCELLENT'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : entry.verdict === 'ACCEPTABLE'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {entry.verdict}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white">{entry.title}</h4>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-emerald-300">Decisión adoptada:</span>
                      <span>{entry.selectedOptionTitle}</span>
                    </div>

                    <div className="text-slate-300 leading-relaxed text-[11px] pt-1 border-t border-slate-800">
                      <strong className="text-sky-300">Principio & Fundamento:</strong> {entry.feedback.whyGoodOrBad}
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono italic">
                      {entry.regulatoryNote}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: DICTAMEN INTELIGENTE (IA) */}
        {activeTab === 'aiConsultant' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-white">Dictamen Estratégico con Inteligencia Artificial</h3>
                </div>

                <button
                  onClick={handleFetchAiAudit}
                  disabled={aiLoading}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiLoading ? 'Generando...' : 'Regenerar Dictamen'}</span>
                </button>
              </div>

              {aiLoading ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 font-mono">
                    Auditando resultados conforme a la Ley 25.326, EU AI Act e ISO 42001...
                  </p>
                </div>
              ) : aiReport ? (
                <div className="space-y-4 text-xs md:text-sm">
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-sky-400 mb-1">Resumen Ejecutivo del Auditor</h4>
                    <p className="text-slate-300 leading-relaxed">{aiReport.executiveSummary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                      <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Fortalezas Identificadas</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300 list-disc ml-4">
                        {(aiReport.strengths || []).map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2">
                      <h4 className="font-bold text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Brechas Críticas de Riesgo</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300 list-disc ml-4">
                        {(aiReport.criticalGaps || []).map((g: string, i: number) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {aiReport.roadmap && (
                    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-white">Recomendaciones Clave por Horizonte</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 bg-slate-900 rounded-lg">
                          <span className="font-semibold text-sky-400 block mb-1">90 Días:</span>
                          <span className="text-slate-300">{aiReport.roadmap.shortTerm}</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg">
                          <span className="font-semibold text-indigo-400 block mb-1">6 Meses:</span>
                          <span className="text-slate-300">{aiReport.roadmap.mediumTerm}</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg">
                          <span className="font-semibold text-emerald-400 block mb-1">12 Meses:</span>
                          <span className="text-slate-300">{aiReport.roadmap.longTerm}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReport}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 transition-colors border border-slate-700 shadow"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Descargar Informe (.md)</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenShare(averageScore, maturity.name);
              }}
              className="px-4 py-2.5 bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border border-blue-500/40 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow"
            >
              <Share2 className="w-4 h-4 text-blue-400" />
              <span>Compartir</span>
            </button>

            <button
              onClick={onOpenDownloadGuide}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Cómo Descargar el Juego</span>
            </button>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onRestart();
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Volver al Menú Principal</span>
          </button>
        </div>

        {/* Footer with Noelia Orsini Attribution and Social Links */}
        <footer className="pt-6 pb-2 border-t border-slate-800/80 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <span className="text-slate-400">Desarrollado por</span>
              <span className="text-white font-bold tracking-wide">Noelia Orsini</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="text-[11px] text-sky-400 font-mono hidden md:inline">Gobernanza de Datos & Ética de IA</span>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/noelia-orsini"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de LinkedIn de Noelia Orsini"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-sky-500 hover:text-sky-300 text-slate-300 transition-all shadow hover:shadow-sky-500/10 text-xs font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/NoeliaOrsini"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Noelia Orsini"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-500 hover:text-white text-slate-300 transition-all shadow hover:shadow-slate-500/10 text-xs font-semibold"
              >
                <Github className="w-3.5 h-3.5 text-slate-200" />
                <span>GitHub</span>
              </a>

              <a
                href="https://noelia-orsini-portafolio.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portafolio de Noelia Orsini"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-950/60 to-purple-950/60 border border-sky-500/40 hover:border-sky-400 hover:text-sky-200 text-sky-300 transition-all shadow hover:shadow-sky-500/20 text-xs font-semibold"
              >
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>Portafolio</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
