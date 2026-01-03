import tarot from "/src/data/tarot.json";

export function drawCards(amount) {
  const shuffled = [...tarot];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, amount).map(card => {
    const imagePath = card.arcana === "major" 
      ? `/cards/major/${String(card.id).padStart(2, "0")}.jpg` 
      : null;
      
    return {
      ...card,
      image: imagePath,
      reversed: Math.random() < 0.5
    };
  });
}
