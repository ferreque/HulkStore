import React from "react";

const cerrarSesion = () => {
  localStorage.setItem("auth", JSON.stringify(""));
};

export const HulkNavbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        HulkStore
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" href="#">
            Comics <span class="sr-only">(current)</span>
          </a>
          <a class="nav-link" href="#">
            Juguetes
          </a>
          <a class="nav-link" href="#">
            Accesorios
          </a>
          <a class="nav-link" href="/carrito">
            Carrito
          </a>

          <a class="nav-link disable" href="/admin">
            Admin
          </a>
          <form class="form-inline my-2 my-lg-0 ">
            <button
              onClick={cerrarSesion}
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
