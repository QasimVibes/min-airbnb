import React from "react";
import { Link } from "react-router-dom";
import { DataNotFound } from "../index";

export default function Card({ items }) {
  return (
    <>
      {items == null || items.length == 0 || items == [] ? (
        <DataNotFound />
      ) : (
        <>
          <div className="container mx-auto px-4 my-8 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 dark:bg-gray-700 bg-gray-100 ">
            {items?.map((item) => (
              <div
                key={item._id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative"
              >
                <div className="relative">
                  <Link to={`/rooms/${item._id}`}>
                    <img
                      className="rounded-t-lg w-full h-48 object-cover brightness-75 hover:brightness-100"
                      src={item.image}
                      alt={item.title}
                    />
                  </Link>
                </div>
                <div className="px-2 py-4">
                  <h2
                    className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </h2>

                  <div className="flex flex-col ">
                    <div className="mb-2">
                      <p className="text-sm  text-gray-700 dark:text-white">
                        {item.location}, {item.country}
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ${item.price} night
                      </p>
                    </div>
                    <div className="my-5">
                      <Link to={`/rooms/${item._id}`}>
                        <button className="absolute bottom-4 right-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
