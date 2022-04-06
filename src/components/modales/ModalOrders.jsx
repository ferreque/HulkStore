import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import { getOrder, postOrders, putOrders } from "../../helpers/orders";
import { getProducts } from "../../helpers/products";

const ModalOrders = ({ show, handleClose, actualizar }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [formValue, setFormValue] = useState({
    producto: "",
    precioTotal: "",
    cantidad: "",
    estado: "",
    direccionEnvio: "",
    codigoPostal: "",
    localidad: "",
    provincia: "",
    pedidoActivo: true,
  });

  useEffect(() => {
    getProducts().then((respuesta) => {
      setProducts(respuesta.products);
    });
  }, []);

  useEffect(() => {
    setFormValue({
      producto: "",
      precioTotal: "",
      cantidad: "",
      estado: "",
      direccionEnvio: "",
      codigoPostal: "",
      localidad: "",
      provincia: "",
      pedidoActivo: true,
    });
    if (actualizar) {
      getOrder(actualizar).then((respuesta) => {
        setFormValue({
          producto: respuesta.order.product._id,
          precioTotal: respuesta.order.precioTotal,
          cantidad: respuesta.order.cantidad,
          estado: respuesta.order.estado,
          direccionEnvio: respuesta.order.direccionEnvio,
          codigoPostal: respuesta.order.codigoPostal,
          localidad: respuesta.order.localidad,
          provincia: respuesta.order.provincia,
          pedidoActivo: respuesta.order.pedidoActivo,
        });
      });
    }
  }, [actualizar]);

  const handleChange = ({ target }) => {
    if (target.name === "pedidoActivo") {
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
          producto: "",
          precioTotal: "",
          cantidad: "",
          estado: "",
          direccionEnvio: "",
          codigoPostal: "",
          localidad: "",
          provincia: "",
          pedidoActivo: true,
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
          producto: "",
          precioTotal: "",
          cantidad: "",
          estado: "",
          direccionEnvio: "",
          codigoPostal: "",
          localidad: "",
          provincia: "",
          pedidoActivo: true,
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
              <label>Provincia</label>
              <input
                type="text"
                name="provincia"
                className="form-control"
                placeholder="Tucumán"
                required
                value={formValue.provincia}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Localidad</label>
              <input
                type="text"
                name="localidad"
                className="form-control"
                placeholder="Chicligasta"
                required
                value={formValue.localidad}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Direccion de envio</label>
              <input
                type="text"
                name="direccionEnvio"
                className="form-control"
                placeholder="Lavalle 951 pb B"
                required
                value={formValue.direccionEnvio}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Precio Total</label>
              <input
                type="number"
                name="precioTotal"
                className="form-control"
                value={formValue.precioTotal}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Código postal</label>
              <input
                type="number"
                name="codigoPostal"
                className="form-control"
                value={formValue.codigoPostal}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                type="text"
                name="descripcion"
                className="form-control"
                value={formValue.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Producto</label>
              <select
                className="form-select"
                name="producto"
                value={formValue.product}
                onChange={handleChange}
                required
              >
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select
                className="form-select"
                name="estado"
                aria-label="Default select example"
                value={formValue.estado}
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
                checked={formValue.pedidoActivo}
                value={formValue.pedidoActivo}
                onChange={handleChange}
                name="pedidoActivo"
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
