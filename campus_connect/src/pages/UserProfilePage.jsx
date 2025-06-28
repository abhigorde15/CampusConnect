import React, { useEffect, useState } from 'react';

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Dummy user data
    setUser({
      name: 'Abhishek Gorde',
      email: 'abhishek@kkwagh.edu.in',
      branch: 'Information Technology'
    });

    // Dummy notes data
    setNotes([
      { id: 1, title: 'DBMS Notes', semester: 'Sem 4', isPremium: false, date: '2025-03-15' },
      { id: 2, title: 'Operating System Notes', semester: 'Sem 4', isPremium: true, date: '2025-04-02' },
    ]);

    // Dummy marketplace listings
    setListings([
      { id: 1, name: 'Scientific Calculator', category: 'Electronics', price: 300, status: 'Available' },
      { id: 2, name: 'Basic Civil Book', category: 'Books', price: 150, status: 'Sold' },
    ]);

    // Dummy purchases
    setPurchases([
      { id: 1, name: 'Engineering Drawing Set', sellerName: 'Ravi Patil', price: 250, date: '2025-06-12' },
      { id: 2, name: 'Second-hand Laptop Stand', sellerName: 'Pooja Sharma', price: 500, date: '2025-06-15' },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Branch:</strong> {user.branch}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Shared Notes</h3>
        <ul className="space-y-2">
          {notes.map(note => (
            <li key={note.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{note.title} ({note.semester})</p>
                <p className="text-sm text-gray-500">{note.isPremium ? 'Premium' : 'Free'} • Uploaded on {note.date}</p>
              </div>
              <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Marketplace Listings</h3>
        <ul className="space-y-2">
          {listings.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.name} ({item.category})</p>
                <p className="text-sm text-gray-500">₹{item.price} • {item.status}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700 text-sm">Edit</button>
                <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Purchased Items</h3>
        <ul className="space-y-2">
          {purchases.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Sold by {item.sellerName} • ₹{item.price} • {item.date}</p>
              </div>
              <button className="text-green-600 hover:text-green-800 text-sm">View</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;