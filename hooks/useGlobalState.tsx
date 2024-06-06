import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  token: string;
}

interface Coleta {
  tipo: string;
  quantidade: number;
}

interface GlobalStateContextProps {
  user: User | null;
  coletas: Coleta[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (nome_usuario: string, email: string, senha_hash: string) => Promise<void>;
  adicionarColeta: (tipo: string, quantidade: number) => Promise<void>;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({
  user: null,
  coletas: [],
  login: async () => {},
  logout: () => {},
  register: async () => {},
  adicionarColeta: async () => {},
});

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [coletas, setColetas] = useState<Coleta[]>([]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha_hash: password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.user.id, email: data.user.email, token: data.token });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const register = async (nome_usuario: string, email: string, senha_hash: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome_usuario, email, senha_hash }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.user.id, email: data.user.email, token: data.token });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const adicionarColeta = async (tipo: string, quantidade: number) => {
    try {
      const response = await fetch('http://localhost:3000/api/coletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`, // Assumindo que o token é necessário
        },
        body: JSON.stringify({ tipo, quantidade }),
      });

      if (response.ok) {
        const novaColeta = await response.json();
        setColetas([...coletas, novaColeta]);
      } else {
        throw new Error('Falha ao adicionar coleta');
      }
    } catch (error) {
      console.error('Erro ao adicionar coleta:', error);
    }
  };

  return (
    <GlobalStateContext.Provider value={{ user, coletas, login, logout, register, adicionarColeta }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
