// import { HulkFooter } from "./components/common/footer/HulkFooter";
// import { HulkNavbar } from "./components/common/navbar/HulkNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RouterDos from "./routes/RouterDos";
import ProtectedRoute from "./routes/ProtectedRoute";
import Carrito from "./pages/Carrito";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RouterDos />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
