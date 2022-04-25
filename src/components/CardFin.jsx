import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Form, Card, Container, Button, Image } from "react-bootstrap";
import { postOrders } from "../helpers/orders";
import { useNavigate } from "react-router-dom";
import { putProducts } from "../helpers/products";

const token =
  JSON.parse(localStorage.getItem("auth")) &&
  JSON.parse(localStorage.getItem("auth")).token;

const CardFin = ({ pedidos, setEco, setPedidos, btnDisable }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setEco(true);
    setTotal(sumaTotal);
    setEco(false);
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth")).user;
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  let sumaTotal = 0;

  for (let i = 0; i < carrito.length; i++) {
    sumaTotal += carrito[i].price * carrito[i].amount;
  }

  const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const confirmarPedido = () => {
    let stockNegativo;
    console.log(user);
    let orden = {
      products: carrito,
      location: user.location,
      province: user.province,
      shippingAddress: user.shippingAddress,
      totalPrice: total,
    };
    carrito.forEach((product) => {
      product.stock -= product.amount;
      console.log(product.stock);
      if (product.stock < 0) {
        stockNegativo = "si";
        // setContinuo(continuo);

        Swal.fire({
          title: `Stock insuficiente, solo quedan ${
            product.stock + product.amount
          } unidades de ${product.name}`,
          icon: "error",
          confirmButtonColor: "#3085d6",
        });

        const redireccion = () => navigate("../", { replace: true });
        localStorage.setItem("carrito", JSON.stringify([]));
        return redireccion();
      }
    });

    if (stockNegativo !== "si") {
      carrito.forEach((product) => {
        putProducts(product._id, product).then((respuesta) => {
          if (respuesta.errors) {
            return window.alert(respuesta.errors[0].msg);
          } else {
            Swal.fire({
              title: "Stock de producto editado",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
          }
        });
      });
    }

    if (stockNegativo !== "si") {
      console.log(orden);
      postOrders(orden).then((respuesta) => {
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
    }
  };

  return (
    <Container className="text-center row">
      {carrito.map((pedido, index) => (
        <Card
          key={getRandomNumberBetween(1, 1000000)}
          className="mb-3 mi-4 justify-center col-4 mx-auto"
        >
          <Card.Body>
            <Image className="card-carrito" src={pedido.imagen} />
            <Card.Title className="mb-2">{pedido.name}</Card.Title>
            <Card.Text>$ {pedido.price}</Card.Text>
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
            <Card.Text>
              <h5>Cantidad: {pedido.amount}</h5>
            </Card.Text>
          </Card.Body>
          <Button
            className="mb-4 pull-right mt-3"
            variant="light"
            onClick={() => {
              const _pedidos =
                JSON.parse(localStorage.getItem("carrito")) || [];
              const filt = localStorage.setItem(
                "carrito",
                JSON.stringify(
                  _pedidos.map((e) => e).filter((e) => e._id !== pedido._id)
                )
              );
              setPedidos(pedidos.filter((e) => pedido._id !== e._id));
            }}
          >
            BORRAR
          </Button>
        </Card>
      ))}

      <div className="row mb-2 col-12">
        <h5 className="mb-4 pull-right mt-3 mx-auto">
          Precio total del pedido:{sumaTotal}
        </h5>
      </div>

      <Card.Title className="mb-2 col-12">{pedidos.name}</Card.Title>
      <Button
        className="mb-4 pull-right mt-3 mx-auto"
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
