import React, { useEffect, useState } from 'react';
import { httpClient } from "../config/AxiosHelper";

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); 
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const userRes = await httpClient.get('api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
        console.log(userRes.data)
       
        const notesRes = await httpClient.get(`api/notes/user/${userRes.data.id}`);
        setNotes(notesRes.data);

       
        const listingsRes = await httpClient.get(`api/public/market/items/${userRes.data.id}`);
        setListings(listingsRes.data);

       
        const purchasesRes = await httpClient.get(`api/user/${userRes.data.id}`);
        setPurchases(purchasesRes.data);

      } catch (err) {
        console.error('Error fetching user profile data:', err);
      }
    };

    fetchData();
  }, [token]);

  const handleDeleteNote = async (id) => {
    try {
      await httpClient.delete(`api/notes/${id}`);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Branch:</strong> {user.branch}</p>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Shared Notes</h3>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes shared yet.</p>
        ) : (
          <ul className="space-y-2">
            {notes.map(note => (
              <li key={note.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{note.title} ({note.semester})</p>
                  <p className="text-sm text-gray-500">{note.isPremium ? 'Premium' : 'Free'} • Uploaded on {note.uploadedAt?.slice(0, 10)}</p>
                </div>
                <button onClick={() => handleDeleteNote(note.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Marketplace Listings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Marketplace Listings</h3>
        {listings.length === 0 ? (
          <p className="text-gray-500">No items listed yet.</p>
        ) : (
          <ul className="space-y-2">
            {listings.map(item => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.title} ({item.category})</p>
                  <p className="text-sm text-gray-500">₹{item.price} • {item.availability}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700 text-sm">Edit</button>
                  <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Purchased Items */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Purchased Items</h3>
        {purchases.length === 0 ? (
          <p className="text-gray-500">No purchases yet.</p>
        ) : (
          <ul className="space-y-2">
            {purchases.map(payment => (
              <li key={payment.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{payment.itemTitle}</p>
                  <p className="text-sm text-gray-500">₹{payment.amount} • {payment.status}</p>
                </div>
                <button className="text-green-600 hover:text-green-800 text-sm">View</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
