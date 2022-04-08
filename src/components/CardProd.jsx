import React from "react";
import Swal from "sweetalert2";

const CardProd = ({ products }) => {
  let lista = JSON.parse(localStorage.getItem("carrito")) || [];

  const agregarACarrito = async (id) => {
    lista.push(id);

    localStorage.setItem("carrito", JSON.stringify(lista));
    Swal.fire({
      title: "Producto agregado al carrito",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };
  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div className="col" key={product._id}>
            <div className="card h-100">
              <img
                src={product.imagen}
                className="card-prod "
                alt={product.nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <h5>Precio: ${product.precio}</h5>
                <h5>En carrito: {product.cantidad}</h5>
                <strong>{product.categorie.nombre}</strong>
                <p className="card-text">{product.descripcion}</p>
              </div>
              <div className="card-footer ">
                {product.disponible ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-disponible">Disponible</span>
                    <button
                      className="btn btn-success"
                      onClick={() => agregarACarrito(product._id)}
                    >
                      Agregar +
                    </button>
                  </div>
                ) : (
                  <span className="text-nodisponible">No disponible</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardProd;
