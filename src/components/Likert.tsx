const values = [1, 2, 3, 4, 5, 6, 7] as const;

// 由大到小再到大
const sizes = [44, 36, 28, 18, 28, 36, 44];

// 左侧：不同意（紫） 右侧：同意（绿）
function sideClass(v: number) {
  if (v <= 3) return "left";   // 不同意侧
  if (v >= 5) return "right";  // 同意侧
  return "mid";
}

export default function Likert({
  value,
  onChange,
  name,
  leftLabel = "不同意",
  rightLabel = "同意"
}: {
  value?: number;
  onChange: (v: number) => void;
  name: string;
  leftLabel?: string;
  rightLabel?: string;
}) {
  return (
    <div className="likertWrap" role="radiogroup" aria-label={name}>
      <div className="likertSide left">{leftLabel}</div>

      <div className="bubbles">
        {values.map((v, idx) => {
          const cls = sideClass(v);
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              className={`bubbleBtn ${cls} ${selected ? "selected" : ""}`}
              style={{ width: sizes[idx], height: sizes[idx] }}
              aria-pressed={selected}
              aria-label={`${leftLabel}/${rightLabel}：${v}`}
              onClick={() => onChange(v)}
            >
              <div className="bubbleDot" />
            </button>
          );
        })}
      </div>

      <div className="likertSide right">{rightLabel}</div>
    </div>
  );
}
