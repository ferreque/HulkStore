import React, { useState, useEffect } from "react";
import { getProducts } from "../helpers/products";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";
import CardProd from "../components/CardProd";

const Inicio = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((respuesta) => {
      setProducts(respuesta.products);
    });
  }, []);

  const filtro = (categ) => {
    getProducts().then((respuesta) => {
      let prodFiltrado = respuesta.products.filter(
        (product) => product.categorie.name === categ
      );
      setProducts(prodFiltrado);
    });
  };

  return (
    <>
      <HulkNavbar />
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div>
          <div className="navbar-nav">
            <a className="nav-link" href="/" role="button">
              TODOS
            </a>
            <a
              className="nav-link "
              role="button"
              onClick={() => filtro("Comics")}
            >
              Comics
            </a>
            <a
              className="nav-link"
              role="button"
              onClick={() => filtro("Juguetes")}
            >
              Juguetes
            </a>
            <a
              className="nav-link"
              role="button"
              onClick={() => filtro("Accesorios")}
            >
              Accesorios
            </a>
            <a
              className="nav-link"
              role="button"
              onClick={() => filtro("Vasos")}
            >
              Vasos
            </a>
            <a
              className="nav-link"
              role="button"
              onClick={() => filtro("Camisetas")}
            >
              Camisetas
            </a>
            <a
              className="nav-link"
              role="button"
              onClick={() => filtro("Otros")}
            >
              Otros
            </a>
            <a className="nav-link text-dark bg-warning " href="/carrito">
              Carrito
            </a>
          </div>
        </div>
      </div>
      <div className="container mb-3">
        <h1 className="mb-3">Elige tu producto</h1>
        <div className="d-flex justify-content-center my-3"></div>
        <CardProd products={products} />
      </div>
    </>
  );
};
export default Inicio;
