import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronRight, MapPin, Sprout, FlaskConical, Gavel, Droplets } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'options';
  options?: string[];
}

const CATEGORIES = [
  { id: 'fertilizers', label: 'Fertilizers', icon: Sprout, color: 'bg-green-100 text-green-700' },
  { id: 'urea', label: 'Urea', icon: FlaskConical, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'pesticides', label: 'Pesticides', icon: Droplets, color: 'bg-red-100 text-red-700' },
  { id: 'mandi', label: 'Mandi Locations', icon: MapPin, color: 'bg-blue-100 text-blue-700' },
  { id: 'schemes', label: 'Govt Schemes', icon: Gavel, color: 'bg-purple-100 text-purple-700' },
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I am your AI farming assistant. How can I help you today? Select a topic below or ask me anything!',
      type: 'options' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('fertilizer')) {
      return "For optimal crop growth, use NPK ratio 4:2:1 for leafy vegetables. Organic options like vermicompost are great for long-term soil health. What specific crop are you asking about?";
    } else if (lowerMessage.includes('urea')) {
      return "Urea provides essential Nitrogen. Apply it in split doses: 1/3 at sowing, 1/3 at tillering, and 1/3 at flowering stage. Avoid applying when the soil is too dry.";
    } else if (lowerMessage.includes('pesticide')) {
      return "Use Neem oil (5ml/L) for initial pest control. For severe infestations of aphids/bollworms, consult our Disease Detection tool properly. Always use protective gear when spraying.";
    } else if (lowerMessage.includes('mandi') || lowerMessage.includes('price')) {
      return "Current Mandi prices: Wheat ₹2125/qt, Rice ₹2040/qt. Visit your local APMC mandi for real-time rates. You can find the nearest mandi in the Farmer Hub section.";
    } else if (lowerMessage.includes('scheme') || lowerMessage.includes('government')) {
      return "Key Schemes: 1. PM-KISAN (₹6000/yr) 2. Soil Health Card 3. PM Fasal Bima Yojana (Crop Insurance). Visit your local agriculture office to apply.";
    } else if (lowerMessage.includes('disease')) {
      return "For disease detection, please upload an photo of the affected plant in the 'Disease Detection' page. I can help identify symptoms if you describe them.";
    } else {
      return "I can help with fertilizers, market prices, crop diseases, and government schemes. Try selecting a topic from the menu or ask a specific question.";
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    setTimeout(async () => {
      const aiResponse = getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setLoading(false);

      if (user) {
        await supabase.from('chat_history').insert([{
          farmer_id: user.id,
          message: userMessage,
          response: aiResponse,
        }]);
      }
    }, 800);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition z-50 animate-bounce"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-gray-50 rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200" style={{ height: '600px' }}>
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Kisan Sahayak</h3>
                <p className="text-xs text-green-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 border border-green-200">
                     <Bot className="h-5 w-5 text-green-700" />
                   </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center ml-2 flex-shrink-0">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Quick Categories */}
           {messages.length === 1 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSend(`Tell me about ${cat.label}`)}
                    className={`${cat.color} p-3 rounded-xl text-left text-sm font-medium hover:opacity-80 transition flex items-center space-x-2`}
                  >
                    <cat.icon className="h-4 w-4" />
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                 <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                     <Bot className="h-5 w-5 text-green-700" />
                   </div>
                <div className="bg-white text-gray-500 p-3 rounded-2xl border border-gray-100 flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about crops, mandi prices..."
                className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 shadow-md"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
