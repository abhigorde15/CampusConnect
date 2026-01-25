import React from "react";

const MarketFilters = ({
  category,
  setCategory,
  searchTerm,
  setSearchTerm,
  onPostClick,
}) => {
  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 min-w-[150px]"
          >
            <option value="">All Categories</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Stationery</option>
            <option>Bicycles</option>
          </select>

          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-3 border border-gray-300 rounded-xl"
          />

          <button
            onClick={onPostClick}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl"
          >
            + Post an Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketFilters;
