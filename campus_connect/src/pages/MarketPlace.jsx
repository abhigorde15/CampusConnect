import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const MarketplacePage = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    condition: "Good",
    category: "",
    phone: "",
    address: "",
    availability: "Available",
    image: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/market");
      if (Array.isArray(res.data)) {
  setItems(res.data);
} else {
  console.error("Expected array, got:", res.data);
  setItems([]); // Prevent crash
}
    } catch (err) {
      toast.error("Failed to fetch items");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      (category === "" || item.category === category) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      await axios.post("/api/market", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product listed successfully!");
      setShowModal(false);
      fetchItems();
    } catch (err) {
      toast.error("Failed to post item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/market/${id}`);
      toast.success("Item deleted");
      fetchItems();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8 font-sans">
      <Toaster />
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
        Second Hand MarketPlace
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Buy, sell, or exchange your academic items easily within campus.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm"
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
          className="px-4 py-2 border rounded shadow-sm w-full sm:w-64"
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Post an Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md transition"
            onClick={() => {
              setSelectedItem(item);
              setShowDetailModal(true);
            }}
          >
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
            <h3 className="font-semibold text-lg mt-2 text-gray-800">{item.title}</h3>
            <p className="text-blue-600 font-bold">₹{item.price}</p>
            <p className="text-sm text-gray-600">By: {item.seller}</p>
            <p className="text-xs text-gray-500 mb-2">Posted: {item.date}</p>
            <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded-full">
              {item.condition}
            </span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Post New Item</h2>
            <input name="title" placeholder="Item title" onChange={handleInput} className="w-full mb-2 px-4 py-2 border rounded" />
            <input name="price" placeholder="Price" onChange={handleInput} className="w-full mb-2 px-4 py-2 border rounded" />
            <input name="phone" placeholder="Contact Number" onChange={handleInput} className="w-full mb-2 px-4 py-2 border rounded" />
            <input name="address" placeholder="Pickup Address" onChange={handleInput} className="w-full mb-2 px-4 py-2 border rounded" />
            <input type="file" name="image" onChange={handleInput} className="w-full mb-2" />
            <select name="availability" onChange={handleInput} className="w-full mb-2 px-4 py-2 border rounded">
              <option>Available</option>
              <option>Sold</option>
              <option>Reserved</option>
            </select>
            <select name="condition" onChange={handleInput} className="w-full mb-2 px-4 py-2 border rounded">
              <option>New</option>
              <option>Good</option>
              <option>Used</option>
            </select>
            <select name="category" onChange={handleInput} className="w-full mb-4 px-4 py-2 border rounded">
              <option>Books</option>
              <option>Electronics</option>
              <option>Stationery</option>
              <option>Bicycles</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Post</button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
            <p><strong>Price:</strong> ₹{selectedItem.price}</p>
            <p><strong>Condition:</strong> {selectedItem.condition}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Seller:</strong> {selectedItem.seller}</p>
            <p><strong>Phone:</strong> {selectedItem.phone}</p>
            <p><strong>Address:</strong> {selectedItem.address}</p>
            <p><strong>Availability:</strong> {selectedItem.availability}</p>
            <p className="text-sm text-gray-500">Posted on {selectedItem.date}</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-gray-300 rounded">Close</button>
              <button onClick={() => handleDelete(selectedItem.id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;