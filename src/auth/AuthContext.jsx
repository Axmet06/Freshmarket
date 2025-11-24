// src/auth/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../api/authApi';

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Register function
  const register = async (name, email, password) => {
    try {
      const newUser = await registerUser(name, email, password);
      // After registration, we don't automatically log in the user
      // They need to go to the login page
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!currentUser;

  const value = {
    currentUser,
    login,
    logout,
    register,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;