const names = ["Leo", "Rico", "Bonny", "Mustachio", "ARF"];
const titles = ["Street Boss", "Night Watch", "Block Legend", "Rat Hunter", "Silent Soldier"];

const name = names[Math.floor(Math.random() * names.length)];
const title = titles[Math.floor(Math.random() * titles.length)];

console.log(`${name} - ${title}`);