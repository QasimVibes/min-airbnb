import "./App.css";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users/current", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        if (userData && userData.data) {
          dispatch(login(userData.data));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
