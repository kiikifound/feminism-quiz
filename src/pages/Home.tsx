import { Link } from "react-router-dom";

function Illu({ tone }: { tone: "blue" | "green" | "purple" }) {
  const c =
    tone === "blue" ? "#38bdf8" : tone === "green" ? "#2fbf71" : "#8b5cf6";
  return (
    <svg width="210" height="140" viewBox="0 0 210 140" role="img" aria-label="插图">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c} stopOpacity="0.20" />
          <stop offset="1" stopColor={c} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="210" height="140" rx="18" fill="url(#g)" />
      <circle cx="70" cy="70" r="34" fill={c} opacity="0.22" />
      <circle cx="115" cy="62" r="22" fill={c} opacity="0.16" />
      <rect x="120" y="78" width="60" height="10" rx="5" fill={c} opacity="0.25" />
      <rect x="110" y="96" width="76" height="10" rx="5" fill={c} opacity="0.18" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="heroGrid">
      <div className="card">
        <h1>女性主义立场图谱测评</h1>
        <p className="small">
          38 题，约 5–8 分钟。输出：核心派别 + 派别分布图 + 6 项指标得分 + 解释与相邻派别差异点。
        </p>
        <div className="hr" />
        <div className="actionRow">
          <div className="actionLeft">
            <Link className="btn primary" to="/test">开始测评</Link>
            <Link className="btn" to="/encyclopedia">先看派别百科</Link>
          </div>
          <div className="actionRight">
            <span className="badge">不做对错判断</span>
            <span className="badge">结果可混合</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>作答提示</h3>
        <ul className="small">
          <li>按直觉选；不需要“正确”。</li>
          <li>拿不准就选中间。</li>
          <li>有些题目会用例子帮助理解。</li>
        </ul>
      </div>

      <div className="row" style={{ gridColumn: "1 / -1" } as any}>
        <div className="card stepCard">
          <div className="stepTop" />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
            <div>
              <div className="stepTag">STEP 1</div>
              <h2 style={{ marginTop: 12 }}>完成测评</h2>
              <p className="small">按你的真实想法作答，得到立场图谱。</p>
            </div>
            <Illu tone="blue" />
          </div>
        </div>

        <div className="card stepCard">
          <div className="stepTop green" />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
            <div>
              <div className="stepTag green">STEP 2</div>
              <h2 style={{ marginTop: 12 }}>查看详细结果</h2>
              <p className="small">看到你在 6 个核心变量上的位置与分布。</p>
            </div>
            <Illu tone="green" />
          </div>
        </div>

        <div className="card stepCard">
          <div className="stepTop purple" />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
            <div>
              <div className="stepTag purple">STEP 3</div>
              <h2 style={{ marginTop: 12 }}>理解差异点</h2>
              <p className="small">解释为什么是这个派别，以及与相邻派别的区别。</p>
            </div>
            <Illu tone="purple" />
          </div>
        </div>
      </div>
    </div>
  );
}
