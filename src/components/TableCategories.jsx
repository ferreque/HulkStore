import React, { useState, useEffect } from "react";
import { getCategories, deleteCategories } from "../helpers/categories";
import ModalCategories from "../components/modales/ModalCategories";

const TableCategories = () => {
  const [actualizar, setActualizar] = useState("");

  const [categories, setCategories] = useState({
    datos: [],
    loading: true,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getCategories().then((respuesta) => {
      setCategories({
        datos: respuesta.categories,
        loading: false,
      });
    });
  }, []);

  const borrarCategories = (id) => {
    let categ = categories.datos.find((categorie) => {
      return categorie._id === id;
    });
    let validar = window.confirm(
      `Esta seguro que desea eliminar la categoría ${categ.nombre}?`
    );
    if (validar) {
      deleteCategories(id).then((respuesta) => {
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
      });
    }
  };
  return (
    <>
      {categories.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
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
              </tr>
            </thead>
            <tbody>
              {categories.datos.map((categorie) => (
                <tr key={categorie._id}>
                  <th scope="row">{categorie.nombre}</th>
                  <td>
                    <button
                      className="btn btn-warning ms-2"
                      onClick={() => {
                        setActualizar(categorie._id);
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
                      onClick={() => borrarCategories(categorie._id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <ModalCategories
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

export default TableCategories;
