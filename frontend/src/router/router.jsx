import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../components/auth/LoginForm";
import PrivateRoute from "../components/general/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />, // Wrap with PrivateRoute
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

export default router;
