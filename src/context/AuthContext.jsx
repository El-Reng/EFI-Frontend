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

  const [sesionExpirada, setSesionExpirada] = useState(false);

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      localStorage.removeItem("session");
    }
  }, [session]);

  const expirarSesion = useCallback(() => {
    setSession(null);
    setSesionExpirada(true);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setSesionExpirada(false);
  }, []);

  const fetchAutenticado = useCallback(
    async (url, opciones = {}) => {
      const headers = new Headers(opciones.headers || {});

      if (session?.token) {
        headers.set("Authorization", `Bearer ${session.token}`);
      }

      const respuesta = await fetch(url, {
        ...opciones,
        headers,
      });

      if (respuesta.status === 401) {
        expirarSesion();
      }

      return respuesta;
    },
    [session?.token, expirarSesion],
  );

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

      setSesionExpirada(false);

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

  const value = {
    usuario: session?.user || null,
    token: session?.token || null,
    isOwner: session?.user?.is_owner || false,
    sesionExpirada,
    login,
    logout,
    actualizarUsuario,
    fetchAutenticado,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
