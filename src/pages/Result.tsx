import idealsData from "../data/ideals.json";
import encyclopedia from "../data/encyclopedia.json";
import { DIMENSIONS } from "../data/dimensions";
import { loadAnswers } from "../lib/storage";
import { buildUserVec, computeTypeScores, pickMainSecond, checkConsistency } from "../lib/scoring";
import TopBarChart from "../components/TopBarChart";
import { dimMeaning, explainWhy, typeName, typeSummary, compareMainSecond } from "../lib/text";

export default function Result() {
  const answers = loadAnswers();
  const userVec = buildUserVec(answers);
  const scores = computeTypeScores(userVec, answers);
  const pick = pickMainSecond(scores);
  const consistency = checkConsistency(answers);

  const mainId = pick.mainId;

  // 直接取“得分第二高”的派别（不使用相邻派别，也不受混合规则影响）
  const secondId = pick.sorted[1]?.[0];

  const top5Labels = pick.top5.map(([id]) => typeName(id));
  const top5Values = pick.top5.map(([, v]) => Math.round(v));

  const mainSummary = typeSummary(mainId);
  const whyLines = explainWhy(mainId, secondId, userVec);
  const diffLines = secondId ? compareMainSecond(mainId, secondId, userVec) : [];

  const mainEntry = (encyclopedia as any)[mainId];
  const secondEntry = secondId ? (encyclopedia as any)[secondId] : undefined;

  return (
    <div className="card">
      <h2>结果</h2>

      <div className="row">
        <div className="card">
          <h3>核心派别</h3>
          <p style={{ marginTop: 6 }}>
            <b>{typeName(mainId)}</b>
            {secondId ? (
              <>
                {" "}
                <span className="small">（第二高： </span>
                <b>{typeName(secondId)}</b>
                <span className="small">）</span>
              </>
            ) : null}
          </p>
          <div className="hr" />
          {mainSummary.map((s, idx) => (
            <p key={idx} className="small">{s}</p>
          ))}
          <div className="hr" />
          <div className="small">{consistency.flag ? consistency.note : " "}</div>
        </div>

        <div className="card">
          <h3>派别分布（Top 5）</h3>
          <TopBarChart labels={top5Labels} values={top5Values} />
          <div className="small">分数表示“接近度”（0–100），不是“对错”。</div>
        </div>
      </div>

      <div className="hr" />

      <div className="card">
        <h3>核心变量得分与解读</h3>
        {userVec.map((v, i) => {
          const m = dimMeaning(i, v);
          return (
            <div key={i} className="q">
              <p><b>{DIMENSIONS[i].name}</b>：{Math.round(v)}/100</p>
              <p className="small">这个指标在问：{DIMENSIONS[i].left} ↔ {DIMENSIONS[i].right}</p>
              <p className="small">你的倾向：{m.band}</p>
            </div>
          );
        })}

        <div className="hr" />
        <h3>为什么更接近这个派别</h3>
        {whyLines.map((t, idx) => (
          <p key={idx} className="small">{t}</p>
        ))}

        {secondId ? (
          <>
            <div className="hr" />
            <h3>与第二高派别的区别点</h3>
            {diffLines.length ? diffLines.map((t, idx) => (
              <p key={idx} className="small">{t}</p>
            )) : <p className="small">暂无可用对比点。</p>}
          </>
        ) : null}
      </div>

      <div className="hr" />

      <div className="row">
        <div className="card">
          <h3>核心派别：代表人物与常见应对方式</h3>
          <p className="small"><b>代表人物：</b>{mainEntry?.figures?.length ? mainEntry.figures.join(" / ") : "—"}</p>
          <div className="hr" />
          {mainEntry?.typical_actions?.length ? (
            mainEntry.typical_actions.map((x: string, i: number) => <p key={i} className="small">{x}</p>)
          ) : <p className="small">—</p>}
        </div>

        {secondId && secondEntry ? (
          <div className="card">
            <h3>第二高派别：代表人物与常见应对方式</h3>
            <p className="small"><b>代表人物：</b>{secondEntry?.figures?.length ? secondEntry.figures.join(" / ") : "—"}</p>
            <div className="hr" />
            {secondEntry?.typical_actions?.length ? (
              secondEntry.typical_actions.map((x: string, i: number) => <p key={i} className="small">{x}</p>)
            ) : <p className="small">—</p>}
          </div>
        ) : null}
      </div>

      <div className="hr" />

      <div className="card">
        <h3>你的核心派别：定义与指标表现</h3>
        {(() => {
          const entry = (encyclopedia as any)[mainId];
          if (!entry) return <p className="small">无。</p>;
          return (
            <>
              <p className="small"><b>关注：</b>{entry.focus.join(" / ")}</p>
              <p className="small"><b>核心特点：</b>{entry.traits.join(" / ")}</p>
              <div className="hr" />
              {DIMENSIONS.map((d) => (
                <div key={d.key} className="q">
                  <p><b>{d.name}</b></p>
                  <p className="small">{entry.profile[d.key]}</p>
                </div>
              ))}
            </>
          );
        })()}
      </div>
    </div>
  );
}
