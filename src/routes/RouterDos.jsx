import { Routes, Route } from "react-router-dom";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";
import Error404 from "../pages/Error404";
import Inicio from "../pages/Inicio";
import Admin from "../pages/Admin";

const RouterDos = () => {
  return (
    <>
      <HulkNavbar />
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route element={<Error404 />} />
      </Routes>
    </>
  );
};

export default RouterDos;
