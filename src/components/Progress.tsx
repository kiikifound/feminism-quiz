export default function Progress({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="progressWrap" aria-label="进度条">
      <div className="progressBar" style={{ width: `${v}%` }} />
    </div>
  );
}
