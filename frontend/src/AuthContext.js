// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const setAuthData = (phone) => {
    setPhoneNumber(phone);
  };
  const logout = () => {
    // Add any additional logout logic here
    setPhoneNumber(null);
  };
  return (
    <AuthContext.Provider value={{ phoneNumber, setAuthData, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
