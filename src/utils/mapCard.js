export function mapCard(rawCard) {
  const id = rawCard.value_int - 1; // 1 → 0, 2 → 1...

  return {
    id,
    name: traducirNombre(rawCard.name),
    image: `/cards/major/${String(id).padStart(2, "0")}.jpg`,
    meanings: {
      love: traducirMeaning(rawCard.meaning_up, "love"),
      work: traducirMeaning(rawCard.meaning_up, "work"),
      spirit: traducirMeaning(rawCard.meaning_up, "spirit"),
    },
    reversed_meanings: {
      love: traducirMeaning(rawCard.meaning_rev, "love"),
      work: traducirMeaning(rawCard.meaning_rev, "work"),
      spirit: traducirMeaning(rawCard.meaning_rev, "spirit"),
    }
  };
}
