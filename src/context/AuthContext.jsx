import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Creamos el contexto de autenticación
const AuthContext = createContext(null);

// Hook personalizado 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
};


export const AuthProvider = ({ children }) => {
  // Inicializamos el estado del usuario en localStorage 
  const [usuario, setUsuario] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("session");
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.error("Error al leer la sesión de localStorage:", error);
        localStorage.removeItem("session");
        return null;
      }
    }
    return null;
  });

  // Sincronización Automática con localStorage
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("session", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("session");
    }
  }, [usuario]);

// Función para iniciar sesión conectando backend
  const login = async (username, password) => {
    try {
      // Usamos la variable Vite de forma dinámica
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const response = await fetch(`${apiUrl}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas o error en el servidor");
      }

      const data = await response.json();
      
      setSession({
        token: data.access_token, 
        user: data.user,          
      });

      return { success: true, isOwner: data.user.is_owner };
    } catch (error) {
      console.error("Error en el login:", error);
      return { success: false, error: error.message };
    }
  };

  // cierre de sesión y exposicion de valores
  const logout = useCallback(() => {
    setSession(null);
  }, []);

  const value = {
    usuario: session?.user || null,
    token: session?.token || null,
    isOwner: session?.user?.is_owner || false,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
