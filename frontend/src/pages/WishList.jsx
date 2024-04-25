import React, { useState, useEffect } from "react";
import { Card, DataNotFound, Error, Loading } from "../components";

export default function WishList() {
  const [wishlist, setWishlist] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
    setLoading(true);
    fetch(`http://localhost:3000/api/v1/wishlist/get`, {
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
        const listings = data.data.map((item) => item.listing);
        setWishlist(listings);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error);
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
      ) : (
        <>
          {wishlist === null || wishlist.length === 0 ? (
            <DataNotFound/>
          ) : (
            <Card items={wishlist} />
          )}
        </>
      )}
    </>
  );
}
