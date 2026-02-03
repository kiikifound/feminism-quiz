import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions.json";
import Likert from "../components/Likert";
import Progress from "../components/Progress";
import { loadAnswers, saveAnswers, clearAnswers } from "../lib/storage";

export default function Test() {
  const nav = useNavigate();
  const [answers, setAnswers] = useState(() => loadAnswers());
  const [idx, setIdx] = useState(0);

  const total = questions.length;
  const q = questions[idx];

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = (answeredCount / total) * 100;

  function setOne(qid: number, v: number) {
    const next = { ...answers, [qid]: v };
    setAnswers(next);
    saveAnswers(next);
  }

  function next() {
    if (!answers[q.id]) {
      alert("请先选择一个选项。");
      return;
    }
    if (idx < total - 1) setIdx((i) => i + 1);
    else submit();
  }

  function prev() {
    setIdx((i) => Math.max(0, i - 1));
  }

  function submit() {
    for (const qq of questions) {
      if (!answers[qq.id]) {
        alert(`你还有未作答题目（例如第 ${qq.id} 题）。`);
        return;
      }
    }
    nav("/result");
  }

  return (
    <div className="card">
      <div className="actionRow">
        <div className="actionLeft">
          <span className="badge">题目 {idx + 1} / {total}</span>
          <span className="badge">已作答 {answeredCount}</span>
        </div>
        <div className="actionRight">
          <button className="btn" onClick={() => { clearAnswers(); setAnswers({}); setIdx(0); }}>清空答案</button>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <Progress value={progress} />
      </div>

      <div className="qWrap">
        <p className="qTitle">{q.text}</p>

        <Likert
          name={`q-${q.id}`}
          value={answers[q.id]}
          onChange={(v) => setOne(q.id, v)}
          leftLabel="不同意"
          rightLabel="同意"
        />
      </div>

      <div className="hr" />

      <div className="actionRow">
        <div className="actionLeft">
          <button className="btn" onClick={prev} disabled={idx === 0}>上一题</button>
          <button className="btn primary" onClick={next}>{idx === total - 1 ? "提交并查看结果" : "下一题"}</button>
        </div>
        <div className="actionRight">
          <button className="btn" onClick={() => nav("/result")}>直接看结果</button>
        </div>
      </div>

      <div className="small" style={{ marginTop: 10 }}>
        提示：拿不准就选中间；可以回到上一题修改。
      </div>
    </div>
  );
}
