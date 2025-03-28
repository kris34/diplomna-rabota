import { useEffect, useState } from "react";
import { useAuth } from "../../providers/authProvider";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { checkIfUserIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Prevent flicker

  useEffect(() => {
    const checkAuth = async () => {
      const isLogged = await checkIfUserIsLoggedIn();
      if (!isLogged) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null; // Prevent rendering during auth check

  return isLoggedIn ? children : null;
};

export default PrivateRoute;
