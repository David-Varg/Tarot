import { useState, useEffect, useRef } from "react";
import TarotCard from "./TarotCard";
import { drawCards } from "../utils/drawCard";
import { motion, AnimatePresence } from "framer-motion";
import TarotMeaning from "./TarotMeaning";
import ShareButton from "./ShareButton";

export default function TarotSpread() {
  const [mode, setMode] = useState("one");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const spreadRef = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (cards.length === 0) return;
    setFlipped(false);
    setCards([]);
    const timeout = setTimeout(() => {
      const amount = mode === "three" ? 3 : 1;
      const newCards = drawCards(amount);
      setCards(newCards);
    }, 600);
    return () => clearTimeout(timeout);
  }, [mode]);

  function draw(amount) {
    if (shuffling) return;

    const audio = new Audio("/sounds/shuffle.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Audio play failed", e));

    setShuffling(true);
    setFlipped(false);
    setCards([]);

    setTimeout(() => {
      setTimeout(() => {
        const newCards = drawCards(amount);
        setCards(newCards);
        setTimeout(() => {
          setFlipped(true);
          setShuffling(false);
          const audioFlip = new Audio("/sounds/flip.mp3");
          audioFlip.volume = 0.4;
          audioFlip.play().catch(() => {});
        }, 800);
      }, 800);
    }, 400);
  }

  const getCardPosition = (index, totalCards) => {
    if (totalCards === 1 || windowWidth === 0) return { x: 0, y: 0 };

    const isMobile = windowWidth < 768;
    if (isMobile) {
      if (index === 0) return { x: -85, y: 10, rotate: -5 };
      if (index === 1) return { x: 0, y: -10, rotate: 0 };
      if (index === 2) return { x: 85, y: 10, rotate: 5 };
    }

    // En Desktop
    const spacing = 380;
    if (index === 0) return { x: -spacing, y: 0, rotate: 0 };
    if (index === 1) return { x: 0, y: 0, rotate: 0 };
    if (index === 2) return { x: spacing, y: 0, rotate: 0 };
    return { x: 0, y: 0 };
  };

  const deckVariants = {
    idle: { scale: 1, rotate: 0, y: 0 },
    shuffling: {
      scale: [1, 1.05, 1, 1.05, 1],
      rotateZ: [0, -2, 2, -3, 3, 0],
      y: [0, -10, 0, -5, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 1],
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full px-2">
      {/* Botones de Modo */}
      <div className="flex flex-wrap justify-center gap-2 rounded-full bg-black/60 p-1.5 backdrop-blur-xl border border-white/10 z-30 shadow-2xl">
        <button
          onClick={() => setMode("one")}
          className={`cursor-pointer rounded-full px-4 md:px-6 py-2 text-xs md:text-sm font-bold transition-all duration-300
          ${
            mode === "one"
              ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              : "text-purple-300 hover:bg-white/5"
          }`}
        >
          Carta del día
        </button>
        <button
          onClick={() => setMode("three")}
          className={`cursor-pointer rounded-full px-4 md:px-6 py-2 text-xs md:text-sm font-bold transition-all duration-300
          ${
            mode === "three"
              ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              : "text-purple-300 hover:bg-white/5"
          }`}
        >
          Pasado · Presente · Futuro
        </button>
      </div>

      <div
        ref={spreadRef}
        className="relative h-72 md:h-96 w-full max-w-7xl flex justify-center items-center perspective z-20 py-10 md:py-0"
      >
        <motion.div
          className="absolute z-0"
          variants={deckVariants}
          animate={shuffling ? "shuffling" : "idle"}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ opacity: cards.length > 0 && !shuffling ? 0 : 1 }}
        >
          <div className="absolute inset-0 translate-x-1 translate-y-1 bg-purple-900/40 rounded-2xl border border-white/10" />
          <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-purple-800/40 rounded-2xl border border-white/10" />
          <TarotCard card={{ name: "" }} flipped={false} shuffling={false} />
        </motion.div>

        <AnimatePresence mode="popLayout">
          {cards.map((card, i) => {
            const pos = getCardPosition(i, cards.length);
            return (
              <motion.div
                key={card.id || `${mode}-${i}-${card.name}`}
                className="absolute flex flex-col items-center justify-center gap-3"
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: pos.x,
                  y: pos.y,
                  rotate: pos.rotate || 0,
                  zIndex: 10 + i,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  zIndex: 0,
                  transition: { duration: 0.4, ease: "backIn" },
                }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                whileHover={{
                  scale: 1.1,
                  zIndex: 50,
                  transition: { duration: 0.2 },
                }}
              >
                {mode === "three" && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 md:-top-10 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-purple-200 bg-black/60 px-2 py-1 rounded-full border border-purple-500/30 backdrop-blur-md shadow-lg pointer-events-none whitespace-nowrap"
                  >
                    {["Pasado", "Presente", "Futuro"][i]}
                  </motion.span>
                )}

                <div
                  className="relative group cursor-pointer"
                  onClick={() => {
                    if (!flipped && !shuffling) setFlipped(true);
                  }}
                >
                  <TarotCard
                    card={card}
                    flipped={flipped}
                    shuffling={shuffling}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center w-full gap-8 z-30">
        <div className="h-16 md:h-20 flex items-start">
          <button
            onClick={() => draw(mode === "three" ? 3 : 1)}
            disabled={shuffling}
            className="cursor-pointer group relative px-8 py-3 rounded-2xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-black bg-opacity-20 rounded-2xl px-8 py-3 ring-1 ring-white/20 group-hover:bg-opacity-0 transition-all flex items-center gap-2">
              <span>
                {shuffling
                  ? "✨ Barajando..."
                  : !flipped && cards.length > 0
                  ? "🔮 Revelar Destino"
                  : "✨ Nueva Lectura"}
              </span>
            </div>
          </button>
        </div>

        <AnimatePresence>
          {flipped && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`grid w-full max-w-6xl gap-6 md:gap-12 px-4
                ${
                  mode === "three"
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1 max-w-lg"
                }`}
            >
              {cards.map((card, i) => (
                <div key={card.id || i} className="flex justify-center w-full">
                  <div className="w-full max-w-xs md:max-w-full">
                    <TarotMeaning card={card} />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {flipped && cards.length > 0 && (
          <ShareButton cards={cards} mode={mode} />
        )}
      </div>
    </div>
  );
}
