import React, { useState } from 'react';
import { Users, Cpu, Settings, CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';

const branchGroups = [
  { name: 'CSE', icon: <Cpu className="w-6 h-6 text-blue-600" />, emoji: '💻' },
  { name: 'IT', icon: <CircuitBoard className="w-6 h-6 text-purple-600" />, emoji: '🖥️' },
  { name: 'ENTC', icon: <Settings className="w-6 h-6 text-red-600" />, emoji: '📡' },
  { name: 'MECH', icon: <Users className="w-6 h-6 text-yellow-600" />, emoji: '⚙️' },
  { name: 'CIVIL', icon: <Users className="w-6 h-6 text-green-600" />, emoji: '🏗️' },
  { name: 'EE', icon: <Users className="w-6 h-6 text-pink-600" />, emoji: '🔌' },
];

function ChatGroupPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = branchGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          filteredGroups.map((group) => (
            <div
              key={group.name}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="text-5xl mb-2">{group.emoji}</div>
              {group.icon}
              <h2 className="text-xl font-semibold mt-2">{group.name} Group</h2>
              <p className="text-sm text-gray-500 mb-4">Join and chat with your branch mates</p>
              <Link
                to={`/chat/${group.name.toLowerCase()}`}
                className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Join Group
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatGroupPage;
