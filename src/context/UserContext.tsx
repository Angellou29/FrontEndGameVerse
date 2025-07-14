import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Usuario {
  id: number;
  nickname: string;
  correo: string;
  tipo: string;
  imagen?: string;
  pais?: string;
}

interface UserContextType {
  usuario: Usuario | null;
  autenticado: boolean;
  login: (datos: Usuario) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [autenticado, setAutenticado] = useState(false);

  const login = (datos: Usuario) => {
    setUsuario(datos);
    setAutenticado(true);
  };

  const logout = () => {
    setUsuario(null);
    setAutenticado(false);
  };

  return (
    <UserContext.Provider value={{ usuario, autenticado, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
