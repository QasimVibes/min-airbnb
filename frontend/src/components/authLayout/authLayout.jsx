import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../index";

export default function AuthLayout({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);
  

  useEffect(() => {
    if (authentication && isLoggedIn != authentication) {
      navigate("/login");
    } else if (!authentication && isLoggedIn !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [navigate, authentication, isLoggedIn]);
  return loading ? <Loading /> : <>{children}</>;
}
