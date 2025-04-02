import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const response = await axios.get('http://localhost:3003/auth/validate', {
        withCredentials: true,
      });

      const sessionStatus = response?.data?.status;
      const sessionData = response?.data;

      if (sessionStatus === 'valid') {
        setIsAdmin(response?.data?.role === 'admin');
        setFirstName(sessionData?.first_name);
        setLastName(response?.data?.lastName);
        setIsLoggedIn(true);
        setUserId(sessionData?.user_id);
        setEmail(sessionData?.email);
        return true;
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        return false;
      }
    } catch (e) {
      setIsLoggedIn(false);
      setUserId(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const value = {
    isAdmin,
    firstName,
    lastName,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    checkIfUserIsLoggedIn,
    email,
    setFirstName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : null} {/* Don't render children while loading */}
    </AuthContext.Provider>
  );
};
