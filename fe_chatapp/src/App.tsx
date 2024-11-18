import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

// Define the message structure
interface ChatMessage {
  sender: string;
  receiver: string;
  message: string;
}

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    if (userId) {
      const newSocket = io("http://localhost:8080/chats");
      setSocket(newSocket);

      newSocket.emit("join_room", userId);

      newSocket.on("receive_message", (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [userId]);

  const sendMessage = () => {
    if (socket && currentMessage && receiver) {
      const message: ChatMessage = {
        sender: userId,
        receiver,
        message: currentMessage,
      };
      socket.emit("send_message", message);
      setMessages((prev) => [...prev, message]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      {!userId ? (
        <div>
          <input
            type="text"
            placeholder="Enter your user ID"
            onChange={(e) => setUserId(e.target.value)}
            style={{ marginRight: "0.5rem" }}
          />
          <button onClick={() => userId && setUserId(userId)}>
            Set User ID
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Receiver:
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                style={{ marginLeft: "0.5rem" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              style={{ width: "300px", marginRight: "0.5rem" }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <div>
            <h2>Messages</h2>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>
                    {msg.sender} to {msg.receiver}:
                  </strong>{" "}
                  {msg.message}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
