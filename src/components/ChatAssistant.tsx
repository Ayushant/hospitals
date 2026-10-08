import React, { useState, useRef, useEffect } from 'react';
import { askSynergyCareAssistant, ChatMessage } from '../lib/rag';
import { X, Send, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi, I'm Synergy's AI assistant. I can answer questions about our services, membership, and locations. I can't give medical advice.",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What does InstaCare include?',
    'Do you offer wound care?',
    'Where are you located?',
    'How do I book?'
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Clean memory on close
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: "Hi, I'm Synergy's AI assistant. I can answer questions about our services, membership, and locations. I can't give medical advice.",
          timestamp: Date.now()
        }
      ]);
    }, 200);
  };

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await askSynergyCareAssistant(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: response.text,
          sources: response.sources,
          isEmergency: response.isEmergency,
          timestamp: Date.now()
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Please call our clinic desk directly at 480-553-6168 or book online via Athenahealth.',
          sources: ['Clinic Helpdesk'],
          timestamp: Date.now()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* 13. Floating Button: Compact, deep-green rectangular button labeled "Ask Synergy" */}
      {!isOpen && (
        <aside aria-label="Care Assistant launcher" className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-md bg-[#245C50] hover:bg-[#1C493F] text-white font-medium text-[13.5px] shadow-sm hover-shift transition-all border border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C50] cursor-pointer"
            aria-label="Open Synergy care assistant"
          >
            <span>Ask Synergy</span>
          </button>
        </aside>
      )}

      {/* Side Panel on Desktop (400-440px) / Full-width bottom sheet on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-label="Synergy Care Assistant"
        >
          <div className="absolute inset-0" onClick={handleClose} />

          <div className="relative w-full sm:w-[420px] h-full bg-[#FFFFFF] text-[#24332F] shadow-2xl flex flex-col z-10 border-l border-[#D9DED8]">
            {/* Header: White background, Dark forest headings, Muted body */}
            <div className="p-4 sm:p-5 border-b border-[#D9DED8] bg-[#F3F3EF] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-normal text-[18px] text-[#24332F]">
                    Synergy Care Assistant
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#245C50] font-semibold">
                    AI assistant
                  </span>
                </div>
                <p className="text-[11.5px] text-[#66716C]">
                  AI assistant • Not medical advice
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-md text-[#66716C] hover:bg-[#D9DED8]/50 transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-[14px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  {msg.isEmergency ? (
                    <div className="w-full p-4 rounded-md border border-[#C47B60] bg-[#C47B60]/10 text-[#24332F] space-y-2">
                      <div className="flex items-center gap-1.5 text-[#C47B60] font-semibold text-[13px]">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Emergency Clinical Notice</span>
                      </div>
                      <p className="font-semibold text-[14px] leading-relaxed">
                        Call 911 now.
                      </p>
                      <p className="text-[13px] text-[#24332F]/80">
                        For a mental health crisis, call or text 988.
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[88%] rounded-md px-4 py-3 leading-[1.6] ${
                        msg.sender === 'user'
                          ? 'bg-[#245C50] text-white'
                          : 'bg-[#F3F3EF] text-[#24332F] border border-[#D9DED8]'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 pt-1.5 border-t border-black/5 text-[11px] font-mono text-[#245C50]">
                          Source: {msg.sources[0]}
                        </div>
                      )}
                    </div>
                  )}
                  <span className="text-[10px] text-[#66716C] mt-1 px-1 font-mono">
                    {msg.sender === 'assistant' ? 'Synergy AI' : 'You'}
                  </span>
                </div>
              ))}

              {/* Minimal Three-Dot Typing Indicator */}
              {loading && (
                <div className="flex items-center gap-1.5 text-xs text-[#245C50] py-2 px-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#245C50] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#245C50] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#245C50] animate-bounce [animation-delay:300ms]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t border-[#D9DED8] bg-[#F3F3EF]/70 flex items-center gap-2 overflow-x-auto text-[12.5px] scrollbar-none">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={loading}
                  className="whitespace-nowrap px-3 py-1 rounded-md bg-[#FFFFFF] border border-[#D9DED8] text-[#24332F] hover:border-[#245C50] transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={onSubmit}
              className="p-3.5 border-t border-[#D9DED8] bg-[#FFFFFF] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about services, membership, locations..."
                disabled={loading}
                className="flex-1 px-3.5 py-2 text-[13.5px] rounded-md bg-[#F3F3EF] border border-[#D9DED8] focus:border-[#245C50] outline-none text-[#24332F] placeholder:text-[#66716C]/60"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="p-2 rounded-md bg-[#245C50] text-white disabled:opacity-40 hover-shift cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Portal Action Footer */}
            <div className="px-4 py-2.5 bg-[#F3F3EF] border-t border-[#D9DED8] flex items-center justify-between text-[11.5px] text-[#66716C]">
              <span>Clinical records are not retained in chat</span>
              <a
                href="https://20314.portal.athenahealth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#245C50] hover:underline flex items-center gap-0.5"
              >
                Book visit online
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
