const fs = require('fs');

const pathSrc = 'src/data/respond.json';
const pathData = 'data/respond.json';

[pathSrc, pathData].forEach(filePath => {
  const list = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  list.forEach((item, idx) => {
    if (!Array.isArray(item.options) || item.options.length <= 1) return;
    
    // Original correct answer text
    const correctText = item.options[item.correct_index !== undefined ? item.correct_index : 0];

    // Create array of options with deterministic-yet-distributed pseudo-random target position or shuffle
    // We want all 4 positions (0, 1, 2, 3) to be evenly and randomly distributed
    const options = [...item.options];
    
    // Fisher-Yates shuffle with random swaps
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    item.options = options;
    item.correct_index = options.indexOf(correctText);
  });

  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
  console.log(`Shuffled options in ${filePath}!`);
});
