import React, { createContext, useState, useContext } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 생성: 로그인 상태와 관련된 로직을 처리
export function AuthProvider({ children }) {
  const [isLogined, setIsLogined] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = (userData) => {
    setIsLogined(true);
    setUserInfo(userData);
  };

  const logout = () => {
    setIsLogined(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLogined, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
