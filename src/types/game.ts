export type GameState = 'TITLE' | 'PLAYING' | 'DECISION' | 'FEEDBACK' | 'SELF_ASSESSMENT' | 'PAUSED' | 'SUMMARY' | 'PROFILES' | 'DOWNLOAD_GUIDE';

export interface GovernanceScores {
  // 3 Master Dimensions
  compliance: number; // 0 - 100 (Cumplimiento: Ley 25.326 Argentina, GDPR, EU AI Act)
  ethics: number; // 0 - 100 (Ética, No-Sesgo, Transparencia, Supervisión Humana)
  efficiency: number; // 0 - 100 (Eficiencia, Calidad DAMA DMBOK, MLOps, ROI)

  // Granular Operational Pillars
  dataQuality: number; // 0 - 100
  securityCompliance: number; // 0 - 100
  responsibleAI: number; // 0 - 100
  businessValue: number; // 0 - 100
}

export type PillarKey = keyof GovernanceScores;

export interface CompanyProfile {
  sector: string;
  size: string;
  startingMaturity: string;
}

export interface DecisionFeedback {
  verdict: 'EXCELLENT' | 'ACCEPTABLE' | 'CRITICAL_RISK';
  verdictTitle: string;
  governancePrinciple: string;
  whyGoodOrBad: string;
  legalContext: string;
  shortTermConsequence: string;
  longTermImpact: string;
}

export interface DecisionOption {
  id: string;
  title: string;
  description: string;
  rationale: string;
  scoreImpact: {
    compliance: number;
    ethics: number;
    efficiency: number;
    dataQuality: number;
    securityCompliance: number;
    responsibleAI: number;
    businessValue: number;
  };
  feedback: DecisionFeedback;
  regulatoryNote: string;
}

export interface GovernanceDilemma {
  id: string;
  scenarioNumber: number;
  phaseId: number;
  phaseName: string;
  triggerTimeSec: number;
  title: string;
  category: 'Privacidad & Ley 25.326' | 'Sesgo de IA' | 'Seguridad de Datos' | 'Datos Sensibles & Biometría' | 'MLOps & Deriva' | 'Shadow AI & Inyección' | 'Cultura & Ética';
  stakeholderConflict: string;
  description: string;
  argentineLawRelevance: string;
  spanishLawRelevance?: string;
  options: DecisionOption[];
}

export interface DecisionHistoryEntry {
  scenarioNumber: number;
  phase: string;
  dilemmaId: string;
  title: string;
  selectedOptionId: string;
  selectedOptionTitle: string;
  verdict: 'EXCELLENT' | 'ACCEPTABLE' | 'CRITICAL_RISK';
  feedback: DecisionFeedback;
  impact: {
    compliance: number;
    ethics: number;
    efficiency: number;
  };
  regulatoryNote: string;
}

export interface MaturityLevelInfo {
  level: number;
  name: string;
  shortDesc: string;
  fullDiagnosis: string;
  recommendations: string[];
  color: string;
}

export interface GameRunRecord {
  id: string;
  date: string;
  finalScore: number;
  maturityLevel: number;
  maturityName: string;
  scores: {
    compliance: number;
    ethics: number;
    efficiency: number;
  };
  detailedScores: GovernanceScores;
  decisions: DecisionHistoryEntry[];
  topStrength: string;
  topImprovementArea: string;
}

export interface PlayerProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  createdAt: string;
  avatar: string;
  gamesPlayed: number;
  highScore: number;
  avgCompliance: number;
  avgEthics: number;
  avgEfficiency: number;
  badges: string[];
  history: GameRunRecord[];
}

export interface GameAnomaly {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'data_leak' | 'model_drift' | 'hallucination' | 'shadow_ai';
  label: string;
  hp: number;
  maxHp: number;
  targetNodeIndex: number;
  pulseTimer: number;
  threatLevel: number;
}

export interface TopologyNode {
  id: string;
  name: string;
  quadrant: 'quality' | 'security' | 'ai' | 'business';
  x: number;
  y: number;
  radius: number;
  health: number;
  pulse: number;
}
