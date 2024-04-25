import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading, Map, Wishlist } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Rooms() {
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { status, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    setError("");
    fetch(`http://localhost:3000/api/v1/listings/list/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          navigate("/login");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.data)
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const deletePost = async (id) => {
    try {
      setError("");
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!isConfirmed) return;
      const response = await fetch(
        `http://localhost:3000/api/v1/listings/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error !== "") {
    return <Error />;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
            {/* Image */}
            <div className="relative">
              <img
                src={post.image}
                alt="Room Type Image"
                className="w-full h-72 object-cover"
              />
              {/* Heart icon */}
              <Wishlist  listingId={post._id}/>
            </div>

            {/* Details */}
            <div className="p-6">
              {/* Title */}
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                {post.title}
              </h2>
              {/* Location */}
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {post.location}, {post.country}
              </p>
              {/* Price */}
              {post.price && (
                <p className="text-lg text-blue-500 font-bold mb-4">
                  ${post.price.toLocaleString("en-US")} night
                </p>
              )}
              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mb-2 sm:mb-0 sm:mr-2 sm:text-md">
                  Book Now
                </button>
                {status && userData._id === post.owner && (
                  <>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg mb-2 sm:mb-0 sm:mr-2 sm:text-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${post._id}`)}
                      className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg sm:text-md"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
            <div>
            <Map latitude={post.geolocation.latitude} longitude={post.geolocation.longitude}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
