const fs = require('fs');

const pathSrc = 'src/data/clocks.json';
const pathData = 'data/clocks.json';

[pathSrc, pathData].forEach(filePath => {
  const clocks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updatedCount = 0;

  clocks.forEach(c => {
    let changed = false;

    // Helper to replace "een" representing 1 with "één"
    function replaceEenWithEén(str) {
      if (!str) return str;
      // "een uur" -> "één uur"
      let res = str.replace(/\been uur\b/gi, (match) => {
        return match[0] === 'E' ? 'Één uur' : 'één uur';
      });
      // "over een" -> "over één"
      res = res.replace(/\bover een\b/gi, 'over één');
      // "voor een" -> "voor één"
      res = res.replace(/\bvoor een\b/gi, 'voor één');
      // "half een" -> "half één"
      res = res.replace(/\bhalf een\b/gi, 'half één');
      return res;
    }

    if (c.phrase) {
      const orig = c.phrase;
      c.phrase = replaceEenWithEén(c.phrase);
      if (c.phrase !== orig) changed = true;
    }

    if (c.dutchPhrase) {
      const orig = c.dutchPhrase;
      c.dutchPhrase = replaceEenWithEén(c.dutchPhrase);
      if (c.dutchPhrase !== orig) changed = true;
    }

    if (c.sentence) {
      const orig = c.sentence;
      c.sentence = replaceEenWithEén(c.sentence);
      if (c.sentence !== orig) changed = true;
    }

    if (changed) updatedCount++;
  });

  fs.writeFileSync(filePath, JSON.stringify(clocks, null, 2), 'utf8');
  console.log(`Updated ${filePath}: changed ${updatedCount} clock times!`);
});
