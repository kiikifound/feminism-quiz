import { DIMENSIONS } from "../data/dimensions";
import ideals from "../data/ideals.json";

export default function Method() {
  return (
    <div className="card">
      <h2>方法说明</h2>
      <p className="small">
        本测评用 6 个核心指标把答案转成 0–100 的向量，再与 9 个派别的“典型取向向量”做相似度匹配。
        输出的是“接近度”，不是对错判定。
      </p>
      <div className="hr" />
      <h3>6 个指标</h3>
      {DIMENSIONS.map((d) => (
        <div key={d.key} className="q">
          <p><b>{d.name}</b></p>
          <p className="small">{d.left} ↔ {d.right}</p>
        </div>
      ))}
      <div className="hr" />
      <h3>混合型规则</h3>
      <p className="small">
        若第二名接近度 ≥ 第一名的 {(ideals as any).mixRule.ratio * 100}% 或两者差距 ≤ {(ideals as any).mixRule.gap}，
        则显示“主派别 + 次派别”。
      </p>
      <div className="hr" />
      <h3>校准题</h3>
      <p className="small">
        第 31–36 题用于细分容易相近的派别，作为相似度的微调加成。
      </p>
    </div>
  );
}
