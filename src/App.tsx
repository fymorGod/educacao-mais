import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { Disciplinas } from "./pages/Disciplinas";
import { OverviewDisciplinas } from "./pages/OverviewDisciplina";
import { CriarAula } from "./pages/CriarAulas";
import { CriarAtividades } from "./pages/CriarAtividades";
import { Dados } from "./pages/Dados";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/disciplinas"
            element={
              <Private>
                <Disciplinas />
              </Private>
            }
          />
           <Route
            path="/view-disciplinas/:idSerie/:idDisciplina"
            element={
              <Private>
                <OverviewDisciplinas />
              </Private>
            }
          />
           <Route
            path="/criar-disciplinas-Aulas/:id"
            element={
              <Private>
                <CriarAula />
              </Private>
            }
          />
           <Route
            path="/criar-disciplinas-Atividades/:id"
            element={
              <Private>
                <CriarAtividades />
              </Private>
            }
          />
           <Route
            path="/dados"
            element={
              <Private>
                <Dados />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
