export interface SelfAssessmentQuestion {
  id: string;
  category: string;
  question: string;
  description: string;
  legalReference: string;
  options: {
    text: string;
    score: number; // 0, 50, 100
    status: 'OPTIMAL' | 'MEDIUM_RISK' | 'CRITICAL_RISK';
    feedback: string;
  }[];
}

export const SELF_ASSESSMENT_QUESTIONS: SelfAssessmentQuestion[] = [
  {
    id: 'sa_1',
    category: 'Registro y Legalidad',
    question: '1. ¿Tiene tu empresa inventariadas sus actividades de tratamiento y registradas sus bases (RAT / AEPD / AAIP)?',
    description: 'Bajo la LOPDGDD y el RGPD en España es obligatorio mantener el Registro de Actividades de Tratamiento (RAT, Art. 31 LOPDGDD / Art. 30 RGPD), y en Argentina inscribir las bases en el Registro Nacional de la AAIP (Art. 21 Ley 25.326).',
    legalReference: 'Art. 31 LOPDGDD y Art. 30 RGPD (España/UE - RAT obligatorio) / Ley 25.326 Art. 21 (Argentina - Registro AAIP).',
    options: [
      {
        text: 'Sí, contamos con Registro de Actividades (RAT) actualizado conforme a la AEPD y bases inscriptas ante la AAIP.',
        score: 100,
        status: 'OPTIMAL',
        feedback: '¡Excelente! Cumples con la obligación legal básica de transparencia, trazabilidad y registro público tanto en España como en Argentina.'
      },
      {
        text: 'En proceso de trámite o solo algunas bases / tratamientos están inventariados.',
        score: 50,
        status: 'MEDIUM_RISK',
        feedback: 'Riesgo medio. No disponer del RAT actualizado expone a la empresa a sanciones formales de la AEPD (infracción grave bajo LOPDGDD) y de la AAIP.'
      },
      {
        text: 'No lo sabíamos o nunca registramos ni inventariamos ninguna base de datos.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: '¡Alerta Crítica! Tratar datos sin base legal ni registro es una infracción sancionada con multas severas por la AEPD y la AAIP.'
      }
    ]
  },
  {
    id: 'sa_2',
    category: 'Estructura y Roles',
    question: '2. ¿Existe en la empresa un Delegado de Protección de Datos (DPD / DPO) formalmente designado?',
    description: 'El DPD es una figura obligatoria en España para multitud de sectores (Art. 34 LOPDGDD) y debe ser comunicado formalmente ante la AEPD, garantizando su independencia funcional.',
    legalReference: 'Arts. 34 a 37 LOPDGDD y Arts. 37-39 RGPD (España/UE) / Principios de Responsabilidad Proactiva (Accountability).',
    options: [
      {
        text: 'Sí, contamos con un DPD designado, comunicado a la AEPD (o DPO de referencia) con facultades de supervisión independientes.',
        score: 100,
        status: 'OPTIMAL',
        feedback: 'Muy bien. La organización cuenta con liderazgo especializado para anticipar contingencias y velar por el cumplimiento proactivo.'
      },
      {
        text: 'Se encarga informalmente el área de Sistemas o Legales cuando hay tiempo, sin notificación oficial.',
        score: 50,
        status: 'MEDIUM_RISK',
        feedback: 'Riesgo moderado. Si la empresa pertenece a los supuestos del Art. 34 LOPDGDD (ej. banca, solvencia, salud, seguros), no comunicar el DPD a la AEPD constituye infracción grave.'
      },
      {
        text: 'Nadie tiene asignada esta responsabilidad; cada área hace lo que cree conveniente.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: 'Riesgo alto de silos, fugas de datos y Shadow IT sin supervisión centralizada ni gobierno institucional.'
      }
    ]
  },
  {
    id: 'sa_3',
    category: 'Uso de Inteligencia Artificial',
    question: '3. ¿Tienen una política corporativa que regule el uso de ChatGPT y LLMs por los empleados?',
    description: 'El uso no regulado de herramientas de IA generativa suele filtrar secretos comerciales o PII de clientes hacia servidores extranjeros.',
    legalReference: 'Guías sobre Inteligencia Artificial de la AEPD (España), Res. 161/2023 Guía de IA Responsable (Argentina) y Deber de Seguridad (Art. 32 RGPD / Art. 9 Ley 25.326).',
    options: [
      {
        text: 'Sí, existe una política formal, herramientas homologadas y gateway con enmascaramiento de datos sensibles.',
        score: 100,
        status: 'OPTIMAL',
        feedback: 'Impecable. Permites a tu equipo ser productivo sin exponer información confidencial ni violar las guías de la AEPD y la AAIP.'
      },
      {
        text: 'Se prohibió de palabra pero no hay controles técnicos ni directivas escritas.',
        score: 40,
        status: 'MEDIUM_RISK',
        feedback: 'La prohibición verbal genera Shadow IT: los empleados lo usan en secreto en sus teléfonos personales sin ninguna salvaguarda.'
      },
      {
        text: 'No hay ninguna regla; cada empleado copia y pega lo que necesita libremente.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: '¡Peligro inminente! Podrías estar enviando datos bancarios, salarios y contratos a servidores extranjeros sin saberlo, con riesgo de multas del RGPD.'
      }
    ]
  },
  {
    id: 'sa_4',
    category: 'Consentimiento y Finalidad',
    question: '4. ¿Obtienen consentimiento previo, granular, expreso e informado antes de recopilar datos?',
    description: 'El consentimiento no puede ser tácito ni deducido de casillas premarcadas. En España y la UE (Art. 6 LOPDGDD / RGPD) y en Argentina (Art. 5 Ley 25.326) se exige manifestación inequívoca.',
    legalReference: 'Art. 6 LOPDGDD y Arts. 6-7 RGPD (España/UE) / Ley 25.326 Art. 5 (Argentina).',
    options: [
      {
        text: 'Sí, mediante casillas desmarcadas por defecto explicando finalidades granulares para cada tratamiento.',
        score: 100,
        status: 'OPTIMAL',
        feedback: 'Alineado 100% con los criterios de la AEPD, el RGPD y la AAIP: consentimiento libre, informado, granular y demostrable.'
      },
      {
        text: 'Usamos cláusulas genéricas de T&C tipo "para mejorar la experiencia y otros fines comerciales" o casillas preactivadas.',
        score: 40,
        status: 'MEDIUM_RISK',
        feedback: 'Las cláusulas genéricas y casillas pre-marcadas son nulas de pleno derecho según la doctrina unánime de la AEPD y la AAIP.'
      },
      {
        text: 'Recopilamos datos de redes sociales o bases compradas sin pedir permiso.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: 'Infracción muy grave. Comprar bases de datos o hacer web scraping de datos personales sin consentimiento es sancionado con multas millonarias.'
      }
    ]
  },
  {
    id: 'sa_5',
    category: 'Transferencia Internacional',
    question: '5. ¿Saben en qué países están alojados los servidores y si se cumplen las normas de Transferencia Internacional?',
    description: 'Tanto el RGPD (Capítulo V) como la Ley 25.326 (Art. 12) prohíben transferir datos a jurisdicciones sin nivel adecuado de protección sin Cláusulas Contractuales Tipo (SCC).',
    legalReference: 'Capítulo V RGPD (Arts. 44 a 49) y Art. 72 LOPDGDD (España/UE) / Ley 25.326 Art. 12 y Res. AAIP 198/2023 (Argentina).',
    options: [
      {
        text: 'Sí, mapeamos los datacenters y firmamos Cláusulas Contractuales Tipo (SCC de la UE / CCT de la AAIP) con proveedores internacionales.',
        score: 100,
        status: 'OPTIMAL',
        feedback: 'Gobernanza internacional madura. Cumples con el estándar exigido por la AEPD y la AAIP, evitando transferencias ilícitas.'
      },
      {
        text: 'Sabemos que están en la nube (AWS/Azure/Google) pero nunca revisamos el acuerdo DPA ni las transferencias secundarias.',
        score: 50,
        status: 'MEDIUM_RISK',
        feedback: 'Riesgo formal. Es imprescindible verificar que los acuerdos de procesamiento de datos incluyan las salvaguardas exigidas por el RGPD y la AAIP.'
      },
      {
        text: 'No tenemos idea de dónde están los servidores ni quién tiene acceso físico a ellos.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: 'Falla total del deber de custodia y seguridad de la información (Art. 32 RGPD / Art. 9 Ley 25.326).'
      }
    ]
  },
  {
    id: 'sa_6',
    category: 'Explicabilidad y Derechos ARCO',
    question: '6. ¿Tienen un proceso ágil para atender el ejercicio de derechos ARCO-POL (Acceso, Rectificación, Supresión)?',
    description: 'En España y la UE el plazo legal perentorio para responder es de 1 mes (Arts. 12-18 LOPDGDD y RGPD), y en Argentina 10 días para acceso y 5 días hábiles para rectificar (Ley 25.326).',
    legalReference: 'Título III LOPDGDD y Arts. 15-22 RGPD (España/UE) / Ley 25.326 Arts. 14 y 16 (Argentina).',
    options: [
      {
        text: 'Sí, canal oficial documentado que responde y ejecuta rectificaciones o supresiones dentro del plazo legal.',
        score: 100,
        status: 'OPTIMAL',
        feedback: 'Cumples con los plazos perentorios, desactivando reclamaciones sancionadoras ante la AEPD y demandas de Habeas Data ante la AAIP.'
      },
      {
        text: 'Se responde cuando el área de legales o soporte lo detecta en el correo general, sin trazabilidad ni plazo medido.',
        score: 40,
        status: 'MEDIUM_RISK',
        feedback: 'Superar los plazos legales habilita al ciudadano a interponer una reclamación de tutela de derechos ante la AEPD o la AAIP.'
      },
      {
        text: 'No tenemos un proceso; solemos ignorar o derivar esos correos.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: '¡Riesgo directo de sanción! La falta de atención a los derechos ARCO es una de las principales causas de multas impuestas por la AEPD.'
      }
    ]
  },
  {
    id: 'sa_7',
    category: 'Ética y Sesgo de Modelos',
    question: '7. Si la empresa utiliza IA o analítica para tomar decisiones sobre personas (créditos, selección, precios): ¿auditan sesgos y supervisión humana?',
    description: 'Los algoritmos de scoring o filtrado laboral están catalogados como de Alto Riesgo en el EU AI Act (supervisados por la AESIA en España) y bajo la Guía de IA de la AAIP.',
    legalReference: 'EU AI Act y AESIA (Agencia Española de Supervisión de la IA), Art. 22 RGPD, Art. 88 LOPDGDD y Guía de IA de la AAIP.',
    options: [
      {
        text: 'Sí, medimos paridad demográfica, realizamos EIPD previa y siempre interviene un evaluador humano (Human-in-the-Loop).',
        score: 100,
        status: 'OPTIMAL',
        feedback: 'Excelente estándar de IA Responsable alineado con los requisitos del EU AI Act, la AESIA en España y la AAIP en Argentina.'
      },
      {
        text: 'Asumimos que el modelo es objetivo porque "son matemáticas", sin auditar sesgos ocultos ni evaluar impacto.',
        score: 40,
        status: 'MEDIUM_RISK',
        feedback: 'Falsa creencia común. Los modelos suelen amplificar sesgos humanos históricos si no se monitorean activamente.'
      },
      {
        text: 'Usamos software de caja negra de proveedores externos sin exigir explicabilidad ni evaluar el impacto algorítmico.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: 'La empresa es legalmente responsable de las decisiones discriminatorias de sus proveedores de software bajo el RGPD y el EU AI Act.'
      }
    ]
  },
  {
    id: 'sa_8',
    category: 'Estándares Internacionales e ISO',
    question: '8. ¿Cuenta la empresa con un Sistema de Gestión de IA estructurado bajo ISO/IEC 42001 (AIMS) o ISO/IEC 27001?',
    description: 'La norma ISO/IEC 42001 es el primer estándar internacional certificable para la gestión responsable, ética y de riesgos de la IA en organizaciones, complementando la seguridad de ISO/IEC 27001 e ISO 27701.',
    legalReference: 'Norma Internacional ISO/IEC 42001:2023 (AIMS) / ISO/IEC 27001:2022 (SGSI) / ISO/IEC 27701 (Privacidad).',
    options: [
      {
        text: 'Sí, operamos bajo un Sistema de Gestión de IA (SGIA) alineado o certificado en ISO/IEC 42001 e ISO 27001 con comités interdisciplinarios.',
        score: 100,
        status: 'OPTIMAL',
        feedback: 'Nivel Máximo (Líder en Gobernanza). La certificación o adopción de ISO/IEC 42001 garantiza trazabilidad continua, mitigación de riesgos y ventaja competitiva global.'
      },
      {
        text: 'Tenemos controles de seguridad tradicionales (ISO 27001 o SOC 2) pero ningún proceso adaptado específicamente al ciclo de vida de modelos de IA.',
        score: 50,
        status: 'MEDIUM_RISK',
        feedback: 'Buena base de ciberseguridad, pero la IA introduce riesgos únicos (alucinaciones, envenenamiento de datos, deriva de conceptos y sesgos) no cubiertos por la seguridad tradicional.'
      },
      {
        text: 'No aplicamos ningún marco de gestión ni certificación internacional estándar.',
        score: 0,
        status: 'CRITICAL_RISK',
        feedback: 'Ausencia total de marco rector formal, lo que dificulta la homologación con clientes corporativos internacionales y licitaciones públicas.'
      }
    ]
  }
];

export interface MatrixCheckItem {
  id: string;
  pillarId: 'gobernanza' | 'cultura' | 'implementacion' | 'etica';
  text: string;
  guide: string;
  legalAnchor: string;
}

export interface MatrixPillar {
  id: 'gobernanza' | 'cultura' | 'implementacion' | 'etica';
  title: string;
  subtitle: string;
  tagline: string;
  colorScheme: {
    border: string;
    headerText: string;
    badgeBg: string;
    checkboxActive: string;
    glow: string;
  };
  items: MatrixCheckItem[];
}

export const MATRIX_PILLARS: MatrixPillar[] = [
  {
    id: 'gobernanza',
    title: 'GOBERNANZA',
    subtitle: 'Estructura, Políticas & Responsabilidad',
    tagline: 'Asegura que el uso de IA responda a directivas institucionales claras con supervisión auditable.',
    colorScheme: {
      border: 'border-sky-500/40 hover:border-sky-400',
      headerText: 'text-sky-400',
      badgeBg: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
      checkboxActive: 'bg-sky-500 border-sky-400 text-white',
      glow: 'shadow-sky-500/20'
    },
    items: [
      {
        id: 'gob_1',
        pillarId: 'gobernanza',
        text: '¿Cada decisión asistida o automatizada tiene un responsable claro?',
        guide: 'Principio de Accountability: debe existir un rol o persona concreta que responda por el resultado del modelo.',
        legalAnchor: 'Ley 25.326 (AAIP Argentina) / Art. 5.2 & 22 RGPD / Art. 14 EU AI Act'
      },
      {
        id: 'gob_2',
        pillarId: 'gobernanza',
        text: '¿Existe una política de uso de IA (qué se puede, para qué, qué se valida)?',
        guide: 'Directiva corporativa formal que define herramientas homologadas, casos prohibidos y filtros de validación de datos.',
        legalAnchor: 'Res. 161/2023 Guía de IA Responsable (Argentina) / Guías de IA de la AEPD / ISO/IEC 42001 (Cláusula 5.2)'
      },
      {
        id: 'gob_3',
        pillarId: 'gobernanza',
        text: '¿Clasificaste el riesgo de cada caso de uso antes de implementar?',
        guide: 'Evaluación previa del impacto (Inaceptable, Alto, Limitado o Mínimo) y evaluación de impacto en derechos.',
        legalAnchor: 'Clasificación de Riesgos EU AI Act (AESIA) / EIPD LOPDGDD y Ley 25.326'
      }
    ]
  },
  {
    id: 'cultura',
    title: 'CULTURA',
    subtitle: 'Alfabetización, Transparencia & Liderazgo',
    tagline: 'Fomenta el pensamiento crítico y canales abiertos para evitar el sesgo por automatización y el Shadow AI.',
    colorScheme: {
      border: 'border-indigo-500/40 hover:border-indigo-400',
      headerText: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
      checkboxActive: 'bg-indigo-500 border-indigo-400 text-white',
      glow: 'shadow-indigo-500/20'
    },
    items: [
      {
        id: 'cul_1',
        pillarId: 'cultura',
        text: '¿Tu equipo sabe cuestionar resultados, validar fuentes y contextualizar respuestas?',
        guide: 'Alfabetización en IA (AI Literacy): los colaboradores comprenden alucinaciones, sesgos y no aceptan salidas ciegamente.',
        legalAnchor: 'Capacitación Obligatoria en IA Art. 4 EU AI Act / Recomendaciones AAIP'
      },
      {
        id: 'cul_2',
        pillarId: 'cultura',
        text: '¿Existe un canal para reportar shadow AI o usos no autorizados?',
        guide: 'Vía abierta, confidencial y sin represalias para que los equipos reporten herramientas de IA que necesitan usar.',
        legalAnchor: 'Deber de Seguridad Art. 9 Ley 25.326 / Art. 32 RGPD / ISO/IEC 27001'
      },
      {
        id: 'cul_3',
        pillarId: 'cultura',
        text: '¿El liderazgo supervisa de cerca sin desconfianza ni sin control excesivo?',
        guide: 'Gobernanza facilitadora: acompañamiento estratégico basado en riesgos, sin parálisis ni delegación ciega.',
        legalAnchor: 'Compromiso de la Dirección ISO/IEC 42001 (Cláusula 5) & Ética Corporativa'
      }
    ]
  },
  {
    id: 'implementacion',
    title: 'IMPLEMENTACIÓN',
    subtitle: 'Valor Real, Pilotos Validados & Madurez',
    tagline: 'Garantiza que la IA resuelva necesidades reales de negocio sobre procesos estables, evitando el hype.',
    colorScheme: {
      border: 'border-teal-500/40 hover:border-teal-400',
      headerText: 'text-teal-400',
      badgeBg: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
      checkboxActive: 'bg-teal-500 border-teal-400 text-white',
      glow: 'shadow-teal-500/20'
    },
    items: [
      {
        id: 'imp_1',
        pillarId: 'implementacion',
        text: '¿Tenés un beneficio documentado antes de medir el ROI?',
        guide: 'Definición cuantitativa y cualitativa del valor aportado a usuarios y operaciones antes del cálculo financiero.',
        legalAnchor: 'Metodología DAMA DMBOK / Criterios de Eficiencia Operativa'
      },
      {
        id: 'imp_2',
        pillarId: 'implementacion',
        text: '¿Escalás solo con evidencia de un piloto validado, nunca por entusiasmo?',
        guide: 'Despliegue gradual por fases en entornos de prueba controlados con métricas objetivas de precisión y seguridad.',
        legalAnchor: 'Sandboxes Regulatorios AESIA / Protocolos de Validación ISO/IEC 42001'
      },
      {
        id: 'imp_3',
        pillarId: 'implementacion',
        text: '¿El proceso actual es lo bastante maduro para automatizar?',
        guide: 'Los procesos caóticos o desestructurados empeoran al añadir IA; se requiere estandarización previa.',
        legalAnchor: 'Gestión de Calidad ISO 9001 & Madurez de Procesos CMMI'
      }
    ]
  },
  {
    id: 'etica',
    title: 'ÉTICA',
    subtitle: 'Sesgos, Supervisión Humana & Sostenibilidad',
    tagline: 'Protege los derechos de las personas mediante control de sesgos algorítmicos y supervisión humana continua.',
    colorScheme: {
      border: 'border-amber-500/40 hover:border-amber-400',
      headerText: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      checkboxActive: 'bg-amber-500 border-amber-400 text-white',
      glow: 'shadow-amber-500/20'
    },
    items: [
      {
        id: 'eti_1',
        pillarId: 'etica',
        text: '¿Revisaste los sesgos posibles de datos, selección, contexto y objetivo?',
        guide: 'Auditoría exhaustiva de muestras de entrenamiento para evitar discriminación histórica, de género o económica.',
        legalAnchor: 'No Discriminación Art. 10 EU AI Act / Principio de Calidad Ley 25.326'
      },
      {
        id: 'eti_2',
        pillarId: 'etica',
        text: '¿Toda decisión crítica tiene revisión humana obligatoria?',
        guide: 'Human-in-the-Loop irrestricto: un profesional capacitado puede revocar o corregir la recomendación del algoritmo.',
        legalAnchor: 'Art. 14 EU AI Act / Art. 22 RGPD / Habeas Data Ley 25.326'
      },
      {
        id: 'eti_3',
        pillarId: 'etica',
        text: '¿Te hiciste la pregunta correcta: "Estamos listos para sostenerlo"?',
        guide: 'Evaluación del costo de mantenimiento continuo, telemetría, ciberseguridad y actualización ética a largo plazo.',
        legalAnchor: 'Sostenibilidad Operativa ISO/IEC 42001 & MLOps Lifecycle'
      }
    ]
  }
];


