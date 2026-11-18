import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem("session");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      localStorage.removeItem("session");
      return null;
    }
  });

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      localStorage.removeItem("session");
    }
  }, [session]);

  const login = async (username, password) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

      const respuesta = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const datos = await respuesta.json();
      const token = datos.access_token;

      const respuestaUsuario = await fetch(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!respuestaUsuario.ok) {
        throw new Error("No se pudieron obtener los datos del usuario");
      }

      const usuario = await respuestaUsuario.json();

      setSession({
        token,
        user: usuario,
      });

      return {
        success: true,
        isOwner: usuario.is_owner,
      };
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      return {
        success: false,
        error: error.message,
      };
    }
  };

  const actualizarUsuario = useCallback((usuario) => {
    setSession((sesionActual) => {
      if (!sesionActual) return null;

      return {
        ...sesionActual,
        user: usuario,
      };
    });
  }, []);

  const logout = useCallback(() => {
    setSession(null);
  }, []);

  const value = {
    usuario: session?.user || null,
    token: session?.token || null,
    isOwner: session?.user?.is_owner || false,
    login,
    logout,
    actualizarUsuario,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
