import React, { useState } from "react";
import { mensajeCofirm, mensajeError } from "../helpers/swal";
import { Form, Container, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../helpers/users";

const Registro = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    province: "",
    location: "",
    shippingAddress: "",
    rol: "USER_ROLE",
  });
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValue.password && formValue.password2) {
      if (formValue.password === formValue.password2) {
        postUsers(formValue).then((respuesta) => {
          if (respuesta.errors) {
            return mensajeError(respuesta.errors[0].msg);
          }
          if (respuesta.msg) {
            mensajeCofirm(respuesta.msg);
            setTimeout(() => {
              navigate("../login", { replace: true });
            }, 1500);
          }
        });
      } else {
        return mensajeError("Las constraseñas deben ser iguales");
      }
    } else {
      return mensajeError("Debe completar todos los campos");
    }
  };

  return (
    <Container fluid className="background-up">
      <Row className="">
        <div className="col d-flex justify-content-center">
          <h1 className="mt-2 text-white font-weight-bolder">REGISTRO</h1>
        </div>
      </Row>
      <Row>
        <div className="col">
          <Form
            className="card-body bg-white col-8 col-lg-5 mx-auto"
            onSubmit={handleSubmit}
          >
            <Form.Label className="">Nombre de Usuario:</Form.Label>
            <Form.Control
              name="name"
              value={formValue.name}
              onChange={handleChange}
              required
              type="text"
              maxLength={70}
            />

            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label className="">Escribí tu mail:</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formValue.email}
                required
                onChange={handleChange}
                autoComplete="email"
                maxLength={50}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 mx-auto text-dark"
              controlId="formBasicPassword"
            >
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={formValue.password}
                required
                onChange={handleChange}
                maxLength={50}
              />
            </Form.Group>

            <Form.Group className="mb-3 mx-auto ">
              <Form.Label>Confirma tu contraseña:</Form.Label>
              <Form.Control
                name="password2"
                type="password"
                value={formValue.password2}
                required
                onChange={handleChange}
                maxLength={50}
              />
            </Form.Group>
            <Form.Label className="">Provincia:</Form.Label>
            <Form.Control
              name="province"
              value={formValue.province}
              onChange={handleChange}
              required
              type="text"
              maxLength={50}
            />
            <Form.Label className="">Localidad:</Form.Label>
            <Form.Control
              name="location"
              value={formValue.location}
              onChange={handleChange}
              required
              type="text"
              maxLength={50}
            />
            <Form.Label className="">Dirección:</Form.Label>
            <Form.Control
              name="shippingAddress"
              value={formValue.shippingAddress}
              onChange={handleChange}
              required
              type="text"
              maxLength={50}
            />

            <Form.Group className="mb-4 mx-auto ">
              <Form.Label>Carga tu foto:</Form.Label>
              <Form.Control
                name="img"
                type="text"
                value={formValue.img}
                onChange={handleChange}
                maxLength={700}
              />
            </Form.Group>
            <Row>
              <Button
                variant="primary"
                type="submit"
                className="mb-3 btn btn-success rounded login-btn col-4 mx-auto"
              >
                CREAR CUENTA
              </Button>
              <Button className="mb-3 btn btn-success rounded login-btn col-4 mx-auto">
                <a href="../login" className="text-white">
                  LOGIN
                </a>
              </Button>
            </Row>
          </Form>
        </div>
      </Row>
      {/* <Row className="mt-5">
        <div className="col-lg-12 col-md-6 col-sm-6 mx-auto mt-5 d-flex justify-content-center">
          <Form
            className="card-login col-8 col-lg-5 mx-auto  "
            onSubmit={handleSubmit}
          >
            <Form.Label className="text-white">Nombre de Usuario:</Form.Label>
            <Form.Control
              name="name"
              value={formValue.name}
              onChange={handleChange}
              required
              type="text"
              maxLength={70}
            />

            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Escribí tu mail:</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formValue.email}
                required
                onChange={handleChange}
                autoComplete="email"
                maxLength={50}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 mx-auto text-dark"
              controlId="formBasicPassword"
            >
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={formValue.password}
                required
                onChange={handleChange}
                maxLength={50}
              />
            </Form.Group>

            <Form.Group className="mb-3 mx-auto text-dark">
              <Form.Label>Confirma tu contraseña:</Form.Label>
              <Form.Control
                name="password2"
                type="password"
                value={formValue.password2}
                required
                onChange={handleChange}
                maxLength={50}
              />
            </Form.Group>
            <Form.Label className="text-dark">Provincia:</Form.Label>
            <Form.Control
              name="province"
              value={formValue.province}
              onChange={handleChange}
              required
              type="text"
              maxLength={50}
            />
            <Form.Label className="text-dark">Localidad:</Form.Label>
            <Form.Control
              name="location"
              value={formValue.location}
              onChange={handleChange}
              required
              type="text"
              maxLength={50}
            />
            <Form.Label className="text-dark">Dirección:</Form.Label>
            <Form.Control
              name="shippingAddress"
              value={formValue.shippingAddress}
              onChange={handleChange}
              required
              type="text"
              maxLength={50}
            />

            <Form.Group className="mb-4 mx-auto text-dark">
              <Form.Label>Carga tu foto:</Form.Label>
              <Form.Control
                name="img"
                type="text"
                value={formValue.img}
                onChange={handleChange}
                maxLength={700}
              />
            </Form.Group>
            <Row>
              <Button
                variant="primary"
                type="submit"
                className="mb-3 btn btn-success rounded login-btn col-4 mx-auto"
              >
                CREAR CUENTA
              </Button>
              <Button className="mb-3 btn btn-success rounded login-btn col-4 mx-auto">
                <a href="../login" className="text-white">
                  LOGIN
                </a>
              </Button>
            </Row>
          </Form>
        </div>
      </Row> */}
    </Container>
  );
};

export default Registro;
