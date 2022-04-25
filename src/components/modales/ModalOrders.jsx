import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import { getOrder, postOrders, putOrders } from "../../helpers/orders";
import { getProducts } from "../../helpers/products";

const ModalOrders = ({ show, handleClose, actualizar }) => {
  let listCarrito = [];
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [formValue, setFormValue] = useState({
    products: "",
    totalPrice: "",
    status: "",
    shippingAddress: "",
    location: "",
    province: "",
    activeOrder: true,
  });

  useEffect(() => {
    getProducts().then((respuesta) => {
      setProducts(respuesta.products);
    });
  }, []);

  useEffect(() => {
    setFormValue({
      products: "",
      totalPrice: "",
      status: "",
      shippingAddress: "",
      location: "",
      province: "",
      activeOrder: true,
    });
    if (actualizar) {
      getOrder(actualizar).then((respuesta) => {
        respuesta.order.products.forEach((element) => {
          listCarrito.push(element.name);
        });

        setFormValue({
          products: listCarrito,
          totalPrice: respuesta.order.totalPrice,
          status: respuesta.order.status,
          shippingAddress: respuesta.order.shippingAddress,
          location: respuesta.order.location,
          province: respuesta.order.province,
          activeOrder: respuesta.order.activeOrder,
        });
      });
    }
  }, [actualizar]);

  const handleChange = ({ target }) => {
    if (target.name === "activeOrder") {
      setFormValue({
        ...formValue,
        [target.name]: target.checked,
      });
    } else {
      setFormValue({
        ...formValue,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (actualizar) {
      putOrders(actualizar, formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          products: "",
          totalPrice: "",
          status: "",
          shippingAddress: "",
          location: "",
          province: "",
          activeOrder: true,
        });
        handleClose();
      });
    } else {
      postOrders(formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          products: "",
          totalPrice: "",
          status: "",
          shippingAddress: "",
          location: "",
          province: "",
          activeOrder: true,
        });
        handleClose();
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {actualizar ? "Modificar orden" : "Nueva orden"}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label>Productos en carrito</label>
              <h5>{formValue.products}</h5>
            </div>
            <div className="form-group">
              <label>Provincia</label>
              <input
                type="text"
                name="province"
                className="form-control"
                required
                value={formValue.province}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Localidad</label>
              <input
                type="text"
                name="location"
                className="form-control"
                required
                value={formValue.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Direccion de envio</label>
              <input
                type="text"
                name="shippingAddress"
                className="form-control"
                required
                value={formValue.shippingAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Precio Total $</label>
              <input
                type="number"
                name="totalPrice"
                className="form-control"
                value={formValue.totalPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                type="text"
                name="description"
                className="form-control"
                value={formValue.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select
                className="form-select"
                name="status"
                aria-label="Default select example"
                value={formValue.status}
                onChange={handleChange}
                required
              >
                <option defaultValue="">Estado del pedido</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="ENVIADO">Enviado</option>
                <option value="ENTREGADO">Entregado</option>
              </select>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formValue.activeOrder}
                value={formValue.activeOrder}
                onChange={handleChange}
                name="activeOrder"
              />
              <label>Pedido Activo</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalOrders;
