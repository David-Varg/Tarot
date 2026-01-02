import { motion } from "framer-motion";

export default function TarotCard({ card, flipped, shuffling }) {
  return (
    <div className="relative h-48 w-64 perspective">
      <motion.div
        className="absolute inset-0"
        animate={{
          rotateY: flipped ? 180 : 0,
          x: shuffling ? [0, -10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          rotateY: { duration: 0.8, ease: "easeInOut" },
          x: { duration: 0.4 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dorso */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl
                     bg-gradient-to-br from-purple-900 to-black
                     border border-purple-500/30 shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-3xl text-purple-300">🔮</span>
        </div>

        {/* Frente */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl
                     bg-black/80 text-center border border-purple-500/30"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {card && (
            <motion.div
              className={`flex flex-col items-center ${
                card.reversed ? "rotate-180" : ""
              }`}
              animate={card.reversed ? { y: [0, -2, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <p className="text-lg font-semibold text-purple-300">
                {card.name}
              </p>
              <p className="mt-2 text-xs tracking-widest text-purple-400">
                {card.reversed ? "⟲ INVERTIDA" : "▲ DIRECTA"}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
