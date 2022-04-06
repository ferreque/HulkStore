import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { usuarioPost } from "../helpers/usuarios";
import Swal from "sweetalert2";

const Registro = () => {
  //   const [nombre, setNombre] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [password2, setPassword2] = useState("");
  //   const [img, setImg] = useState("");
  //   const history = useHistory();
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const usuario = {
  //       nombre,
  //       email,
  //       password,
  //       password2,
  //       img,
  //       rol: "USER_ROLE",
  //     };
  //     if (password && password2) {
  //       if (password === password2) {
  //         usuarioPost(usuario).then((respuesta) => {
  //           if (respuesta.errors) {
  //             return Swal.fire({
  //               title: respuesta.errors[0].msg,
  //               icon: "success",
  //               confirmButtonColor: "#3085d6",
  //             });
  //           }
  //           if (respuesta.msg) {
  //             window.alert(respuesta.msg);
  //             const redireccion = () => history.push("/login");
  //             redireccion();
  //           }
  //         });
  //       } else {
  //         return Swal.fire({
  //           title: "Las constraseñas deben ser iguales",
  //           icon: "warning",
  //           cancelButtonColor: "#d33",
  //         });
  //       }
  //     } else {
  //       return Swal.fire({
  //         title: "Debe completar todos los campos",
  //         icon: "warning",
  //         cancelButtonColor: "#d33",
  //       });
  //     }
  //   };
  return (
    <Container fluid className="login-bg py-5 min-height">
      <Form
        className="col-8 col-lg-5 mx-auto mt-5 login-card"
        // onSubmit={(e) => handleSubmit(e)}
      >
        <Form.Label className="iniciaSesion d-flex justify-content-center mt-2">
          REGISTRATE
        </Form.Label>

        <Form.Label className="text-white">Nombre de Usuario:</Form.Label>
        <Form.Control
          //   value={nombre}
          //   onChange={(e) => setNombre(e.target.value)}
          type="text"
          maxLength={50}
        />

        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Label className="text-white">Escribí tu mail:</Form.Label>
          <Form.Control
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            maxLength={50}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 mx-auto text-white"
          controlId="formBasicPassword"
        >
          <Form.Label>Elegí una Contraseña:</Form.Label>
          <Form.Control
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            maxLength={50}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 mx-auto text-white"
          controlId="formBasicPassword"
        >
          <Form.Label>Confirma tu contraseña:</Form.Label>
          <Form.Control
            type="password"
            // value={password2}
            // onChange={(e) => setPassword2(e.target.value)}
            maxLength={50}
          />
        </Form.Group>

        <Form.Group className="mb-4 mx-auto text-white">
          <Form.Label>Carga tu foto:</Form.Label>
          <Form.Control
            type="text"
            // value={img}
            // onChange={(e) => setImg(e.target.value)}
            maxLength={50}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mb-3 btn btn-success rounded login-btn"
        >
          CREAR CUENTA
        </Button>

        <Form.Group className="mb-3 text-white" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="¿Te gustaría recibir nuestras promociones?"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Registro;
