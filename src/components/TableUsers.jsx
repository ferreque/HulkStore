import React, { useState, useEffect } from "react";
import { getUsers, deleteUsers } from "../helpers/users";
import ModalUsers from "../components/modales/ModalUsers";

const TableUsers = () => {
  const [actualizar, setActualizar] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState({
    datos: [],
    loading: true,
  });

  useEffect(() => {
    getUsers().then((respuesta) => {
      setUsers({
        datos: respuesta.users,
        loading: false,
      });
    });
  }, []);

  const borrarUser = (id) => {
    let usuario = users.datos.find((user) => {
      return user._id === id;
    });
    let validar = window.confirm(
      `Esta seguro que desea eliminar al usuario ${usuario.name}?`
    );
    if (validar) {
      deleteUsers(id).then((respuesta) => {
        if (respuesta.msg) {
          window.alert(respuesta.msg);
        }
      });
    }
  };
  return (
    <>
      {users.loading ? (
        <div className="alert alert-success text-center" role="alert">
          Cargando...
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
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
              {users.datos.map((users) => (
                <tr key={users._id}>
                  <th scope="row">{users.name}</th>
                  <th scope="row">{users.email}</th>
                  <td>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => borrarUser(users._id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <ModalUsers
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

export default TableUsers;
