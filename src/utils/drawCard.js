import { deck } from "./deck";

export function drawCards(amount) {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, amount).map(card => ({
    ...card,
    reversed: Math.random() < 0.5
  }));
}
