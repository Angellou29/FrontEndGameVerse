import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarioAutenticado, actualizarPerfil } from '../../api/apiUsuarios';
import PerfilModal from './PerfilModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/Perfil.css';
import '../../css/PagoPerfilModal.css';

function Perfil() {
  const [modalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [correo, setCorreo] = useState('');
  const [pais, setPais] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerUsuarioAutenticado();
      setUsuario(datos);
      setNickname(datos.nickname);
      setCorreo(datos.correo);
      setPais(datos.pais || '');
    };
    cargarDatos();
  }, []);

  const manejarCambioTexto = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'nickname') setNickname(value);
    if (id === 'correo') setCorreo(value);
    if (id === 'pais') setPais(value);
  };

  const manejarCambioImagen = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]);
    }
  };

  const manejarGuardarCambios = async (e: FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    const formData = new FormData();
    if (nickname !== usuario.nickname) formData.append('nickname', nickname);
    if (correo !== usuario.correo) formData.append('correo', correo);
    if (pais !== usuario.pais) formData.append('pais', pais);
    if (imagen) formData.append('imagen', imagen);

    try {
      await actualizarPerfil(usuario.id, formData);
      setModalVisible(true);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
    navigate('/inicio');
  };

  return (
  <div className="perfil-box container py-5">
    <div className="row justify-content-center align-items-start g-4">
      {/* Columna de imagen */}
      <div className="col-md-4 text-center">
        <h2 className="perfil-title mb-4">Edita tu perfil</h2>
        <div className="perfil-image-container mb-3 position-relative d-inline-block">
          <img
            src={
              usuario?.imagen
                ? `http://localhost:3001/static/usuarios/${usuario.imagen}`
                : `http://localhost:3001/static/usuarios/default.jpg`
            }
            alt="Imagen de perfil"
            className="perfil-imagen-preview"
          />
          <label
            htmlFor="profileImageUpload"
            className="perfil-change-photo-text"
          >
            Cambiar foto
          </label>
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            onChange={manejarCambioImagen}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Columna de formulario */}
      <div className="col-md-8">
        <form onSubmit={manejarGuardarCambios}>
          <div className="mb-3">
            <label htmlFor="nickname" className="perfil-form-label">
              Nickname
            </label>
            <input
              type="text"
              className="perfil-form-control"
              id="nickname"
              value={nickname}
              onChange={manejarCambioTexto}
              placeholder="Tu nickname actual"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="perfil-form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="perfil-form-control"
              id="correo"
              value={correo}
              onChange={manejarCambioTexto}
              placeholder="Tu correo actual"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pais" className="perfil-form-label">
              País
            </label>
            <input
              type="text"
              className="perfil-form-control"
              id="pais"
              value={pais}
              onChange={manejarCambioTexto}
              placeholder="Tu país actual"
            />
          </div>

          <button type="submit" className="perfil-btn-save w-100">
            Guardar cambios
          </button>
        </form>
      </div>
    </div>

    <PerfilModal visible={modalVisible} onClose={cerrarModal} />
  </div>
);
}


export default Perfil;
