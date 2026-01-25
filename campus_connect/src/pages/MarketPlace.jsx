import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { httpClient } from "../config/AxiosHelper";

import MarketFilters from "./MarketFilters";
import MarketItemList from "./MarketItemList";
import MarketItemDetailsModal from "./MarketItemDetailsModal";
import PostItemModal from "./PostItemModal";

const MarketPlace = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await httpClient.get("api/public/market/items");
      setItems(res.data);
    } catch {
      toast.error("Failed to load marketplace items");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      (category === "" || item.category === category) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  max-h-[105vh] bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8">
      <Toaster position="top-center" />

      <MarketFilters
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onPostClick={() => setShowPostModal(true)}
      />

      <MarketItemList
        items={filteredItems}
        onItemClick={setSelectedItem}
      />

      {selectedItem && (
        <MarketItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {showPostModal && (
        <PostItemModal
          onClose={() => setShowPostModal(false)}
          onSuccess={fetchItems}
        />
      )}
    </div>
  );
};

export default MarketPlace;
