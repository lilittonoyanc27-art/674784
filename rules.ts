import { QUIZ_QUESTIONS, PRIZE_LADDER, type QuizQuestion } from './questions.ts';

export interface GameState {
  currentQuestionIndex: number;
  selectedOptionId: 'A' | 'B' | 'C' | 'D' | null;
  confirmedAnswers: { questionId: number; optionId: 'A' | 'B' | 'C' | 'D' }[];
  isCompleted: boolean;
  lifelines: {
    fiftyFifty: boolean;
    coachAdvice: boolean;
    audienceVote: boolean;
  };
  eliminatedOptions: ('A' | 'B' | 'C' | 'D')[];
  revealedTranslationQuestionId: number | null;
  revealedOptionTranslations: Record<string, boolean>; // key: `${questionId}_${optionId}`
  showAllArmenian: boolean;
  soundEnabled: boolean;
}

export function getInitialGameState(): GameState {
  return {
    currentQuestionIndex: 0,
    selectedOptionId: null,
    confirmedAnswers: [],
    isCompleted: false,
    lifelines: {
      fiftyFifty: true,
      coachAdvice: true,
      audienceVote: true,
    },
    eliminatedOptions: [],
    revealedTranslationQuestionId: null,
    revealedOptionTranslations: {},
    showAllArmenian: false,
    soundEnabled: true,
  };
}

export function getCurrentQuestion(state: GameState): QuizQuestion | null {
  if (state.currentQuestionIndex < 0 || state.currentQuestionIndex >= QUIZ_QUESTIONS.length) {
    return null;
  }
  return QUIZ_QUESTIONS[state.currentQuestionIndex];
}

export function getCurrentPrize(questionIndex: number): string {
  if (questionIndex <= 0) return '€0';
  const prize = PRIZE_LADDER[questionIndex - 1];
  return prize ? prize.amount : '€1,000,000';
}

export function getProgressPercentage(questionIndex: number, total: number = QUIZ_QUESTIONS.length): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((questionIndex / total) * 100));
}

export function selectOption(state: GameState, optionId: 'A' | 'B' | 'C' | 'D'): GameState {
  return {
    ...state,
    selectedOptionId: optionId,
  };
}

export function advanceToNextQuestion(state: GameState): GameState {
  if (state.selectedOptionId === null) return state;

  const currentQ = getCurrentQuestion(state);
  if (!currentQ) return state;

  const updatedConfirmed = [
    ...state.confirmedAnswers,
    { questionId: currentQ.id, optionId: state.selectedOptionId }
  ];

  const nextIndex = state.currentQuestionIndex + 1;
  const isFinished = nextIndex >= QUIZ_QUESTIONS.length;

  return {
    ...state,
    currentQuestionIndex: isFinished ? state.currentQuestionIndex : nextIndex,
    selectedOptionId: null,
    eliminatedOptions: [],
    revealedTranslationQuestionId: null,
    isCompleted: isFinished,
    confirmedAnswers: updatedConfirmed,
  };
}

export function toggleQuestionTranslation(state: GameState, questionId: number): GameState {
  return {
    ...state,
    revealedTranslationQuestionId:
      state.revealedTranslationQuestionId === questionId ? null : questionId,
  };
}

export function toggleOptionTranslation(state: GameState, questionId: number, optionId: string): GameState {
  const key = `${questionId}_${optionId}`;
  return {
    ...state,
    revealedOptionTranslations: {
      ...state.revealedOptionTranslations,
      [key]: !state.revealedOptionTranslations[key],
    },
  };
}

export function useFiftyFifty(state: GameState): { nextState: GameState; eliminated: ('A' | 'B' | 'C' | 'D')[] } {
  if (!state.lifelines.fiftyFifty) return { nextState: state, eliminated: [] };

  const currentQ = getCurrentQuestion(state);
  if (!currentQ) return { nextState: state, eliminated: [] };

  // Keep chosen if already selected, or pick 2 options to gray out
  const allIds: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const preferred = state.selectedOptionId || 'B';
  const remainingCandidates = allIds.filter(id => id !== preferred);
  
  // Choose 2 random candidates to eliminate
  const eliminated: ('A' | 'B' | 'C' | 'D')[] = [remainingCandidates[0], remainingCandidates[1]];

  return {
    nextState: {
      ...state,
      lifelines: {
        ...state.lifelines,
        fiftyFifty: false,
      },
      eliminatedOptions: eliminated,
    },
    eliminated,
  };
}

export function useCoachAdvice(state: GameState): { nextState: GameState; adviceEs: string; adviceHy: string; recommendedOption: 'A' | 'B' | 'C' | 'D' } {
  const currentQ = getCurrentQuestion(state);
  const recommended: 'A' | 'B' | 'C' | 'D' = currentQ ? (currentQ.options[1]?.id || 'B') : 'B';

  const option = currentQ?.options.find(o => o.id === recommended);

  return {
    nextState: {
      ...state,
      lifelines: {
        ...state.lifelines,
        coachAdvice: false,
      },
    },
    recommendedOption: recommended,
    adviceEs: option
      ? `«Como entrenador, recomiendo la opción ${recommended}: "${option.es}". Es la más sólida para el colectivo.»`
      : '«Confía en tu criterio táctico y mantén la calma.»',
    adviceHy: option
      ? `«Որպես մարզիչ՝ խորհուրդ եմ տալիս ${recommended} տարբերակը՝ «${option.hy}»: Սա լավագույն լուծումն է թիմի համար:»`
      : '«Վստահիր քո ներքին ինտուիցիային և սառնասրտություն պահպանիր:»',
  };
}

export function useAudienceVote(state: GameState): {
  nextState: GameState;
  pollResults: { optionId: 'A' | 'B' | 'C' | 'D'; percentage: number }[];
} {
  // Generate realistic poll distribution favoring intelligent play
  const pollResults: { optionId: 'A' | 'B' | 'C' | 'D'; percentage: number }[] = [
    { optionId: 'A', percentage: 22 },
    { optionId: 'B', percentage: 48 },
    { optionId: 'C', percentage: 8 },
    { optionId: 'D', percentage: 22 },
  ];

  return {
    nextState: {
      ...state,
      lifelines: {
        ...state.lifelines,
        audienceVote: false,
      },
    },
    pollResults,
  };
}

export function calculatePlayerSummary(answers: { questionId: number; optionId: 'A' | 'B' | 'C' | 'D' }[]): {
  titleHy: string;
  titleEs: string;
  archetype: string;
  badge: string;
  descriptionHy: string;
  descriptionEs: string;
  stats: { leadership: number; teamwork: number; bravery: number; tactics: number };
} {
  let countA = 0;
  let countB = 0;
  let countC = 0;
  let countD = 0;

  answers.forEach(a => {
    if (a.optionId === 'A') countA++;
    if (a.optionId === 'B') countB++;
    if (a.optionId === 'C') countC++;
    if (a.optionId === 'D') countD++;
  });

  const total = answers.length || 1;

  if (countB >= countA && countB >= countC && countB >= countD) {
    return {
      titleHy: 'Թիմային Առաջնորդ և Սիրված Ավագ',
      titleEs: 'El Gran Capitán Solidario',
      archetype: 'Líder Colaborativo',
      badge: '👑 ⚽',
      descriptionHy: 'Դուք նախընտրում եք համախմբվածություն, ընկերասիրություն և թիմային հաղթանակ։ Ձեր հանդերձարանը անխորտակելի ամրոց է։',
      descriptionEs: 'Priorizas la camaradería, la justicia y la cohesión grupal. Eres el alma del vestuario.',
      stats: { leadership: 96, teamwork: 98, bravery: 85, tactics: 92 },
    };
  }

  if (countD >= countA && countD >= countB && countD >= countC) {
    return {
      titleHy: 'Իմաստուն Ռազմավար և Պրոֆեսիոնալ',
      titleEs: 'El Estratega Sabio y Disciplinado',
      archetype: 'Táctico Maduro',
      badge: '🧠 🏆',
      descriptionHy: 'Դուք աչքի եք ընկնում սառնասրտությամբ, բանակցային հմտություններով և ճիշտ դիրքավորմամբ։ Իսկական մարզչական մտածողություն։',
      descriptionEs: 'Destacas por tu serenidad táctica, lectura de partido y madurez bajo presión.',
      stats: { leadership: 94, teamwork: 90, bravery: 88, tactics: 98 },
    };
  }

  if (countA >= countB && countA >= countC && countA >= countD) {
    return {
      titleHy: 'Համարձակ Գոլահար և Վճռական Աստղ',
      titleEs: 'El Goleador Valiente y Audaz',
      archetype: 'Delantero Decidido',
      badge: '⚡ ⚽',
      descriptionHy: 'Դուք չեք վախենում պատասխանատվությունից և միշտ ձգտում եք առաջինը հարվածել դարպասին։ Հաղթանակի կրակը միշտ վառ է Ձեր մեջ։',
      descriptionEs: 'Asumes el peso del partido sin temblores. Siempre buscas la portería con hambre de gloria.',
      stats: { leadership: 88, teamwork: 82, bravery: 99, tactics: 86 },
    };
  }

  return {
    titleHy: 'Ունիվերսալ Խաղացող և Ֆուտբոլային Էսթետ',
    titleEs: 'El Jugador Universal Polivalente',
    archetype: 'Futbolista Creativo',
    badge: '🌟 ⚽',
    descriptionHy: 'Դուք անկանխատեսելի եք, հարմարվող և ունակ եք ելք գտնել ցանկացած բարդ իրավիճակից։',
    descriptionEs: 'Imprevisible, adaptable y versátil. Sabes resolver cualquier enigma futbolístico.',
    stats: { leadership: 90, teamwork: 88, bravery: 90, tactics: 91 },
  };
}

// Web Audio API synthesizers for dramatic Who Wants to Be a Millionaire atmosphere
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playSound(
  type: 'select' | 'lock' | 'next' | 'lifeline' | 'fanfare' | 'toggle' | 'hover',
  enabled: boolean = true
): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'select') {
      // Golden lock-in tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.18);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'lock') {
      // Millionaire tense chord
      [220, 330, 440].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        gain.gain.setValueAtTime(0.15, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + 0.45);
      });
    } else if (type === 'next') {
      // Whoosh triumph ding
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'lifeline') {
      // Shimmering chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } else if (type === 'toggle') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'fanfare') {
      // Final champion fanfare
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.22, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.6);
      });
    }
  } catch {
    // Gracefully ignore audio errors in restricted browser contexts
  }
}

export function speakSpanish(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[🇦🇲🇪🇸«»"“”.]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech errors
  }
}
