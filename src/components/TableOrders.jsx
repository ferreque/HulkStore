import React, { useState, useEffect } from "react";
import { getOrders, deleteOrders } from "../helpers/orders";
import ModalOrders from "../components/modales/ModalOrders";

const TableOrders = () => {
  const [actualizar, setActualizar] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState({
    datos: [],
    loading: true,
  });

  useEffect(() => {
    getOrders().then((respuesta) => {
      setOrders({
        datos: respuesta.orders,
        loading: false,
      });
    });
  }, []);

  const borrarOrders = (id) => {
    let validar = window.confirm(`Esta seguro que desea eliminar el pedido?`);
    if (validar) {
      deleteOrders(id).then((respuesta) => {
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
      });
    }
  };
  return (
    <>
      {orders.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Estado</th>
                <th scope="col">Productos/Cantidad</th>
                <th scope="col">Provincia</th>
                <th scope="col">Localidad</th>
                <th scope="col">Dirección</th>
                <th scope="col">Precio Total</th>
                <th className="d-flex justify-content-end">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setActualizar("");
                      handleShow();
                    }}
                  >
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                  </button>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.datos.map((order) => (
                <tr key={order._id}>
                  <th scope="row">{order.status}</th>
                  {order.products.map((producto) => (
                    <tr key={producto._id} className="font-weight-bold">
                      <th>{producto.name}</th>
                      <th>{producto.amount}</th>
                    </tr>
                  ))}
                  <th scope="row">{order.province}</th>
                  <th scope="row">{order.location}</th>
                  <th scope="row">{order.shippingAddress}</th>
                  <th scope="row">{order.totalPrice}</th>
                  <td>
                    <button
                      className="btn btn-warning ms-2"
                      onClick={() => {
                        setActualizar(order._id);
                        handleShow();
                      }}
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => borrarOrders(order._id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <ModalOrders
              orders={orders}
              show={show}
              handleClose={handleClose}
              actualizar={actualizar}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TableOrders;
