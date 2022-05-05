import React from "react";
import { mensajeCofirm } from "../helpers/swal";

const CardProd = ({ products }) => {
  let lista = JSON.parse(localStorage.getItem("carrito")) || [];
  const agregarACarrito = async (prod) => {
    let filtro = lista.find((productLista) => productLista._id === prod._id);
    if (filtro) {
      let indice = lista.indexOf(filtro);
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
          <div className="col my-2" key={product._id}>
            <div className="card h-100 ">
              <img
                src={product.imagen}
                className=" card-prod"
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
