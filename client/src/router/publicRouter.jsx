import Home from "../pages/auth/Home";
import Forgot from "../pages/auth/Forgot";
import Login from "../pages/auth/Login";
import Profile from "../pages/auth/Profile";
import Register from "../pages/auth/Register";
import Reset from "../pages/auth/Reset";
import { Activation } from "../pages/auth/Activation";
import { Verifying } from "../pages/auth/Verifying";

// create public router
const publicRouter = [
  {
    path: "/authentication",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/activation",
    element: <Activation />,
  },
  {
    path: "/activation/:token",
    element: <Verifying />,
  },
];

// export router
export default publicRouter;
