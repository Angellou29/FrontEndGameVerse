import axios from 'axios';

const API_URL = 'http://localhost:3001/api/noticias'; // Cambia si usas dominio o puerto distinto

// Obtener todas las noticias
export const listarNoticias = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

// Crear nueva noticia (requiere FormData con campos: name, descripcion, foto)
export const crearNoticia = async (formData: FormData) => {
  const respuesta = await axios.post('http://localhost:3001/api/noticias', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return respuesta.data;
};

// Editar una noticia (puede ser con o sin imagen)
export const editarNoticia = async (id: number, formData: FormData) => {
  const respuesta = await axios.put(`http://localhost:3001/api/noticias/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return respuesta.data;
};

export const eliminarNoticia = async (id: number) => {
  const res = await axios.delete(`http://localhost:3001/api/noticias/${id}`, {
    withCredentials: true,
  });
  return res.data;
};