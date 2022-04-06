import React, { useState, useEffect } from "react";
import { getProducts } from "../helpers/products";

import CardProd from "../components/CardProd";

const Inicio = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((respuesta) => {
      setProducts(respuesta.products);
    });
  }, []);

  return (
    <>
      <div className="container mb-3">
        <h1 className="mb-3">Elige tu producto</h1>
        <div className="d-flex justify-content-center my-3"></div>
        <CardProd products={products} />
      </div>
    </>
  );
};
export default Inicio;
