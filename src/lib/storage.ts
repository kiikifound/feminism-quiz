import type { AnswerMap } from "./scoring";

const KEY = "feminism-quiz-answers-v1";

export function loadAnswers(): AnswerMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveAnswers(a: AnswerMap) {
  localStorage.setItem(KEY, JSON.stringify(a));
}

export function clearAnswers() {
  localStorage.removeItem(KEY);
}
