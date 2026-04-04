"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').trim() || 'https://tumor-vision.onrender.com';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "ai" | "user"; text: string }[]>([
    { sender: "ai", text: "Hello! I'm Tumor Vision AI assistant. Ask me anything about brain tumors, diagnosis, or how to use this platform." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply || data.response || "I received your message." }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: getLocalResponse(userMsg) }]);
      }
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: getLocalResponse(userMsg) }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#528DCB] to-[#4B78A0] text-white shadow-lg shadow-[#528DCB]/30 flex items-center justify-center hover:shadow-[#528DCB]/50 transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[370px] h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-300/20"
          >
            <div className="relative flex flex-col w-full h-full rounded-2xl border border-[#528DCB]/30 overflow-hidden bg-white/95 backdrop-blur-xl">

              {/* Header */}
              <div className="px-4 py-3 border-b border-[#528DCB]/15 bg-gradient-to-r from-[#528DCB] to-[#4B78A0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg">🧠</span>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Tumor Vision AI</h2>
                    <p className="text-[10px] text-white/70">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 text-sm flex flex-col">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "px-3 py-2.5 rounded-2xl max-w-[85%] shadow-sm",
                      msg.sender === "ai"
                        ? "bg-[#E0EFFF] text-[#1a1a2e] self-start rounded-bl-md"
                        : "bg-gradient-to-r from-[#528DCB] to-[#4B78A0] text-white self-end rounded-br-md"
                    )}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-md max-w-[30%] bg-[#E0EFFF] self-start">
                    <span className="w-2 h-2 rounded-full bg-[#528DCB] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#528DCB] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#528DCB] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 p-3 border-t border-[#528DCB]/15 bg-white">
                <input
                  className="flex-1 px-3 py-2.5 text-sm bg-[#E0EFFF] rounded-xl border border-[#528DCB]/20 text-[#1a1a2e] placeholder-[#6A7F92] focus:outline-none focus:ring-2 focus:ring-[#528DCB]/30"
                  placeholder="Ask about brain tumors..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#528DCB] to-[#4B78A0] hover:shadow-lg hover:shadow-[#528DCB]/30 transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function getLocalResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('glioma')) return "Gliomas are tumors arising from glial cells. They are graded I-IV by WHO. Grade IV (glioblastoma) is the most aggressive. Treatment typically involves surgery, radiation, and temozolomide chemotherapy.";
  if (lower.includes('meningioma')) return "Meningiomas arise from meninges and are mostly benign (WHO Grade I). They account for ~30% of primary brain tumors. Complete surgical resection is often curative.";
  if (lower.includes('pituitary')) return "Pituitary tumors arise from the pituitary gland. They can be functioning (hormone-secreting) or non-functioning. Treatment includes medication, surgery, and sometimes radiation.";
  if (lower.includes('symptom')) return "Common brain tumor symptoms include headaches (worse in morning), seizures, focal neurological deficits, cognitive changes, and vision problems. Symptoms depend on tumor location and size.";
  if (lower.includes('upload') || lower.includes('scan') || lower.includes('mri')) return "To upload an MRI scan, go to the Upload page. Our AI will analyze it in under 2 minutes and classify it across 4 tumor categories with confidence scores.";
  if (lower.includes('treatment')) return "Treatment depends on tumor type and grade. Options include surgery (maximal safe resection), radiation therapy (SRS, WBRT), chemotherapy (temozolomide, PCV), targeted therapy, and immunotherapy.";
  if (lower.includes('accuracy')) return "Our AI model achieves 98.7% accuracy using Azure Custom Vision. It can detect gliomas, meningiomas, pituitary tumors, and no-tumor cases.";
  if (lower.includes('report') || lower.includes('pdf')) return "After analysis, you can generate a PDF report from the Review page. Reports are available in English, Hindi, and Marathi.";
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return "Hello! How can I help you today? You can ask me about brain tumors, diagnosis, treatment options, or how to use this platform.";
  if (lower.includes('thank')) return "You're welcome! Feel free to ask if you have more questions. Stay healthy! 🧠";
  return "I can help with brain tumor information, diagnosis queries, treatment options, and platform usage. Try asking about specific tumor types, symptoms, or how to upload an MRI scan!";
}
