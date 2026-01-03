import { useState, useEffect } from "react";
import TarotCard from "./TarotCard";
import { drawCards } from "../utils/drawCard";
import { motion, AnimatePresence } from "framer-motion";
import TarotMeaning from "./TarotMeaning";

export default function TarotSpread() {
  const [mode, setMode] = useState("one");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    if (cards.length === 0) return;

    if (mode === "one" && cards.length > 1) {
      const centerCard = cards[1];
      setCards([centerCard]);
      // No tocamos flipped para evitar parpadeos
    } else if (mode === "three" && cards.length === 1) {
      setCards([]);
      setFlipped(false);
    }
  }, [mode]);

  function draw(amount) {
    if (shuffling) return;

    setShuffling(true);
    setFlipped(false);

    setTimeout(() => {
      const newCards = drawCards(amount);
      setCards(newCards);

      setTimeout(() => {
        setFlipped(true);
        setShuffling(false);
      }, 600);
    }, 500);
  }

  const getCardPosition = (index, totalCards) => {
    if (totalCards === 1) return 0;

    const spacing =
      typeof window !== "undefined" && window.innerWidth < 768 ? 115 : 380;

    if (index === 0) return -spacing;
    if (index === 1) return 0;
    if (index === 2) return spacing;
    return 0;
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full px-2">
      <div className="flex gap-2 rounded-full bg-black/60 p-1.5 backdrop-blur-xl border border-white/10 z-30 shadow-2xl">
        <button
          onClick={() => setMode("one")}
          className={`cursor-pointer rounded-full px-6 py-2 text-xs md:text-sm font-bold transition-all duration-300
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
          className={`cursor-pointer rounded-full px-6 py-2 text-xs md:text-sm font-bold transition-all duration-300
          ${
            mode === "three"
              ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]"
              : "text-purple-300 hover:bg-white/5"
          }`}
        >
          Pasado · Presente · Futuro
        </button>
      </div>

      <div className="relative h-80 md:h-96 w-full max-w-7xl flex justify-center items-center perspective z-20">
        <AnimatePresence mode="popLayout">
          {cards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              className="absolute z-10 cursor-pointer"
              onClick={() => draw(mode === "three" ? 3 : 1)}
              whileHover={{ scale: 1.05 }}
            >
              <TarotCard
                card={{ name: "Mazo" }}
                flipped={false}
                shuffling={shuffling}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {cards.map((card, i) => (
          <motion.div
            key={card.id || `${mode}-${i}`}
            className="absolute flex flex-col items-center justify-center gap-3"
            whileHover={{
              scale: 1.1,
              zIndex: 50,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: getCardPosition(i, cards.length),
              y: 0,
              zIndex: 10,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            {mode === "three" && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-purple-200 bg-black/60 px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-md shadow-lg"
              >
                {["Pasado", "Presente", "Futuro"][i]}
              </motion.span>
            )}

            <div className="relative group">
              <TarotCard card={card} flipped={flipped} shuffling={shuffling} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`grid w-full max-w-6xl gap-6 md:gap-12 px-4 z-10 -mt-8 md:-mt-12
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

      <div className="h-24 flex items-start mt-6">
        <button
          onClick={() => draw(mode === "three" ? 3 : 1)}
          disabled={shuffling}
          className="cursor-pointer group relative px-8 py-3 rounded-2xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-black bg-opacity-20 rounded-2xl px-8 py-3 ring-1 ring-white/20 group-hover:bg-opacity-0 transition-all">
            {shuffling
              ? "Conectando..."
              : cards.length === 0
              ? "Consultar al Tarot"
              : "Nueva Tirada"}
          </div>
        </button>
      </div>
    </div>
  );
}
