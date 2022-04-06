import React, { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";
import {
  getCategorie,
  postCategories,
  putCategories,
} from "../../helpers/categories";

const ModalCategories = ({ show, handleClose, actualizar }) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
  });

  useEffect(() => {
    setFormValue({
      nombre: "",
    });
    if (actualizar) {
      getCategorie(actualizar).then((respuesta) => {
        setFormValue({
          nombre: respuesta.categorie.nombre,
        });
      });
    }
  }, [actualizar]);

  const handleChange = (e) => {
    setFormValue({
      nombre: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (actualizar) {
      putCategories(actualizar, formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          nombre: "",
        });
        handleClose();
      });
    } else {
      postCategories(formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          nombre: "",
        });
        handleClose();
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva categoria</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Ej: Comics"
                required
                value={formValue.nombre}
                onChange={handleChange}
              />
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

export default ModalCategories;
