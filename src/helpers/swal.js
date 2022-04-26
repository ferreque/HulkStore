import Swal from "sweetalert2";

export const mensajeCofirm = (mensaje) => {
  Swal.fire({
    title: mensaje,
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
};

export const mensajeError = (mensaje) => {
  Swal.fire({
    title: mensaje,
    icon: "error",
    cancelButtonColor: "#d33",
  });
};
