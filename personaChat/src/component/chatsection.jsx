import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreVertical, ArrowLeft, Paperclip, Smile, Search, Info } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatComponent() {
  const location = useLocation();
  const persona = location.state?.persona;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const currentContact = persona;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user's message to state
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      sender: "You",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    try {
      // Prepare last 10 messages in OpenAI format
      const apiMessages = messages
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.text }))
        .concat({ role: "user", content: newMessage });

      // Send request to backend with persona ID
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat/${currentContact.id}`, {
        messages: apiMessages,
      });

      const botMessage = {
        id: messages.length + 2,
        role: "assistant",
        sender: currentContact.name,
        text: res.data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp;
  };

  return (
    <div className="w-screen h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={()=> navigate('/')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors ">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={currentContact.image}
                alt={currentContact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
            </div>
            <div>
              <h2 className="font-semibold text-white">{currentContact.name}</h2>
              <p className="text-sm text-slate-400">{currentContact.lastSeen}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                message.sender === "You" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              {message.role === "assistant" && (
                <img
                  src={currentContact.image}
                  alt={currentContact.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div className={`group relative ${message.sender === "You" ? "ml-auto" : ""}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === "You"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-slate-700 text-white rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <div
                  className={`text-xs text-slate-400 mt-1 ${
                    message.sender === "You" ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <img
                src={currentContact.image}
                alt={currentContact.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-slate-800 border-t border-slate-700 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage(e);
              }}
              placeholder="Type your message..."
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-600 rounded-lg transition-colors">
              <Smile className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-xl transition-colors ${
              newMessage.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <span>Press Enter to send</span>
          <span>{newMessage.length}/500</span>
        </div>
      </div>
    </div>
  );
}
