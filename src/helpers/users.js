const url = "https://store-hulk.herokuapp.com/api/users/";

export const getUsers = async () => {
  const respuesta = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await respuesta.json();
  return datos;
};

export const getUser = async (id) => {
  const respuesta = await fetch(`${url}${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await respuesta.json();
  return datos;
};

export const postUsers = async (data) => {
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

export const putUsers = async (id, data) => {
  const respuesta = await fetch(`${url}${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await respuesta.json();

  return datos;
};

export const deleteUsers = async (id) => {
  const respuesta = await fetch(`${url}${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": JSON.parse(localStorage.getItem("auth")).token,
    },
  });
  const datos = await respuesta.json();

  return datos;
};
