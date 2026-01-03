import { motion } from "framer-motion";

export default function ShareButton({ cards, mode }) {
  const handleShare = () => {
    let text = `✨ *Lectura de Tarot* ✨\n\n`;
    text += `🔮 *Tirada:* ${
      mode === "one" ? "Carta del Día" : "Pasado, Presente, Futuro"
    }\n\n`;

    cards.forEach((card, index) => {
      const position =
        mode === "three" ? ["Pasado", "Presente", "Futuro"][index] + ": " : "";
      const status = card.reversed ? "⚡ Invertida" : "▲ Directa";
      text += `🎴 *${position}${card.name}* (${status})\n`;
      text += `_"${card.meanings.upright.love.split(".")[0]}..."_\n`;
      text += `\n`;
    });

    text += `🔗 Descubre más en: https://tarot.example.com\n`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/50 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer"
    >
      <span>📱</span> Compartir a Whatsapp
    </motion.button>
  );
}
