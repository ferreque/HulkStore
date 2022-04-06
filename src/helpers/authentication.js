const url = "http://localhost:8080/api/auth/login";

export const postAuth = async (data) => {
  const respuesta = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await respuesta.json();

  return datos;
};
