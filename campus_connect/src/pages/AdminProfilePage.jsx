import React, { useEffect, useState } from 'react';
import { httpClient } from "../config/AxiosHelper";
const AdminProfilePage = () => {
  const [admin, setAdmin] = useState({});
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [chatGroups, setChatGroups] = useState([]);
  const [marketItems, setMarketItems] = useState([]);
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [newGroup, setNewGroup] = useState({ title: '', description: '' });

let token = localStorage.getItem('token');

  
useEffect(() => {
  token = localStorage.getItem('token');
  httpClient.get('api/chat-groups',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setChatGroups(data))
    .catch(() => console.error('Failed to load chat groups'));
}, []);
useEffect(() => {
  token = localStorage.getItem('token');
 httpClient.get('/chat-groups', {
  headers: { Authorization: `Bearer ${token}` }
})
.then((res) => setChatGroups(res.data)) 
.catch((err) => console.error('Failed to load chat groups'));
}, []);

const handleAddGroup = async () => {
  if (newGroup.title.trim() === '') return;

  try {
    const token = localStorage.getItem('token');
    const res = await httpClient.post('/chat-groups', newGroup, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});



    if (!res.data ) throw new Error('Failed to create group');
   
    const created = res.data;
    setChatGroups([...chatGroups, created]);
    setNewGroup({ title: '', description: '' });
    setShowAddGroupForm(false);
  } catch (err) {
    alert('Failed to create group');
  }
};

const handleDeleteGroup = async (id) => {
  const token = localStorage.getItem('token');

  try {

    await httpClient.delete(`/chat-groups/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    setChatGroups(chatGroups.filter((group) => group.id !== id));
  } catch (err) {
    alert('Failed to delete group');
  }
};



  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      {showAddGroupForm && (
        <div className="bg-white border border-gray-300 shadow p-4 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-2">Add New Chat Group</h3>
          <input
            type="text"
            placeholder="Group Title"
            className="w-full p-2 border rounded mb-2"
            value={newGroup.title}
            onChange={(e) => setNewGroup({ ...newGroup, title: e.target.value })}
          />
          <textarea
            placeholder="Description (optional)"
            className="w-full p-2 border rounded mb-2"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddGroupForm(false)}
              className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGroup}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Group
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Admin Info</h3>
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Role:</strong> {admin.role}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Chat Groups</h3>
          <button
            onClick={() => setShowAddGroupForm(true)}
            className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Group
          </button>
        </div>
        <ul className="space-y-2">
          {chatGroups.map(group => (
            <li key={group.id} className="flex justify-between items-center border-b pb-2">
              <p>{group.name}</p>
             <button onClick={() => handleDeleteGroup(group.id)} className="text-red-500 hover:text-red-700 text-sm">
  Delete
</button>


            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Users</h3>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center border-b pb-2">
              <p>{user.name} ({user.email})</p>
              <button className="text-red-500 hover:text-red-700 text-sm">Delete User</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">All Shared Notes</h3>
        <ul className="space-y-2">
          {notes.map(note => (
            <li key={note.id} className="flex justify-between items-center border-b pb-2">
              <p>{note.title} (by {note.uploader})</p>
              <button className="text-red-500 hover:text-red-700 text-sm">Delete Note</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Marketplace Listings</h3>
        <ul className="space-y-2">
          {marketItems.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <p>{item.name} (by {item.listedBy})</p>
              <button className="text-red-500 hover:text-red-700 text-sm">Delete Listing</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProfilePage;