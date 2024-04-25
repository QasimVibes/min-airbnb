import React, { useState, useEffect } from "react";
import {Loading,Card} from "../components";

export default function UserPropertyList() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/listings/userlist`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setList(data.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (error !== "") {
    return <Error />;
  }

  return (
    <>
      {loading ? <Loading /> : <Card items={list} />}
    </>
  );
}
