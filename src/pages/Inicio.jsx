import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../helpers/products";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";
import CardProd from "../components/CardProd";

const Inicio = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((respuesta) => {
      if (respuesta.products) {
        setProducts(respuesta.products);
      } else {
        setTimeout(() => {
          navigate("../login", { replace: true });
        }, 1500);
      }
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
              className="nav-link"
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
            <a href="/carrito">
              <img
                className="carrito"
                src="https://cdn.icon-icons.com/icons2/909/PNG/512/shopping-cart_icon-icons.com_70870.png"
                alt="carrito"
              />
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
