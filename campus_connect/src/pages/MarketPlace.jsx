import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const dummyItems = [
  {
    id: 1,
    title: "Engineering Mathematics Book",
    price: 250,
    seller: "Abhishek Gorde",
    date: "June 25, 2025",
    condition: "Good",
    category: "Books",
    image: "/shopping.webp",
  },
  {
    id: 2,
    title: "Scientific Calculator",
    price: 300,
    seller: "Anjali Patil",
    date: "June 20, 2025",
    condition: "New",
    category: "Electronics",
    image: "/shopping.webp",
  },
  {
    id: 3,
    title: "Drawing Kit",
    price: 180,
    seller: "Rahul Joshi",
    date: "June 18, 2025",
    condition: "Used",
    category: "Stationery",
    image: "/shopping.webp",
  },
];

const MarketplacePage = () => {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    seller: "",
    condition: "Good",
    category: "",
  });

  const filteredItems = dummyItems.filter(
    (item) =>
      (category === "" || item.category === category) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    toast.success("Product listed successfully!");
    setShowModal(false);
    // Here you'd normally add the new item to backend or state
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

      {/* Filters */}
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

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Post New Item</h2>
            <input
              name="title"
              placeholder="Item title"
              value={formData.title}
              onChange={handleInput}
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInput}
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <input
              name="seller"
              placeholder="Your name"
              value={formData.seller}
              onChange={handleInput}
              className="w-full mb-2 px-4 py-2 border rounded"
            />
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInput}
              className="w-full mb-2 px-4 py-2 border rounded"
            >
              <option>New</option>
              <option>Good</option>
              <option>Used</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleInput}
              className="w-full mb-4 px-4 py-2 border rounded"
            >
              <option>Books</option>
              <option>Electronics</option>
              <option>Stationery</option>
              <option>Bicycles</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
