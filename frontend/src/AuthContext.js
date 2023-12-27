// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const setAuthData = (phone) => {
    setPhoneNumber(phone);
  };
  const logout = () => {
    localStorage.removeItem('studentId');
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
