"use client";

import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "./authReducer";

export const AuthContext = createContext();

const initialAuthState = {
  token: null,
  refresh_token: null,
  user: null, // 👈 store user details too
  isAuthenticated: false,
};

export default function AuthContextProvider({ children }) {
  const [msonline_auth, dispatch] = useReducer(
    authReducer,
    initialAuthState,
    () => {
      if (typeof window !== "undefined") {
        try {
          const localData = localStorage.getItem("authData");
          if (!localData) return initialAuthState;

          const parsedData = JSON.parse(localData);
          return {
            ...parsedData,
            isAuthenticated: !!parsedData.token,
          };
        } catch (error) {
          console.error("Failed to parse auth data:", error);
          return initialAuthState;
        }
      }
      return initialAuthState;
    }
  );

  // ✅ login expects full response { token, user }
  const login = (data) => {
    console.log(data);
    dispatch({
      type: "LOGIN",
      payload: {
        token: data.token,
        user: data.user,
        isAuthenticated: true,
      },
    });
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authData");
    }
    dispatch({ type: "LOGOUT", payload: initialAuthState });
  };

  // persist to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authData", JSON.stringify(msonline_auth));
    }
  }, [msonline_auth]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        msonline_auth,
        isAuthenticated: msonline_auth.isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}