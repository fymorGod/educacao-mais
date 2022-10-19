import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { Disciplinas } from "./pages/Disciplinas";
import { CreateDisciplinas } from "./pages/CreateDisciplinas";
import { EditAula } from "./pages/EditarAula";

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
            path="/criar-disciplinas/:id"
            element={
              <Private>
                <CreateDisciplinas />
              </Private>
            }
          />
           <Route
            path="/criar-disciplinas-Aulas/:id"
            element={
              <Private>
                <EditAula />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
