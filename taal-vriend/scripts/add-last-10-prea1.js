const fs = require('fs');
const sentences = JSON.parse(fs.readFileSync('data/sentences.json', 'utf8'));
const extra = [
  { d: "Ik hou van warme thee.", ar: "أحب الشاي الساخن.", so: "Waxaan jeclahay shaaha kulul.", ti: "ውዑይ ሻሂ ይፈቱ።", om: "Shaayii ho'aan jaalladha.", en: "I love hot tea.", t: "Eten & Drinken" },
  { d: "De sleutel ligt op de tafel.", ar: "المفتاح موجود على الطاولة.", so: "Furaha wuxuu yaallaa miiska dushiisa.", ti: "እቲ መፍትሕ ኣብቲ ጣውላ ኣሎ።", om: "Furtuun minjaala irra jira.", en: "The key is on the table.", t: "Wonen" },
  { d: "Ik ben op zoek naar mijn jas.", ar: "أنا أبحث عن معطفي.", so: "Waxaan raadinayaa jaakaddayda.", ti: "ጃኬተይ እደሊ ኣለኹ።", om: "Kootii koo barbaadaan jira.", en: "I am looking for my coat.", t: "Kleding" },
  { d: "Het water kookt in de pan.", ar: "الماء يغلي في الإناء.", so: "Biyuhu waxay karkaraan digsiga.", ti: "ማይ ኣብቲ ድስቲ ይፈልሕ ኣሎ።", om: "Bishaan distii keessatti dhangala'aa jira.", en: "The water is boiling in the pan.", t: "Eten & Drinken" },
  { d: "Ik woon dichtbij het park.", ar: "أنا أسكن بالقرب من الحديقة.", so: "Waxaan ku noolahay meel u dhow beerta.", ti: "ኣብ ጥቓቲ ፓርክ እየ ዝነብር።", om: "Paarkii dhiyoon jiraadha.", en: "I live near the park.", t: "Wonen" },
  { d: "Vandaag schijnt de zon mooi.", ar: "اليوم تشرق الشمس بشكل جميل.", so: "Maanta qorraxdu si fiican bay u soo baxday.", ti: "ሎሚ ጸሓይ ብጽቡቕ ትበርቕ ኣላ።", om: "Har'a aduun bareedinaan ifeera.", en: "Today the sun shines beautifully.", t: "Weer" },
  { d: "Ik heb honger en dorst.", ar: "أنا جائع وعطشان.", so: "Waan gaajaysanahay waana haraadanahay.", ti: "ጠምየን ጸሚአን ኣለኹ።", om: "Beela'ee dheebodheera.", en: "I am hungry and thirsty.", t: "Gevoelens" },
  { d: "De winkel is nu gesloten.", ar: "المتجر مغلق الآن.", so: "Dukaanku hadda waa xiran yahay.", ti: "እቲ ድኳን ሕጂ ተዓጽዩ ኣሎ።", om: "Dukaanni amma cufameera.", en: "The shop is closed now.", t: "Winkelen" },
  { d: "Tot ziens en een fijne dag!", ar: "إلى اللقاء ويوم سعيد!", so: "Nabad gelyo iyo maalin wanaagsan!", ti: "ደሓን ኩኑ፡ ጽቡቕ መዓልቲ!", om: "Nagaatti, guyyaa gaarii!", en: "Goodbye and have a nice day!", t: "Begroeting" },
  { d: "Ik begrijp het nu helemaal.", ar: "أنا أفهم ذلك تماماً الآن.", so: "Hadda si buuxda ayaan u fahmay.", ti: "ሕጂ ምሉእ ብምሉእ ተረዲኡኒ ኣሎ።", om: "Amma guutummaatti naaf galeera.", en: "I completely understand now.", t: "Communicatie" }
];
let idNum = 3000;
extra.forEach(item => {
  idNum++;
  sentences.push({
    id: `sent_prea1_${idNum}`,
    level: "Pre-A1",
    topic: item.t,
    dutch: item.d,
    translations: { ar: item.ar, so: item.so, ti: item.ti, om: item.om, en: item.en }
  });
});
fs.writeFileSync("data/sentences.json", JSON.stringify(sentences, null, 2), "utf8");
fs.writeFileSync("data/sentences.js", "window.TAALVRIEND_SENTENCES = " + JSON.stringify(sentences, null, 2) + ";\n", "utf8");
console.log("Pre-A1 sentences count now:", sentences.filter(s => s.level === "Pre-A1").length);
console.log("Total sentences now:", sentences.length);
