import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PlanoDetalhesPage } from "./pages/PlanoDetalhesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plano/:id" element={<PlanoDetalhesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
