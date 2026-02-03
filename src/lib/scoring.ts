import idealsData from "../data/ideals.json";
import questions from "../data/questions.json";

export type AnswerMap = Record<number, number>;
export type UserVec = [number, number, number, number, number, number];

type IdealsData = typeof idealsData;

function scoreAnswer(ans1to7: number, reverse: boolean): number {
  const raw = ((ans1to7 - 1) / 6) * 100;
  return reverse ? 100 - raw : raw;
}

export function buildUserVec(answers: AnswerMap): UserVec {
  const buckets: number[][] = Array.from({ length: 6 }, () => []);
  for (const q of questions) {
    const a = answers[q.id];
    if (!a) continue;
    const s = scoreAnswer(a, q.reverse);
    buckets[q.dim].push(s);
  }
  return buckets.map((arr) => (arr.length ? arr.reduce((p, c) => p + c, 0) / arr.length : 50)) as UserVec;
}

function weightedDistance(userVec: number[], idealVec: number[], w: number[]): number {
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    const diff = userVec[i] - idealVec[i];
    sum += w[i] * diff * diff;
  }
  return Math.sqrt(sum);
}

function baseSimilarity(d: number, temp: number): number {
  return 100 * Math.exp(-d / temp);
}

function z01toNegPos(score0to100: number): number {
  return (score0to100 - 50) / 50;
}

function getCalibrationScores(answers: AnswerMap): Record<number, number> {
  const calIds = (idealsData as IdealsData).calibration.questions;
  const map: Record<number, number> = {};
  for (const id of calIds) {
    const q = questions.find((x) => x.id === id);
    const a = answers[id];
    if (!q || !a) continue;
    map[id] = scoreAnswer(a, q.reverse);
  }
  return map;
}

function calibrationBonus(typeId: string, answers: AnswerMap): number {
  const cfg = (idealsData as IdealsData).calibration;
  const calScores = getCalibrationScores(answers);
  const prefs = (cfg.typePrefs as Record<string, number[]>)[typeId];
  if (!prefs) return 0;

  let sum = 0;
  let n = 0;
  cfg.questions.forEach((qid, idx) => {
    const pref = prefs[idx];
    if (pref === 0) return;
    const s = calScores[qid];
    if (s === undefined) return;
    sum += pref * z01toNegPos(s);
    n += 1;
  });

  if (n === 0) return 0;
  return (sum / n) * cfg.bonusWeight;
}

export function computeTypeScores(userVec: UserVec, answers: AnswerMap) {
  const cfg = idealsData as IdealsData;
  const out: Record<string, number> = {};

  for (const t of cfg.types) {
    const d = weightedDistance(userVec, t.ideal, cfg.weights);
    let sim = baseSimilarity(d, cfg.similarityTemp);
    sim += calibrationBonus(t.id, answers);
    out[t.id] = Math.max(0, Math.min(100, sim));
  }

  return out;
}

export function pickMainSecond(scores: Record<string, number>) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [mainId, mainScore] = sorted[0];
  const [secondId, secondScore] = sorted[1] ?? [undefined, undefined];

  const ratio = (idealsData as IdealsData).mixRule.ratio;
  const gap = (idealsData as IdealsData).mixRule.gap;

  const second =
    secondId && secondScore !== undefined
      ? (secondScore >= mainScore * ratio || mainScore - secondScore <= gap ? secondId : undefined)
      : undefined;

  return { mainId, secondId: second, sorted, top5: sorted.slice(0, 5) };
}

export function checkConsistency(answers: AnswerMap) {
  const q37 = answers[37];
  const q38 = answers[38];
  if (!q37 || !q38) return { flag: false, note: "" };
  const extremeSame = (q37 >= 6 && q38 >= 6) || (q37 <= 2 && q38 <= 2);
  return {
    flag: extremeSame,
    note: extremeSame ? "你的回答在少数题目上呈现较高自洽张力（不影响派别判定）。" : ""
  };
}
