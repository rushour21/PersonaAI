import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, ArrowLeft, Paperclip, Smile, Search, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ChatComponent() {
    const location = useLocation();
    const persona = location.state?.persona;
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! Thanks for connecting. I'm excited to chat about product design and what we're working on at Spotify.",
      sender: 'alex',
      timestamp: '2:14 PM',
      type: 'text'
    },
    {
      id: 2,
      text: "I saw your interest in music tech - are you working on anything interesting in that space?",
      sender: 'alex',
      timestamp: '2:14 PM',
      type: 'text'
    },
    {
      id: 3,
      text: "Hi Alex! Great to connect with you. I'm actually exploring how AI can improve music recommendation systems. Would love to hear your perspective on user behavior patterns you've observed.",
      sender: 'user',
      timestamp: '2:16 PM',
      type: 'text'
    },
    {
      id: 4,
      text: "That's fascinating! We've been diving deep into contextual listening - understanding not just what people listen to, but when and why. The emotional context is huge.",
      sender: 'alex',
      timestamp: '2:18 PM',
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "That's a great point! In my experience, timing is everything when it comes to music discovery.",
        "I'd love to share some insights from our recent user research on that topic.",
        "Absolutely! We've seen similar patterns in our data. Have you considered the impact of social context?",
        "Interesting perspective! At Spotify, we've been experimenting with similar approaches.",
        "That reminds me of a project we worked on last quarter. The results were really eye-opening."
      ];
      
      const alexResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'alex',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, alexResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const formatTime = (timestamp) => {
    return timestamp;
  };

  return (
    <div className="w-screen h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors lg:hidden">
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
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {message.sender === 'alex' && (
                <img
                  src={currentContact.image}
                  alt={currentContact.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}
              
              <div className={`group relative ${message.sender === 'user' ? 'ml-auto' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-slate-700 text-white rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                
                <div className={`text-xs text-slate-400 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
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
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
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
                if (e.key === 'Enter') {
                  handleSendMessage(e);
                }
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
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
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