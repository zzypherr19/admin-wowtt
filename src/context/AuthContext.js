import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  const login = (userEmail) => {
    setEmail(userEmail); 
    setAuthenticated(true);
  };


  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, email, logout }}>
      {children}
    </AuthContext.Provider>
  );
}