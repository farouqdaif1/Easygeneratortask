import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../api/auth";
import { SignUpFormData, SignInFormData } from "../types/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signUp: (data: SignUpFormData) => Promise<void>;
  signIn: (data: SignInFormData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      authService.logout();
      setIsAuthenticated(false);
    }
  };

  const signUp = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.signUp(data);
      setIsAuthenticated(true);
      await fetchUserProfile();
    } catch (err) {
      setError("Failed to sign up");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.signIn(data);
      setIsAuthenticated(true);
      await fetchUserProfile();
    } catch (err) {
      setError("Failed to sign in");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signUp,
        signIn,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
