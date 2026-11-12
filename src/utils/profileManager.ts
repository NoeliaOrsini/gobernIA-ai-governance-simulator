import { PlayerProfile, GameRunRecord, GovernanceScores, DecisionHistoryEntry } from '../types/game';

const PROFILES_STORAGE_KEY = 'gobernia_player_profiles_v1';
const ACTIVE_PROFILE_KEY = 'gobernia_active_profile_id_v1';

export const DEFAULT_AVATARS = [
  '🛡️', '⚖️', '📊', '🤖', '💼', '🔍', '🚀', '🇦🇷'
];

export const AVAILABLE_ROLES = [
  'Data Protection Officer (DPO)',
  'Chief Data & AI Officer (CDAIO)',
  'Auditor de Riesgos & Compliance',
  'Líder Técnico de IA & MLOps',
  'Data Steward & Calidad del Dato',
  'Director de Transformación Digital',
  'Consultor Legal de Tecnología'
];

export function getStoredProfiles(): PlayerProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (!raw) {
      // Create initial demo profile
      const defaultProfile: PlayerProfile = {
        id: 'prof_default',
        name: 'Oficial de Gobernanza',
        role: 'Data Protection Officer (DPO)',
        company: 'Empresa Innovadora',
        createdAt: new Date().toISOString(),
        avatar: '🛡️',
        gamesPlayed: 0,
        highScore: 0,
        avgCompliance: 0,
        avgEthics: 0,
        avgEfficiency: 0,
        badges: [],
        history: []
      };
      saveProfiles([defaultProfile]);
      setActiveProfileId(defaultProfile.id);
      return [defaultProfile];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading profiles from localStorage', err);
    return [];
  }
}

export function saveProfiles(profiles: PlayerProfile[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Error saving profiles to localStorage', err);
  }
}

export function getActiveProfile(): PlayerProfile {
  const profiles = getStoredProfiles();
  const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
  const found = profiles.find((p) => p.id === activeId);
  return found || profiles[0];
}

export function setActiveProfileId(id: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

export function createProfile(data: { name: string; role: string; company: string; avatar: string }): PlayerProfile {
  const profiles = getStoredProfiles();
  const newProfile: PlayerProfile = {
    id: `prof_${Date.now()}`,
    name: data.name.trim() || 'Nuevo Jugador',
    role: data.role || AVAILABLE_ROLES[0],
    company: data.company.trim() || 'Organización',
    createdAt: new Date().toISOString(),
    avatar: data.avatar || '🛡️',
    gamesPlayed: 0,
    highScore: 0,
    avgCompliance: 0,
    avgEthics: 0,
    avgEfficiency: 0,
    badges: ['Novato en Gobernanza'],
    history: []
  };

  profiles.push(newProfile);
  saveProfiles(profiles);
  setActiveProfileId(newProfile.id);
  return newProfile;
}

export function recordGameRun(
  profileId: string,
  scores: GovernanceScores,
  maturityLevel: number,
  maturityName: string,
  decisions: DecisionHistoryEntry[]
): PlayerProfile {
  const profiles = getStoredProfiles();
  const profileIndex = profiles.findIndex((p) => p.id === profileId);
  if (profileIndex === -1) return profiles[0];

  const profile = profiles[profileIndex];

  // Overall Score (0-100): Balanced average
  const finalScore = Math.round((scores.compliance + scores.ethics + scores.efficiency) / 3);

  // Analyze top strength and top improvement area from decisions
  let excellentCount = 0;
  let criticalCount = 0;
  let complianceDeltas = 0;
  let ethicsDeltas = 0;
  let efficiencyDeltas = 0;

  decisions.forEach((d) => {
    if (d.verdict === 'EXCELLENT') excellentCount++;
    if (d.verdict === 'CRITICAL_RISK') criticalCount++;
    complianceDeltas += d.impact.compliance;
    ethicsDeltas += d.impact.ethics;
    efficiencyDeltas += d.impact.efficiency;
  });

  let topStrength = 'Equilibrio general en la toma de decisiones';
  if (complianceDeltas >= ethicsDeltas && complianceDeltas >= efficiencyDeltas) {
    topStrength = 'Rigurosidad en Cumplimiento Normativo (Ley 25.326 y GDPR)';
  } else if (ethicsDeltas >= complianceDeltas && ethicsDeltas >= efficiencyDeltas) {
    topStrength = 'Compromiso Ético, Paridad y Mitigación de Sesgos';
  } else {
    topStrength = 'Visión de Eficiencia Operativa y Agilidad de Datos';
  }

  let topImprovementArea = 'Continuar perfeccionando la supervisión continua';
  if (scores.compliance < 60) {
    topImprovementArea = 'Riesgo Regulatorio: Profundizar consentimiento y transferencias internacionales (Ley 25.326 Art. 12)';
  } else if (scores.ethics < 60) {
    topImprovementArea = 'Supervisión Ética: Robustecer pruebas de explicabilidad y evitar automatización ciega sin HITL';
  } else if (scores.efficiency < 60) {
    topImprovementArea = 'Eficiencia Técnica: Implementar gobernanza por diseño en pipelines MLOps para no frenar la innovación';
  }

  const runRecord: GameRunRecord = {
    id: `run_${Date.now()}`,
    date: new Date().toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    finalScore,
    maturityLevel,
    maturityName,
    scores: {
      compliance: Math.round(scores.compliance),
      ethics: Math.round(scores.ethics),
      efficiency: Math.round(scores.efficiency)
    },
    detailedScores: { ...scores },
    decisions,
    topStrength,
    topImprovementArea
  };

  profile.history.unshift(runRecord);
  profile.gamesPlayed += 1;
  profile.highScore = Math.max(profile.highScore, finalScore);

  // Recalculate averages
  const totalRuns = profile.history.length;
  profile.avgCompliance = Math.round(profile.history.reduce((acc, r) => acc + r.scores.compliance, 0) / totalRuns);
  profile.avgEthics = Math.round(profile.history.reduce((acc, r) => acc + r.scores.ethics, 0) / totalRuns);
  profile.avgEfficiency = Math.round(profile.history.reduce((acc, r) => acc + r.scores.efficiency, 0) / totalRuns);

  // Check Badge Unlocks
  const currentBadges = new Set(profile.badges);

  if (scores.compliance >= 85) {
    currentBadges.add('🛡️ Guardián del Cumplimiento');
  }
  if (scores.ethics >= 85) {
    currentBadges.add('⚖️ Campeón de Equidad Algorítmica');
  }
  if (scores.efficiency >= 85) {
    currentBadges.add('⚡ Arquitecto de Eficiencia MLOps');
  }
  if (maturityLevel >= 5) {
    currentBadges.add('🏆 Líder de Industria (Nivel 5)');
  }
  if (profile.gamesPlayed >= 3) {
    currentBadges.add('📜 Auditor Certificado');
  }

  // Check if player handled Argentine Law scenarios with excellence
  const argentineScenarios = decisions.filter((d) =>
    d.title.toLowerCase().includes('argentina') ||
    d.title.toLowerCase().includes('cesión') ||
    d.title.toLowerCase().includes('25.326')
  );
  if (argentineScenarios.length > 0 && argentineScenarios.every((d) => d.verdict === 'EXCELLENT')) {
    currentBadges.add('🇦🇷 Experto en Ley 25.326 & AAIP');
  }

  profile.badges = Array.from(currentBadges);

  profiles[profileIndex] = profile;
  saveProfiles(profiles);
  return profile;
}
