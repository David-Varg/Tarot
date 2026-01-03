import fs from "fs";

const res = await fetch("https://tarotapi.dev/api/v1/cards");
const data = await res.json();

fs.mkdirSync("../data/raw", { recursive: true });

fs.writeFileSync(
  "src/data/raw/tarot-api.json",
  JSON.stringify(data.cards, null, 2)
);
