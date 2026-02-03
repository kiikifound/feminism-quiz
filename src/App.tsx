import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Encyclopedia from "./pages/Encyclopedia";
import Method from "./pages/Method";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/method" element={<Method />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
