// src/components/MarketItemCard.jsx
import React from "react";

const MarketItemCard = ({ item, onClick }) => {
  return (
    <div
      className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-semibold text-lg mt-2 text-gray-800">
        {item.title}
      </h3>
      <p className="text-blue-600 font-bold">₹{item.price}</p>
      <p className="text-sm text-gray-600">By: {item.seller}</p>
      <p className="text-xs text-gray-500 mb-2">Posted: {item.date}</p>
      <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded-full">
        {item.condition}
      </span>
    </div>
  );
};

export default MarketItemCard;
