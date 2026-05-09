'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, User, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAvatarStore } from '../store/avatarStore'
import RobotAvatar from './3d/RobotAvatar'
import { useDeviceTier } from '../hooks/useDeviceTier'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_REPLIES = [
  'Construction Estimation',
  'Normal vs Luxury House',
  'Building Approval help',
  'DTCP Approval process',
  'Consultation Package',
]

export default function ChatBot() {
  const { isMobile } = useDeviceTier()
  const { chatOpen, setChatOpen, setAvatarMood } = useAvatarStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Vanakkam! 🙏 I'm your Civil Engineering Assistant.\n\nI can help with **Building Approvals**, **DTCP processes**, and **Construction Estimations**.\n\nHow can I help you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  const sendMessage = async (text?: string) => {
    const msgText = text || input.trim()
    if (!msgText || loading) return
    const userMsg: Message = { role: 'user', content: msgText }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setAvatarMood('thinking')

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      const reply = data.choices?.[0]?.message?.content || "I couldn't get a response. Please try again."
      setMessages((prev: Message[]) => [...prev, { role: 'assistant', content: reply }])
      setAvatarMood('idle')
    } catch (err: any) {
      // Chat error: handle silently or show UI error
      setMessages((prev: Message[]) => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please call us directly at +91 83440 51846 or message us on WhatsApp for immediate assistance." 
      }])
      setAvatarMood('idle')
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <RobotAvatar />


      {/* Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '1rem' : '1.5rem',
              right: isMobile ? '1rem' : '1.75rem',
              zIndex: 8999,
              width: isMobile ? 'calc(100vw - 2rem)' : '380px',
              height: isMobile ? 'calc(100dvh - 2rem)' : 'min(560px, calc(100dvh - 5rem))',

              borderRadius: 16,
              background: '#111827',
              border: '1px solid #334155',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '0.7rem 1rem',
              borderBottom: '1px solid #334155',
              background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Engineer avatar in header */}
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: '#1a3052',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  overflow: 'hidden',
                  border: '2px solid rgba(250,204,21,0.6)',
                  boxShadow: '0 0 14px rgba(250,204,21,0.25)',
                }}>
                  <img
                    src="/chatbot-icon/blueprintopen.webp"
                    alt="Civil Engineering Assistant"
                    width="52"
                    height="52"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }}
                  />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#F1F5F9', whiteSpace: 'nowrap' }}>Civil Engineering Assistant</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#FACC15', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    Online &amp; Ready to Help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close chat assistant"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: 8,
                  borderRadius: '50%',
                  display: 'flex',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#ef4444'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages" style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((msg: Message, i: number) => (
                <div key={i} style={{
                  display: 'flex', gap: 10,
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: msg.role === 'user' ? '#FACC15' : '#1a3052',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 2,
                    border: msg.role === 'assistant' ? '1px solid rgba(250,204,21,0.4)' : 'none',
                    overflow: 'hidden',
                  }}>
                    {msg.role === 'user'
                      ? <User size={14} color="#0F172A" />
                      : <img src="/chatbot-icon/blueprintopen.webp" alt="Assistant" width="28" height="28" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                  </div>
                  <div style={{
                    maxWidth: '82%', padding: '0.7rem 0.9rem',
                    borderRadius: msg.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background: msg.role === 'user' ? '#FACC15' : '#1F2937',
                    border: msg.role === 'user' ? 'none' : '1px solid #374151',
                    fontSize: 13, lineHeight: 1.6,
                    color: msg.role === 'user' ? '#0F172A' : '#E5E7EB',
                    whiteSpace: 'pre-line',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: '#1a3052',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
                    border: '1px solid rgba(250,204,21,0.4)', overflow: 'hidden',
                  }}>
                    <img src="/chatbot-icon/blueprintopen.webp" alt="Assistant" width="28" height="28" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{
                    padding: '0.7rem 0.9rem', borderRadius: '14px 14px 14px 2px',
                    background: '#1F2937', border: '1px solid #374151',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}>
                    <Loader size={12} color="#FACC15" className="animate-spin" />
                    <span style={{ fontSize: 13, color: '#D1D5DB' }}>Analyzing project details...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Reply Buttons */}
            {messages.length <= 1 && !loading && (
              <div style={{ padding: '0 1rem 1rem', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    style={{
                      padding: '5px 12px', fontSize: 10, fontWeight: 700,
                      background: 'rgba(250, 204, 21, 0.05)',
                      border: '1px solid rgba(250, 204, 21, 0.3)',
                      borderRadius: 20, color: '#FACC15', cursor: 'pointer',
                      transition: 'all 0.2s', whiteSpace: 'nowrap',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(250, 204, 21, 0.15)'; e.currentTarget.style.borderColor = '#FACC15'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(250, 204, 21, 0.05)'; e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.3)'; }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: '1rem', borderTop: '1px solid #334155',
              display: 'flex', gap: 10, flexShrink: 0, background: '#0F172A'
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                aria-label="Chat message input"
                style={{
                  flex: 1, background: '#111827',
                  border: '1px solid #334155',
                  borderRadius: 12, padding: '0.7rem 1rem',
                  fontSize: 14, color: '#E5E7EB', outline: 'none'
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                style={{
                  width: 44, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: input.trim() ? '#FACC15' : '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', flexShrink: 0
                }}
              >
                <Send size={18} color={input.trim() ? '#0F172A' : '#9CA3AF'} aria-hidden="true" />
              </button>
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '0.6rem 1rem 0.8rem',
              fontSize: '10px',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: '1.4',
              borderTop: '1px solid #ef4444',
              background: '#991b1b',
              fontWeight: '800',
            }}>
              ⚠️ <span style={{ textDecoration: 'underline' }}>DISCLAIMER:</span> AI responses may contain errors. 
              Verify all info with our engineer before proceeding. ❗
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .chatbot-messages::-webkit-scrollbar { width: 4px; }
        .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
        .chatbot-messages::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .chatbot-messages::-webkit-scrollbar-thumb:hover { background: #475569; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}
