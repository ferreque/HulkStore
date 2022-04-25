import React from "react";
import { Container } from "react-bootstrap";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";

const Error404 = () => {
  return (
    <>
      <HulkNavbar />
      <Container>
        <h1>ERROR 404</h1>
        <h3>Página en construcción</h3>
      </Container>
      ;
    </>
  );
};

export default Error404;
