import { useState } from 'react'
import { MessageSquare, Coffee, Briefcase, User, ArrowRight } from 'lucide-react';
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
   const [selectedPersona, setSelectedPersona] = useState(null);

  const personas = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Senior Product Designer",
      company: "Spotify",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "I help companies build products that people actually want to use. Currently designing the future of music discovery at Spotify.",
      interests: ["Product Strategy", "UX Research", "Music Tech"],
      location: "San Francisco, CA",
      status: "online"
    },
    {
      id: 2,
      name: "Maya Chen",
      role: "Marketing Director", 
      company: "Airbnb",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      bio: "I craft stories that connect brands with their communities. Leading growth marketing initiatives for global expansion.",
      interests: ["Brand Strategy", "Growth Marketing", "Travel"],
      location: "New York, NY", 
      status: "online"
    }
  ];

  const handleStartChat = (persona) => {
  setSelectedPersona(persona); // store whole object, not just ID

  setTimeout(() => {
    console.log(`Starting conversation with ${persona.name}`);
    navigate('/chaton', { state: { persona } }); // ✅ fixed syntax
  }, 2000);
};


  return (
    <div className="bg-slate-900 text-white overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="px-8 py-6 border-b border-slate-800">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-semibold">Connect</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Browse</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Favorites</a>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto w-full">
            {/* Title Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Start meaningful
                <br />
                conversations
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Connect with professionals who share your interests and can offer valuable insights from their experience
              </p>
            </div>

            {/* Persona Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {personas.map((persona) => (
                <div
                  key={persona.id}
                  className={`group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer ${
                    selectedPersona?.id === persona.id ? 'scale-105 border-blue-500' : 'hover:scale-[1.02]'
                  }`}
                  onClick={() => handleStartChat(persona)}
                >
                  {/* Profile Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={persona.image}
                        alt={persona.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-600 group-hover:ring-blue-500 transition-all duration-300"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 ${
                        persona.status === 'online' ? 'bg-green-500' : 'bg-slate-500'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{persona.name}</h3>
                      <p className="text-blue-400 font-medium">{persona.role}</p>
                      <p className="text-slate-400 text-sm">{persona.company}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Coffee className="w-4 h-4" />
                      <span className="text-xs">Available</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {persona.bio}
                  </p>

                  {/* Interests */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-400 mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {persona.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex items-center text-slate-400 text-sm">
                      <User className="w-4 h-4 mr-1" />
                      {persona.location}
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 group-hover:scale-105">
                      <span>Chat</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Loading State */}
                  {selectedPersona?.id === persona.id && (
                    <div className="absolute inset-0 bg-slate-900/80 rounded-2xl flex items-center justify-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-slate-300">Connecting...</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="flex justify-center mt-16">
              <div className="flex items-center space-x-12 text-sm text-slate-400">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2.4k+</div>
                  <div>Active professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">150+</div>
                  <div>Industries covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div>Availability</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App
