import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { AuthLayout } from "./components/index.js";
import { Add, EditPost, Home, Login, Rooms, Signup, UserPropertyList, WishList } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/rooms/:id",
        element: <Rooms />,
      },
      {
        path: "/form",
        element: (
          <AuthLayout authentication={true}>
            <Add />
          </AuthLayout>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <AuthLayout authentication={true}>
            <WishList />
          </AuthLayout>
        ),
      },
      {
        path: "/properties",
        element: (
          <AuthLayout authentication={true}>
            <UserPropertyList />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
