import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Loading, Error } from "../components";

export default function EditPost() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:3000/api/v1/listings/list/${id}`,{
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPost(data.data);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  if (error !== "") {
    return <Error />;
  }

  return(
    <>
    {loading ? <Loading /> : <Form Edit={post} />}
    </>
  );
}
