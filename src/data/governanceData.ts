import { GovernanceDilemma, MaturityLevelInfo } from '../types/game';

export interface PhaseConfig {
  id: number;
  name: string;
  focus: string;
  targetObjective: string;
  durationSec: number;
}

export const GAME_PHASES: PhaseConfig[] = [
  {
    id: 1,
    name: 'Misión 1: Privacidad & Consentimiento',
    focus: 'Ley 25.326 (Argentina), LOPDGDD (España) & RGPD/GDPR',
    targetObjective: 'Regular el flujo de datos personales y garantizar el consentimiento previo, libre, granular e informado.',
    durationSec: 40
  },
  {
    id: 2,
    name: 'Misión 2: Sesgo Algorítmico & Equidad',
    focus: 'EU AI Act, AESIA (España), Paridad Demográfica & Guía IA de la AAIP',
    targetObjective: 'Auditar modelos predictivos de alto riesgo en selección y evitar discriminación oculta.',
    durationSec: 40
  },
  {
    id: 3,
    name: 'Misión 3: Seguridad & Fuga en LLMs',
    focus: 'Transferencia Internacional (Art. 12 Ley 25.326 / Cap. V RGPD) & Gateway Seguro',
    targetObjective: 'Blindar el perímetro corporativo frente al uso indiscriminado de APIs públicas de IA.',
    durationSec: 40
  },
  {
    id: 4,
    name: 'Misión 4: Datos Sensibles & Biometría',
    focus: 'Art. 7 Ley 25.326, Art. 9 LOPDGDD / RGPD & Dictámenes AEPD sobre Biometría',
    targetObjective: 'Gestionar el despliegue de tecnologías biométricas y reconocimiento emocional con base legal legítima.',
    durationSec: 40
  },
  {
    id: 5,
    name: 'Misión 5: Deriva de Modelos & Derechos ARCO / Habeas Data',
    focus: 'Derechos ARCO-POL (LOPDGDD/RGPD), Habeas Data (Ley 25.326) & MLOps',
    targetObjective: 'Monitorear la precisión continua de los modelos y garantizar el derecho de los ciudadanos a la rectificación y no discriminación automatizada.',
    durationSec: 40
  },
  {
    id: 6,
    name: 'Misión 6: Shadow AI & Brechas de Seguridad en 72h',
    focus: 'Notificación de Brechas en 72h (AEPD / Art. 33 RGPD) & Res. 47/2018 AAIP',
    targetObjective: 'Neutralizar inyecciones de prompts en chatbots públicos y cumplir los protocolos de reporte de incidentes.',
    durationSec: 40
  },
  {
    id: 7,
    name: 'Misión 7: Cultura, Ética & DPD Obligatorio',
    focus: 'DPD Obligatorio ante la AEPD (Art. 34 LOPDGDD), Comité de Ética & ISO 42001',
    targetObjective: 'Consolidar la gobernanza institucional como catalizador ágil y no como un obstáculo burocrático.',
    durationSec: 40
  }
];

export const GOVERNANCE_DILEMMAS: GovernanceDilemma[] = [
  // --- ESCENARIO 1: PRIVACIDAD Y LEY ARGENTINA 25.326 / ESPAÑA LOPDGDD & RGPD ---
  {
    id: 'dilemma_1',
    scenarioNumber: 1,
    phaseId: 1,
    phaseName: 'Misión 1: Privacidad & Consentimiento',
    triggerTimeSec: 10,
    title: 'Monetización y Cesión de Base de Clientes a Fintechs Terceras',
    category: 'Privacidad & Ley 25.326',
    stakeholderConflict: 'Dirección Comercial & Alianzas vs. Delegado de Protección de Datos (DPD / DPO)',
    description: 'El área de negocios firmó un preacuerdo con un marketplace financiero para monetizar el historial de compras y perfiles de 500.000 usuarios. El contrato propone ceder los datos sin requerir un nuevo consentimiento expreso, argumentando que las bases están "anonimizadas mediante hash simple" y que los Términos y Condiciones genéricos ya incluían una cláusula amplia de "mejoras del servicio".',
    argentineLawRelevance: 'Artículos 5 (Consentimiento previo, expreso e informado) y 11 (Cesión de datos para fines específicos y prohibición de cesión ilícita) de la Ley 25.326 de Argentina.',
    spanishLawRelevance: 'Art. 6 de la LOPDGDD (Ley Orgánica 3/2018 de España) y Arts. 6 y 7 del RGPD (Consentimiento libre, específico, informado e inequívoco; nulidad de casillas premarcadas) y Guía de la AEPD sobre tratamientos comerciales.',
    options: [
      {
        id: 'opt_1_a',
        title: 'Suspender Cesión e Implementar Consentimiento Granular Expreso',
        description: 'Frenar la integración, descartar el hash simple (que permite reidentificación) y solicitar a los usuarios consentimiento libre, previo e informado detallando la finalidad comercial.',
        rationale: 'Prioriza el cumplimiento legal y la transparencia con el titular del dato conforme a los criterios vinculantes de la AEPD (España) y la AAIP (Argentina).',
        scoreImpact: {
          compliance: +25,
          ethics: +20,
          efficiency: +10,
          dataQuality: +15,
          securityCompliance: +25,
          responsibleAI: +15,
          businessValue: +8
        },
        regulatoryNote: 'Pleno apego al Art. 5 y 11 de la Ley 25.326, Art. 6 LOPDGDD y Arts. 6-7 del RGPD de la UE.',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Decisión Sobresaliente de Gobernanza y Protección!',
          governancePrinciple: 'Principio de Consentimiento Libre, Específico e Informado (Art. 5 Ley 25.326 / Art. 6 LOPDGDD & RGPD)',
          whyGoodOrBad: 'Excelente. Las autoridades de control (AEPD en España y AAIP en Argentina) establecen que las cláusulas genéricas de T&C son nulas para cesiones a terceros. Además, un simple hash no garantiza anonimización irreversible según los dictámenes de la AEPD. Exigir consentimiento específico evita multas de hasta el 4% de la facturación global bajo el RGPD.',
          legalContext: 'Ley 25.326 Arts. 5, 11 y 21 (Argentina) / Ley Orgánica 3/2018 (LOPDGDD) Art. 6 y RGPD Arts. 6 y 7 (España/UE).',
          shortTermConsequence: 'Se pospone el cobro inmediato de la alianza comercial, pero se evita una investigación sancionadora de la AEPD o la AAIP.',
          longTermImpact: 'Consolida la confianza del cliente, blindando a la empresa ante demandas colectivas y multas punitivas millonarias.'
        }
      },
      {
        id: 'opt_1_b',
        title: 'Autorizar la Cesión Inmediata con Cláusula de Deslinde',
        description: 'Proceder con la venta de la base de datos firmando una cláusula en la que el comprador se hace responsable de cualquier reclamo de privacidad.',
        rationale: 'Maximiza el ingreso financiero a corto plazo asumiendo que los contratos entre privados pueden ignorar normas de orden público.',
        scoreImpact: {
          compliance: -30,
          ethics: -25,
          efficiency: +12,
          dataQuality: -15,
          securityCompliance: -30,
          responsibleAI: -20,
          businessValue: -10
        },
        regulatoryNote: 'Violación directa de normas de orden público de la Ley 25.326. Cláusula inoponible ante la AAIP.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Infracción Gravísima! Nulidad Absoluta',
          governancePrinciple: 'Orden Público de la Protección de Datos (Art. 1 y 11 Ley 25.326)',
          whyGoodOrBad: 'Pésima decisión. En la legislación argentina, la protección de datos es de orden público; ninguna cláusula de deslinde privado exime al responsable del banco de datos de su deber de custodia y consentimiento previo. La empresa es solidariamente responsable.',
          legalContext: 'Ley 25.326 Art. 11, Art. 31 (Sanciones) y Art. 43 Constitución Nacional (Acción de Habeas Data).',
          shortTermConsequence: 'Ingreso rápido de fondos, pero apertura inminente de sumario por la AAIP y riesgo de revocación de personería.',
          longTermImpact: 'Daño reputacional devastador y demandas de asociaciones de defensa del consumidor.'
        }
      },
      {
        id: 'opt_1_c',
        title: 'Anonimización K-Anonymity Real con Data Clean Room',
        description: 'No ceder datos individuales. En su lugar, procesar internamente insights agregados con garantía matemática (K-Anonymity + L-Diversity) en un entorno federado.',
        rationale: 'Permite generar valor estadístico conjunto sin transferir datos personales identificables.',
        scoreImpact: {
          compliance: +18,
          ethics: +16,
          efficiency: +16,
          dataQuality: +18,
          securityCompliance: +20,
          responsibleAI: +14,
          businessValue: +18
        },
        regulatoryNote: 'Alineado con las directrices de técnicas de desidentificación de la AAIP y DAMA DMBOK.',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Innovación Segura y Gobernanza de Vanguardia!',
          governancePrinciple: 'Privacidad por Diseño (Privacy by Design) y Desidentificación Robusta',
          whyGoodOrBad: 'Muy buena alternativa. Al transformar los datos en información agregada verdaderamente irreversible, la base deja de ser alcanzada por las restricciones de cesión de datos personales, permitiendo generar ingresos lícitos.',
          legalContext: 'Guías Técnicas de Anonimización de la AAIP y estándares ISO/IEC 27701.',
          shortTermConsequence: 'Requiere 2 semanas adicionales de desarrollo de pipeline, pero asegura un modelo de negocio sostenible.',
          longTermImpact: 'Establece un estándar técnico respetado por la industria y replicable para futuras alianzas.'
        }
      }
    ]
  },

  // --- ESCENARIO 2: SESGO DE IA Y EQUIDAD ---
  {
    id: 'dilemma_2',
    scenarioNumber: 2,
    phaseId: 2,
    phaseName: 'Misión 2: Sesgo Algorítmico & Equidad',
    triggerTimeSec: 12,
    title: 'Sesgo Demográfico en IA de Contratación y Promoción',
    category: 'Sesgo de IA',
    stakeholderConflict: 'Dirección de Recursos Humanos vs. Comité de Diversidad & Legal',
    description: 'El nuevo modelo de Machine Learning que filtra postulantes a puestos gerenciales ha procesado 40.000 currículums. La auditoría interna detecta que los candidatos de ciertas provincias del interior del país y postulantes con interrupciones laborales por maternidad reciben un puntaje 38% menor debido a que el dataset histórico reflejaba sesgos del pasado corporativo.',
    argentineLawRelevance: 'Res. 161/2023 (Guía de IA Responsable), Ley 25.326 de Protección de Datos y Art. 16 de la Constitución Nacional de Argentina (Garantía de Igualdad ante la Ley).',
    spanishLawRelevance: 'Art. 88 y 87 LOPDGDD (Garantía de derechos digitales en el trabajo), Art. 22 RGPD (Decisiones automatizadas y perfilado) y Arts. 10 y 14 del EU AI Act (Sistemas de Alto Riesgo en selección de empleo supervisados por la AESIA en España).',
    options: [
      {
        id: 'opt_2_a',
        title: 'Reentrenamiento con Paridad Demográfica y Supervisión Humana Obligatoria (HITL)',
        description: 'Suspender el filtrado automático, reequilibrar la muestra de entrenamiento (SMOTE / Fairlearn), eliminar proxies territoriales y exigir que toda decisión final sea tomada por un evaluador humano.',
        rationale: 'Garantiza equidad algorítmica, trazabilidad de features e impide la discriminación indirecta sistemática exigida por la AESIA y la AAIP.',
        scoreImpact: {
          compliance: +22,
          ethics: +26,
          efficiency: +12,
          dataQuality: +20,
          securityCompliance: +18,
          responsibleAI: +28,
          businessValue: +14
        },
        regulatoryNote: 'Conforme al EU AI Act (Sistemas de Alto Riesgo en Empleo / AESIA España), Art. 22 RGPD y Guía de IA de la AAIP.',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Victoria por la Justicia Algorítmica!',
          governancePrinciple: 'No Discriminación, Transparencia y Supervisión Humana (Human-in-the-Loop)',
          whyGoodOrBad: 'Excelente. Los sistemas de IA en selección de personal están clasificados como de Alto Riesgo en la Unión Europea (supervisados por la AESIA en España) y bajo la Guía de la AAIP en Argentina. Asegurar paridad demográfica y supervisión humana efectiva (Art. 14 EU AI Act) evita sanciones millonarias e inspecciones de trabajo.',
          legalContext: 'Arts. 10 y 14 EU AI Act (AESIA España) / Art. 22 RGPD / Arts. 87-88 LOPDGDD / Res. 161/2023 Guía de IA Responsable / Ley 23.592 (Argentina).',
          shortTermConsequence: 'El proceso de selección demora 3 días adicionales por vacante, pero selecciona al mejor talento real.',
          longTermImpact: 'Genera una cultura corporativa inclusiva y atrae talento de alto valor, blindando a la empresa ante inspecciones laborales.'
        }
      },
      {
        id: 'opt_2_b',
        title: 'Ocultar los Nombres de las Provincias y Continuar la Ejecución Automática',
        description: 'Eliminar únicamente el campo explícito de "provincia" y "género", dejando que la red neuronal siga infiriendo patrones con el resto de datos.',
        rationale: 'Intenta resolver el problema con "Fairness through Unawareness", ignorando que otras variables correlacionadas (como colegio secundario o código postal) replican el mismo sesgo.',
        scoreImpact: {
          compliance: -14,
          ethics: -22,
          efficiency: +8,
          dataQuality: -10,
          securityCompliance: -8,
          responsibleAI: -24,
          businessValue: +2
        },
        regulatoryNote: 'Práctica desacreditada internacionalmente; no mitiga el sesgo proxy.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Falsa Seguridad y Discriminación Encubierta!',
          governancePrinciple: 'Principio de Calidad de Datos y Mitigación de Sesgos Indirectos',
          whyGoodOrBad: 'Mala decisión técnica. Las redes neuronales complejas reconstruyen el sesgo a través de variables proxy como código postal, hobbies o universidad de egreso. El sesgo persiste intacto.',
          legalContext: 'Principios de IA Ética de la OCDE y Guía de la AAIP sobre sesgos en algoritmos.',
          shortTermConsequence: 'Los gerentes creen falsamente que el problema está resuelto.',
          longTermImpact: 'Riesgo inminente de denuncias colectivas ante el INADI y tribunales laborales.'
        }
      },
      {
        id: 'opt_2_c',
        title: 'Descartar la IA y Volver a Evaluación Manual Tradicional',
        description: 'Cancelar el proyecto de IA y encargar todas las revisiones a analistas junior de RRHH.',
        rationale: 'Evita el sesgo algorítmico pero traslada el problema a los sesgos humanos inconscientes no medibles, con una caída del 70% en velocidad.',
        scoreImpact: {
          compliance: +10,
          ethics: +10,
          efficiency: -20,
          dataQuality: +4,
          securityCompliance: +8,
          responsibleAI: +8,
          businessValue: -16
        },
        regulatoryNote: 'Elimina el riesgo algorítmico a expensas de la competitividad operativa.',
        feedback: {
          verdict: 'ACCEPTABLE',
          verdictTitle: 'Solución Conservadora con Alto Costo de Oportunidad',
          governancePrinciple: 'Principio de Precaución pero con Ineficiencia Operativa',
          whyGoodOrBad: 'Aceptable desde la óptica de riesgo cero inmediato, pero denota incapacidad técnica para gobernar la IA. El sesgo humano manual a menudo es igual o peor que el algorítmico y no es auditable.',
          legalContext: 'No infringe normas, pero frena la transformación digital de la empresa.',
          shortTermConsequence: 'Colapso de tiempos de contratación en Recursos Humanos.',
          longTermImpact: 'Pérdida de competitividad en la atracción de profesionales.'
        }
      }
    ]
  },

  // --- ESCENARIO 3: SEGURIDAD Y TRANSFERENCIA INTERNACIONAL ---
  {
    id: 'dilemma_3',
    scenarioNumber: 3,
    phaseId: 3,
    phaseName: 'Misión 3: Seguridad & Fuga en LLMs',
    triggerTimeSec: 12,
    title: 'Transferencia Internacional Ilícita y Fuga de Secretos en LLMs',
    category: 'Seguridad de Datos',
    stakeholderConflict: 'Desarrolladores & Operaciones vs. CISO & Oficial de Cumplimiento',
    description: 'Se descubre que varios equipos de operaciones están enviando contratos con clientes argentinos, balances y números de tarjetas a una API de LLM cuyo datacenter se encuentra en una jurisdicción sin legislación adecuada de protección de datos según la AAIP. Los términos de servicio de la API indican que pueden almacenar los prompts durante 90 días para "auditoría interna del proveedor".',
    argentineLawRelevance: 'Artículo 9 (Seguridad de los datos) y Artículo 12 (Prohibición de transferencia internacional de datos a países que no proporcionen niveles adecuados de protección, salvo excepciones o cláusulas contractuales tipo homologadas por la AAIP).',
    spanishLawRelevance: 'Capítulo V del RGPD (Arts. 44 a 49: Transferencias internacionales de datos fuera del EEE), Art. 72.1.p de la LOPDGDD (Infracción muy grave sancionada por la AEPD por transferencias sin garantías) y Guía AEPD sobre IA y proveedores cloud.',
    options: [
      {
        id: 'opt_3_a',
        title: 'Desplegar Enterprise AI Gateway con Enmascaramiento Local y Cláusulas CCT',
        description: 'Implementar un proxy de gobernanza en servidores locales (o territorio de la UE/Argentina) que anonimiza datos antes de salir y firmar Cláusulas Contractuales Tipo (SCC de la UE / CCT de la AAIP).',
        rationale: 'Cumple estrictamente con el régimen de transferencias internacionales mientras mantiene habilitada la productividad con IA.',
        scoreImpact: {
          compliance: +28,
          ethics: +20,
          efficiency: +16,
          dataQuality: +18,
          securityCompliance: +30,
          responsibleAI: +22,
          businessValue: +16
        },
        regulatoryNote: 'Conformidad con Art. 9 y 12 Ley 25.326, Cap. V RGPD (Arts. 44-46) y LOPDGDD.',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Arquitectura de Seguridad Ejemplar!',
          governancePrinciple: 'Seguridad del Dato y Garantías en Transferencias Internacionales (Art. 12 Ley 25.326 / Art. 46 RGPD)',
          whyGoodOrBad: 'Impecable. Tanto la Ley 25.326 como el RGPD prohíben transferir datos a jurisdicciones sin nivel adecuado de protección sin salvaguardas formales (Cláusulas Tipo). El AI Gateway garantiza que ningún dato PII abandone el perímetro seguro sin anonimizar, neutralizando sanciones de hasta 20 millones de euros de la AEPD y suspensiones de la AAIP.',
          legalContext: 'Capítulo V RGPD (Arts. 44-49) / LOPDGDD Art. 72.1.p / Ley 25.326 Art. 12 / Res. AAIP 198/2023.',
          shortTermConsequence: 'Inversión en infraestructura proxy que se amortiza rápidamente en seguridad.',
          longTermImpact: 'Blindaje total contra ciberataques, espionaje corporativo y sanciones de la autoridad de control.'
        }
      },
      {
        id: 'opt_3_b',
        title: 'Ignorar el Asunto si la API es Económica y Rápida',
        description: 'Permitir que los empleados continúen usando la API sin restricciones para no interrumpir entregas urgentes.',
        rationale: 'Ahorro de costos a corto plazo con indiferencia culpable ante la ley y la seguridad del cliente.',
        scoreImpact: {
          compliance: -35,
          ethics: -28,
          efficiency: +10,
          dataQuality: -18,
          securityCompliance: -40,
          responsibleAI: -25,
          businessValue: -15
        },
        regulatoryNote: 'Infracción muy grave del Art. 9 y 12 Ley 25.326; causal de multas máximas y clausura.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Falla de Seguridad y Responsabilidad Penal!',
          governancePrinciple: 'Deber de Seguridad y Custodia (Art. 9 Ley 25.326)',
          whyGoodOrBad: 'Pésima decisión. Exponer contratos y secretos a un servidor extranjero sin contrato de custodia convierte a los directivos en penalmente responsables por negligencia grave según el Código Penal y la Ley de Datos.',
          legalContext: 'Art. 9 y 32 Ley 25.326 y Art. 117 bis del Código Penal de la Nación Argentina.',
          shortTermConsequence: 'Fuga de secretos de clientes a un proveedor externo.',
          longTermImpact: 'Pérdida de clientes corporativos (B2B), rescisiones contractuales inmediatas y multas millonarias.'
        }
      },
      {
        id: 'opt_3_c',
        title: 'Bloqueo Total de Internet y Prohibición Estricta de IA',
        description: 'Bloquear el acceso a todo sitio web de IA mediante firewall y amenazar con despidos a quienes lo utilicen.',
        rationale: 'Control autoritario reactivo que fomenta que los empleados usen sus propios teléfonos móviles para conectarse (Shadow AI invisible).',
        scoreImpact: {
          compliance: +8,
          ethics: -10,
          efficiency: -25,
          dataQuality: -8,
          securityCompliance: +5,
          responsibleAI: -15,
          businessValue: -22
        },
        regulatoryNote: 'Incentiva el Shadow IT y destruye la moral y productividad del equipo.',
        feedback: {
          verdict: 'ACCEPTABLE',
          verdictTitle: 'Parálisis Corporativa y Foco de Shadow IT',
          governancePrinciple: 'Prohibicionismo Ciego vs. Gobernanza Adaptativa',
          whyGoodOrBad: 'Mala estrategia cultural. Prohibir sin brindar una alternativa corporativa segura sólo provoca que el personal trabaje con herramientas no autorizadas en sus dispositivos personales, fuera de cualquier control.',
          legalContext: 'No genera multas regulatorias pero destruye la innovación y retención de talento.',
          shortTermConsequence: 'Caída del 40% en la velocidad de desarrollo.',
          longTermImpact: 'Fuga de talento calificado y surgimiento de canales informales de filtración de datos.'
        }
      }
    ]
  },

  // --- ESCENARIO 4: DATOS SENSIBLES Y BIOMETRÍA ---
  {
    id: 'dilemma_4',
    scenarioNumber: 4,
    phaseId: 4,
    phaseName: 'Misión 4: Datos Sensibles & Biometría',
    triggerTimeSec: 12,
    title: 'Reconocimiento Facial y Detección Emocional en el Espacio de Trabajo',
    category: 'Datos Sensibles & Biometría',
    stakeholderConflict: 'Dirección de Operaciones & Seguridad Física vs. Sindicato & Delegados de Privacidad',
    description: 'La empresa planea instalar cámaras con IA de reconocimiento facial continuo en oficinas para controlar accesos y analizar las expresiones faciales de los empleados ("análisis de estrés y productividad"). La empresa argumenta que al estar en instalaciones propias no requiere consentimiento de los trabajadores.',
    argentineLawRelevance: 'Artículo 2 y Artículo 7 de la Ley 25.326 (Definición y régimen estricto de Datos Sensibles: prohibición general de tratamiento sin ley especial o consentimiento expreso) y Criterios de la AAIP sobre Sistemas de Reconocimiento Facial.',
    spanishLawRelevance: 'Art. 9 LOPDGDD y Art. 9 RGPD (Categorías especiales: biometría), Art. 89 LOPDGDD (Derecho a la intimidad frente a videovigilancia y grabación en el trabajo), Criterio vinculante de la AEPD de 2023 sobre control horario con biometría y Art. 5 EU AI Act (Prácticas de IA prohibidas).',
    options: [
      {
        id: 'opt_4_a',
        title: 'Cancelar Detección Emocional y Reemplazar Acceso Facial por Credenciales Físicas / QR',
        description: 'Reconocer que el análisis de emociones laborales está prohibido por el EU AI Act y que la AEPD prohíbe el uso de biometría laboral si hay alternativas menos invasivas.',
        rationale: 'Respeta el principio de proporcionalidad, minimización de datos y dignidad laboral conforme a la AEPD y la AAIP.',
        scoreImpact: {
          compliance: +25,
          ethics: +28,
          efficiency: +10,
          dataQuality: +14,
          securityCompliance: +22,
          responsibleAI: +30,
          businessValue: +10
        },
        regulatoryNote: 'Prohibición expresa de IA de inferencia emocional en el trabajo según el Art. 5 del EU AI Act y criterio estricto de la AEPD.',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Defensa Impecable de los Derechos Fundamentales!',
          governancePrinciple: 'Proporcionalidad y Protección Estricta de Datos Sensibles (Art. 7 Ley 25.326 / Art. 9 RGPD & LOPDGDD)',
          whyGoodOrBad: 'Brillante. La AEPD en España sanciona con multas severas el uso de reconocimiento facial en el trabajo por violar el principio de minimización (existen tarjetas RFID o QR), y el EU AI Act (Art. 5) prohíbe taxativamente la IA de detección de emociones en el entorno laboral.',
          legalContext: 'Art. 89 LOPDGDD / Art. 9 RGPD / Art. 5 EU AI Act / Criterio AEPD Biometría 2023 / Ley 25.326 Art. 7 (Argentina).',
          shortTermConsequence: 'Ahorro de $120.000 USD en software invasivo y paz social con los trabajadores y sindicatos.',
          longTermImpact: 'Posiciona a la compañía como empleador ético líder y elimina contingencias ante la Inspección de Trabajo y la AEPD/AAIP.'
        }
      },
      {
        id: 'opt_4_b',
        title: 'Instalar el Sistema Ocultando las Funciones de Detección Emocional',
        description: 'Decir a los trabajadores que las cámaras son "solo de seguridad edilicia" mientras el software procesa métricas emocionales en segundo plano.',
        rationale: 'Ocultamiento doloso que destruye el principio de buena fe y lealtad informativa.',
        scoreImpact: {
          compliance: -40,
          ethics: -35,
          efficiency: +5,
          dataQuality: -15,
          securityCompliance: -25,
          responsibleAI: -35,
          businessValue: -20
        },
        regulatoryNote: 'Conducta ilícita grave. Vulneración de la dignidad del trabajador y de la Ley 25.326.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Conducta Clandestina e Ilegítima!',
          governancePrinciple: 'Principio de Buena Fe y Finalidad Exclusiva (Art. 4 Ley 25.326)',
          whyGoodOrBad: 'Gravísimo. Tratar datos sensibles bajo engaño o desvío de finalidad constituye una falta penal y administrativa severa. Si un empleado descubre la telemetría oculta, la sanción de la AAIP y el Ministerio de Trabajo será ejemplar.',
          legalContext: 'Ley 25.326 Art. 4 (Finalidad), Art. 7 (Datos Sensibles) y Ley de Contrato de Trabajo (Art. 70 y ss).',
          shortTermConsequence: 'Exposición inminente en medios de prensa y filtraciones sindicales.',
          longTermImpact: 'Paro gremial, litigios millonarios e imputación penal a los directores involucrados.'
        }
      },
      {
        id: 'opt_4_c',
        title: 'Exigir a Todos los Empleados Firmar una Autorización Obligatoria',
        description: 'Condicionar el cobro de bonos o la permanencia en la empresa a la firma de un consentimiento para el análisis facial.',
        rationale: 'El consentimiento forzado en el marco de una relación de dependencia laboral está viciado de nulidad según la AAIP.',
        scoreImpact: {
          compliance: -20,
          ethics: -18,
          efficiency: +8,
          dataQuality: +5,
          securityCompliance: -12,
          responsibleAI: -18,
          businessValue: -8
        },
        regulatoryNote: 'Consentimiento no libre viciado por desbalance de poder (Doctrina uniforme AAIP y GDPR).',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Consentimiento Nulo por Coacción Laboral!',
          governancePrinciple: 'Invalidez del Consentimiento Viciado por Relación de Subordinación',
          whyGoodOrBad: 'Mala decisión jurídica. En el derecho laboral argentino, el trabajador no puede otorgar un consentimiento verdaderamente "libre" cuando su negativa acarrea perjuicios económicos. Es nulo de pleno derecho.',
          legalContext: 'Ley 25.326 Art. 5 inc. 1 y Resoluciones interpretativas de la AAIP sobre consentimiento en el empleo.',
          shortTermConsequence: 'Firma de papeles inútiles que no tendrán ninguna validez ante una inspección.',
          longTermImpact: 'Desconfianza generalizada en los equipos de trabajo.'
        }
      }
    ]
  },

  // --- ESCENARIO 5: DERIVA DE MODELOS Y HABEAS DATA ---
  {
    id: 'dilemma_5',
    scenarioNumber: 5,
    phaseId: 5,
    phaseName: 'Misión 5: Deriva de Modelos & Habeas Data',
    triggerTimeSec: 12,
    title: 'Concept Drift en Scoring y Bloqueo del Derecho de Acceso (Habeas Data)',
    category: 'MLOps & Deriva',
    stakeholderConflict: 'Equipo de Soporte & Clientes vs. Equipo MLOps & Arquitectura',
    description: 'Debido a la inflación y volatilidad macroeconómica, el modelo de crédito automatizado sufrió una deriva conceptual (Drift) severa: califica como "morosos de alto riesgo" a clientes cumplidores. Varios usuarios intiman a la empresa mediante cartas documento exigiendo conocer los datos y la lógica algorítmica utilizada para rechazarlos (Derecho de Habeas Data).',
    argentineLawRelevance: 'Artículos 14 (Derecho de Acceso) y 16 (Derecho de Rectificación, Actualización y Supresión) de la Ley 25.326 y Art. 43 Constitución Nacional.',
    spanishLawRelevance: 'Título III de la LOPDGDD (Arts. 12 a 18: Derechos ARCO-POL) y Arts. 15 y 22 RGPD (Derecho a recibir explicabilidad de la decisión algorítmica y a impugnar decisiones automatizadas ante la AEPD en plazo perentorio de 1 mes).',
    options: [
      {
        id: 'opt_5_a',
        title: 'Canal de Explicabilidad SHAP, Rectificación Inmediata y Reentrenamiento MLOps',
        description: 'Establecer un portal de transparencia donde el usuario ve los factores de la decisión, corregir datos en el plazo legal perentorio (5 días hábiles en Argentina / 1 mes en España bajo LOPDGDD) y calibrar el pipeline con monitoreo de drift continuo.',
        rationale: 'Cumple los plazos perentorios de la Ley 25.326 y la LOPDGDD española, transformando un error técnico en una demostración de excelencia y respeto al cliente.',
        scoreImpact: {
          compliance: +28,
          ethics: +26,
          efficiency: +20,
          dataQuality: +25,
          securityCompliance: +20,
          responsibleAI: +26,
          businessValue: +20
        },
        regulatoryNote: 'Conformidad plena con los plazos perentorios de la Ley 25.326, Título III LOPDGDD y Art. 22 RGPD.',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Respuesta Ejemplar de Derechos ARCO y MLOps Maduro!',
          governancePrinciple: 'Derecho a la Explicabilidad y Rectificación de Decisiones Automatizadas',
          whyGoodOrBad: 'Extraordinaria respuesta. La legislación argentina (Habeas Data) y la española (LOPDGDD y Art. 22 RGPD) otorgan a la persona el derecho inalienable a conocer la lógica del tratamiento automatizado y a rectificar los datos inexactos. Ofrecer explicabilidad matemática desactiva reclamaciones ante la AEPD y la AAIP.',
          legalContext: 'Ley 25.326 Arts. 14, 16 / LOPDGDD Título III (Arts. 12-18) / RGPD Arts. 15 y 22 (España/UE).',
          shortTermConsequence: 'Resolución amistosa de reclamos sin multas de la AEPD ni acciones de Habeas Data.',
          longTermImpact: 'Modelo MLOps resiliente que se auto-monitorea ante variaciones macroeconómicas.'
        }
      },
      {
        id: 'opt_5_b',
        title: 'Responder con Carta Genérica Afirmando "Secreto Comercial Algorítmico"',
        description: 'Rechazar los pedidos de los usuarios alegando que el modelo es propiedad intelectual reservada y no se pueden brindar explicaciones.',
        rationale: 'Defensa corporativa obsoleta que confunde propiedad intelectual con la obligación legal de informar sobre decisiones automatizadas.',
        scoreImpact: {
          compliance: -30,
          ethics: -25,
          efficiency: -10,
          dataQuality: -15,
          securityCompliance: -10,
          responsibleAI: -25,
          businessValue: -15
        },
        regulatoryNote: 'Causal inmediata de demanda judicial de Habeas Data con costas a cargo de la empresa.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Violación Flagrante del Derecho de Habeas Data!',
          governancePrinciple: 'Obligación Legal de Informar sobre Criterios de Tratamiento Automatizado',
          whyGoodOrBad: 'Pésima decisión legal. La jurisprudencia argentina ha ratificado que el secreto comercial no puede anular el derecho constitucional del titular a conocer los datos evaluados y la lógica general del rechazo. La empresa perderá el juicio con costas.',
          legalContext: 'Art. 15 inc. 2 Ley 25.326 e informes de la AAIP sobre decisiones automatizadas.',
          shortTermConsequence: 'Lluvia de demandas judiciales en el fuero Civil y Comercial Federal.',
          longTermImpact: 'Pérdida de la reputación institucional y multas judiciales compulsivas (astreintes).'
        }
      },
      {
        id: 'opt_5_c',
        title: 'Ofrecer Compensaciones Económicas Informales para que Retiren el Reclamo',
        description: 'Instruir al call center a otorgar descuentos o dinero a los clientes molestos sin arreglar el modelo ni la base de datos.',
        rationale: 'Tratar de silenciar el síntoma sin solucionar la causa raíz de la deuda técnica de datos.',
        scoreImpact: {
          compliance: -15,
          ethics: -15,
          efficiency: -20,
          dataQuality: -22,
          securityCompliance: -10,
          responsibleAI: -18,
          businessValue: -18
        },
        regulatoryNote: 'Práctica ineficiente que no subsana el incumplimiento de la Ley 25.326.',
        feedback: {
          verdict: 'ACCEPTABLE',
          verdictTitle: 'Parche Costoso que Perpetúa la Deuda Técnica',
          governancePrinciple: 'Calidad del Dato en Origen vs. Remediación Reactiva Superficial',
          whyGoodOrBad: 'Ineficiente y peligroso. El drift del modelo continuará rechazando a miles de clientes más cada día, multiplicando los costos de compensación sin solucionar la base defectuosa.',
          legalContext: 'No extingue la potestad sancionatoria de la AAIP.',
          shortTermConsequence: 'Gasto superfluo en compensaciones que erosiona el margen operativo.',
          longTermImpact: 'Acumulación de deuda técnica y descalabro financiero en el negocio.'
        }
      }
    ]
  },

  // --- ESCENARIO 6: SHADOW AI Y JAILBREAK EN AGENTES ---
  {
    id: 'dilemma_6',
    scenarioNumber: 6,
    phaseId: 6,
    phaseName: 'Misión 6: Shadow AI & Jailbreak en Agentes',
    triggerTimeSec: 12,
    title: 'Inyección de Prompts (Jailbreak) en Chatbot Corporativo Oficial',
    category: 'Shadow AI & Inyección',
    stakeholderConflict: 'Seguridad Informática (SOC) vs. Marketing & Canales Digitales',
    description: 'Investigadores de seguridad publicaron que, utilizando prompts adversariales con codificación especial, lograron convencer al chatbot oficial de WhatsApp de la compañía de revelar descuentos no vigentes y exfiltrar fragmentos de contratos confidenciales de la base de conocimiento RAG.',
    argentineLawRelevance: 'Resolución AAIP 47/2018 (Medidas de Seguridad para el Tratamiento y Conservación de los Datos Personales en Medios Automatizados) y OWASP Top 10 for LLMs.',
    spanishLawRelevance: 'Arts. 32 y 33 del RGPD (Medidas técnicas y organizativas de seguridad y deber de notificación de brechas a la AEPD en un plazo máximo de 72 horas), Art. 73 LOPDGDD (Infracción grave por falta de diligencia) y Esquema Nacional de Seguridad (ENS).',
    options: [
      {
        id: 'opt_6_a',
        title: 'Arquitectura Defense-in-Depth: Guardrails Semánticos y Permisos en Base Vectorial',
        description: 'Implementar NeMo Guardrails en capas duales, restringir los permisos de lectura de la base vectorial mediante tokenización por rol y aislar los datos confidenciales fuera del contexto del agente público.',
        rationale: 'Establece seguridad robusta de nivel empresarial y previene fugas de datos sin apagar el servicio al cliente.',
        scoreImpact: {
          compliance: +25,
          ethics: +20,
          efficiency: +20,
          dataQuality: +20,
          securityCompliance: +32,
          responsibleAI: +25,
          businessValue: +18
        },
        regulatoryNote: 'Cumplimiento de la Res. AAIP 47/2018 y Arts. 32-33 RGPD / LOPDGDD (Prevención de brechas de seguridad).',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Ciberdefensa y Robustez Algorítmica Implacable!',
          governancePrinciple: 'Defensa en Profundidad y Deber de Seguridad (Art. 32 RGPD / Art. 9 Ley 25.326)',
          whyGoodOrBad: 'Excelente ingeniería de seguridad. Aislar el contexto de la base de conocimiento y aplicar guardrails semánticos neutraliza las vulnerabilidades OWASP LLM01 y LLM06 de forma definitiva. Evita brechas de datos notificables obligatoriamente a la AEPD en 72 horas o a la AAIP.',
          legalContext: 'Arts. 32 y 33 RGPD / Art. 73 LOPDGDD (España) / Resolución AAIP 47/2018 (Argentina) / NIST SP 800-53.',
          shortTermConsequence: 'El bot resiste las pruebas de penetración y neutraliza los intentos de jailbreak en tiempo real.',
          longTermImpact: 'Protege la propiedad intelectual de la empresa y genera confianza en los canales de atención digital.'
        }
      },
      {
        id: 'opt_6_b',
        title: 'Filtrado Superficial con Lista de Palabras Clave Prohibidas',
        description: 'Agregar una simple lista de 50 palabras prohibidas en el formulario de entrada del usuario.',
        rationale: 'Completamente inútil frente a técnicas de ingeniería de contexto o traducción de idiomas que cualquier usuario básico puede sortear.',
        scoreImpact: {
          compliance: -20,
          ethics: -15,
          efficiency: +4,
          dataQuality: -8,
          securityCompliance: -28,
          responsibleAI: -20,
          businessValue: -10
        },
        regulatoryNote: 'Incumplimiento de las medidas de seguridad razonables exigidas por el Art. 9 de la Ley 25.326.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Seguridad Ilusoria y Negligencia Técnica!',
          governancePrinciple: 'Deber de Adoptar Medidas Técnicas Adecuadas al Estado del Arte (Art. 9 Ley 25.326)',
          whyGoodOrBad: 'Pésima decisión. Los filtros de palabras clave son sorteados en segundos por atacantes usando sinónimos, codificación Base64 o roleplay. La base de datos sigue expuesta.',
          legalContext: 'Falta del deber de diligencia técnica conforme al estándar de la AAIP.',
          shortTermConsequence: 'Nueva filtración viral en redes sociales dentro de las 48 horas siguientes.',
          longTermImpact: 'Pérdida de credibilidad de la dirección de tecnología ante el Directorio.'
        }
      },
      {
        id: 'opt_6_c',
        title: 'Apagar el Asistente y Volver a Atención Telefónica 100% Humana',
        description: 'Eliminar el bot de WhatsApp y contratar 60 operadores telefónicos para responder las dudas manualmente.',
        rationale: 'Evita cualquier fuga por IA pero multiplica por diez los costos operativos y colapsa los tiempos de espera.',
        scoreImpact: {
          compliance: +8,
          ethics: +10,
          efficiency: -25,
          dataQuality: +5,
          securityCompliance: +15,
          responsibleAI: +5,
          businessValue: -24
        },
        regulatoryNote: 'Evita el incidente tecnológico pero destruye la viabilidad económica del canal.',
        feedback: {
          verdict: 'ACCEPTABLE',
          verdictTitle: 'Retirada Táctica Excesivamente Costosa',
          governancePrinciple: 'Balance entre Mitigación del Riesgo y Continuidad Operativa',
          whyGoodOrBad: 'Aceptable como medida de contención de 24 horas, pero insostenible como política permanente. El rol de la gobernanza es hacer posible la innovación segura, no clausurar los canales modernos.',
          legalContext: 'No genera sanciones, pero genera pérdidas financieras severas.',
          shortTermConsequence: 'Incremento desmedido del presupuesto de atención al cliente.',
          longTermImpact: 'Fracaso en la estrategia de transformación digital de la empresa.'
        }
      }
    ]
  },

  // --- ESCENARIO 7: CULTURA, ÉTICA Y VETO CORPORATIVO ---
  {
    id: 'dilemma_7',
    scenarioNumber: 7,
    phaseId: 7,
    phaseName: 'Misión 7: Cultura, Ética & Veto Corporativo',
    triggerTimeSec: 12,
    title: 'Poder de Veto del Comité de Ética y el DPO ante Lanzamientos Urgentes',
    category: 'Cultura & Ética',
    stakeholderConflict: 'Comité de Dirección (CEO & Director Comercial) vs. Oficial de Datos (DPO) & Comité Ético',
    description: 'La Dirección General quiere lanzar al mercado en 48 horas una función de perfilamiento algorítmico masivo para el CyberMonday. El Oficial de Protección de Datos (DPO) y el Comité de Ética emitieron un dictamen desfavorable por falta de evaluación de impacto (EIPD) y riesgos de fuga PII. El Director Comercial exige saltarse el veto para no perder la facturación estimada en $3.000.000 USD.',
    argentineLawRelevance: 'Principio de Responsabilidad Proactiva (Accountability), Estatutos de la AAIP e ISO/IEC 42001 (Sistemas de Gestión de IA).',
    spanishLawRelevance: 'Arts. 34 a 37 de la LOPDGDD (Obligación legal de contar con DPD comunicado a la AEPD e indemnidad legal ante sanciones por sus dictámenes), Arts. 37-39 RGPD y supervisión de sistemas de IA por la AESIA.',
    options: [
      {
        id: 'opt_7_a',
        title: 'Respetar el Veto del DPO, Realizar Sprint de Corrección Express de 72hs y Lanzar con Certificación',
        description: 'Respaldar la autoridad del DPD/DPO, convocar a un equipo conjunto de TI y Legal para mitigar los 3 riesgos críticos en 72 horas y lanzar una versión segura y certificada.',
        rationale: 'Consolida la autoridad de la gobernanza institucional como garante de la sustentabilidad del negocio a largo plazo.',
        scoreImpact: {
          compliance: +30,
          ethics: +32,
          efficiency: +22,
          dataQuality: +25,
          securityCompliance: +30,
          responsibleAI: +32,
          businessValue: +25
        },
        regulatoryNote: 'Máximo nivel de madurez institucional (Nivel 5), LOPDGDD, RGPD e ISO/IEC 42001.',
        feedback: {
          verdict: 'EXCELLENT',
          verdictTitle: '¡Liderazgo de Excelencia y Madurez Nivel 5!',
          governancePrinciple: 'Independencia y Autoridad del Delegado de Protección de Datos (Art. 36 LOPDGDD / RGPD 38)',
          whyGoodOrBad: 'Magistral. El artículo 36 de la LOPDGDD y el artículo 38 del RGPD garantizan explícitamente que el DPD no recibirá ninguna instrucción ni sanción por el ejercicio de sus funciones de advertencia. Canalizar el conflicto en un sprint ágil demuestra que gobernanza y negocio pueden trabajar juntos con éxito.',
          legalContext: 'Arts. 34-37 LOPDGDD / RGPD Arts. 37-39 (España/UE) / Marco ISO/IEC 42001 / Buenas Prácticas AAIP (Argentina).',
          shortTermConsequence: 'Se pierde el primer día de CyberMonday pero se factura el 85% con cero riesgo de multas.',
          longTermImpact: 'La cultura de la empresa queda blindada; los empleados saben que la ética y la ley no son negociables.'
        }
      },
      {
        id: 'opt_7_b',
        title: 'Ignorar el Veto y Despedir al DPO por "Poner Trabas al Crecimiento"',
        description: 'El CEO firma un decreto de excepción, despide al Oficial de Datos y lanza el producto sin salvaguardas.',
        rationale: 'Gobierno autocrático que viola la independencia funcional del DPO exigida por las regulaciones modernas.',
        scoreImpact: {
          compliance: -45,
          ethics: -40,
          efficiency: -20,
          dataQuality: -25,
          securityCompliance: -45,
          responsibleAI: -40,
          businessValue: -30
        },
        regulatoryNote: 'Violación del deber de indemnidad e independencia del DPO; causal de sanción agravada.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Catástrofe Corporativa y Ruptura Institucional!',
          governancePrinciple: 'Independencia del Oficial de Cumplimiento y Responsabilidad Penal del Directorio',
          whyGoodOrBad: 'La peor decisión posible. Despedir al funcionario que advirtió el riesgo ilícito constituye dolo directo. En caso de filtración o sanción, los directores responden ilimitada y solidariamente con su patrimonio personal.',
          legalContext: 'Ley 19.550 de Sociedades Comerciales (Responsabilidad de los administradores) y Ley 25.326.',
          shortTermConsequence: 'Lanzamiento caótico con errores masivos en producción.',
          longTermImpact: 'Denuncia del ex-DPO ante la AAIP y la justicia laboral, renuncia en masa del equipo técnico y derrumbe del valor de las acciones.'
        }
      },
      {
        id: 'opt_7_c',
        title: 'Lanzar con una Cláusula de "Beta de Prueba" para Evasión Regulatoria',
        description: 'Lanzar el producto etiquetándolo como "Versión Beta Experimental" creyendo que eso exime de cumplir la ley.',
        rationale: 'Falsa creencia popular en tecnología: la ley aplica a cualquier producto en producción sin importar la etiqueta de Beta.',
        scoreImpact: {
          compliance: -25,
          ethics: -20,
          efficiency: +5,
          dataQuality: -12,
          securityCompliance: -20,
          responsibleAI: -22,
          businessValue: -10
        },
        regulatoryNote: 'El carácter de "Beta" no suspende la aplicación de la Ley 25.326 ni del EU AI Act.',
        feedback: {
          verdict: 'CRITICAL_RISK',
          verdictTitle: '¡Falsa Exención Legal y Desvío de Poder!',
          governancePrinciple: 'Principio de Realidad Económica y Primacía de la Ley',
          whyGoodOrBad: 'Mala decisión. En el derecho administrativo sancionador, la etiqueta "Beta" es irrelevante cuando se están procesando datos de usuarios reales en un entorno productivo. La sanción se aplica con la misma severidad.',
          legalContext: 'Doctrina de los actos propios y jurisprudencia federal sobre bancos de datos personales.',
          shortTermConsequence: 'Confusión en los clientes sobre la estabilidad del servicio.',
          longTermImpact: 'La empresa pierde credibilidad jurídica ante inversores y auditores externos.'
        }
      }
    ]
  }
];

export const MATURITY_LEVELS: MaturityLevelInfo[] = [
  {
    level: 1,
    name: 'Nivel 1: Inicial / Caótico',
    shortDesc: 'Gobernanza inexistente o reactiva. Alto riesgo operativo, multas inminentes bajo Ley 25.326, LOPDGDD y RGPD.',
    fullDiagnosis: 'La empresa opera en zona de peligro legal y técnico crítico. Los datos se transfieren a terceros sin consentimiento informado, los algoritmos operan como cajas negras con sesgos no detectados y no existen salvaguardas frente a transferencias internacionales. El riesgo de multas punitivas de la AEPD (hasta 20 millones de euros / 4% global) y de la AAIP es inminente.',
    recommendations: [
      'Formalizar el Registro de Actividades de Tratamiento (RAT) bajo el Art. 31 LOPDGDD / Art. 30 RGPD y registrar bases ante la AAIP (Ley 25.326).',
      'Designar formalmente un Delegado de Protección de Datos (DPD / DPO) comunicado ante la AEPD (Art. 34 LOPDGDD) con independencia funcional.',
      'Desplegar un AI Gateway centralizado con enmascaramiento de datos personales (PII) antes de cualquier llamada a LLMs.',
      'Establecer protocolos de consentimiento previo, libre, granular e informado en todos los formularios de clientes.'
    ],
    color: '#EF4444'
  },
  {
    level: 2,
    name: 'Nivel 2: Emergente / En Silos',
    shortDesc: 'Iniciativas aisladas en áreas técnicas sin estándar corporativo unificado.',
    fullDiagnosis: 'Existen buenas intenciones en equipos individuales pero no existe una política corporativa de gobernanza. Algunas áreas cuidan la privacidad mientras que otras incurren en Shadow AI y copias huérfanas de datos. Se carece de un marco metodológico para auditar sesgos algorítmicos.',
    recommendations: [
      'Construir un Catálogo Corporativo de Datos con glosario semántico de métricas clave (DAMA DMBOK).',
      'Adoptar la Res. 161/2023 (Guía de IA Responsable) de Argentina, las Guías de la AEPD y el marco de gobernanza ISO 42001.',
      'Formalizar contratos con Cláusulas Contractuales Tipo (SCC de la UE / CCT de la AAIP) para cualquier transferencia internacional.',
      'Crear un Comité Consultivo de Gobernanza con representación técnica, legal y de negocio.'
    ],
    color: '#F97316'
  },
  {
    level: 3,
    name: 'Nivel 3: Definido / Institucionalizado',
    shortDesc: 'Políticas estandarizadas, catálogo funcional y comités activos con procedimientos formales.',
    fullDiagnosis: 'La empresa cuenta con un marco integral de gobernanza documentado y comprendido por la dirección. Los datos tienen linaje identificable, los modelos de IA de alto riesgo cuentan con fichas técnicas (Model Cards) y se respeta el ejercicio de derechos ARCO-POL dentro de los plazos legales.',
    recommendations: [
      'Realizar Evaluaciones de Impacto en la Protección de Datos (EIPD / PIA) obligatorias para IA de alto riesgo (Art. 35 RGPD / AEPD).',
      'Evolucionar hacia MLOps continuo: telemetría en tiempo real de deriva conceptual (Concept Drift) y degradación de modelos.',
      'Dotar al Comité de Ética de IA y al DPD de facultades de veto vinculantes con procesos de arbitraje ágiles.',
      'Implementar guardrails semánticos duales (NeMo Guardrails) contra inyecciones de prompts en agentes conversacionales.'
    ],
    color: '#FBBF24'
  },
  {
    level: 4,
    name: 'Nivel 4: Gestionado Cuantitativamente',
    shortDesc: 'Telemetría continua, MLOps maduro, métricas de calidad y auditorías predictivas.',
    fullDiagnosis: 'Organización madura y resiliente. Los pipelines de datos e IA están instrumentados con telemetría en tiempo real. Se miden activamente KPIs de sesgo, paridad demográfica y seguridad perimetral. La gobernanza está integrada en el ciclo CI/CD de desarrollo (Governance by Design).',
    recommendations: [
      'Preparar la organización para la certificación formal bajo la norma internacional ISO/IEC 42001 (AIMS).',
      'Protocolos de notificación de brechas en menos de 72 horas ante la AEPD (Art. 33 RGPD) y remediación automatizada.',
      'Implementar pruebas continuas de Red Teaming y ciberdefensa adversarial en todos los modelos de IA generativa.',
      'Auditar rigurosamente la cadena de suministro de software de proveedores externos de IA.'
    ],
    color: '#34D399'
  },
  {
    level: 5,
    name: 'Nivel 5: Optimizado / Líder de Industria',
    shortDesc: 'Gobernanza ágil adaptativa, ventaja competitiva comprobable y confianza ética total.',
    fullDiagnosis: 'Nivel de excelencia y referencia regional e internacional. La gobernanza de datos e IA no se percibe como una barrera, sino como el principal catalizador de innovación segura, reputación corporativa y atracción de inversiones. La compañía es pionera en el cumplimiento proactivo de la Ley 25.326, la LOPDGDD española, el RGPD y los sandboxes de la AESIA.',
    recommendations: [
      'Publicar informes periódicos de Transparencia Algorítmica y contribuir a estándares abiertos de la comunidad técnica.',
      'Participar en los espacios controlados de pruebas (Sandboxes Regulatorios) de la AESIA en España y foros de la AAIP.',
      'Desarrollar arquitecturas autónomas de auto-recuperación y mitigación de sesgos en agentes federados.',
      'Mantener la excelencia en la formación y desarrollo ético continuo del talento humano.'
    ],
    color: '#38BDF8'
  }
];

export function calculateMaturityLevel(scores: {
  compliance: number;
  ethics: number;
  efficiency: number;
}): MaturityLevelInfo {
  // Balanced average across the 3 Master Dimensions
  const average = (scores.compliance + scores.ethics + scores.efficiency) / 3;

  if (average < 35 || scores.compliance < 25) {
    return MATURITY_LEVELS[0]; // Nivel 1
  } else if (average < 55) {
    return MATURITY_LEVELS[1]; // Nivel 2
  } else if (average < 75) {
    return MATURITY_LEVELS[2]; // Nivel 3
  } else if (average < 88) {
    return MATURITY_LEVELS[3]; // Nivel 4
  } else {
    return MATURITY_LEVELS[4]; // Nivel 5
  }
}
