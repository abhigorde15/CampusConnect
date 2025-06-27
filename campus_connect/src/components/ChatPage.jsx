import React, { useRef, useState, useEffect } from "react";
import { MdSend } from "react-icons/md";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const username = localStorage.getItem("username") || "You";
  const roomId = localStorage.getItem("roomId") || "DemoRoom";

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: username,
      content: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Optional: simulate other user reply
    setTimeout(() => {
      const reply = {
        sender: "Friend",
        content: "Got it: " + newMessage.content,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 text-lg font-semibold shadow">
        Room: {roomId} | User: {username}
      </header>

      {/* Messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-sm px-4 py-2 rounded-lg shadow-md ${
                msg.sender === username ? "bg-green-500 text-white" : "bg-white border text-gray-800"
              }`}
            >
              <div className="text-sm font-semibold mb-1">{msg.sender}</div>
              <div>{msg.content}</div>
              <div className="text-xs text-gray-600 mt-1 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <footer className="p-4 bg-white border-t shadow">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <MdSend size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
