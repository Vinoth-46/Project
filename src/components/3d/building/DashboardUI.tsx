import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap, Scissors, Ruler, RotateCcw, Building, Plus, Minus } from 'lucide-react';

interface UIProps {
  dayMode: boolean;
  setDayMode: (v: boolean) => void;
  wireframeMode: boolean;
  setWireframeMode: (v: boolean) => void;
  sectionCut: boolean;
  setSectionCut: (v: boolean) => void;
  measurementMode: boolean;
  setMeasurementMode: (v: boolean) => void;
  onReplay: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  stats: any;
}

const IconButton = ({ icon: Icon, active, onClick, label }: any) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl transition-all duration-300 group relative ${
      active 
        ? 'bg-brand-accent text-slate-900 shadow-lg shadow-brand-accent/20 scale-105' 
        : 'bg-brand-secondary/40 text-brand-text/50 hover:bg-brand-secondary/60 hover:text-brand-accent border-white/5'
    } backdrop-blur-md border`}
    title={label}
  >
    <Icon size={20} strokeWidth={2} />
    <span className="absolute right-full mr-3 px-2 py-1 bg-brand-primary text-brand-text text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 uppercase tracking-widest font-bold border border-white/10 font-jakarta">
      {label}
    </span>
  </button>
);

export const DashboardUI = ({
  dayMode, setDayMode,
  wireframeMode, setWireframeMode,
  sectionCut, setSectionCut,
  measurementMode, setMeasurementMode,
  onReplay,
  onZoomIn,
  onZoomOut,
  stats
}: UIProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-20 font-inter">
      {/* Top Left: Logo/Title */}
      <div className="flex items-start justify-between w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-brand-primary/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 pointer-events-auto shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-slate-900">
              <Building size={18} />
            </div>
            <div>
              <h3 className="text-white font-outfit font-black text-sm tracking-tight leading-none">PROJECT V-2.0</h3>
              <span className="text-brand-accent text-[9px] font-jakarta font-extrabold uppercase tracking-[0.2em]">Engineering Hub</span>
            </div>
          </div>
        </motion.div>

        {/* Top Right: Stats Panel */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-brand-primary/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 pointer-events-auto w-48 shadow-2xl"
        >
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-jakarta font-bold mb-3 border-b border-white/5 pb-2">Live Parameters</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500 font-jakarta font-semibold">Floors</span>
              <span className="text-xs text-white font-manrope font-bold">{stats.floors}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500 font-jakarta font-semibold">Height</span>
              <span className="text-xs text-brand-accent font-manrope font-bold">{stats.height}m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500 font-jakarta font-semibold">Area</span>
              <span className="text-xs text-white font-manrope font-bold">{stats.area}m²</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center Right: Control Panel */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto">
        <IconButton 
          icon={dayMode ? Sun : Moon} 
          active={dayMode} 
          onClick={() => setDayMode(!dayMode)}
          label={dayMode ? "DAYLIGHT ACTIVE" : "NIGHT MODE"} 
        />
        <IconButton 
          icon={Zap} 
          active={wireframeMode} 
          onClick={() => setWireframeMode(!wireframeMode)}
          label="WIREFRAME VIEW" 
        />
        <IconButton 
          icon={Scissors} 
          active={sectionCut} 
          onClick={() => setSectionCut(!sectionCut)}
          label="SECTION CUT" 
        />
        <IconButton 
          icon={Ruler} 
          active={measurementMode} 
          onClick={() => setMeasurementMode(!measurementMode)}
          label="MEASUREMENT TOOL" 
        />
        <IconButton 
          icon={Plus} 
          onClick={onZoomIn}
          label="ZOOM IN" 
        />
        <IconButton 
          icon={Minus} 
          onClick={onZoomOut}
          label="ZOOM OUT" 
        />
        <div className="w-full h-px bg-white/5 my-2" />
        <IconButton 
          icon={RotateCcw} 
          onClick={onReplay}
          label="REPLAY INTRO" 
        />
      </div>

      {/* Bottom: Instruction Bar */}
      <div className="w-full flex justify-center">
        <AnimatePresence>
          {measurementMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-brand-accent text-slate-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-accent/20 pointer-events-auto font-jakarta"
            >
              Click two points on structure to measure distance
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
