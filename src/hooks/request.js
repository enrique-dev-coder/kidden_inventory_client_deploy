// auth requests
const PROD = process.env.REACT_APP_PROD_API;

export const httpGetAllUsers = async () => {
  const response = await fetch(`${PROD}/administration/users`);
  return await response.json();
};

// create user
export const httpPostNewUser = async (data) => {
  return await fetch(`${PROD}/administration/user`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

//  login user
export const httpSignInUser = async (data) => {
  const response = await fetch(`${PROD}/auth/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const httpGetNewPasswordForUser = async () => {
  const response = await fetch(`${PROD}/administration/user/password`);
  return await response.json();
};

export const httpUploadCsv = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${PROD}/planeacion/archivo`, {
    method: 'post',
    body: formData
  });

  return await response.json();
};

// get all products in storage

export const httpGetAllProductsPerMonth = async (month) => {
  const response = await fetch(`${PROD}/inventario/productos/${month}`);
  return await response.json();
};

export const httpGetAllProducts = async () => {
  const response = await fetch(`${PROD}/inventario/productos`);
  return await response.json();
};

// create product
export const httpPostNewProduct = async (data) => {
  const formData = new FormData();
  // se tiene que usar formdata por que la iamgen es un archivo
  // Agrega los datos al FormData
  formData.append('nombre', data.nombre);
  formData.append('presentacion', data.presentacion);
  formData.append('marca', data.marca);
  formData.append('modelo', data.modelo);
  formData.append('estado', data.estado);
  formData.append('stock', data.stock);
  formData.append('lugar', data.lugar);
  formData.append('almacen', data.almacen);
  formData.append('minima', data.minima);

  // Agrega la imagen al FormData
  formData.append('imagen', data.imagen);

  const response = await fetch(`${PROD}/inventario/nuevo-producto`, {
    method: 'post',
    body: formData
  });

  const res = await response.json();
  return res;
};

// edit  picture
export const httpPutProductPicture = async (data) => {
  const formData = new FormData();
  // se tiene que usar formdata por que la imagen es un archivo
  // Agrega los datos al FormData
  formData.append('nombre', data.nombre);
  // Agrega la imagen al FormData
  formData.append('imagen', data.imagen);

  const response = await fetch(`${PROD}/inventario/producto/editar-foto/${data.id}`, {
    method: 'put',
    body: formData
  });

  const res = await response.json();
  return res;
};
// delete products
export const httpDeelteProducts = async (data) => {
  const response = await fetch(`${PROD}/inventario/eliminar-productos`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: data })
  });
  const res = await response.json();
  return res;
};

// sumar entradas
export const httpSumarEntrada = async ({ almacen, entradas, id, nombre }) => {
  console.log({ almacen, entradas, id });
  const response = await fetch(`${PROD}/inventario/sumar-entrada/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ almacen, entradas: entradas.toString(), nombre })
  });
  const res = await response.json();
  return res;
};

// restar salidas
export const httpRestarSalidas = async ({ almacen, salidas, minima, nombre, id }) => {
  console.log({ almacen, salidas, minima, nombre, id });
  const response = await fetch(`${PROD}/inventario/restar-salida/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ almacen, salidas: salidas.toString(), minima, nombre })
  });
  const res = await response.json();
  return res;
};

export const httpGetAllEntradas = async () => {
  const response = await fetch(`${PROD}/inventario/producto/entradas`);
  return await response.json();
};

export const httpGetEntradaPorProducto = async (nombre) => {
  const response = await fetch(`${PROD}/inventario/producto/entradas/${nombre}`);
  return await response.json();
};

export const httpGetAllSalidas = async () => {
  const response = await fetch(`${PROD}/inventario/producto/salidas`);
  return await response.json();
};

export const httpGetSalidaPorProducto = async (nombre) => {
  const response = await fetch(`${PROD}/inventario/producto/salidas/${nombre}`);
  return await response.json();
};
