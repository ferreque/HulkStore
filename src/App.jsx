import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RouterDos from "./routes/RouterDos";
import ProtectedRoute from "./routes/ProtectedRoute";
import Carrito from "./pages/Carrito";
import Admin from "./pages/Admin";
import Registro from "./pages/Register";
import Error404 from "./pages/Error404";
import { HulkFooter } from "./components/common/footer/HulkFooter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<Error404 />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RouterDos />} />
        </Route>
      </Routes>
      <HulkFooter />
    </Router>
  );
}
export default App;
