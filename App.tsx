/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Calculator,
  Volume2,
  VolumeX,
  Languages,
  Users,
  UserCheck,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Flame,
  HelpCircle,
  Menu,
  X,
  Check,
  BookOpen,
  Award
} from 'lucide-react';

import {
  QUIZ_QUESTIONS,
  QUIZ_PARTS,
  PRIZE_LADDER,
  type QuizQuestion,
  type QuestionOption
} from './questions.ts';

import {
  MATH_PROBLEMS,
  MATH_LEVELS,
  type MathProblem
} from './mathProblems.ts';

import {
  getInitialGameState,
  getCurrentQuestion,
  getCurrentPrize,
  getProgressPercentage,
  selectOption,
  advanceToNextQuestion,
  toggleQuestionTranslation,
  toggleOptionTranslation,
  useFiftyFifty,
  useCoachAdvice,
  useAudienceVote,
  calculatePlayerSummary,
  playSound,
  speakSpanish,
  type GameState
} from './rules.ts';

export default function App() {
  // Active Game Mode: 'millionaire' (30 situations) or 'math' (20 football math problems)
  const [activeTab, setActiveTab] = useState<'millionaire' | 'math'>('millionaire');

  // Millionaire Quiz State
  const [gameState, setGameState] = useState<GameState>(() => getInitialGameState());
  const [coachModal, setCoachModal] = useState<{ isOpen: boolean; adviceEs: string; adviceHy: string; recommended: string } | null>(null);
  const [audienceModal, setAudienceModal] = useState<{ isOpen: boolean; results: { optionId: string; percentage: number }[] } | null>(null);
  const [showLadderDrawer, setShowLadderDrawer] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  // Math Problems State
  const [selectedMathLevel, setSelectedMathLevel] = useState<number | 'all'>('all');
  const [revealedMathTranslations, setRevealedMathTranslations] = useState<Record<number, boolean>>({});
  const [revealedMathAnswers, setRevealedMathAnswers] = useState<Record<number, boolean>>({});
  const [mathUserSelections, setMathUserSelections] = useState<Record<number, number>>({});
  const [showAllMathAnswers, setShowAllMathAnswers] = useState(false);
  const [showAllMathTranslations, setShowAllMathTranslations] = useState(false);

  const currentQ = getCurrentQuestion(gameState);
  const progressPercent = getProgressPercentage(gameState.currentQuestionIndex, QUIZ_QUESTIONS.length);
  const currentPrizeText = getCurrentPrize(gameState.currentQuestionIndex);
  const currentPart = QUIZ_PARTS.find(p => p.id === currentQ?.partId);

  useEffect(() => {
    if (gameState.isCompleted && activeTab === 'millionaire') {
      playSound('fanfare', gameState.soundEnabled);
    }
  }, [gameState.isCompleted, gameState.soundEnabled, activeTab]);

  // Quiz handlers
  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (gameState.eliminatedOptions.includes(optionId)) return;
    playSound('select', gameState.soundEnabled);
    setGameState(prev => selectOption(prev, optionId));
  };

  const handleNext = () => {
    if (!gameState.selectedOptionId) return;
    playSound('next', gameState.soundEnabled);
    setGameState(prev => advanceToNextQuestion(prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    playSound('lock', gameState.soundEnabled);
    setGameState(getInitialGameState());
    setCoachModal(null);
    setAudienceModal(null);
    setShowLadderDrawer(false);
    setShowGlossary(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiftyFifty = () => {
    if (!gameState.lifelines.fiftyFifty) return;
    playSound('lifeline', gameState.soundEnabled);
    const { nextState } = useFiftyFifty(gameState);
    setGameState(nextState);
  };

  const handleCoachAdvice = () => {
    if (!gameState.lifelines.coachAdvice) return;
    playSound('lifeline', gameState.soundEnabled);
    const { nextState, adviceEs, adviceHy, recommendedOption } = useCoachAdvice(gameState);
    setGameState(nextState);
    setCoachModal({
      isOpen: true,
      adviceEs,
      adviceHy,
      recommended: recommendedOption
    });
  };

  const handleAudienceVote = () => {
    if (!gameState.lifelines.audienceVote) return;
    playSound('lifeline', gameState.soundEnabled);
    const { nextState, pollResults } = useAudienceVote(gameState);
    setGameState(nextState);
    setAudienceModal({
      isOpen: true,
      results: pollResults
    });
  };

  const toggleSound = () => {
    playSound('toggle', true);
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const toggleGlobalArmenian = () => {
    playSound('toggle', gameState.soundEnabled);
    setGameState(prev => ({ ...prev, showAllArmenian: !prev.showAllArmenian }));
  };

  const handleQuestionTextClick = () => {
    if (!currentQ) return;
    playSound('toggle', gameState.soundEnabled);
    setGameState(prev => toggleQuestionTranslation(prev, currentQ.id));
  };

  const handleOptionTextClick = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentQ) return;
    playSound('toggle', gameState.soundEnabled);
    setGameState(prev => toggleOptionTranslation(prev, currentQ.id, optionId));
  };

  const handlePronounce = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    speakSpanish(text);
  };

  // Math Problem Handlers
  const toggleMathTranslation = (id: number) => {
    playSound('toggle', gameState.soundEnabled);
    setRevealedMathTranslations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMathAnswer = (id: number) => {
    playSound('lock', gameState.soundEnabled);
    setRevealedMathAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllMathTranslations = () => {
    playSound('toggle', gameState.soundEnabled);
    const nextVal = !showAllMathTranslations;
    setShowAllMathTranslations(nextVal);
    const updated: Record<number, boolean> = {};
    MATH_PROBLEMS.forEach(p => {
      updated[p.id] = nextVal;
    });
    setRevealedMathTranslations(updated);
  };

  const toggleAllMathAnswers = () => {
    playSound('lifeline', gameState.soundEnabled);
    const nextVal = !showAllMathAnswers;
    setShowAllMathAnswers(nextVal);
    const updated: Record<number, boolean> = {};
    MATH_PROBLEMS.forEach(p => {
      updated[p.id] = nextVal;
    });
    setRevealedMathAnswers(updated);
  };

  const handleSelectMathOption = (problemId: number, optionIdx: number) => {
    playSound('select', gameState.soundEnabled);
    setMathUserSelections(prev => ({ ...prev, [problemId]: optionIdx }));
    // Auto show answer for immediate learning feedback
    setRevealedMathAnswers(prev => ({ ...prev, [problemId]: true }));
  };

  const filteredMathProblems = selectedMathLevel === 'all'
    ? MATH_PROBLEMS
    : MATH_PROBLEMS.filter(p => p.levelId === selectedMathLevel);

  const solvedMathCount = Object.keys(revealedMathAnswers).filter(k => revealedMathAnswers[Number(k)]).length;

  const isQuestionTranslationVisible = currentQ
    ? (gameState.showAllArmenian || gameState.revealedTranslationQuestionId === currentQ.id)
    : false;

  const isOptionTranslationVisible = (optionId: string) => {
    if (!currentQ) return false;
    if (gameState.showAllArmenian) return true;
    return !!gameState.revealedOptionTranslations[`${currentQ.id}_${optionId}`];
  };

  const selectedOptionData = currentQ?.options.find(o => o.id === gameState.selectedOptionId);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      {/* Background stadium lights / Millionaire studio glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-blue-600/25 via-indigo-600/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-cyan-600/15 blur-3xl rounded-full" />
        <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main Top Header Bar */}
      <header className="relative z-20 border-b border-indigo-900/60 bg-slate-950/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sticky top-0 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
          {/* Top Row: App Logo, Title, and Utility Buttons */}
          <div className="flex items-center justify-between gap-2 w-full min-w-0">
            {/* Logo & Subtitle */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-600 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center text-base">
                  ⚽
                </div>
              </div>
              <div className="min-w-0">
                <span className="font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 text-xs sm:text-sm uppercase block truncate">
                  Ֆուտբոլային Խաղադաշտ
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  Հայերեն 🇦🇲 + Español 🇪🇸
                </span>
              </div>
            </div>

            {/* Top Right Utilities: Armenian Global Toggle, Sound Toggle, Ladder button */}
            <div className="flex items-center gap-1.5 shrink-0">
              {activeTab === 'millionaire' ? (
                <>
                  <button
                    onClick={toggleGlobalArmenian}
                    title="Միշտ ցուցադրել հայերեն թարգմանությունը"
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                      gameState.showAllArmenian
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {gameState.showAllArmenian ? 'Հայերենը բաց է' : 'Հայերեն թարգմանություն'}
                    </span>
                    <span className="sm:hidden text-[10px]">🇦🇲</span>
                  </button>

                  {/* Prize Ladder Drawer Toggle for mobile and tablet */}
                  <button
                    onClick={() => setShowLadderDrawer(true)}
                    className="xl:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-950 text-amber-300 border border-indigo-800 text-xs font-bold hover:bg-indigo-900 transition"
                    title="Մրցանակային սանդուղք"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-[11px]">{currentPrizeText}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleAllMathTranslations}
                  title="Բացել բոլոր հայերեն թարգմանությունները"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                    showAllMathTranslations
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm font-bold'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {showAllMathTranslations ? 'Թաքցնել հայերենը' : 'Բացել բոլոր հայերենները'}
                  </span>
                  <span className="sm:hidden text-[10px]">🇦🇲</span>
                </button>
              )}

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                aria-label={gameState.soundEnabled ? 'Անջատել ձայնը' : 'Միացնել ձայնը'}
                className="p-1.5 rounded-lg border text-xs bg-indigo-950/80 text-amber-300 border-indigo-800 hover:bg-indigo-900 transition"
              >
                {gameState.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Row 2: Prominent Dedicated Full-Width Tab Switcher (Never Clipped!) */}
          <nav className="w-full grid grid-cols-2 gap-1.5 sm:gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => {
                playSound('toggle', gameState.soundEnabled);
                setActiveTab('millionaire');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition duration-150 cursor-pointer min-w-0 ${
                activeTab === 'millionaire'
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-md font-black ring-1 ring-yellow-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Trophy className="w-4 h-4 shrink-0 text-slate-950 drop-shadow-sm" />
              <span className="hidden sm:inline truncate">
                1. Ո՞վ է ուզում դառնալ միլիոնատեր (30)
              </span>
              <span className="sm:hidden text-xs font-black truncate">
                1. Միլիոնատեր (30)
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('toggle', gameState.soundEnabled);
                setActiveTab('math');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition duration-150 cursor-pointer min-w-0 ${
                activeTab === 'math'
                  ? 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-slate-950 shadow-md font-black ring-1 ring-cyan-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Calculator className="w-4 h-4 shrink-0 text-slate-950 drop-shadow-sm" />
              <span className="hidden sm:inline truncate">
                2. Մաթեմատիկական խնդիրներ (20)
              </span>
              <span className="sm:hidden text-xs font-black truncate">
                2. Մաթեմատիկա (20)
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      {activeTab === 'millionaire' ? (
        /* ================= GAME 1: MILLIONAIRE QUIZ ================= */
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 md:p-6 grid grid-cols-1 xl:grid-cols-12 gap-5 relative z-10 min-w-0">
          {/* Left Column: Game Area */}
          <section className="xl:col-span-8 flex flex-col justify-between gap-5 min-w-0">
            {!gameState.isCompleted && currentQ ? (
              <div className="flex flex-col gap-4 min-w-0">
                {/* Top Status & Lifelines Row */}
                <div className="bg-slate-900/80 border border-indigo-900/60 rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 min-w-0">
                  {/* Part & Question number */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{currentQ.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Հարց {currentQ.id} / 30
                        </span>
                        <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 truncate max-w-[170px] sm:max-w-none">
                          {currentQ.partEmoji} {currentQ.partTitleEs}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowLadderDrawer(true)}
                        className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 mt-0.5 transition cursor-pointer"
                        title="Դիտել մրցանակային սանդուղքը"
                      >
                        <span>Մրցանակ՝</span>
                        <strong className="text-amber-300 flex items-center gap-1 font-mono">
                          {currentQ.rewardAmount} <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                        </strong>
                        <span className="lg:hidden text-[10px] text-indigo-400 underline ml-1">Սանդուղք</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Iconic Lifelines */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleFiftyFifty}
                      disabled={!gameState.lifelines.fiftyFifty}
                      title="50:50 — Հեռացնել 2 տարբերակ"
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black tracking-wider transition flex items-center gap-1 border ${
                        gameState.lifelines.fiftyFifty
                          ? 'bg-gradient-to-b from-indigo-800 to-indigo-950 text-amber-300 border-indigo-600 shadow-md hover:scale-105 active:scale-95'
                          : 'bg-slate-900/40 text-slate-600 border-slate-800/80 cursor-not-allowed opacity-50 line-through'
                      }`}
                    >
                      <span>50:50</span>
                    </button>

                    <button
                      onClick={handleCoachAdvice}
                      disabled={!gameState.lifelines.coachAdvice}
                      title="Մարզչի խորհուրդ (Consejo del entrenador)"
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                        gameState.lifelines.coachAdvice
                          ? 'bg-gradient-to-b from-blue-900 to-slate-900 text-cyan-300 border-cyan-700/80 shadow-md hover:scale-105 active:scale-95'
                          : 'bg-slate-900/40 text-slate-600 border-slate-800/80 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="hidden sm:inline">Մարզիչ</span>
                    </button>

                    <button
                      onClick={handleAudienceVote}
                      disabled={!gameState.lifelines.audienceVote}
                      title="Հանդիսատեսի կարծիք (Voto del público)"
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                        gameState.lifelines.audienceVote
                          ? 'bg-gradient-to-b from-purple-900 to-slate-900 text-purple-200 border-purple-700/80 shadow-md hover:scale-105 active:scale-95'
                          : 'bg-slate-900/40 text-slate-600 border-slate-800/80 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="hidden sm:inline">Ստադիոն</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900/90 rounded-full h-2 p-0.5 border border-slate-800 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-amber-400/50"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Question Card (Spanish on top + click to reveal Armenian) */}
                <div className="relative rounded-2xl bg-gradient-to-b from-indigo-950/90 via-slate-900 to-slate-950 border-2 border-indigo-700/70 p-4 sm:p-6 md:p-7 shadow-2xl min-w-0 overflow-hidden">
                  <div className="flex items-start justify-between gap-2 mb-3 min-w-0 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0 flex-wrap">
                      <span className="text-amber-400 font-extrabold text-sm sm:text-base tracking-wide break-words">
                        {currentQ.id}. {currentQ.titleEs}
                      </span>
                      <button
                        onClick={(e) => handlePronounce(`${currentQ.titleEs}. ${currentQ.scenarioEs}`, e)}
                        title="Լսել իսպաներեն արտասանությունը (Escuchar pronunciación)"
                        className="p-1 rounded-full bg-indigo-900/60 text-amber-300 hover:bg-indigo-800 transition hover:scale-110 shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={handleQuestionTextClick}
                      className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-amber-300 bg-indigo-950/70 px-2.5 py-1 rounded-full border border-indigo-800/60 transition shrink-0"
                    >
                      {isQuestionTranslationVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{isQuestionTranslationVisible ? 'Թաքցնել հայերենը' : 'Հայերեն թարգմանություն'}</span>
                    </button>
                  </div>

                  {/* Clickable Spanish Scenario */}
                  <div
                    onClick={handleQuestionTextClick}
                    className="cursor-pointer group relative p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-indigo-900/50 hover:border-amber-400/60 transition duration-200 min-w-0"
                    title="Կտտացրեք այստեղ՝ հայերեն թարգմանությունը բացելու համար / Clic para ver traducción"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-400/90 mb-1.5 flex-wrap gap-1">
                      <span className="flex items-center gap-1.5">
                        <span>🇪🇸</span> Español (Սեղմեք թարգմանության համար)
                      </span>
                      <span className="text-slate-500 group-hover:text-amber-300 text-[10px]">
                        Կտտացնել թարգմանության համար 👆
                      </span>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-slate-100 font-medium leading-relaxed break-words group-hover:text-amber-100 transition">
                      {currentQ.scenarioEs}
                    </p>
                  </div>

                  {/* Armenian Translation Block */}
                  {isQuestionTranslationVisible && (
                    <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl bg-amber-950/20 border border-amber-600/40 text-amber-100 text-xs sm:text-sm md:text-base leading-relaxed break-words animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                        <span>🇦🇲</span> Հայերեն թարգմանություն՝
                      </div>
                      <h3 className="font-bold text-white mb-1 break-words">
                        {currentQ.titleHy}
                      </h3>
                      <p className="text-slate-200 break-words">
                        {currentQ.scenarioHy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Subtitle notice: Free Choice mode */}
                <div className="flex items-center justify-between px-1 text-xs text-slate-400 flex-wrap gap-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="break-words">Բոլոր պատասխանները ճիշտ են և ունեն մարտավարական իմաստ:</span>
                  </span>
                  <span className="text-[11px] text-indigo-300">
                    Կտտացրեք 🇪🇸-ին՝ 🇦🇲 բացելու համար
                  </span>
                </div>

                {/* 4 Options Grid (A, B, C, D) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-w-0">
                  {currentQ.options.map(option => {
                    const isSelected = gameState.selectedOptionId === option.id;
                    const isEliminated = gameState.eliminatedOptions.includes(option.id);
                    const showOptionArmenian = isOptionTranslationVisible(option.id);

                    if (isEliminated) {
                      return (
                        <div
                          key={option.id}
                          className="rounded-xl border border-slate-900 bg-slate-950/40 p-3.5 opacity-25 cursor-not-allowed select-none min-w-0"
                        >
                          <span className="font-black text-slate-700 mr-2">{option.id}:</span>
                          <span className="text-slate-600 line-through break-words">{option.es}</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        role="button"
                        tabIndex={0}
                        key={option.id}
                        onClick={() => handleSelectOption(option.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectOption(option.id);
                          }
                        }}
                        aria-pressed={isSelected}
                        aria-label={`Տարբերակ ${option.id}: ${option.es}`}
                        className={`relative text-left rounded-xl p-3.5 sm:p-4 transition-all duration-200 border-2 group flex flex-col justify-between gap-2 shadow-lg cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 min-w-0 overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-yellow-600/30 border-amber-400 ring-2 ring-amber-400/40 shadow-amber-500/30 scale-[1.01]'
                            : 'bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border-indigo-900/70 hover:border-amber-400/70 hover:bg-indigo-950/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 w-full min-w-0">
                          <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs sm:text-sm shrink-0 border transition ${
                                isSelected
                                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                                  : 'bg-slate-800 text-amber-400 border-slate-700 group-hover:bg-amber-500/20 group-hover:border-amber-400'
                              }`}
                            >
                              {option.id}
                            </span>

                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-amber-400/70 font-semibold mr-1">
                                [ES]
                              </span>
                              <span
                                className={`text-xs sm:text-sm md:text-base font-semibold transition break-words ${
                                  isSelected ? 'text-amber-100 font-bold' : 'text-slate-200 group-hover:text-white'
                                }`}
                              >
                                {option.es}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => handlePronounce(option.es, e)}
                              title="Լսել արտասանությունը"
                              className="p-1 rounded-md text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => handleOptionTextClick(option.id, e)}
                              title={showOptionArmenian ? 'Թաքցնել հայերենը' : 'Բացել հայերենը'}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${
                                showOptionArmenian
                                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-amber-300'
                              }`}
                            >
                              🇦🇲 {showOptionArmenian ? 'Փակել' : 'Հայ'}
                            </button>
                          </div>
                        </div>

                        {showOptionArmenian && (
                          <div className="mt-1 pt-2 border-t border-amber-500/30 text-amber-200 text-xs sm:text-sm break-words animate-in fade-in duration-200">
                            <span className="font-bold text-amber-400 mr-1.5">🇦🇲:</span>
                            {option.hy}
                          </div>
                        )}

                        {isSelected && (
                          <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold pt-1 flex-wrap gap-1">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              Ընտրված տարբերակ
                            </span>
                            <span className="text-[10px] text-amber-200/80 truncate max-w-[180px]">
                              {option.personalityTrait}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Chosen Answer Feedback Card & Prominent Next Button */}
                {selectedOptionData && (
                  <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-2 border-amber-500/60 p-4 sm:p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col md:flex-row items-center justify-between gap-4 min-w-0">
                    <div className="flex-1 space-y-1 min-w-0 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase shrink-0">
                          Տարբերակ {selectedOptionData.id}
                        </span>
                        <span className="text-xs font-semibold text-amber-300 break-words">
                          {selectedOptionData.personalityTrait}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 break-words">
                        <strong>🇦🇲 Հայերեն՝</strong> {selectedOptionData.tacticalNoteHy}
                      </p>
                      <p className="text-xs text-slate-400 italic break-words">
                        <strong>🇪🇸 Español:</strong> {selectedOptionData.tacticalNoteEs}
                      </p>
                    </div>

                    {/* Prominent Next Button */}
                    <button
                      onClick={handleNext}
                      className="w-full md:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm sm:text-base md:text-lg tracking-wider uppercase shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 border border-yellow-200 cursor-pointer"
                    >
                      <span>Առաջ ➡️</span>
                      <span className="text-xs opacity-75 hidden sm:inline">(Siguiente)</span>
                    </button>
                  </div>
                )}

                {!selectedOptionData && (
                  <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400">
                    Ընտրեք Ձեր նախընտրած տարբերակը (A, B, C կամ D)՝ առաջ շարժվելու համար։
                  </div>
                )}
              </div>
            ) : (
              /* Victory Screen */
              <div className="rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border-2 border-amber-400 p-5 sm:p-8 md:p-10 shadow-2xl text-center space-y-6 min-w-0">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-xl shadow-amber-500/30">
                  <Trophy className="w-14 sm:w-16 h-14 sm:h-16 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-widest inline-block">
                    Շնորհավորում ենք • ¡Enhorabuena!
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 break-words">
                    Դուք նվաճեցիք €1,000,000 և Աշխարհի Գավաթը
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto break-words">
                    Հաջողությամբ ավարտեցիք բոլոր 30 բարդ ֆուտբոլային իրավիճակները իսպաներեն և հայերեն լեզուներով։
                  </p>
                </div>

                {(() => {
                  const summary = calculatePlayerSummary(gameState.confirmedAnswers);
                  return (
                    <div className="max-w-2xl mx-auto bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 sm:p-6 text-left space-y-4 min-w-0">
                      <div className="border-b border-slate-800 pb-3">
                        <div className="text-xs font-bold text-amber-400 uppercase">
                          Ձեր ֆուտբոլային բնութագիրը • Tu perfil futbolista
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white break-words">
                          {summary.badge} {summary.titleHy}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 italic break-words">
                          {summary.titleEs}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed break-words">
                        {summary.descriptionHy}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-400 italic leading-relaxed break-words">
                        {summary.descriptionEs}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center min-w-0">
                          <div className="text-[10px] text-slate-400 uppercase font-bold truncate">Առաջնորդություն</div>
                          <div className="text-base sm:text-lg font-black text-amber-400">{summary.stats.leadership}%</div>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center min-w-0">
                          <div className="text-[10px] text-slate-400 uppercase font-bold truncate">Թիմային ոգի</div>
                          <div className="text-base sm:text-lg font-black text-emerald-400">{summary.stats.teamwork}%</div>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center min-w-0">
                          <div className="text-[10px] text-slate-400 uppercase font-bold truncate">Խիզախություն</div>
                          <div className="text-base sm:text-lg font-black text-rose-400">{summary.stats.bravery}%</div>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center min-w-0">
                          <div className="text-[10px] text-slate-400 uppercase font-bold truncate">Մարտավարություն</div>
                          <div className="text-base sm:text-lg font-black text-cyan-400">{summary.stats.tactics}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    onClick={handleRestart}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Խաղալ կրկին</span>
                  </button>

                  <button
                    onClick={() => {
                      playSound('toggle', gameState.soundEnabled);
                      setActiveTab('math');
                    }}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Անցնել մաթեմատիկական խնդիրներին</span>
                  </button>

                  <button
                    onClick={() => setShowGlossary(!showGlossary)}
                    className="px-5 py-3 rounded-xl bg-slate-800 text-white font-bold text-sm sm:text-base hover:bg-slate-700 transition flex items-center gap-2 border border-slate-700"
                  >
                    <Languages className="w-4 h-4 text-amber-400" />
                    <span>{showGlossary ? 'Փակել ցանկը' : 'Բոլոր 30 հարցերի բառարանը'}</span>
                  </button>
                </div>

                {showGlossary && (
                  <div className="mt-6 text-left bg-slate-950/90 rounded-2xl border border-slate-800 p-4 md:p-6 space-y-4 max-h-[500px] overflow-y-auto">
                    <h3 className="font-bold text-amber-400 text-base sm:text-lg border-b border-slate-800 pb-2">
                      Բոլոր 30 ֆուտբոլային իրավիճակները (Español & Հայերեն)
                    </h3>
                    <div className="space-y-3">
                      {QUIZ_QUESTIONS.map(q => (
                        <div key={q.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-300 flex-wrap gap-1">
                            <span>{q.id}. {q.icon} {q.titleEs}</span>
                            <span className="text-slate-400">{q.titleHy}</span>
                          </div>
                          <p className="text-xs text-slate-300 break-words">🇪🇸 {q.scenarioEs}</p>
                          <p className="text-xs text-amber-200/90 break-words">🇦🇲 {q.scenarioHy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Right Column: Prize Ladder */}
          <aside className="hidden xl:flex xl:col-span-4 flex-col gap-4 min-w-0">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-900/60 p-4 sm:p-5 shadow-xl flex flex-col h-full justify-between min-w-0">
              <div className="min-w-0">
                <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-black text-xs uppercase tracking-wider text-slate-100 truncate">
                      Մրցանակային սանդուղք
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-950 text-amber-300 border border-indigo-800 font-mono shrink-0">
                    {currentPrizeText}
                  </span>
                </div>

                <div className="space-y-1 max-h-[580px] overflow-y-auto pr-1 select-none text-xs">
                  {[...PRIZE_LADDER].reverse().map((step) => {
                    const isCurrent = gameState.currentQuestionIndex + 1 === step.level;
                    const isPassed = gameState.currentQuestionIndex >= step.level;
                    const partInfo = QUIZ_PARTS.find(p => {
                      const [start, end] = p.range.split('–').map(Number);
                      return step.level >= start && step.level <= end;
                    });

                    return (
                      <div
                        key={step.level}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg font-bold transition min-w-0 ${
                          isCurrent
                            ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black scale-[1.01]'
                            : isPassed
                            ? 'bg-indigo-950/50 text-amber-300/80'
                            : step.isMilestone
                            ? 'text-amber-400 font-extrabold bg-slate-900/80 border border-amber-500/20'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 truncate">
                          <span className="w-5 text-right opacity-70 shrink-0 font-mono">{step.level}</span>
                          <span className="text-[10px] shrink-0">{partInfo?.badge || '•'}</span>
                          <span className="truncate">
                            {isCurrent ? '👉 Խաղում եք' : (step.isMilestone ? 'Հանգրվան' : '')}
                          </span>
                        </div>
                        <span className="tracking-wide font-mono shrink-0 ml-1">{step.amount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5 Parts overview */}
              <div className="mt-4 pt-3 border-t border-indigo-900/60 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  5 Բաժիններ (5 Partes)
                </span>
                <div className="grid grid-cols-1 gap-1 text-[11px]">
                  {QUIZ_PARTS.map(p => (
                    <div
                      key={p.id}
                      className={`flex items-center justify-between px-2 py-1 rounded-md transition min-w-0 ${
                        currentPart?.id === p.id
                          ? 'bg-indigo-900/60 text-white font-bold border border-indigo-700'
                          : 'text-slate-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="shrink-0">{p.badge}</span>
                        <span className="truncate">{p.titleHy}</span>
                      </span>
                      <span className="text-[10px] opacity-75 font-mono shrink-0 ml-1">{p.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </main>
      ) : (
        /* ================= GAME 2: SOCCER MATH PROBLEMS ================= */
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 md:p-6 flex flex-col gap-5 relative z-10 min-w-0">
          {/* Header Card for Math Game */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-2 border-cyan-700/60 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 min-w-0">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl">🧮</span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400">
                  Մաթեմատիկական խնդիրներ ֆուտբոլի մասին
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/70 font-semibold">
                  Problemas matemáticos
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                20 մաթեմատիկական խնդիր իսպաներեն և հայերեն լեզուներով։
                <strong className="text-amber-300 ml-1">
                  Կտտացրեք իսպաներեն տեքստին՝ հայերենը բացելու համար, իսկ «Պատասխան» կոճակով՝ ստուգեք լուծումը։
                </strong>
              </p>
            </div>

            {/* Quick Actions: Toggle all answers & translations */}
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={toggleAllMathTranslations}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                  showAllMathTranslations
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{showAllMathTranslations ? 'Թաքցնել հայերենը' : 'Բացել բոլոր հայերենները'}</span>
              </button>

              <button
                onClick={toggleAllMathAnswers}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                  showAllMathAnswers
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-indigo-950 text-cyan-300 border-indigo-700 hover:bg-indigo-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAllMathAnswers ? 'Թաքցնել պատասխանները' : 'Ցուցադրել բոլոր պատասխանները'}</span>
              </button>
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
            <button
              onClick={() => setSelectedMathLevel('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition whitespace-nowrap ${
                selectedMathLevel === 'all'
                  ? 'bg-white text-slate-950 border-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Բոլորը (20 խնդիր)
            </button>

            {MATH_LEVELS.map(lvl => {
              const isSelected = selectedMathLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedMathLevel(lvl.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span>{lvl.badge}</span>
                  <span>{lvl.nameEs} ({lvl.range})</span>
                </button>
              );
            })}
          </div>

          {/* Solved counter badge */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Բացված/լուծված պատասխաններ՝ <strong className="text-cyan-400 font-bold">{solvedMathCount}</strong> / 20
            </span>
            <span className="text-slate-500 text-[11px]">
              🇪🇸 Սեղմեք իսպաներենի վրա թարգմանության համար • 👁️ Սեղմեք «Պատասխան» լուծման համար
            </span>
          </div>

          {/* Math Problems Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-w-0">
            {filteredMathProblems.map(problem => {
              const isTranslationOpen = showAllMathTranslations || !!revealedMathTranslations[problem.id];
              const isAnswerOpen = showAllMathAnswers || !!revealedMathAnswers[problem.id];
              const userSelectedOption = mathUserSelections[problem.id];

              return (
                <div
                  key={problem.id}
                  className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-indigo-900/60 hover:border-cyan-500/50 transition-all duration-200 p-4 sm:p-5 shadow-lg flex flex-col justify-between gap-3 min-w-0 overflow-hidden"
                >
                  {/* Card Header: Level badge + Title + Pronounce + Single Translate toggle */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5 min-w-0 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0 flex-wrap">
                      <span className="text-lg shrink-0">{problem.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-cyan-400">
                            {problem.id}.
                          </span>
                          <span className="text-xs font-black text-white uppercase tracking-wide break-words">
                            {problem.titleEs}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({problem.titleHy})
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                          {problem.levelBadge} {problem.levelNameEs}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handlePronounce(`${problem.titleEs}. ${problem.scenarioEs}`)}
                        title="Լսել իսպաներեն արտասանությունը"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleMathTranslation(problem.id)}
                        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border transition ${
                          isTranslationOpen
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                        }`}
                        title="Բացել/փակել հայերեն թարգմանությունը"
                      >
                        {isTranslationOpen ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>🇦🇲 Հայերեն</span>
                      </button>
                    </div>
                  </div>

                  {/* Spanish Scenario — Clickable to reveal Armenian translation */}
                  <div
                    onClick={() => toggleMathTranslation(problem.id)}
                    className="cursor-pointer group p-3.5 rounded-xl bg-slate-950/70 border border-indigo-950 hover:border-amber-400/50 transition duration-150 min-w-0"
                    title="Կտտացրեք այստեղ՝ հայերեն թարգմանությունը բացելու համար / Clic para traducir"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-cyan-400 mb-1 flex-wrap gap-1">
                      <span>🇪🇸 Español (Սեղմեք թարգմանության համար)</span>
                      <span className="text-slate-500 group-hover:text-amber-300">
                        {isTranslationOpen ? '🇦🇲 Թարգմանությունը բացված է' : '👆 Կտտացրեք թարգմանության համար'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-slate-100 font-medium leading-relaxed break-words group-hover:text-amber-100 transition">
                      {problem.scenarioEs}
                    </p>
                  </div>

                  {/* Armenian Translation Block */}
                  {isTranslationOpen && (
                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-100 text-xs sm:text-sm leading-relaxed break-words animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                        <span>🇦🇲</span> Հայերեն թարգմանություն՝
                      </div>
                      <p className="text-slate-200 font-medium break-words">
                        {problem.scenarioHy}
                      </p>
                    </div>
                  )}

                  {/* Interactive Options Choice */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 block">
                      Ընտրեք պատասխանը կամ ստուգեք կոճակով՝
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {problem.options.map((opt, optIdx) => {
                        const isChosen = userSelectedOption === optIdx;
                        const isCorrect = optIdx === problem.correctOptionIndex;
                        let btnStyle = 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-500/70';

                        if (isAnswerOpen) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-400 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'bg-rose-950/80 text-rose-300 border-rose-500 line-through';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-cyan-950 text-cyan-200 border-cyan-400 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectMathOption(problem.id, optIdx)}
                            className={`p-2 rounded-xl text-xs font-semibold border transition text-center truncate ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Separate Answer Button & Answer Box */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      {/* Standalone Answer Button (կոճակ պատասխան) */}
                      <button
                        type="button"
                        onClick={() => toggleMathAnswer(problem.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition border shadow-sm ${
                          isAnswerOpen
                            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-300 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isAnswerOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isAnswerOpen ? 'Թաքցնել պատասխանը' : '👁️ Պատասխան (Ver respuesta)'}</span>
                      </button>

                      {isAnswerOpen && (
                        <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{problem.answerShortEs}</span>
                        </span>
                      )}
                    </div>

                    {/* Revealed Answer Explanation Box */}
                    {isAnswerOpen && (
                      <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/50 space-y-1.5 animate-in fade-in duration-200 text-xs sm:text-sm">
                        <div className="flex items-center justify-between text-xs font-black text-cyan-300">
                          <span>✅ Ճիշտ պատասխան՝ {problem.answerShortHy} ({problem.answerShortEs})</span>
                        </div>
                        <p className="text-slate-200 break-words font-medium">
                          <strong>🇦🇲 Հաշվարկ՝</strong> {problem.calculationHy}
                        </p>
                        <p className="text-slate-400 italic break-words text-xs">
                          <strong>🇪🇸 Cálculo:</strong> {problem.calculationEs}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Review Table of all 20 Math Solutions */}
          <div className="mt-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-cyan-300 text-sm sm:text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>20 Խնդիրների ամբողջական պատասխանների տեղեկատու (Respuestas)</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 text-xs">
              {MATH_PROBLEMS.map(p => (
                <div key={p.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                  <span className="text-slate-400 block font-bold">{p.id}. {p.titleEs}</span>
                  <span className="text-emerald-400 font-mono font-bold block">{p.answerShortEs}</span>
                  <span className="text-amber-300 text-[10px] block truncate">{p.answerShortHy}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Mobile & Tablet Drawer for Quiz Prize Ladder */}
      {showLadderDrawer && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-80 max-w-full bg-slate-900 border-l border-indigo-800 p-4 sm:p-5 flex flex-col justify-between h-full shadow-2xl min-w-0">
            <div className="min-w-0">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="font-black text-sm uppercase">Մրցանակային սանդուղք</span>
                </div>
                <button
                  onClick={() => setShowLadderDrawer(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 text-xs">
                {[...PRIZE_LADDER].reverse().map((step) => {
                  const isCurrent = gameState.currentQuestionIndex + 1 === step.level;
                  const isPassed = gameState.currentQuestionIndex >= step.level;

                  return (
                    <div
                      key={step.level}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg font-bold min-w-0 ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : isPassed
                          ? 'bg-indigo-950/40 text-amber-300'
                          : step.isMilestone
                          ? 'text-amber-400 font-extrabold bg-slate-950'
                          : 'text-slate-400'
                      }`}
                    >
                      <span>{step.level}. {step.isMilestone ? '⭐' : ''}</span>
                      <span className="font-mono">{step.amount}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowLadderDrawer(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition mt-3"
            >
              Փակել
            </button>
          </div>
        </div>
      )}

      {/* Lifeline Modal: Coach Advice */}
      {coachModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-slate-900 border-2 border-cyan-500/80 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 min-w-0">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="font-black text-cyan-300 text-sm sm:text-base uppercase">
                  Մարզչի Զանգ • Llamada al entrenador
                </h3>
              </div>
              <button
                onClick={() => setCoachModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm">
              <p className="text-cyan-100 font-medium leading-relaxed break-words">
                {coachModal.adviceHy}
              </p>
              <p className="text-slate-400 italic leading-relaxed break-words text-xs">
                {coachModal.adviceEs}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 flex-wrap gap-2">
              <span>Մարզիչը խորհուրդ է տալիս՝ <strong className="text-amber-400 font-bold">{coachModal.recommended}</strong></span>
              <button
                onClick={() => setCoachModal(null)}
                className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition text-xs"
              >
                Հասկացա
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lifeline Modal: Audience Vote */}
      {audienceModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-slate-900 border-2 border-purple-500/80 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 min-w-0">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400 shrink-0" />
                <h3 className="font-black text-purple-300 text-sm sm:text-base uppercase">
                  Ստադիոնի Հանդիսատեսի Կարծիքը
                </h3>
              </div>
              <button
                onClick={() => setAudienceModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Ստադիոնի երկրպագուների քվեարկության արդյունքները.
            </p>

            <div className="space-y-2.5">
              {audienceModal.results.map((res) => (
                <div key={res.optionId} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="text-amber-400">Տարբերակ {res.optionId}</span>
                    <span className="font-mono">{res.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${res.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setAudienceModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition text-xs"
              >
                Փակել
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-indigo-950/80 bg-slate-950/90 py-3 px-4 text-center text-xs text-slate-500">
        ⚽ Ֆուտբոլային Ինտերակտիվ Խաղադաշտ • 30 Իրավիճակներ («Միլիոնատեր») + 20 Մաթեմատիկական խնդիրներ • Հայերեն 🇦🇲 + Español 🇪🇸
      </footer>
    </div>
  );
}
