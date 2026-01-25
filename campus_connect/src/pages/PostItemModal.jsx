import { useState } from "react";
import { toast } from "react-hot-toast";
import { httpClient } from "../config/AxiosHelper";

const PostItemModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
  title: "",
  price: "",
  condition_item: "",
  category: "",
  phone: "",
  address: "",
  availability: "",
  image: null,
});



  const token = localStorage.getItem('token')
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const submitItem = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );

    try {
      console.log(token)
      await httpClient.post("api/market/items", payload, {
        headers: {
  Authorization: `Bearer ${token}`
}
      });

      toast.success("Item posted successfully");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to post item");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-xl w-full max-w-2xl 
                  min-h-[50vh] overflow-y-auto p-6">
    <h2 className="text-xl font-bold mb-4">Post New Item</h2>


        <form onSubmit={submitItem} className="space-y-4">
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <select name="category" onChange={handleChange} required>
            <option value="">Category</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Stationery</option>
            <option>Bicycles</option>
          </select>
          <input name="phone" placeholder="Phone" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />
          <input name="image" type="file" onChange={handleChange} required />
          <select name="condition_item" onChange={handleChange} required>
  <option value="">Condition</option>
  <option>New</option>
  <option>Used</option>
</select>

<select name="availability" onChange={handleChange} required>
  <option value="">Availability</option>
  <option>Available</option>
  <option>Sold</option>
</select>

          <div className="flex gap-3">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostItemModal;
