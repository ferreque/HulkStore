import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { getProduct, postProducts, putProducts } from "../../helpers/products";
import { getCategories } from "../../helpers/categories";

const ModalProducts = ({ show, handleClose, actualizar }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formValue, setFormValue] = useState({
    contador: 0,
    name: "",
    price: "",
    description: "",
    categorie: "",
    imagen: "",
    available: true,
    stock: "",
  });

  useEffect(() => {
    getCategories().then((respuesta) => {
      setCategories(respuesta.categories);
    });
  }, []);

  useEffect(() => {
    setFormValue({
      contador: 0,
      name: "",
      price: "",
      description: "",
      categorie: "",
      imagen: "",
      available: true,
      stock: "",
    });

    if (actualizar) {
      getProduct(actualizar).then((respuesta) => {
        setFormValue({
          contador: respuesta.product.amount,
          name: respuesta.product.name,
          price: respuesta.product.price,
          description: respuesta.product.description,
          categorie: respuesta.product.categorie,
          imagen: respuesta.product.imagen,
          available: respuesta.product.available,
          stock: respuesta.product.stock,
        });
      });
    }
  }, [actualizar]);

  const handleChange = ({ target }) => {
    if (target.name === "available") {
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
      putProducts(actualizar, formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          contador: 0,
          name: "",
          price: "",
          description: "",
          categorie: "",
          imagen: "",
          available: true,
          stock: "",
        });
        handleClose();
      });
    } else {
      postProducts(formValue).then((respuesta) => {
        if (respuesta.errors) {
          setLoading(false);
          return window.alert(respuesta.errors[0].msg);
        }
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
        setLoading(false);
        setFormValue({
          contador: 0,
          name: "",
          price: "",
          description: "",
          categorie: "",
          imagen: "",
          available: true,
          stock: "",
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
            {actualizar ? "Modificar producto" : "Nuevo producto"}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Ej: Hulk: La fuerza verde."
                required
                value={formValue.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Precio</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formValue.price}
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
              <label>Stock</label>
              <textarea
                type="number"
                name="stock"
                className="form-control"
                value={formValue.stock}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Imagen</label>
              <input
                type="text"
                name="imagen"
                className="form-control"
                placeholder=""
                value={formValue.imagen}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Categorias</label>
              <select
                className="form-select"
                name="categorie"
                aria-label="Default select example"
                value={formValue.categorie}
                onChange={handleChange}
                required
              >
                <option defaultValue="">Elige una categoría</option>
                <option value="6244b8bd4151f9c8eed8ed4f">Comics</option>
                <option value="6244bb794151f9c8eed8ed63">Accesorios</option>
                <option value="6244bb424151f9c8eed8ed59">Juguetes</option>
                <option value="6244bb6b4151f9c8eed8ed5f">Camisetas</option>
                <option value="6244bb354151f9c8eed8ed55">Vasos</option>
                <option value="624dae5273efb1b5638bdcb7">Otros</option>
              </select>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formValue.available}
                value={formValue.available}
                onChange={handleChange}
                name="available"
              />
              <label>Disponible</label>
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

export default ModalProducts;
