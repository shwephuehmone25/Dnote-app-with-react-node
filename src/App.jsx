import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layouts/Main";

import Index from "./pages/note/Index";
import Create from "./pages/note/Create";
import Edit from "./pages/note/Edit";
import Details from "./pages/note/Details";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import isLoginLoader from "./utils/isLogin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/create/note",
          element: <Create />,
          loader: isLoginLoader,
        },
        {
          path: "/edit/note/:id",
          element: <Edit />,
          loader: isLoginLoader,
        },
        {
          path: "/note/:id",
          element: <Details />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;