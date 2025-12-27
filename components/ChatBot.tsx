
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { BRAND } from '../constants';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Hi! I'm your ${BRAND.name} assistant. I can help you find premium electronics, home appliances, or answer any technical questions. How can I help you today?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customMsg?: string) => {
    const userMsg = customMsg || inputValue;
    if (!userMsg.trim() || isLoading) return;

    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getChatResponse(messages, userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that." }]);
    setIsLoading(false);
  };

  const SUGGESTIONS = [
    "UK Warranty Details",
    "Latest Appliance Deals",
    `Track my ${BRAND.name} order`,
    "Next Day Delivery info"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[550px] bg-white rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <i className={`fas ${BRAND.logoIcon}`}></i>
              </div>
              <div>
                <h4 className="font-black text-sm tracking-tight">{BRAND.name} Assistant</h4>
                <p className="text-[10px] text-blue-400 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  UK Live Agent
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#fcfdfe] custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-500/10 font-medium' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm font-medium'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          {!isLoading && (
            <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-[#fcfdfe]">
              {SUGGESTIONS.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="shrink-0 px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-500 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-50 bg-white">
            <div className="flex items-center gap-3">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask ${BRAND.name} anything...`}
                className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-blue-500/20 disabled:bg-slate-300 transform active:scale-90"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 z-10 group"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-2xl group-hover:rotate-12 transition-transform`}></i>
      </button>
    </div>
  );
};
