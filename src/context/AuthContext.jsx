import { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto de autenticación
const AuthContext = createContext(null);

// Hook personalizado 
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Inicializamos el estado del usuario en localStorage 
  const [usuario, setUsuario] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("efi_user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  // sincronizamos el estado del usuario 
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("efi_user", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("efi_user");
    }
  }, [usuario]);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
