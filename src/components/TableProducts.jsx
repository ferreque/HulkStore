import React, { useState, useEffect } from "react";
import { getProducts, deleteProducts } from "../helpers/products";
import ModalProducts from "../components/modales/ModalProducts";

const TableProducts = () => {
  const [actualizar, setActualizar] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [products, setProducts] = useState({
    datos: [],
    loading: true,
  });

  useEffect(() => {
    getProducts().then((respuesta) => {
      setProducts({
        datos: respuesta.products,
        loading: false,
      });
    });
  }, []);

  const borrarProducts = (id) => {
    let prod = products.datos.find((product) => {
      return product._id === id;
    });
    let validar = window.confirm(
      `Esta seguro que desea eliminar el producto ${prod.name}?`
    );
    if (validar) {
      deleteProducts(id).then((respuesta) => {
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
      });
    }
  };
  return (
    <>
      {products.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock</th>
                <th scope="col">Categoria</th>
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
              {products.datos.map((product) => (
                <tr key={product._id}>
                  <th scope="row">{product.name}</th>
                  <th scope="row">{product.price}</th>
                  <th scope="row">{product.stock}</th>
                  <th scope="row">{product.categorie.name}</th>
                  <td>
                    <button
                      className="btn btn-warning ms-2"
                      onClick={() => {
                        setActualizar(product._id);
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
                      onClick={() => borrarProducts(product._id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <ModalProducts
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

export default TableProducts;
