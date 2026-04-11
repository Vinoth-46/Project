'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Loader, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAvatarStore } from '../store/avatarStore'
import RobotAvatar from './3d/RobotAvatar'
import { useDeviceTier } from '../hooks/useDeviceTier'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_REPLIES = [
  'Building Approval help',
  'DTCP Approval process',
  'Construction consultation',
  'Bank loan estimate',
  'Package pricing',
]

export default function ChatBot() {
  const { isMobile } = useDeviceTier()
  const { chatOpen, setChatOpen, setAvatarMood } = useAvatarStore()
  const [dialOpen, setDialOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Vanakkam! 🙏 I'm the Civil Engineering Assistant for Kitchaa's Enterprise.\n\nPlanning construction or need building approval? Let me guide you correctly — mistakes here can cost lakhs.\n\nHow can I help you today?"
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
      console.error('Chat error:', err)
      setMessages((prev: Message[]) => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please call us directly at +91 83440 51846 or message us on WhatsApp for immediate assistance." 
      }])
      setAvatarMood('idle')
    } finally {
      setLoading(false)
    }
  }

  const dialActions = [
    {
      label: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      bg: '#25D366',
      href: 'https://wa.me/918344051846',
    },
    {
      label: 'Call Us',
      icon: <Phone size={20} />,
      bg: '#f5a623',
      href: 'tel:+918344051846',
    },
  ]

  return (
    <>
      <RobotAvatar />

      {/* Unified Speed Dial — bottom right */}
      <div style={{ 
        position: 'fixed', 
        bottom: 'min(1.75rem, 20px)', 
        right: isMobile ? '1.2rem' : '1.75rem', 
        zIndex: 9000, 
        display: 'flex', 
        flexDirection: isMobile ? 'row-reverse' : 'column', 
        alignItems: 'flex-end', 
        gap: 12 
      }}>

        {/* FAB Toggle (Mobile Only or Desktop as WhatsApp/Call trigger) */}
        {!chatOpen && (
          <div className="flex flex-col-reverse items-end gap-3">
            <motion.button
              onClick={() => setDialOpen(prev => !prev)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="flex"
              style={{
                width: 50, height: 50, borderRadius: '50%',
                background: dialOpen ? '#334155' : '#FACC15',
                border: dialOpen ? '1px solid #0F172A' : 'none', cursor: 'pointer',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(250,204,21,0.25)',
              }}
            >
              <motion.div animate={{ rotate: dialOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                {dialOpen ? <X size={20} color="#E5E7EB" /> : <Phone size={20} color="#0F172A" />}
              </motion.div>
            </motion.button>

            {/* Expanded Actions */}
            <AnimatePresence>
              {dialOpen && dialActions.map((action, i) => (
                <motion.a
                  key={action.label}
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ duration: 0.18, delay: i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
                >
                  {!isMobile && <span style={{
                    background: '#334155', border: '1px solid #0F172A', borderRadius: 8,
                    padding: '4px 10px', fontSize: 11, fontWeight: 700,
                    color: '#E5E7EB', whiteSpace: 'nowrap'
                  }}>{action.label}</span>}
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', background: action.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    {action.icon}
                  </div>
                </motion.a>
              ))}
              
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed', bottom: isMobile ? '1rem' : 'min(5.5rem, 80px)', right: isMobile ? '1rem' : '1.75rem', zIndex: 8999,
              width: isMobile ? 'calc(100vw - 2rem)' : '380px',
              height: isMobile ? 'calc(100dvh - 2rem)' : 'min(560px, calc(100dvh - 8rem))',
              borderRadius: 16,
              background: '#111827',
              border: '1px solid #334155',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            {/* Header with Integrated Avatar (Option C) */}
            <div style={{
              padding: '0.9rem 1.2rem',
              borderBottom: '1px solid #334155',
              background: '#0F172A',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Option C: Scaled Avatar in Header */}
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: '#FACC15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  overflow: 'hidden', border: '2px solid #FACC15'
                }}>
                   {/* Fallback to icon for header but could be a tiny Canvas too */}
                   <Bot size={22} color="#0F172A" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#E5E7EB' }}>Civil Engineering Assistant</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#FACC15', fontWeight: 500 }}>Online & Ready to Help</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)} 
                style={{ background: '#334155', border: 'none', cursor: 'pointer', color: '#E5E7EB', padding: 6, borderRadius: '50%', display: 'flex' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((msg: Message, i: number) => (
                <div key={i} style={{
                  display: 'flex', gap: 10,
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: msg.role === 'user' ? '#FACC15' : '#334155', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 2
                  }}>
                    {msg.role === 'user' ? <User size={14} color="#0F172A" /> : <Bot size={14} color="#E5E7EB" />}
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
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <Bot size={14} color="#E5E7EB" />
                  </div>
                  <div style={{
                    padding: '0.7rem 0.9rem', borderRadius: '14px 14px 14px 2px',
                    background: '#1F2937', border: '1px solid #374151',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}>
                    <Loader size={12} color="#FACC15" className="animate-spin" />
                    <span style={{ fontSize: 13, color: '#9CA3AF' }}>Analyzing project details...</span>
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
                      padding: '7px 14px', fontSize: 11, fontWeight: 700,
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
                placeholder="How can Kitchaa's Enterprise help you today?"
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
                style={{
                  width: 44, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: input.trim() ? '#FACC15' : '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', flexShrink: 0
                }}
              >
                <Send size={18} color={input.trim() ? '#0F172A' : '#9CA3AF'} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
