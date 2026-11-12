/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  GameState,
  GovernanceScores,
  CompanyProfile,
  DecisionOption,
  DecisionHistoryEntry,
  GovernanceDilemma,
  PlayerProfile,
  DecisionFeedback
} from './types/game';
import { GAME_PHASES, GOVERNANCE_DILEMMAS, calculateMaturityLevel } from './data/governanceData';
import { getActiveProfile, recordGameRun } from './utils/profileManager';
import { ExecutiveBoardroom } from './components/ExecutiveBoardroom';
import { TitleScreen } from './components/TitleScreen';
import { HUD } from './components/HUD';
import { DecisionModal } from './components/DecisionModal';
import { FeedbackModal } from './components/FeedbackModal';
import { SelfAssessmentView } from './components/SelfAssessmentView';
import { PlayerProfilesModal } from './components/PlayerProfilesModal';
import { DownloadGuideModal } from './components/DownloadGuideModal';
import { ShareModal } from './components/ShareModal';
import { InstructionsModal } from './components/InstructionsModal';
import { PauseMenu } from './components/PauseMenu';
import { AuditReportView } from './components/AuditReportView';
import { soundManager } from './audio/soundManager';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [activePlayer, setActivePlayer] = useState<PlayerProfile>(() => getActiveProfile());

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    sector: 'Fintech & Banca',
    size: 'Empresa Mediana (250-1000 empleados)',
    startingMaturity: 'Evaluación Inicial'
  });

  const [scores, setScores] = useState<GovernanceScores>({
    compliance: 50,
    ethics: 50,
    efficiency: 50,
    dataQuality: 50,
    securityCompliance: 50,
    responsibleAI: 50,
    businessValue: 50
  });

  const [networkIntegrity, setNetworkIntegrity] = useState<number>(100);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [phaseTimeRemaining, setPhaseTimeRemaining] = useState<number>(GAME_PHASES[0].durationSec);

  const [activeDilemma, setActiveDilemma] = useState<GovernanceDilemma | null>(() => GOVERNANCE_DILEMMAS[0]);
  const [activeFeedback, setActiveFeedback] = useState<{
    feedback: DecisionFeedback;
    optionTitle: string;
    scenarioTitle: string;
    impact: { compliance: number; ethics: number; efficiency: number };
  } | null>(null);

  const [decisionHistory, setDecisionHistory] = useState<DecisionHistoryEntry[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals overlays
  const [showProfilesModal, setShowProfilesModal] = useState<boolean>(false);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);
  const [shareData, setShareData] = useState<{ score?: number; maturity?: string } | null>(null);

  const handleOpenShare = useCallback((score?: number, maturityName?: string) => {
    setShareData({ score, maturity: maturityName });
    setShowShareModal(true);
  }, []);

  const currentPhase = GAME_PHASES[currentPhaseIndex] || GAME_PHASES[0];
  const maturity = calculateMaturityLevel(scores);

  // Toggle audio mute
  const handleToggleMute = useCallback(() => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  // Start Crisis Simulation
  const handleStartGame = useCallback((profile: CompanyProfile) => {
    setCompanyProfile(profile);
    setScores({
      compliance: 50,
      ethics: 50,
      efficiency: 50,
      dataQuality: 50,
      securityCompliance: 50,
      responsibleAI: 50,
      businessValue: 50
    });
    setNetworkIntegrity(100);
    setCurrentPhaseIndex(0);
    setPhaseTimeRemaining(GAME_PHASES[0].durationSec);
    setActiveDilemma(GOVERNANCE_DILEMMAS[0]);
    setActiveFeedback(null);
    setDecisionHistory([]);
    setGameState('PLAYING');
    soundManager.startAmbient();
  }, []);

  // Restart to title with complete state reset
  const handleRestart = useCallback(() => {
    soundManager.stopAmbient();
    setScores({
      compliance: 50,
      ethics: 50,
      efficiency: 50,
      dataQuality: 50,
      securityCompliance: 50,
      responsibleAI: 50,
      businessValue: 50
    });
    setNetworkIntegrity(100);
    setCurrentPhaseIndex(0);
    setPhaseTimeRemaining(GAME_PHASES[0].durationSec);
    setActiveDilemma(GOVERNANCE_DILEMMAS[0]);
    setActiveFeedback(null);
    setDecisionHistory([]);
    setShareData(null);
    setGameState('TITLE');
  }, []);

  // Open Decision modal
  const handleOpenDecision = useCallback(() => {
    if (activeDilemma) {
      setGameState('DECISION');
      soundManager.playAlert();
    }
  }, [activeDilemma]);

  // Handle selected decision option
  const handleSelectOption = useCallback((option: DecisionOption) => {
    if (!activeDilemma) return;

    // Apply scores
    setScores((prev) => ({
      compliance: Math.max(5, Math.min(100, prev.compliance + option.scoreImpact.compliance)),
      ethics: Math.max(5, Math.min(100, prev.ethics + option.scoreImpact.ethics)),
      efficiency: Math.max(5, Math.min(100, prev.efficiency + option.scoreImpact.efficiency)),
      dataQuality: Math.max(5, Math.min(100, prev.dataQuality + option.scoreImpact.dataQuality)),
      securityCompliance: Math.max(5, Math.min(100, prev.securityCompliance + option.scoreImpact.securityCompliance)),
      responsibleAI: Math.max(5, Math.min(100, prev.responsibleAI + option.scoreImpact.responsibleAI)),
      businessValue: Math.max(5, Math.min(100, prev.businessValue + option.scoreImpact.businessValue))
    }));

    const entry: DecisionHistoryEntry = {
      scenarioNumber: activeDilemma.scenarioNumber,
      phase: activeDilemma.phaseName,
      dilemmaId: activeDilemma.id,
      title: activeDilemma.title,
      selectedOptionId: option.id,
      selectedOptionTitle: option.title,
      verdict: option.feedback.verdict,
      feedback: option.feedback,
      impact: {
        compliance: option.scoreImpact.compliance,
        ethics: option.scoreImpact.ethics,
        efficiency: option.scoreImpact.efficiency
      },
      regulatoryNote: option.regulatoryNote
    };

    setDecisionHistory((prev) => [...prev, entry]);

    // Show pedagogical feedback modal
    setActiveFeedback({
      feedback: option.feedback,
      optionTitle: option.title,
      scenarioTitle: activeDilemma.title,
      impact: {
        compliance: option.scoreImpact.compliance,
        ethics: option.scoreImpact.ethics,
        efficiency: option.scoreImpact.efficiency
      }
    });

    setGameState('FEEDBACK');
  }, [activeDilemma]);

  // Continue to next mission after reviewing feedback
  const handleContinueFromFeedback = useCallback(() => {
    setActiveFeedback(null);

    const nextIndex = currentPhaseIndex + 1;
    if (nextIndex < GAME_PHASES.length) {
      setCurrentPhaseIndex(nextIndex);
      setPhaseTimeRemaining(GAME_PHASES[nextIndex].durationSec);
      setActiveDilemma(GOVERNANCE_DILEMMAS[nextIndex] || null);
      soundManager.playSuccess();
      setGameState('PLAYING');
    } else {
      // Completed all 7 Corporate Missions!
      soundManager.playSuccess();
      const updatedProfile = recordGameRun(
        activePlayer.id,
        scores,
        maturity.level,
        maturity.name,
        decisionHistory
      );
      setActivePlayer(updatedProfile);
      setGameState('SUMMARY');
    }
  }, [currentPhaseIndex, activePlayer.id, scores, maturity, decisionHistory]);

  // Helper to recompute scores purely from history
  const computeScoresFromHistory = (history: DecisionHistoryEntry[]): GovernanceScores => {
    const base: GovernanceScores = {
      compliance: 50,
      ethics: 50,
      efficiency: 50,
      dataQuality: 50,
      securityCompliance: 50,
      responsibleAI: 50,
      businessValue: 50
    };

    return history.reduce((acc, entry) => {
      const dilemma = GOVERNANCE_DILEMMAS.find((d) => d.id === entry.dilemmaId);
      const option = dilemma?.options.find((o) => o.id === entry.selectedOptionId);
      if (!option) return acc;

      return {
        compliance: Math.max(5, Math.min(100, acc.compliance + option.scoreImpact.compliance)),
        ethics: Math.max(5, Math.min(100, acc.ethics + option.scoreImpact.ethics)),
        efficiency: Math.max(5, Math.min(100, acc.efficiency + option.scoreImpact.efficiency)),
        dataQuality: Math.max(5, Math.min(100, acc.dataQuality + option.scoreImpact.dataQuality)),
        securityCompliance: Math.max(5, Math.min(100, acc.securityCompliance + option.scoreImpact.securityCompliance)),
        responsibleAI: Math.max(5, Math.min(100, acc.responsibleAI + option.scoreImpact.responsibleAI)),
        businessValue: Math.max(5, Math.min(100, acc.businessValue + option.scoreImpact.businessValue))
      };
    }, base);
  };

  // Navigate to previous dilemma
  const handlePreviousDilemma = useCallback(() => {
    if (currentPhaseIndex > 0) {
      soundManager.playClick();
      const prevIdx = currentPhaseIndex - 1;
      setCurrentPhaseIndex(prevIdx);
      setPhaseTimeRemaining(GAME_PHASES[prevIdx].durationSec);
      setActiveDilemma(GOVERNANCE_DILEMMAS[prevIdx]);
      setDecisionHistory((prev) => {
        const sliced = prev.slice(0, prevIdx);
        setScores(computeScoresFromHistory(sliced));
        return sliced;
      });
      setActiveFeedback(null);
      // If we were in feedback, go to decision of previous
      if (gameState === 'FEEDBACK') {
        setGameState('DECISION');
      }
    }
  }, [currentPhaseIndex, gameState]);

  // Close decision modal and return to boardroom
  const handleCloseDecision = useCallback(() => {
    soundManager.playClick();
    setGameState('PLAYING');
  }, []);

  // Modify decision from feedback modal
  const handleBackToDilemma = useCallback(() => {
    soundManager.playClick();
    setDecisionHistory((prev) => {
      const sliced = prev.slice(0, currentPhaseIndex);
      setScores(computeScoresFromHistory(sliced));
      return sliced;
    });
    setActiveFeedback(null);
    setGameState('DECISION');
  }, [currentPhaseIndex]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showProfilesModal) {
          setShowProfilesModal(false);
          return;
        }
        if (showDownloadModal) {
          setShowDownloadModal(false);
          return;
        }
        if (gameState === 'PLAYING') {
          soundManager.playClick();
          setGameState('PAUSED');
        } else if (gameState === 'PAUSED') {
          soundManager.playClick();
          setGameState('PLAYING');
        }
      } else if (e.key.toLowerCase() === 'm' && gameState !== 'DECISION' && gameState !== 'FEEDBACK') {
        handleToggleMute();
      } else if (e.key === ' ' && gameState === 'PLAYING' && activeDilemma) {
        handleOpenDecision();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, activeDilemma, showProfilesModal, showDownloadModal, handleToggleMute, handleOpenDecision]);

  return (
    <div className="relative w-full max-w-full h-screen h-[100dvh] overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      {/* Title Screen Overlay */}
      {gameState === 'TITLE' && (
        <TitleScreen
          onStartGame={handleStartGame}
          onOpenSelfAssessment={() => setGameState('SELF_ASSESSMENT')}
          activePlayer={activePlayer}
          onOpenProfiles={() => setShowProfilesModal(true)}
          onOpenDownloadGuide={() => setShowDownloadModal(true)}
          onOpenShare={handleOpenShare}
          onOpenInstructions={() => setShowInstructionsModal(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Corporate War Room / Boardroom Simulation */}
      {(gameState === 'PLAYING' || gameState === 'DECISION' || gameState === 'FEEDBACK') && (
        <div className="flex flex-col w-full h-full overflow-hidden">
          <HUD
            currentPhase={currentPhase}
            phaseTimeRemaining={phaseTimeRemaining}
            scores={scores}
            maturity={maturity}
            decisionsCount={decisionHistory.length}
            networkIntegrity={networkIntegrity}
            pendingDilemmaId={activeDilemma?.id || null}
            activePlayer={activePlayer}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onPause={() => {
              soundManager.playClick();
              setGameState('PAUSED');
            }}
            onOpenDecision={handleOpenDecision}
            onOpenProfiles={() => setShowProfilesModal(true)}
            onOpenDownloadGuide={() => setShowDownloadModal(true)}
            onOpenInstructions={() => setShowInstructionsModal(true)}
            onReturnToMenu={handleRestart}
            onPreviousDilemma={handlePreviousDilemma}
            canGoPrevious={currentPhaseIndex > 0}
          />

          <main className="flex-1 w-full overflow-hidden">
            <ExecutiveBoardroom
              currentPhase={currentPhase}
              currentDilemma={activeDilemma}
              scores={scores}
              maturity={maturity}
              activePlayer={activePlayer}
              totalMissions={GAME_PHASES.length}
              currentMissionIndex={currentPhaseIndex}
              decisionsCount={decisionHistory.length}
              onOpenDecision={handleOpenDecision}
              onOpenSelfAssessment={() => setGameState('SELF_ASSESSMENT')}
              onOpenProfiles={() => setShowProfilesModal(true)}
              onOpenDownloadGuide={() => setShowDownloadModal(true)}
              onReturnToMenu={handleRestart}
              onPreviousDilemma={handlePreviousDilemma}
            />
          </main>
        </div>
      )}

      {/* Strategic Decision Modal */}
      {gameState === 'DECISION' && activeDilemma && (
        <DecisionModal
          dilemma={activeDilemma}
          onSelectOption={handleSelectOption}
          onBackToMenu={handleRestart}
          onPrevious={handlePreviousDilemma}
          canGoPrevious={currentPhaseIndex > 0}
          onClose={handleCloseDecision}
        />
      )}

      {/* Immediate Pedagogical Feedback Modal */}
      {gameState === 'FEEDBACK' && activeFeedback && (
        <FeedbackModal
          feedback={activeFeedback.feedback}
          optionTitle={activeFeedback.optionTitle}
          scenarioTitle={activeFeedback.scenarioTitle}
          impact={activeFeedback.impact}
          onContinue={handleContinueFromFeedback}
          onBackToMenu={handleRestart}
          onBackToDilemma={handleBackToDilemma}
          onPreviousDilemma={handlePreviousDilemma}
          canGoPrevious={currentPhaseIndex > 0}
        />
      )}

      {/* Self Assessment Mode: "¿Tiene mi empresa gobernanza?" */}
      {gameState === 'SELF_ASSESSMENT' && (
        <SelfAssessmentView
          onBackToTitle={handleRestart}
          onStartSimulation={() => {
            handleStartGame(companyProfile);
          }}
          onOpenShare={handleOpenShare}
        />
      )}

      {/* Pause Menu Modal */}
      {gameState === 'PAUSED' && (
        <PauseMenu
          onResume={() => setGameState('PLAYING')}
          onRestart={handleRestart}
          onViewReport={() => {
            const updatedProfile = recordGameRun(
              activePlayer.id,
              scores,
              maturity.level,
              maturity.name,
              decisionHistory
            );
            setActivePlayer(updatedProfile);
            setGameState('SUMMARY');
          }}
          onOpenProfiles={() => setShowProfilesModal(true)}
          onOpenDownloadGuide={() => setShowDownloadModal(true)}
          onOpenInstructions={() => setShowInstructionsModal(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          scores={scores}
          maturity={maturity}
          companyProfile={companyProfile}
          activePlayer={activePlayer}
        />
      )}

      {/* Final Comprehensive Audit Report */}
      {gameState === 'SUMMARY' && (
        <AuditReportView
          scores={scores}
          maturity={maturity}
          companyProfile={companyProfile}
          activePlayer={activePlayer}
          decisionHistory={decisionHistory}
          onRestart={handleRestart}
          onOpenProfiles={() => setShowProfilesModal(true)}
          onOpenDownloadGuide={() => setShowDownloadModal(true)}
          onOpenShare={handleOpenShare}
        />
      )}

      {/* Player Profiles & History Modal */}
      {showProfilesModal && (
        <PlayerProfilesModal
          activeProfile={activePlayer}
          onSelectProfile={(p) => setActivePlayer(p)}
          onClose={() => setShowProfilesModal(false)}
        />
      )}

      {/* Download & Play Guide Modal */}
      {showDownloadModal && (
        <DownloadGuideModal
          onClose={() => setShowDownloadModal(false)}
        />
      )}

      {/* Instructions / How to Play Modal */}
      {showInstructionsModal && (
        <InstructionsModal
          onClose={() => setShowInstructionsModal(false)}
          onStartSimulation={() => {
            setShowInstructionsModal(false);
            if (gameState === 'TITLE') {
              handleStartGame(companyProfile);
            }
          }}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          resultScore={shareData?.score}
          maturityName={shareData?.maturity}
          onResetGame={handleRestart}
        />
      )}
    </div>
  );
}
