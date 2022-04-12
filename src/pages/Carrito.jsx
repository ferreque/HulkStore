import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardFin from "../components/CardFin";
import { getProduct } from "../helpers/products";
import { TailSpin } from "react-loader-spinner";

const Carrito = () => {
  let pedido = [];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const [pedidos, setPedidos] = useState([]);
  const [eco, setEco] = useState(true);
  const [loadVisible, setLoadVisible] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);

  const token =
    JSON.parse(localStorage.getItem("auth")) &&
    JSON.parse(localStorage.getItem("auth")).token;

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    carrito.forEach((product) => {
      getProduct(product._id, token).then((respuesta) => {
        pedido.push(respuesta.product);
      });
      if (carrito !== []) {
        setBtnDisable(false);
      }
    });
    setTimeout(function () {
      setPedidos(pedido);
      setLoadVisible(false);
    }, 2000);
  };

  return (
    <Container className="tituloPag inicioBackground text-center min-height mt-5 pt-5">
      <h1 className="mb-5">Productos en tu carrito:</h1>
      <TailSpin
        type="Circles"
        color="#36504f"
        height="100"
        width="100"
        visible={loadVisible}
      />
      <CardFin
        pedidos={pedidos}
        setEco={setEco}
        setPedidos={setPedidos}
        btnDisable={btnDisable}
        setBtnDisable={setBtnDisable}
      />
    </Container>
  );
};

export default Carrito;
