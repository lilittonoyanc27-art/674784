import test from 'node:test';
import assert from 'node:assert/strict';
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
  calculatePlayerSummary
} from './rules.ts';
import { QUIZ_QUESTIONS, PRIZE_LADDER } from './questions.ts';
import { MATH_PROBLEMS, MATH_LEVELS } from './mathProblems.ts';

test('QUIZ_QUESTIONS contains exactly 30 questions with 4 options each', () => {
  assert.equal(QUIZ_QUESTIONS.length, 30);
  QUIZ_QUESTIONS.forEach((q, idx) => {
    assert.equal(q.id, idx + 1);
    assert.equal(q.options.length, 4, `Question ${q.id} must have 4 options`);
    assert.ok(q.titleEs.length > 0, `Question ${q.id} must have Spanish title`);
    assert.ok(q.titleHy.length > 0, `Question ${q.id} must have Armenian title`);
    assert.ok(q.scenarioEs.length > 0, `Question ${q.id} must have Spanish scenario`);
    assert.ok(q.scenarioHy.length > 0, `Question ${q.id} must have Armenian scenario`);
    q.options.forEach((opt) => {
      assert.ok(opt.es.length > 0, `Question ${q.id} option ${opt.id} missing Spanish`);
      assert.ok(opt.hy.length > 0, `Question ${q.id} option ${opt.id} missing Armenian`);
    });
  });
});

test('PRIZE_LADDER contains 30 levels terminating at €1,000,000', () => {
  assert.equal(PRIZE_LADDER.length, 30);
  assert.equal(PRIZE_LADDER[29].amount, '€1,000,000 🏆');
  assert.equal(PRIZE_LADDER[29].value, 1000000);
});

test('getInitialGameState returns valid initial state', () => {
  const state = getInitialGameState();
  assert.equal(state.currentQuestionIndex, 0);
  assert.equal(state.selectedOptionId, null);
  assert.equal(state.confirmedAnswers.length, 0);
  assert.equal(state.isCompleted, false);
  assert.equal(state.lifelines.fiftyFifty, true);
  assert.equal(state.lifelines.coachAdvice, true);
  assert.equal(state.lifelines.audienceVote, true);
});

test('getCurrentQuestion returns first question initially', () => {
  const state = getInitialGameState();
  const q = getCurrentQuestion(state);
  assert.ok(q !== null);
  assert.equal(q?.id, 1);
  assert.equal(q?.titleEs, 'La última oportunidad');
  assert.equal(q?.titleHy, 'Վերջին հնարավորությունը');
});

test('selectOption and advanceToNextQuestion updates index and records choice', () => {
  let state = getInitialGameState();
  state = selectOption(state, 'B');
  assert.equal(state.selectedOptionId, 'B');

  state = advanceToNextQuestion(state);
  assert.equal(state.currentQuestionIndex, 1);
  assert.equal(state.selectedOptionId, null);
  assert.equal(state.confirmedAnswers.length, 1);
  assert.equal(state.confirmedAnswers[0].questionId, 1);
  assert.equal(state.confirmedAnswers[0].optionId, 'B');

  const q2 = getCurrentQuestion(state);
  assert.equal(q2?.id, 2);
});

test('getCurrentPrize and getProgressPercentage return accurate calculations', () => {
  assert.equal(getCurrentPrize(0), '€0');
  assert.equal(getCurrentPrize(1), '€100');
  assert.equal(getCurrentPrize(10), '€32,000');
  assert.equal(getCurrentPrize(30), '€1,000,000 🏆');

  assert.equal(getProgressPercentage(0, 30), 0);
  assert.equal(getProgressPercentage(15, 30), 50);
  assert.equal(getProgressPercentage(30, 30), 100);
});

test('toggle translations works for question and individual options', () => {
  let state = getInitialGameState();
  state = toggleQuestionTranslation(state, 1);
  assert.equal(state.revealedTranslationQuestionId, 1);

  state = toggleQuestionTranslation(state, 1);
  assert.equal(state.revealedTranslationQuestionId, null);

  state = toggleOptionTranslation(state, 1, 'A');
  assert.equal(state.revealedOptionTranslations['1_A'], true);

  state = toggleOptionTranslation(state, 1, 'A');
  assert.equal(state.revealedOptionTranslations['1_A'], false);
});

test('useFiftyFifty eliminates 2 options and consumes lifeline', () => {
  let state = getInitialGameState();
  const res = useFiftyFifty(state);
  assert.equal(res.nextState.lifelines.fiftyFifty, false);
  assert.equal(res.eliminated.length, 2);
  assert.equal(res.nextState.eliminatedOptions.length, 2);
});

test('calculatePlayerSummary determines archetypes appropriately', () => {
  const teamAnswers: { questionId: number; optionId: 'A' | 'B' | 'C' | 'D' }[] = [
    { questionId: 1, optionId: 'B' },
    { questionId: 2, optionId: 'B' },
    { questionId: 3, optionId: 'B' },
  ];
  const summary = calculatePlayerSummary(teamAnswers);
  assert.equal(summary.archetype, 'Líder Colaborativo');
  assert.ok(summary.stats.teamwork > 90);
});

test('MATH_PROBLEMS contains exactly 20 soccer math tasks across 4 levels', () => {
  assert.equal(MATH_PROBLEMS.length, 20);
  assert.equal(MATH_LEVELS.length, 4);

  MATH_PROBLEMS.forEach((prob, idx) => {
    assert.equal(prob.id, idx + 1);
    assert.ok(prob.titleEs.length > 0, `Problem ${prob.id} needs titleEs`);
    assert.ok(prob.titleHy.length > 0, `Problem ${prob.id} needs titleHy`);
    assert.ok(prob.scenarioEs.length > 0, `Problem ${prob.id} needs scenarioEs`);
    assert.ok(prob.scenarioHy.length > 0, `Problem ${prob.id} needs scenarioHy`);
    assert.ok(prob.answerShortEs.length > 0, `Problem ${prob.id} needs answerShortEs`);
    assert.ok(prob.answerShortHy.length > 0, `Problem ${prob.id} needs answerShortHy`);
    assert.ok(prob.calculationEs.length > 0, `Problem ${prob.id} needs calculationEs`);
    assert.ok(prob.calculationHy.length > 0, `Problem ${prob.id} needs calculationHy`);
    assert.equal(prob.options.length, 4, `Problem ${prob.id} needs 4 options`);
    assert.ok(prob.correctOptionIndex >= 0 && prob.correctOptionIndex < 4);
    assert.ok(prob.options[prob.correctOptionIndex].includes(prob.answerShortEs.split(' ')[0]) || prob.answerShortEs.includes(prob.options[prob.correctOptionIndex]));
  });
});

