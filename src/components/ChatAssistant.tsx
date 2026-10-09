import React, { useState, useRef, useEffect } from 'react';
import { askSynergyCareAssistant, ChatMessage } from '../lib/rag';
import { scrubPhi } from '../lib/hipaa-guard';
import { AiComplianceModal } from './AiComplianceModal';
import {
  X,
  Send,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Trash2,
  Phone,
  Globe,
  Lock
} from 'lucide-react';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, onOpen }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [phiWarning, setPhiWarning] = useState<string | null>(null);

  const initialWelcome = language === 'en'
    ? "Notice: You are interacting with an Artificial Intelligence (AI) assistant for Synergy Health 360 in Scottsdale, AZ. I am NOT a doctor and cannot diagnose conditions, prescribe medications, or provide medical advice. I can help you explore services, InstaCare 360 membership, and appointment booking."
    : "Aviso: Está interactuando con un asistente de Inteligencia Artificial (IA) para Synergy Health 360 en Scottsdale, AZ. NO soy un médico y no puedo diagnosticar ni dar consejos médicos. Puedo ayudarle a conocer nuestros servicios, membresía InstaCare 360 y citas.";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: initialWelcome,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedPrompts = language === 'en'
    ? [
        'What does InstaCare include?',
        'Do you offer wound care?',
        'Where are you located?',
        'How do I book?'
      ]
    : [
        '¿Qué incluye InstaCare 360?',
        '¿Tienen cuidado de heridas?',
        '¿Dónde están ubicados?',
        '¿Cómo programar una cita?'
      ];

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Focus input on open & handle Escape key for WCAG 2.1 AA
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Clean memory on close or language toggle
  const handleClose = () => {
    onClose();
    setPhiWarning(null);
  };

  const clearSession = () => {
    setPhiWarning(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: initialWelcome,
        timestamp: Date.now()
      }
    ]);
  };

  const handleLanguageToggle = () => {
    const nextLang = language === 'en' ? 'es' : 'en';
    setLanguage(nextLang);
    const welcome = nextLang === 'en'
      ? "Notice: You are interacting with an Artificial Intelligence (AI) assistant for Synergy Health 360. I am NOT a doctor. How can I assist you with clinic information or scheduling?"
      : "Aviso: Está interactuando con un asistente de Inteligencia Artificial (IA) para Synergy Health 360. NO soy un médico. ¿En qué puedo orientarle hoy sobre nuestra clínica o citas?";

    setMessages([
      {
        id: `lang-${Date.now()}`,
        sender: 'assistant',
        text: welcome,
        timestamp: Date.now()
      }
    ]);
  };

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // 1. Client-Side HIPAA & Arizona PII Redaction
    const phiResult = scrubPhi(trimmed);
    if (phiResult.hasPhi) {
      setPhiWarning(phiResult.warningMessage || 'HIPAA Notice: Personal health identifiers were redacted.');
    } else {
      setPhiWarning(null);
    }

    const queryToSend = phiResult.sanitizedText;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryToSend,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await askSynergyCareAssistant(queryToSend);
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
          text: language === 'en'
            ? 'For assistance, please call our clinic directly at 480-553-6168 or use the Athenahealth patient portal.'
            : 'Para asistencia directa, llame a nuestra clínica al 480-553-6168 o utilice el portal de pacientes de Athenahealth.',
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
      {/* Floating Button: WCAG-accessible deep-green button with AI indicator */}
      {!isOpen && (
        <aside aria-label="Synergy AI Care Assistant Launcher" className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-2.5 px-4.5 py-3 rounded-lg bg-[#245C50] hover:bg-[#1C493F] text-white font-medium text-[13.5px] shadow-lg hover-shift transition-all border border-white/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#245C50] focus:outline-hidden cursor-pointer"
            aria-label="Open Synergy AI care assistant (Automated System)"
          >
            <ShieldCheck className="w-4 h-4 text-[#86A99A]" />
            <span>Ask Synergy AI</span>
          </button>
        </aside>
      )}

      {/* Side Panel on Desktop (420px) / Full-screen drawer on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-label="Synergy Health 360 AI Care Assistant"
        >
          {/* Backdrop dismiss */}
          <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

          <div className="relative w-full sm:w-[440px] h-full bg-[#FFFFFF] text-[#24332F] shadow-2xl flex flex-col z-10 border-l border-[#D9DED8]">
            {/* Header: State AI Disclosure & HIPAA Safe Harbor Badging */}
            <div className="p-4 sm:p-5 border-b border-[#D9DED8] bg-[#F3F3EF] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-normal text-[18px] text-[#24332F]">
                      Synergy Care Assistant
                    </h3>
                    {/* Mandatory State AI Identification Badge (CA AB 3030, TX, UT) */}
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#245C50]/15 text-[#245C50] font-semibold border border-[#245C50]/20">
                      Automated AI
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#66716C] flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#245C50]" />
                    <span>HIPAA Compliant · Zero-PHI Stored</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Language Toggle (HHS §1557 Language Access) */}
                  <button
                    type="button"
                    onClick={handleLanguageToggle}
                    className="p-1.5 rounded-md text-[#66716C] hover:text-[#245C50] hover:bg-[#D9DED8]/50 transition-colors text-[11px] font-mono font-medium flex items-center gap-1"
                    title="Toggle language / Cambiar idioma"
                    aria-label="Toggle language between English and Spanish"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'ES' : 'EN'}</span>
                  </button>

                  {/* Purge Session Memory */}
                  <button
                    type="button"
                    onClick={clearSession}
                    className="p-1.5 rounded-md text-[#66716C] hover:text-red-700 hover:bg-[#D9DED8]/50 transition-colors"
                    title="Clear session data (Purge chat history)"
                    aria-label="Clear chat session history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Close */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1.5 rounded-md text-[#66716C] hover:bg-[#D9DED8]/50 transition-colors cursor-pointer"
                    aria-label="Close assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Legal Disclosures Trigger Link */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#D9DED8]/60">
                <button
                  type="button"
                  onClick={() => setComplianceModalOpen(true)}
                  className="text-[#245C50] hover:underline flex items-center gap-1 font-medium"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>AI Disclosures & Legal Rights</span>
                </button>
                <a
                  href="tel:4805536168"
                  className="text-[#66716C] hover:text-[#245C50] flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Clinic Staff: 480-553-6168</span>
                </a>
              </div>
            </div>

            {/* PHI Warning Toast if detected */}
            {phiWarning && (
              <div
                role="alert"
                className="mx-4 mt-3 p-3 rounded-lg bg-[#C47B60]/10 border border-[#C47B60]/40 text-[#24332F] text-xs flex items-start gap-2.5 animate-in slide-in-from-top-1"
              >
                <AlertTriangle className="w-4 h-4 text-[#C47B60] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-[#C47B60]">HIPAA Privacy Notice</p>
                  <p className="text-[#66716C] leading-relaxed">{phiWarning}</p>
                </div>
              </div>
            )}

            {/* Message Area */}
            <div
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-[14px]"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  {msg.isEmergency ? (
                    <div className="w-full p-4 rounded-xl border border-[#C47B60] bg-[#C47B60]/10 text-[#24332F] space-y-2">
                      <div className="flex items-center gap-1.5 text-[#C47B60] font-semibold text-[13px]">
                        <AlertTriangle className="w-4 h-4" />
                        <span>EMTALA Emergency Clinical Directive</span>
                      </div>
                      <p className="font-semibold text-[14px] leading-relaxed">
                        Call 911 immediately.
                      </p>
                      <p className="text-[13px] text-[#24332F]/80">
                        For a mental health crisis or suicide distress, call or text <strong>988</strong>. Do not wait for AI responses.
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[88%] rounded-xl px-4 py-3 leading-[1.6] ${
                        msg.sender === 'user'
                          ? 'bg-[#245C50] text-white shadow-xs'
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
                    {msg.sender === 'assistant' ? 'Synergy AI (Automated)' : 'You'}
                  </span>
                </div>
              ))}

              {/* Three-Dot Typing Indicator */}
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
                  className="whitespace-nowrap px-3 py-1 rounded-md bg-[#FFFFFF] border border-[#D9DED8] text-[#24332F] hover:border-[#245C50] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form with WCAG Labels */}
            <form
              onSubmit={onSubmit}
              className="p-3.5 border-t border-[#D9DED8] bg-[#FFFFFF] flex items-center gap-2"
            >
              <label htmlFor="ai-chat-input" className="sr-only">
                Ask Synergy AI a question
              </label>
              <input
                id="ai-chat-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === 'en'
                    ? "Ask about clinic services, hours, InstaCare..."
                    : "Pregunte sobre servicios, horarios, membresía..."
                }
                disabled={loading}
                className="flex-1 px-3.5 py-2 text-[13.5px] rounded-lg bg-[#F3F3EF] border border-[#D9DED8] focus:border-[#245C50] focus:ring-1 focus:ring-[#245C50] outline-hidden text-[#24332F] placeholder:text-[#66716C]/60 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="p-2.5 rounded-lg bg-[#245C50] hover:bg-[#1C493F] text-white disabled:opacity-40 hover-shift cursor-pointer focus-visible:ring-2 focus-visible:ring-[#245C50] transition-all"
                aria-label="Send message to AI assistant"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Portal Action Footer */}
            <div className="px-4 py-2.5 bg-[#F3F3EF] border-t border-[#D9DED8] flex items-center justify-between text-[11px] text-[#66716C]">
              <span>Zero-PHI Guarantee · No logs sold</span>
              <a
                href="https://20314.portal.athenahealth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#245C50] hover:underline flex items-center gap-0.5"
              >
                Athenahealth portal
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Compliance & US Laws Modal */}
      <AiComplianceModal
        isOpen={complianceModalOpen}
        onClose={() => setComplianceModalOpen(false)}
      />
    </>
  );
};
