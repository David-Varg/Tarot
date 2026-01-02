import { useState, useEffect } from "react";
import TarotCard from "./TarotCard";
import { drawCards } from "../utils/drawCard";
import { motion } from "framer-motion";

export default function TarotSpread() {
  const [mode, setMode] = useState("three");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    if (cards.length === 0) return;

    if (mode === "one") {
      setCards(cards.slice(0, 1));
    } else if (mode === "three" && cards.length === 1) {
      setCards(drawCards(3));
    }

    setFlipped(false);
  }, [mode]);

  function draw(amount) {
    if (shuffling) {
      console.log("blocked by shuffling");
      return;
    }

    setShuffling(true);
    setFlipped(false);

    setTimeout(() => {
      const newCards = drawCards(amount);
      console.log("new cards:", newCards);

      setCards(newCards);
      setFlipped(true);
      setShuffling(false);
    }, 900);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-3 rounded-xl bg-black/40 p-2 backdrop-blur">
        <button
          onClick={() => {
            setMode("one");
          }}
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition
      ${
        mode === "one"
          ? "bg-purple-600 text-white"
          : "text-purple-300 hover:bg-purple-800/40"
      }`}
        >
          Carta del día
        </button>

        <button
          onClick={() => {
            setMode("three");
          }}
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition
      ${
        mode === "three"
          ? "bg-purple-600 text-white"
          : "text-purple-300 hover:bg-purple-800/40"
      }`}
        >
          Pasado · Presente · Futuro
        </button>
      </div>

      <div className="relative h-[320px] w-full max-w-xl">
        {cards.length === 0 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <TarotCard
              card={{ name: "Tarot Deck" }}
              flipped={false}
              shuffling={false}
            />
          </div>
        )}

        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2"
            initial={{
              opacity: 0,
              x: "-50%",
              y: "-50%",
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x:
                mode === "three"
                  ? i === 0
                    ? "-160%"
                    : i === 2
                    ? "60%"
                    : "-50%"
                  : "-50%",
              y: "-50%",
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {mode === "three" && (
              <span className="text-xs uppercase tracking-widest text-purple-400">
                {["Pasado", "Presente", "Futuro"][i]}
              </span>
            )}

            <TarotCard card={card} flipped={flipped} shuffling={shuffling} />
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => draw(mode === "three" ? 3 : 1)}
        disabled={shuffling}
        className="cursor-pointer rounded-xl bg-purple-600 px-6 py-3 font-semibold
                   hover:bg-purple-700 transition disabled:opacity-50"
      >
        {shuffling ? "Barajando..." : "Sacar cartas"}
      </button>
    </div>
  );
}
