import { create } from 'zustand';

interface AvatarState {
  chatOpen: boolean;
  avatarMood: 'idle' | 'thinking' | 'talking' | 'blinking';
  isAnimating: boolean;
  setChatOpen: (val: boolean) => void;
  setAvatarMood: (mood: 'idle' | 'thinking' | 'talking' | 'blinking') => void;
  setIsAnimating: (val: boolean) => void;
}

export const useAvatarStore = create<AvatarState>((set) => ({
  chatOpen: false,
  avatarMood: 'idle',
  isAnimating: false,
  setChatOpen: (val) => set({ chatOpen: val }),
  setAvatarMood: (mood) => set({ avatarMood: mood }),
  setIsAnimating: (val) => set({ isAnimating: val }),
}));
