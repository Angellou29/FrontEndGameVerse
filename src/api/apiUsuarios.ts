import axios from 'axios';

const URL = 'http://localhost:3001/api/usuarios';

export const obtenerUsuarioAutenticado = async () => {
  const response = await axios.get(`${URL}/perfil`, {
    withCredentials: true
  });
  return response.data;
};

export const actualizarPerfil = async (id: number, datos: FormData) => {
  const response = await axios.put(`${URL}/perfil/${id}`, datos, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  });
  return response.data;
};

export const iniciarSesion = async (datos: { correo: string; contrasena: string }) => {
  const response = await axios.post(`${URL}/login`, datos, {
    withCredentials: true
  });
  return response.data;
};
