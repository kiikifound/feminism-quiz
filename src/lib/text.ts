import idealsData from "../data/ideals.json";
import encyclopedia from "../data/encyclopedia.json";
import { DIMENSIONS } from "../data/dimensions";

export function typeName(typeId: string) {
  const t = (idealsData as any).types.find((x: any) => x.id === typeId);
  return t?.name ?? typeId;
}

export function typeSummary(typeId: string): string[] {
  const entry = (encyclopedia as any)[typeId];
  return entry?.summary ?? [];
}

export function dimMeaning(dimId: number, score: number) {
  const d = DIMENSIONS[dimId];
  let band = "两边都能理解";
  if (score <= 33) band = d.left;
  else if (score >= 67) band = d.right;
  return { band, left: d.left, right: d.right };
}

export function explainWhy(mainId: string, secondId: string | undefined, userVec: number[]) {
  const idealMain = (idealsData as any).types.find((x: any) => x.id === mainId)?.ideal as number[];
  const diffs = idealMain.map((v, i) => Math.abs(userVec[i] - v));
  const sortedIdx = diffs.map((v, i) => ({ i, v })).sort((a, b) => a.v - b.v);
  const fit = sortedIdx.slice(0, 3).map((x) => x.i);

  const fitText = fit.map((i) => `【${DIMENSIONS[i].name}】`).join("、");

  const lines: string[] = [];
  lines.push(`你和该派别最贴近的部分主要集中在 ${fitText}。`);
  if (secondId) lines.push(`整体接近度第二高的是「${typeName(secondId)}」，因此也可作为参考视角。`);
  return lines;
}

export function compareMainSecond(mainId: string, secondId: string, userVec: number[]) {
  const main = (idealsData as any).types.find((x: any) => x.id === mainId)?.ideal as number[] | undefined;
  const second = (idealsData as any).types.find((x: any) => x.id === secondId)?.ideal as number[] | undefined;
  if (!main || !second) return [];

  const diffs = main
    .map((v, i) => ({ i, v: Math.abs(v - second[i]) }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 2)
    .map((x) => x.i);

  return diffs.map((i) => {
    const d = DIMENSIONS[i];
    const closerTo =
      Math.abs(userVec[i] - main[i]) <= Math.abs(userVec[i] - second[i]) ? typeName(mainId) : typeName(secondId);
    const hint = userVec[i] >= 50 ? d.right : d.left;
    return `在【${d.name}】上，你更靠近「${closerTo}」，同时你的回答倾向“${hint}”。`;
  });
}
