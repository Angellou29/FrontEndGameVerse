import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBarra from "../BarraNavAdmin";
import { useUser } from '../../../context/UserContext';
import '../../../css/ListaUser.css';

interface Usuario {
  id: number;
  nickname: string;
  correo: string;
  pais: string | null;
  imagen: string | null;
  tipo: string;
}

const MainContent = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const navigate = useNavigate();
  const { usuario } = useUser();

  useEffect(() => {
    // 🔒 Protege por autenticación y rol
    if (!usuario) {
      navigate('/IniciarSesion');
      return;
    }

    if (usuario.tipo !== 'admin') {
      alert('❌ No tienes permisos para ver esta página.');
      navigate('/Inicio');
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/usuarios', {
          withCredentials: true
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('❌ Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, [usuario, navigate]);

  return (
    <div className="main-content">
      <div className="container-fluid px-4 py-3">
        <h1 className="mb-4 display-5">Usuarios</h1>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Foto</th>
                      <th>Alias</th>
                      <th>Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          <img
                            src={
                              user.imagen
                                ? `http://localhost:3001/static/usuarios/${user.imagen}`
                                : `http://localhost:3001/static/usuarios/default.jpg`
                            }
                            alt={user.nickname}
                            className="user-photo"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
                            }}
                          />
                        </td>
                        <td>{user.nickname}</td>
                        <td>{user.correo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListadoUsuarios = () => {
  return (
    <div className="d-flex vh-100">
      <div className="sidebar">
        <NavBarra />
      </div>
      <div className="content flex-grow-1 overflow-auto">
        <MainContent />
      </div>
    </div>
  );
};

export default ListadoUsuarios;
