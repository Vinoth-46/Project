'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBot() {
  const [dialOpen, setDialOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm the virtual assistant for Kitchaa's Enterprise. How can I help you today? Whether it's building approvals, construction plans, or loan assistance — I'm here to guide you."
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

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
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err: any) {
      console.error('Chat error:', err)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to the AI service right now. Please call us directly at +91 83440 51846 or message us on WhatsApp." 
      }])
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
      {/* Unified Speed Dial — bottom right */}
      <div style={{ position: 'fixed', bottom: '1.75rem', right: '1.75rem', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>

        {/* Expanded Actions */}
        <AnimatePresence>
          {dialOpen && !chatOpen && dialActions.map((action, i) => (
            <motion.a
              key={action.label}
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.18, delay: i * 0.06 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
            >
              <span style={{
                background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(245,166,35,0.2)', borderRadius: 8,
                padding: '5px 12px', fontSize: 12, fontWeight: 600,
                color: '#f0ede8', whiteSpace: 'nowrap', letterSpacing: '0.04em'
              }}>{action.label}</span>
              <div style={{
                width: 46, height: 46, borderRadius: '50%', background: action.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.35)', flexShrink: 0
              }}>
                {action.icon}
              </div>
            </motion.a>
          ))}
        </AnimatePresence>

        {/* Chat toggle (visible when dial open and chat closed) */}
        <AnimatePresence>
          {dialOpen && !chatOpen && (
            <motion.button
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              onClick={() => { setChatOpen(true); setDialOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <span style={{
                background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(245,166,35,0.2)', borderRadius: 8,
                padding: '5px 12px', fontSize: 12, fontWeight: 600,
                color: '#f0ede8', whiteSpace: 'nowrap', letterSpacing: '0.04em'
              }}>AI Assistant</span>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f5a623, #e8590c)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', boxShadow: '0 4px 16px rgba(245,166,35,0.35)', flexShrink: 0
              }}>
                <Bot size={21} />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => {
            if (chatOpen) { setChatOpen(false) }
            else { setDialOpen(prev => !prev) }
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          animate={!dialOpen && !chatOpen ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: dialOpen || chatOpen ? 'rgba(60,60,60,0.95)' : 'linear-gradient(135deg, #f5a623, #e8590c)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(245,166,35,0.4), 0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <motion.div
            animate={{ rotate: dialOpen || chatOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {chatOpen
              ? <X size={22} color="#fff" />
              : dialOpen
                ? <X size={22} color="#fff" />
                : <MessageCircle size={22} color="#fff" />
            }
          </motion.div>
        </motion.button>
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
              position: 'fixed', bottom: '5.5rem', right: '1.75rem', zIndex: 8999,
              width: 'min(360px, calc(100vw - 2rem))',
              height: 'min(520px, calc(100dvh - 8rem))',
              borderRadius: 16,
              background: 'rgba(10,10,10,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(245,166,35,0.25)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(245,166,35,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '0.9rem 1.2rem',
              borderBottom: '1px solid rgba(245,166,35,0.15)',
              background: 'rgba(245,166,35,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f5a623, #e8590c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Bot size={17} color="#fff" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#f0ede8' }}>Kitchaa's Assistant</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#f5a623' }}>AI Assistant</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 4, display: 'flex' }}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 8,
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end'
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: msg.role === 'user' ? 'rgba(245,166,35,0.2)' : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {msg.role === 'user' ? <User size={13} color="#f5a623" /> : <Bot size={13} color="#888" />}
                  </div>
                  <div style={{
                    maxWidth: '78%', padding: '0.55rem 0.85rem',
                    borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, rgba(245,166,35,0.25), rgba(232,89,12,0.2))'
                      : 'rgba(255,255,255,0.06)',
                    border: msg.role === 'user' ? '1px solid rgba(245,166,35,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    fontSize: 13, lineHeight: 1.55,
                    color: msg.role === 'user' ? '#f0ede8' : '#c8c4be'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={13} color="#888" />
                  </div>
                  <div style={{
                    padding: '0.55rem 0.85rem', borderRadius: '12px 12px 12px 4px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', gap: 6
                  }}>
                    <Loader size={12} color="#f5a623" style={{ animation: 'spin 1s linear infinite' }} />
                    <span style={{ fontSize: 12, color: '#888' }}>Typing...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '0.7rem 1rem', borderTop: '1px solid rgba(245,166,35,0.1)',
              display: 'flex', gap: 8, flexShrink: 0
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about our services..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: '0.5rem 0.8rem',
                  fontSize: 13, color: '#f0ede8', outline: 'none', fontFamily: 'inherit'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                style={{
                  width: 38, height: 38, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: input.trim() ? 'linear-gradient(135deg, #f5a623, #e8590c)' : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', flexShrink: 0
                }}
              >
                <Send size={15} color={input.trim() ? '#fff' : '#555'} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
