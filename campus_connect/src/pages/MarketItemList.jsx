import React from "react";
import MarketItemCard from "./MarketItemCard";

const MarketItemList = ({ items, onItemClick }) => {
  if (!items.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No items found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {items.map((item) => (
        <MarketItemCard
          key={item.id}
          item={item}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default MarketItemList;
