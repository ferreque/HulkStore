import React, { useState, useEffect } from "react";
import TableCategories from "../components/TableCategories";
import TableProducts from "../components/TableProducts";
import TableUsers from "../components/TableUsers";
import TableOrders from "../components/TableOrders";

const Admin = () => {
  const [state, setState] = useState({ rol: "" });
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("auth"));
    setState(datos.usuario);
  }, [state.rol]);

  if (state.rol !== "ADMIN_ROLE") {
    return (
      <div className="alert alert-danger text-center" role="alert">
        USUARIO NO AUTORIZADO
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>ADMINISTRACION</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-6 ">
          <h3>Usuarios</h3>
          <TableUsers />
        </div>
        <div className="col-10 col-md-4 offset-md-1">
          <h3>Categorias</h3>
          <TableCategories />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Productos</h3>
          <TableProducts />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Pedidos</h3>
          <TableOrders />
        </div>
      </div>
    </div>
  );
};
export default Admin;
