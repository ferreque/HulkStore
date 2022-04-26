import React from "react";
import { mensajeCofirm, mensajeError } from "../helpers/swal";
const CardProd = ({ products }) => {
  let lista = JSON.parse(localStorage.getItem("carrito")) || [];

  const agregarACarrito = async (prod) => {
    if (lista.indexOf(prod) !== -1) {
      let indice = lista.indexOf(prod);
      lista[indice].amount += 1;
      localStorage.setItem("carrito", JSON.stringify(lista));
    } else {
      prod.amount = 1;
      lista.push(prod);
      localStorage.setItem("carrito", JSON.stringify(lista));
    }
    mensajeCofirm("Producto agregado al carrito");
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
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h5>Precio: ${product.price}</h5>
                <h5>Disponibles: {product.stock} unidades</h5>

                <strong>{product.categorie.name}</strong>

                <p className="card-text">{product.description}</p>
              </div>
              <div className="card-footer ">
                {product.stock > 0 ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-disponible">Disponible</span>
                    <button
                      className="btn btn-success"
                      onClick={() => agregarACarrito(product)}
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
