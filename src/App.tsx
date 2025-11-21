import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/atoms";

const HomePage = lazy(() => import("./pages/HomePage").then(module => ({ default: module.HomePage })));
const PlanoDetalhesPage = lazy(() => import("./pages/PlanoDetalhesPage").then(module => ({ default: module.PlanoDetalhesPage })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading fullScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plano/:id" element={<PlanoDetalhesPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
