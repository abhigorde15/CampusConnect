import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { httpClient } from "../config/AxiosHelper";
import MarketItemCard from "./MarketItemCard";
import axios from "axios";

const MarketplacePage = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    condition_item: "Good",
    category: "",
    phone: "",
    address: "",
    availability: "Available",
    image: null,
  });

  useEffect(() => {
    fetchItems();
    loadRazorpayScript();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await httpClient.get("api/public/market/items");
      setItems(res.data);
    } catch (err) {
      toast.error("Failed to fetch items");
    }
  };

  // ✅ Load Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => toast.error("Failed to load Razorpay SDK");
    document.body.appendChild(script);
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

  const handleRazorpay = async (item) => {
    const userId = localStorage.getItem("userId"); // store this after login

    if (!razorpayLoaded) {
      toast.error("Razorpay SDK not loaded yet");
      return;
    }

    try {
      
      const response = await axios.post("http://localhost:8080/api/payment", {
        amount: item.price,
        userId: userId,
        itemId: item.id,
        itemName: item.title,
      });

      const orderData = response.data;
      const orderId = orderData.id;


     
      const options = {
        key: "rzp_test_RTiF5DAIvcu5qd", 
        amount: item.price * 100,
        currency: "INR",
        name: "CampusConnect Marketplace",
        description: `Payment for ${item.title}`,
        image: "/NewLogo.png",
        order_id: orderId,
        handler: async function (response) {
          toast.success("Payment successful!");
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);

        
          try {
            await axios.post("http://localhost:8080/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId : localStorage.getItem('userId'),
            });
            toast.success("Payment verified & saved!");
          } catch (err) {
            console.error("Verification failed:", err);
            toast.error("Verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Abhishek Gorde",
          email: "abhishekgorde@example.com",
          contact: "8888888888",
        },
        notes: {
          item_name: item.title,
          item_id: item.id,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        toast.error("Payment failed! Try again.");
      });

      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Payment initialization failed!");
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

      {/* Filter & Search */}
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

      {/* Item List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredItems.map((item) => (
          <MarketItemCard
            key={item.id}
            item={item}
            onClick={() => {
              setSelectedItem(item);
              setShowDetailModal(true);
            }}
          />
        ))}
      </div>

      {/* Item Details Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
            <p>
              <strong>Price:</strong> ₹{selectedItem.price}
            </p>
            <p>
              <strong>Condition:</strong> {selectedItem.condition}
            </p>
            <p>
              <strong>Category:</strong> {selectedItem.category}
            </p>
            <p>
              <strong>Seller:</strong> {selectedItem.seller}
            </p>
            <p>
              <strong>Phone:</strong> {selectedItem.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedItem.address}
            </p>
            <p>
              <strong>Availability:</strong> {selectedItem.availability}
            </p>
            <p className="text-sm text-gray-500">
              Posted on {selectedItem.date}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toast.success("Cash payment selected. Meet the seller.")
                  }
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Pay in Cash
                </button>
                <button
                  onClick={() => handleRazorpay(selectedItem)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Pay via Razorpay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
