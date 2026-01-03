import { useState } from "react";

export default function TarotMeaning({ card }) {
  const [tab, setTab] = useState("love");

  if (!card) return null;
  if (!card.meanings) return null;

  const meanings = card.reversed
    ? card.meanings.reversed
    : card.meanings.upright;

  if (!meanings) return null;
  if (!meanings[tab]) return null;

  const tabs = [
    { key: "love", label: "❤️ Amor" },
    { key: "work", label: "💰 Trabajo" },
    { key: "spirit", label: "✨ Espiritual" },
  ];

  return (
    <div className="mt-4 w-full max-w-xs rounded-xl bg-black/50 p-4 backdrop-blur">
      <div className="mb-3 flex justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-semibold transition ${
              tab === t.key
                ? "bg-purple-600 text-white"
                : "text-purple-300 hover:bg-purple-800/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-200 leading-relaxed">{meanings[tab]}</p>
    </div>
  );
}
