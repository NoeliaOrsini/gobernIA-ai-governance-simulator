import React, { useState } from 'react';
import { PlayerProfile } from '../types/game';
import {
  getStoredProfiles,
  saveProfiles,
  createProfile,
  setActiveProfileId,
  DEFAULT_AVATARS,
  AVAILABLE_ROLES
} from '../utils/profileManager';
import { User, Award, History, Plus, Check, X, Shield, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface PlayerProfilesModalProps {
  activeProfile: PlayerProfile;
  onSelectProfile: (profile: PlayerProfile) => void;
  onClose: () => void;
}

export const PlayerProfilesModal: React.FC<PlayerProfilesModalProps> = ({
  activeProfile,
  onSelectProfile,
  onClose
}) => {
  const [profiles, setProfiles] = useState<PlayerProfile[]>(getStoredProfiles());
  const [currentActive, setCurrentActive] = useState<PlayerProfile>(activeProfile);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState(AVAILABLE_ROLES[0]);
  const [newCompany, setNewCompany] = useState('');
  const [newAvatar, setNewAvatar] = useState(DEFAULT_AVATARS[0]);
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'badges'>('profile');

  const handleSelect = (profile: PlayerProfile) => {
    soundManager.playClick();
    setCurrentActive(profile);
    setActiveProfileId(profile.id);
    onSelectProfile(profile);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    soundManager.playSuccess();
    const created = createProfile({
      name: newName,
      role: newRole,
      company: newCompany,
      avatar: newAvatar
    });

    const updated = getStoredProfiles();
    setProfiles(updated);
    setCurrentActive(created);
    onSelectProfile(created);
    setIsCreating(false);
    setNewName('');
    setNewCompany('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md pointer-events-auto select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-5 md:p-7 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="text-2xl p-2 bg-slate-800 rounded-xl border border-slate-700">
                {currentActive.avatar}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                  Gestión de Perfiles y Rendimiento
                </span>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{currentActive.name}</span>
                  <span className="text-xs font-normal text-slate-400 font-mono">
                    ({currentActive.company})
                  </span>
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

          {/* Profile Switcher & New Profile Bar */}
          <div className="my-4 flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-mono shrink-0">Perfiles:</span>
              {profiles.map((p) => {
                const isSelected = p.id === currentActive.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shrink-0 ${
                      isSelected
                        ? 'bg-sky-600 text-white font-bold shadow ring-1 ring-sky-400'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{p.avatar}</span>
                    <span className="truncate max-w-[110px]">{p.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsCreating(!isCreating);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isCreating ? 'Cancelar' : 'Nuevo Perfil'}</span>
            </button>
          </div>

          {/* Form Create Profile */}
          {isCreating && (
            <form onSubmit={handleCreateNew} className="mb-4 p-4 bg-slate-950 border border-sky-500/40 rounded-xl space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase text-sky-400">Crear Nuevo Perfil de Jugador</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej. Dra. Valeria Rossi"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Rol / Cargo Corporativo</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-sky-500"
                  >
                    {AVAILABLE_ROLES.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Empresa / Institución</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Ej. Banco del Plata / HealthTech"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 mr-1">Avatar:</span>
                  {DEFAULT_AVATARS.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setNewAvatar(av)}
                      className={`text-lg p-1 rounded-md transition-all ${
                        newAvatar === av ? 'bg-sky-600 scale-110' : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-xs"
                >
                  Guardar Perfil
                </button>
              </div>
            </form>
          )}

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-4">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('profile');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'profile' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Estadísticas & Diagnóstico</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('history');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'history' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5 text-emerald-400" />
              <span>Historial de Partidas ({currentActive.history.length})</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('badges');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'badges' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Logros & Insignias ({currentActive.badges.length})</span>
            </button>
          </div>

          {/* TAB 1: ESTADÍSTICAS Y DIAGNÓSTICO */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Stat metric cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Partidas Jugadas</span>
                  <span className="text-xl font-bold font-mono text-white tabular-nums">{currentActive.gamesPlayed}</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Mejor Puntuación</span>
                  <span className="text-xl font-bold font-mono text-sky-400 tabular-nums">{currentActive.highScore}/100</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Promedio Cumplimiento</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">{currentActive.avgCompliance}%</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Promedio Ética IA</span>
                  <span className="text-xl font-bold font-mono text-indigo-400 tabular-nums">{currentActive.avgEthics}%</span>
                </div>
              </div>

              {/* Performance Analysis Box */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  <span>Diagnóstico de Desempeño Continuo del Jugador</span>
                </h4>

                {currentActive.history.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">
                    Aún no has completado simulaciones con este perfil. ¡Inicia una partida para generar tu historial de rendimiento!
                  </p>
                ) : (
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-900 border border-emerald-500/30 rounded-lg">
                      <span className="font-semibold text-emerald-400 block mb-0.5">Principal Fortaleza Observada:</span>
                      <p className="text-slate-300">{currentActive.history[0]?.topStrength}</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-lg">
                      <span className="font-semibold text-amber-400 block mb-0.5">Área Prioritaria de Mejora:</span>
                      <p className="text-slate-300">{currentActive.history[0]?.topImprovementArea}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HISTORIAL DE PARTIDAS */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {currentActive.history.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs bg-slate-950 border border-slate-800 rounded-xl">
                  No hay partidas registradas en este perfil.
                </div>
              ) : (
                currentActive.history.map((record) => (
                  <div key={record.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">{record.date}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono font-bold text-[11px] border border-sky-500/30">
                          {record.maturityName}
                        </span>
                        <span className="font-mono font-bold text-white text-sm">
                          {record.finalScore}/100
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] font-mono pt-1 border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-500">Cumplimiento:</span>{' '}
                        <span className="text-emerald-400 font-bold">{record.scores.compliance}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Ética IA:</span>{' '}
                        <span className="text-indigo-400 font-bold">{record.scores.ethics}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Eficiencia:</span>{' '}
                        <span className="text-amber-400 font-bold">{record.scores.efficiency}%</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 italic pt-1">
                      {record.decisions.length} decisiones estratégicas evaluadas.
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: LOGROS E INSIGNIAS */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentActive.badges.map((badge, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl flex items-center gap-3">
                  <div className="text-2xl p-2 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    🏆
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-amber-300">{badge}</h5>
                    <span className="text-[11px] text-slate-400">Logro desbloqueado por decisiones de excelencia.</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-xs"
          >
            Listo, Continuar con este Perfil
          </button>
        </div>
      </div>
    </div>
  );
};
