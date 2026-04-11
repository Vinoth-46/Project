'use client';

import { useDeviceTier } from '../../hooks/useDeviceTier';
import { useAvatarStore } from '../../store/avatarStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function RobotAvatar() {
  const { isMobile } = useDeviceTier();
  const { chatOpen, setChatOpen, avatarMood } = useAvatarStore();

  return (
    <div 
      className={`fixed z-[9000] cursor-pointer transition-all duration-700 ease-in-out flex items-center justify-center
        ${isMobile 
          ? 'bottom-[85px] right-[20px] w-14 h-14' 
          : 'bottom-24 right-5 w-16 h-16'}
        ${chatOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100 scale-100'}
      `}
      onClick={() => setChatOpen(!chatOpen)}
    >
      <AnimatePresence mode="wait">
        {!chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 50 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Glowing background blob */}
            <motion.div 
              className="absolute inset-0 bg-brand-accent/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main Bot Button */}
            <motion.div 
              className="relative w-full h-full bg-[#1e293b] border-2 border-brand-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)] overflow-hidden"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 to-transparent" />
              <Bot size={isMobile ? 24 : 32} className="text-brand-accent drop-shadow-md z-10" />
              
              {/* Animated rings for 'thinking' mood */}
              {avatarMood === 'thinking' && (
                <motion.div 
                   className="absolute inset-0 border border-brand-accent rounded-full"
                   animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                   transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Notification Dot */}
            <motion.div 
              className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#0F172A]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Tooltip on hover (desktop) */}
            {!isMobile && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0F172A]/90 border border-brand-accent/30 text-brand-accent px-3 py-1.5 rounded-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300 font-bold tracking-wider pointer-events-none shadow-xl backdrop-blur-sm">
                Chat with AI
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
