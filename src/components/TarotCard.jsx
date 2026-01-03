import { motion } from "framer-motion";

export default function TarotCard({ card, flipped, shuffling }) {
  const getCardMeta = (card) => {
    if (!card) return {};

    const base = {
      label: "ARCANO MENOR",
      subLabel: "MISTERIO",
      bgGradient: "bg-gray-900",
      icon: "✨",
      baseColor: "text-gray-400",
      glowColor: "bg-gray-500",
      borderColor: "border-gray-600",
    };

    if (card.arcana === "major" || card.image) {
      return {
        ...base,
        label: "ARCANO MAYOR",
        bgGradient: "bg-gradient-to-b from-slate-900 via-purple-950 to-black",
        icon: "👑",
        baseColor: "text-purple-200",
        glowColor: "bg-purple-500",
        borderColor: "border-purple-400/50",
      };
    }

    const name = card.name.toLowerCase();

    if (name.includes("bastos"))
      return {
        label: "ELEMENTO FUEGO",
        subLabel: "VOLUNTAD",
        bgGradient:
          "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-red-900 via-orange-900 to-black",
        icon: "🔥",
        baseColor: "text-orange-200",
        glowColor: "bg-orange-600",
        borderColor: "border-orange-500/50",
      };
    if (name.includes("copas"))
      return {
        label: "ELEMENTO AGUA",
        subLabel: "EMOCIONES",
        bgGradient:
          "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-cyan-950 to-black",
        icon: "🌊",
        baseColor: "text-cyan-200",
        glowColor: "bg-cyan-500",
        borderColor: "border-cyan-500/50",
      };
    if (name.includes("espadas"))
      return {
        label: "ELEMENTO AIRE",
        subLabel: "INTELECTO",
        bgGradient: "bg-gradient-to-br from-gray-700 via-slate-900 to-black",
        icon: "⚔️",
        baseColor: "text-slate-200",
        glowColor: "bg-slate-400",
        borderColor: "border-slate-400/50",
      };
    if (name.includes("oros"))
      return {
        label: "ELEMENTO TIERRA",
        subLabel: "MATERIA",
        bgGradient:
          "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-800 via-amber-950 to-black",
        icon: "📀",
        baseColor: "text-amber-100",
        glowColor: "bg-amber-500",
        borderColor: "border-amber-500/50",
      };

    return base;
  };

  const meta = getCardMeta(card);
  const isReversed = card?.reversed;

  return (
    <div className="relative h-72 w-48 perspective md:h-80 md:w-56 border-0 rounded-2xl">
      <motion.div
        className="absolute inset-0 w-full h-full"
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
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl
                     bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] 
                     bg-slate-950 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-2 border border-purple-800/40 rounded-xl flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border border-purple-500/20 flex items-center justify-center bg-purple-900/10 backdrop-blur-sm">
              <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                🔮
              </span>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-between rounded-2xl overflow-hidden shadow-2xl transition-all duration-500
                     ${meta.bgGradient} border 
                     ${isReversed ? "border-red-900/60" : meta.borderColor}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {isReversed && (
            <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none mix-blend-multiply transition-opacity duration-500" />
          )}

          {card && (
            <div className="flex flex-col items-center justify-between w-full h-full p-3 relative z-10">
              <div className="w-full flex justify-center pt-1 border-b border-white/5 pb-2">
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] font-bold ${meta.baseColor} opacity-90`}
                >
                  {meta.label}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-center w-full relative my-2 overflow-hidden">
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  initial={false}
                  animate={{ rotate: isReversed ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {card.image ? (
                    <div
                      className={`relative w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-lg group
                                    ${
                                      isReversed
                                        ? "grayscale-50 contrast-125"
                                        : ""
                                    }`}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/20 opacity-80"></div>
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <div
                        className={`absolute w-32 h-32 rounded-full blur-[50px] opacity-30 ${meta.glowColor}`}
                      ></div>

                      <div className="relative z-10 transform scale-125">
                        <span className="text-7xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          {meta.icon}
                        </span>
                      </div>

                      <div
                        className={`absolute inset-2 border ${
                          isReversed
                            ? "border-dashed opacity-30"
                            : "border-solid opacity-50"
                        } border-white/10 rounded-lg`}
                      ></div>
                    </div>
                  )}
                </motion.div>
              </div>

              <div
                className={`w-full text-center pb-2 pt-2 rounded-lg border backdrop-blur-md mt-auto transition-colors duration-300
                              ${
                                isReversed
                                  ? "bg-red-950/40 border-red-900/30"
                                  : "bg-black/20 border-white/5"
                              }`}
              >
                <p
                  className={`text-sm md:text-base font-serif font-bold ${
                    isReversed ? "text-red-100" : meta.baseColor
                  } leading-tight`}
                >
                  {card.name}
                </p>

                <div className="flex items-center justify-center gap-2 mt-1">
                  <span
                    className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full
                                    ${
                                      isReversed
                                        ? "bg-red-500/20 text-red-300 border border-red-500/20"
                                        : "bg-white/5 text-gray-300 border border-white/10"
                                    }`}
                  >
                    {isReversed ? "⚡ INVERTIDA" : "▲ DIRECTA"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-overlay"></div>
        </div>
      </motion.div>
    </div>
  );
}
