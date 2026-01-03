import fs from "fs";
import path from "path";

const inputPath = path.resolve("../data/raw/tarot-api.json");
const outputPath = path.resolve("src/data/tarot.json");

const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function translateName(name) {
  const map = {
    "The Fool": "El Loco",
    "The Magician": "El Mago",
    "The High Priestess": "La Sacerdotisa",
    "The Empress": "La Emperatriz",
    "The Emperor": "El Emperador",
    "The Hierophant": "El Hierofante",
    "The Lovers": "Los Enamorados",
    "The Chariot": "El Carro",
    "Strength": "La Fuerza",
    "The Hermit": "El Ermitaño",
    "Wheel of Fortune": "La Rueda de la Fortuna",
    "Justice": "La Justicia",
    "The Hanged Man": "El Colgado",
    "Death": "La Muerte",
    "Temperance": "La Templanza",
    "The Devil": "El Diablo",
    "The Tower": "La Torre",
    "The Star": "La Estrella",
    "The Moon": "La Luna",
    "The Sun": "El Sol",
    "Judgement": "El Juicio",
    "The World": "El Mundo"
  };

  return map[name] ?? name;
}

function translateMeaning(text) {
  return text
    .replace(/skill|ability/gi, "habilidad")
    .replace(/power/gi, "poder")
    .replace(/love/gi, "amor")
    .replace(/work/gi, "trabajo")
    .replace(/spirit/gi, "espíritu");
}

const result = raw.map(card => ({
  id: card.value_int,
  arcana: card.type,
  name: translateName(card.name),
  meanings: {
    upright: {
      love: translateMeaning(card.meaning_up),
      work: translateMeaning(card.meaning_up),
      spirit: translateMeaning(card.meaning_up)
    },
    reversed: {
      love: translateMeaning(card.meaning_rev),
      work: translateMeaning(card.meaning_rev),
      spirit: translateMeaning(card.meaning_rev)
    }
  }
}));

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");

console.log("✅ tarot.json generado correctamente");
