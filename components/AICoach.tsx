import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Zap, BookOpen } from 'lucide-react';
import { getCoachingAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Powerlifting AI Coach. I can build a personalized program for you or check your form cues. Ready to lift?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    // Add user message
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);

    // Mock stats - in a real app these come from the user profile
    const userStats = "Squat: 405, Bench: 275, Deadlift: 520. BW: 183lbs. Experience: Intermediate. Weakness: Lockout on deadlift.";
    
    // Call API
    const advice = await getCoachingAdvice(textToSend, userStats);

    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-950">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900 shadow-sm z-10">
        <h1 className="text-xl font-bold text-white flex items-center">
            <Bot className="text-red-500 mr-2" /> IronCoach AI
        </h1>
        <p className="text-xs text-zinc-500">Powered by Gemini 2.5 Flash • Grounded with Google Search</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-red-600 text-white rounded-br-none' 
                : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
            }`}>
              <div className="flex items-center mb-2 opacity-50 text-xs font-bold uppercase tracking-wider">
                {msg.role === 'user' ? <User size={12} className="mr-1"/> : <Bot size={12} className="mr-1"/>}
                {msg.role === 'user' ? 'You' : 'Coach'}
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                {/* Simple markdown parser for links and newlines */}
                <div dangerouslySetInnerHTML={{ 
                    __html: msg.content
                        .replace(/\n/g, '<br/>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-400 underline hover:text-blue-300">$1</a>')
                        .replace(/- /g, '• ')
                }} />
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-zinc-800 p-4 rounded-2xl rounded-bl-none border border-zinc-700 flex items-center space-x-2">
                    <Loader2 size={16} className="animate-spin text-red-500" />
                    <span className="text-zinc-400 text-sm">Analyzing stats & searching sources...</span>
                </div>
            </div>
        )}
      </div>

      <div className="p-4 bg-zinc-900 border-t border-zinc-800 mb-safe">
        {/* Quick Actions */}
        <div className="flex space-x-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
            <button 
                onClick={() => handleSend("Create a personalized 4-week peaking block for my deadlift based on my stats.")}
                disabled={isLoading}
                className="flex items-center space-x-1 whitespace-nowrap px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-700 hover:text-white transition-colors"
            >
                <Zap size={12} className="text-yellow-500" />
                <span>Generate Program</span>
            </button>
            <button 
                onClick={() => handleSend("What are the best accessory exercises for weak lockout on bench press? Cite sources.")}
                disabled={isLoading}
                className="flex items-center space-x-1 whitespace-nowrap px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-medium hover:bg-zinc-700 hover:text-white transition-colors"
            >
                <BookOpen size={12} className="text-blue-500" />
                <span>Fix Weak Points</span>
            </button>
        </div>

        <div className="flex items-center bg-zinc-950 border border-zinc-700 rounded-full px-2 py-1 focus-within:border-red-500 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask specific questions..."
            className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none placeholder-zinc-600"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};