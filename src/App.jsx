import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<Private><Home/></Private>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
