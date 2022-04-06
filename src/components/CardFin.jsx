import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { Form, Card, Container, Button } from "react-bootstrap";
import { postOrders } from "../helpers/orders";
import { useNavigate } from "react-router-dom";

const token =
  JSON.parse(localStorage.getItem("auth")) &&
  JSON.parse(localStorage.getItem("auth")).token;

const CardFin = ({ pedidos, setEco, setPedidos, btnDisable }) => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("auth")).usuario;
  const prod = JSON.parse(localStorage.getItem("carrito")).categorie;
  useEffect(() => {
    setEco(false);
  });

  const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const confirmarPedido = () => {
    console.log(pedidos);
    pedidos.forEach((pedido) => {
      let product = {
        producto: prod._id,
        categoria: pedido.categorie,
        estado: pedido.estado,
        provincia: usuario.provincia,
        localidad: usuario.localidad,
        direccionEnvio: usuario.direccionEnvio,
        descripcion:
          pedido?.descripcion || "No se especificaron notas para este pedido",
      };

      postOrders(product, token).then((respuesta) => {
        if (respuesta.errors) {
          return window.alert(respuesta.errors[0].msg);
        } else {
          Swal.fire({
            title: "Pedido confirmado",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          const redireccion = () => navigate("../", { replace: true });
          redireccion();
          localStorage.setItem("carrito", JSON.stringify([]));
        }
      });
    });
    localStorage.setItem("carrito", JSON.stringify([]));
  };

  return (
    <Container className="text-center">
      {pedidos.map((pedido, index) => (
        <Card
          key={getRandomNumberBetween(1, 1000000)}
          className="  mb-3 mi-4 login-card justify-center"
        >
          <Card.Body>
            <Card.Title className="mb-2 ">{pedido.nombre}</Card.Title>
            <Card.Text>$ {pedido.precio}</Card.Text>
            <Form>
              <Form.Control
                onChange={(e) => {
                  pedidos[index] = { ...pedido, notas: e.target.value };
                  setPedidos(pedidos);
                }}
                label="Comments"
                as="textarea"
                maxLength="150"
                placeholder="¿Nos queres aclarar algo sobre tu pedido?"
                style={{ height: "100px" }}
              />
            </Form>
          </Card.Body>
          <Button
            className="mb-4 pull-right mt-3"
            variant="light"
            onClick={() => {
              const _pedidos =
                JSON.parse(localStorage.getItem("carrito")) || [];
              localStorage.setItem(
                "carrito",
                JSON.stringify(
                  _pedidos.map((e) => e).filter((e) => e !== pedido._id)
                )
              );
              setPedidos(pedidos.filter((e) => pedido._id !== e._id));
            }}
          >
            BORRAR
          </Button>
        </Card>
      ))}

      <Button
        className="mb-4 pull-right mt-3"
        variant="light"
        disabled={btnDisable}
        onClick={() => confirmarPedido()}
      >
        CONFIRMAR PEDIDO
      </Button>
    </Container>
  );
};

export default CardFin;
