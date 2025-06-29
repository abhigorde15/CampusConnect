import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Cpu, Settings, CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  CSE: <Cpu className="w-6 h-6 text-blue-600" />,
  IT: <CircuitBoard className="w-6 h-6 text-purple-600" />,
  ENTC: <Settings className="w-6 h-6 text-red-600" />,
  MECH: <Users className="w-6 h-6 text-yellow-600" />,
  CIVIL: <Users className="w-6 h-6 text-green-600" />,
  EE: <Users className="w-6 h-6 text-pink-600" />,
};

const emojiMap = {
  CSE: '💻',
  IT: '🖥️',
  ENTC: '📡',
  MECH: '⚙️',
  CIVIL: '🏗️',
  EE: '🔌',
};

function ChatGroupPage() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  axios
    .get('http://localhost:8080/api/chat/groups')
    .then((res) => {
      if (Array.isArray(res.data)) {
        setGroups(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setGroups([]);
      }
    })
    .catch((err) => {
      console.error('Failed to fetch chat groups:', err);
      setGroups([]);
    });
}, []);



 const filteredGroups = Array.isArray(groups)
  ? groups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-3xl font-bold text-center mb-8">💬 Branch-wise Chat Groups</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search groups..."
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {filteredGroups.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No matching groups found.</p>
        ) : (
          filteredGroups.map((group) => {
            const groupName = group.name.toUpperCase();
            return (
              <div
                key={group.id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <div className="text-5xl mb-2">{emojiMap[groupName] || '💬'}</div>
                {iconMap[groupName] || <Users className="w-6 h-6 text-gray-600" />}
                <h2 className="text-xl font-semibold mt-2">{group.name} Group</h2>
                <p className="text-sm text-gray-500 mb-4">Join and chat with your branch mates</p>
                <Link
                  to={`/chat/${group.name.toLowerCase()}`}
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Join Group
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChatGroupPage;
