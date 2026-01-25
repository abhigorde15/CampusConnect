import React, { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import { httpClient } from "../config/AxiosHelper";
const ChatPage = () => {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const stompClientRef = useRef(null);

  const name = localStorage.getItem("name") || "You";

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Connect WebSocket and load old messages
  useEffect(() => {
    // Load message history
    httpClient
      .get(`api/public/chat/messages/${groupName}`)
      .then((res) => {
        const history = res.data.map((msg) => ({
          id: msg.id,
          sender: msg.senderName,
          content: msg.content,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(history);
      })
      .catch((err) => console.error("Error loading messages:", err));

    // WebSocket connection
    const socket = new SockJS("https://kkwaghconnect.onrender.com/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/topic/${groupName}`, (message) => {
          // Parse the saved ChatMessage entity with ID and timestamp
          const body = JSON.parse(message.body);
          setMessages((prev) => [
            ...prev,
            {
              id: body.id, // Now includes the database-generated ID
              sender: body.senderName,
              content: body.content,
              time: new Date(body.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [groupName]);

  const sendMessage = () => {
    if (!input.trim() || !stompClientRef.current?.connected) return;

    const payload = {
      senderName: name,
      content: input.trim(),
    };

    stompClientRef.current.publish({
      destination: `/app/chat.sendMessage/${groupName}`,
      body: JSON.stringify(payload),
    });

    setInput("");
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You're not logged in.");
      return;
    }

    try {
       console.log(id)
      await httpClient.delete(`api/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      alert("Failed to delete message.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 text-lg font-semibold shadow">
        Group: {groupName.toUpperCase()} | User: {name}
      </header>

      {/* Messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === name ? "justify-end" : "justify-start"}`}
            onClick={() => {
              if (msg.sender === name) {
                const confirmDelete = window.confirm("Do you want delete this message")
                if (confirmDelete) {
                 
                  handleDelete(msg.id)
                }
              }
            }
            }
          >
            <div
              className={`max-w-sm px-4 py-2 rounded-lg shadow-md ${msg.sender === name
                  ? "bg-green-500 text-white"
                  : "bg-white border text-gray-800"
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
