import { Link, useLocation } from "react-router-dom";

function NavLink({ to, label }: { to: string; label: string }) {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link className={active ? "active" : ""} to={to}>
      {label}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="header">
        <div className="headerInner">
          <Link to="/" className="brand" aria-label="返回首页">
            <div className="brandMark" />
            <div>立场图谱测评</div>
          </Link>

          <div className="navLinks">
            <NavLink to="/test" label="开始测评" />
            <NavLink to="/encyclopedia" label="派别百科" />
            <NavLink to="/method" label="方法" />
          </div>
        </div>
      </div>

      <div className="container">{children}</div>

      <div className="footer">本测评用于立场图谱展示；输出为“接近度”，不做对错判定。</div>
    </>
  );
}
