// AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn: false,
    jwt: "",
    collegeEmail: "",
  });

  const login = (jwt, collegeEmail) => {
    setLoggedInUser({ isLoggedIn: true, jwt, collegeEmail });
  };

  const logout = () => {
    setLoggedInUser({ isLoggedIn: false, jwt: "", collegeEmail: "" });
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
