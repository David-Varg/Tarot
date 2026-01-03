import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-16 right-4 z-40">
      <audio ref={audioRef} loop src="/sounds/ambient.mp3" />

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all shadow-lg cursor-pointer
        ${
          playing
            ? "bg-purple-600/80 border-purple-400 text-white animate-pulse-slow shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            : "bg-black/40 border-white/10 text-gray-400"
        }`}
      >
        {playing ? "🔊" : "🔇"}
      </motion.button>
    </div>
  );
}
