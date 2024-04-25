import React, { useState, useEffect } from "react";
import { Error, Loading,Card} from "../components";

export default function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
    setLoading(true);

    fetch("http://localhost:3000/api/v1/listings/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error !== "") {
    return <Error />;
  }
  return (
    <>
    {loading ? (
        <Loading />
      ) : (<Card  items={items}/>)}
    </>
  );
}
