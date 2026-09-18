import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Send, Sparkles, ShieldCheck, FileText, User, 
  Bot, AlertCircle, Globe, RefreshCw, ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import EvidenceBadge from '../components/common/EvidenceBadge';

export default function AIChat() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: "Hello Sarah! I am MedVault AI, your clinical record intelligence assistant. I answer questions strictly using the 15 uploaded medical records in your vault, complete with original document citations. How can I assist you today?",
      citations: [],
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggested questions in English, Tamil, Hindi
  const suggestedQuestions = {
    en: [
      "What was my latest blood test?",
      "What medications are in my records?",
      "When is my next follow-up?",
      "Which documents mention cholesterol?",
      "Show my previous blood pressure readings"
    ],
    ta: [
      "என்னோட latest blood test என்ன?",
      "என் பதிவுகளில் என்னென்ன மருந்துகள் உள்ளன?",
      "எனது அடுத்த மருத்துவ பரிசோதனை எப்போது?",
      "கொலஸ்ட்ரால் பற்றிய ஆவணம் எது?",
      "எனது முந்தைய இரத்த அழுத்தம் என்ன?"
    ],
    hi: [
      "मेरा नवीनतम रक्त परीक्षण क्या था?",
      "मेरे रिकॉर्ड में कौन सी दवाएं हैं?",
      "मेरा अगला फॉलो-अप कब है?",
      "कोलेस्ट्रॉल के परिणाम किस दस्तावेज़ में हैं?",
      "अस्पताल में मेरा रक्तचाप क्या दर्ज था?"
    ]
  };

  const currentChips = suggestedQuestions[language] || suggestedQuestions.en;

  useEffect(() => {
    const initialPrompt = searchParams.get('prompt');
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const res = await api.sendChatMessage(textToSend, language);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.answer,
        citations: res.citations || [],
        disclaimer: res.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "I couldn't retrieve that information from your uploaded records at this time. Please ensure your documents are fully indexed.",
          citations: [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-slate-900">MedVault AI Assistant</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Grounded on 15 Records
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Zero hallucination guardrails • Linked to verbatim page snippets
            </p>
          </div>
        </div>

        {/* Language selector in chat */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-colors ${
              language === 'en' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('ta')}
            className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-colors ${
              language === 'ta' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            தமிழ்
          </button>
          <button
            onClick={() => changeLanguage('hi')}
            className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-colors ${
              language === 'hi' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-gradient-to-tr from-cyan-600 to-teal-500 text-white shadow-sm'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className="space-y-2">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-subtle ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="block text-[9px] opacity-60 text-right mt-1.5">
                  {msg.timestamp}
                </span>
              </div>

              {/* Citations Card if AI returned evidence */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-900 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                      Document Citations
                    </span>
                    <span className="text-[10px] text-cyan-700 font-semibold">
                      {msg.citations.length} verified source(s)
                    </span>
                  </div>

                  {msg.citations.map((c, i) => (
                    <div key={i} className="bg-white p-2.5 rounded-lg border border-cyan-100 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900 truncate max-w-[200px]">
                          {c.document_name}
                        </span>
                        <span className="text-cyan-700 font-bold text-[10px]">
                          Page {c.page_number}
                        </span>
                      </div>
                      <blockquote className="text-[10px] text-slate-600 italic line-clamp-2">
                        "{c.snippet_text}"
                      </blockquote>
                      <div className="pt-1 flex items-center justify-end">
                        <EvidenceBadge evidenceId={c.evidence_id || 'ev-001'} pageNumber={c.page_number} size="xs" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[80%] items-center">
            <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>Querying verified records...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
          Suggestions:
        </span>
        {currentChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-2.5 py-1 bg-white hover:bg-cyan-50 hover:border-cyan-300 border border-slate-200 rounded-full text-[11px] font-medium text-slate-700 whitespace-nowrap transition-colors flex-shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask about your medical history (${language.toUpperCase()})...`}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="p-2.5 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 disabled:opacity-40 text-white rounded-xl shadow-md shadow-cyan-500/20 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
