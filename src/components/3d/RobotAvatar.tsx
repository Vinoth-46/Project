'use client';

import { useDeviceTier } from '../../hooks/useDeviceTier';
import { useAvatarStore } from '../../store/avatarStore';
import { motion, AnimatePresence } from 'framer-motion';


export default function RobotAvatar() {
  const { isMobile } = useDeviceTier();
  const { chatOpen, setChatOpen, avatarMood } = useAvatarStore();

  // Responsive sizing: smaller on mobile, larger on desktop
  const imgSize = isMobile ? 150 : 165;

  return (
    <AnimatePresence>
      {!chatOpen && (
        <motion.div
          key="avatar"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => setChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: isMobile ? '1.5rem' : '1.75rem',
            right: isMobile ? '0.75rem' : '1.25rem',
            zIndex: 9000,
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          aria-label="Open chat assistant"
          role="button"
        >
          {/* Floating bob + hover scale */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{ position: 'relative', width: imgSize, height: imgSize }}
          >
            {/* Soft ground shadow */}
            <motion.div
              animate={{ scaleX: [1, 1.12, 1], opacity: [0.4, 0.22, 0.4] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: imgSize * 0.55,
                height: 10,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)',
                filter: 'blur(5px)',
                zIndex: 0,
              }}
            />

            {/* Engineer character image */}
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center bottom',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                filter: avatarMood === 'thinking'
                  ? 'drop-shadow(0 4px 16px rgba(250,204,21,0.7))'
                  : 'drop-shadow(0 4px 14px rgba(250,204,21,0.45)) drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                transition: 'filter 0.4s ease',
              }}
            >
              <source src="/chatbot-icon/engineermotion.webm" type="video/webm" />
              {/* Fallback for browsers that don't support webm */}
              <img
                src="/chatbot-icon/blueprintclose.webp"
                alt="Civil Engineering AI Assistant"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </video>

            {/* Red notification dot — top right of character */}
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: isMobile ? 6 : 8,
                right: isMobile ? 6 : 8,
                width: isMobile ? 10 : 13,
                height: isMobile ? 10 : 13,
                borderRadius: '50%',
                background: '#ef4444',
                border: '2px solid rgba(15,23,42,0.85)',
                zIndex: 2,
                boxShadow: '0 0 6px rgba(239,68,68,0.8)',
              }}
            />

            {/* Thinking pulse ring */}
            {avatarMood === 'thinking' && (
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid #FACC15',
                  zIndex: 0,
                }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
