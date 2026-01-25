import React from "react";
import { toast } from "react-hot-toast";

const MarketItemDetailsModal = ({ item, onClose }) => {
  const handleCashPayment = () => {
    toast.success("Cash payment selected. Meet the seller.");
  };

  const handleRazorpayPayment = () => {
    toast("Razorpay integration already wired in parent");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-56 object-cover rounded-t-2xl"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

          <div className="space-y-2 mb-6 text-sm">
            <p><strong>Price:</strong> ₹{item.price}</p>
            <p><strong>Condition:</strong> {item.condition}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Seller:</strong> {item.seller}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Address:</strong> {item.address}</p>
            <p className="text-gray-500 text-center">
              Posted on {item.date}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 rounded-xl"
            >
              Close
            </button>

            <button
              onClick={handleCashPayment}
              className="flex-1 px-4 py-3 bg-yellow-500 text-white rounded-xl"
            >
              Pay in Cash
            </button>

            <button
              onClick={handleRazorpayPayment}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl"
            >
              Pay via Razorpay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketItemDetailsModal;
