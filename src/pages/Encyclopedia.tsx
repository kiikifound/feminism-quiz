import encyclopedia from "../data/encyclopedia.json";
import idealsData from "../data/ideals.json";
import { DIMENSIONS } from "../data/dimensions";
import { typeName } from "../lib/text";

export default function Encyclopedia() {
  const ids = (idealsData as any).types.map((t: any) => t.id);

  return (
    <div className="card">
      <h2>派别百科</h2>
      <p className="small">每个派别包含：概括 + 关注/特点 + 代表人物 + 常见应对方式 + 6个指标上的典型表现。</p>
      <div className="hr" />

      {ids.map((id: string) => {
        const e = (encyclopedia as any)[id];
        if (!e) return null;
        return (
          <div key={id} className="card" style={{ marginBottom: 14 }}>
            <h3>{typeName(id)}</h3>
            <div className="small">
              {e.summary?.map((s: string, i: number) => <p key={i} className="small">{s}</p>)}
            </div>
            <div className="hr" />
            <p className="small"><b>关注：</b>{e.focus.join(" / ")}</p>
            <p className="small"><b>核心特点：</b>{e.traits.join(" / ")}</p>
            <p className="small"><b>代表人物：</b>{e.figures?.length ? e.figures.join(" / ") : "—"}</p>
            <div className="hr" />
            <p className="small"><b>现实社会中常见应对方式（例）：</b></p>
            {e.typical_actions?.length ? e.typical_actions.map((x: string, i: number) => (
              <p key={i} className="small">{x}</p>
            )) : <p className="small">—</p>}
            <div className="hr" />
            {DIMENSIONS.map((d) => (
              <div key={d.key} className="q">
                <p><b>{d.name}</b></p>
                <p className="small">{e.profile[d.key]}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
