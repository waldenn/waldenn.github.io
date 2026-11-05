const fs = require('fs');
const path = require('path');

const wordsFile = path.join(__dirname, '../data/words.json');
const wordsJsFile = path.join(__dirname, '../data/words.js');
const words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));

const morePreA1 = [
  { w: "de thee", c: "Dranken", s: "Ik drink warme thee.", t: { ar: "الشاي", ti: "ሻሂ", om: "Shaayii", so: "shaah", en: "tea" } },
  { w: "het sap", c: "Dranken", s: "Ik drink appelsap.", t: { ar: "عصير", ti: "ጽማቝ", om: "Cunfaa", so: "sharaab", en: "juice" } },
  { w: "de lepel", c: "Keukengerei", s: "Een lepel voor de soep.", t: { ar: "ملعقة", ti: "ማንካ", om: "Falkaamaa", so: "qaaddo", en: "spoon" } },
  { w: "de vork", c: "Keukengerei", s: "Een vork voor het eten.", t: { ar: "شوكة", ti: "ፎርከታ", om: "Shukkaa", so: "fargeeto", en: "fork" } },
  { w: "het mes", c: "Keukengerei", s: "Een mes snijdt brood.", t: { ar: "سكين", ti: "ካራ", om: "Haaduu", so: "mindi", en: "knife" } },
  { w: "het bord", c: "Keukengerei", s: "Het eten ligt op het bord.", t: { ar: "صحن", ti: "ሸሓኒ", om: "Waciitii", so: "saxan", en: "plate" } },
  { w: "het glas", c: "Keukengerei", s: "Een glas met koud water.", t: { ar: "كوب", ti: "ኩባያ", om: "Waan dhuganii", so: "koob", en: "glass" } },
  { w: "de pen", c: "School & Studie", s: "Ik schrijf met een pen.", t: { ar: "قلم", ti: "ብዕሪ", om: "Qalama", so: "qalin", en: "pen" } },
  { w: "het boek", c: "School & Studie", s: "Ik lees een mooi boek.", t: { ar: "كتاب", ti: "መጽሓፍ", om: "Kitaaba", so: "buug", en: "book" } },
  { w: "de tas", c: "Kleding", s: "Mijn tas is blauw.", t: { ar: "حقيبة", ti: "ቦርሳ", om: "Keesha", so: "boorso", en: "bag" } }
];

const moreC1 = [
  { w: "de jurisprudentie", c: "Samenleving & Politiek", s: "De rechter verwijst naar recente jurisprudentie van de Hoge Raad.", t: { ar: "السوابق القضائية", ti: "ናይ ፍርዲ ልምዲ", om: "Murtii mana murtii duraanii", so: "Go'aannadii hore ee maxkamadda", en: "case law" } },
  { w: "het precedent", c: "Samenleving & Politiek", s: "Deze uitspraak schept een precedent voor toekomstige geschillen.", t: { ar: "سابقة قانونية", ti: "መሰረት ዝኸውን ውሳነ", om: "Fakkeenya duraanii", so: "Tusaale hore oo sharci ah", en: "legal precedent" } },
  { w: "de rectificatie", c: "Samenleving & Politiek", s: "De krant plaatste op de voorpagina een rectificatie.", t: { ar: "تصحيح رسمي منشور", ti: "ናይ ሓቂ ምእራም", om: "Sirreeffama ifatti baafame", so: "Sixitaanka qalad hore loo daabacay", en: "rectification" } },
  { w: "het mandaat", c: "Werk & Beroep", s: "De commissie ontving een helder mandaat van het voltallige bestuur.", t: { ar: "التفويض الرسمي", ti: "ሕጋዊ ስልጣን ምሃብ", om: "Aangoo bakka bu'ummaa", so: "Wakiilnimo iyo awood rasmi ah", en: "mandate" } },
  { w: "de autonomie", c: "Werk & Beroep", s: "Werknemers ervaren meer voldoening bij professionele autonomie.", t: { ar: "الاستقلالية المهنية", ti: "ናይ ውልቀ ነጻነት", om: "Birmadummaa hojii", so: "Madaxbannaani shaqo", en: "autonomy" } },
  { w: "de subsidiabiliteit", c: "Werk & Beroep", s: "Het project voldeed ruimschoots aan de criteria voor subsidiabiliteit.", t: { ar: "أهلية الحصول على الدعم", ti: "ናይ ደገፍ ብቕዓት", om: "Ulaagaa deeggarsaa guutuu", so: "U-qalmidda kabka lacageed", en: "eligibility for subsidy" } }
];

const moreC2 = [
  { w: "de hegemonie", c: "Samenleving & Politiek", s: "Het evenwicht wankelt door verschuivingen in mondiale hegemonie.", t: { ar: "الهيمنة السياسية", ti: "ዓብላላይ ጽልዋ", om: "Olaantummaa siyaasaa", so: "Awoodda sare iyo saameynta caalamiga ah", en: "hegemony" } },
  { w: "de hermeneutiek", c: "Opleiding & School", s: "De filosofische hermeneutiek bestudeert interpretatiekaders.", t: { ar: "علم التأويل", ti: "ስነ-ትርጉም ፍልስፍና", om: "Qo'annoo hiika yaadaa", so: "Cilmiga fasiraadda qoraallada iyo aragtiyaha", en: "hermeneutics" } },
  { w: "de contingentie", c: "Opleiding & School", s: "Historici benadrukken de contingentie van maatschappelijke omwentelingen.", t: { ar: "العَرَضِيّة واحتمالية الحدوث", ti: "ድንገታዊነት", om: "Tasaa fi yaaddoo", so: "Dhacdooyin aan hore loo sii saadaalin karin", en: "contingency" } },
  { w: "de dialectiek", c: "Opleiding & School", s: "Via Socratische dialectiek kwamen de studenten tot diepere inzichten.", t: { ar: "الجدلية الفلسفية", ti: "ስነ-ክትዕን ምይይጥን", om: "Marii falmii yaadaa", so: "Doodda iyo lafo-gurka falsafadda", en: "dialectics" } }
];

function makeSvg() {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="word-svg-icon"><circle cx="50" cy="50" r="44" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/><text x="50" y="58" font-size="28" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">NL</text></svg>`;
}

morePreA1.forEach((item, i) => {
  words.push({
    id: `w_prea1_extra_${i+1}`,
    word: item.w,
    article: item.w.startsWith("de ") ? "de" : "het",
    base_word: item.w.replace(/^(de|het)\s+/, ""),
    category: item.c,
    level: "Pre-A1",
    example: item.s,
    simple_example: item.s,
    translations: item.t,
    example_translations: { ar: item.t.ar, ti: item.t.ti, om: item.t.om, so: item.t.so, en: item.t.en },
    simple_example_translations: { ar: item.t.ar, ti: item.t.ti, om: item.t.om, so: item.t.so, en: item.t.en },
    svg: makeSvg()
  });
});

moreC1.forEach((item, i) => {
  words.push({
    id: `w_c1_extra_${i+1}`,
    word: item.w,
    article: item.w.startsWith("de ") ? "de" : "het",
    base_word: item.w.replace(/^(de|het)\s+/, ""),
    category: item.c,
    level: "C1",
    example: item.s,
    simple_example: item.w,
    translations: item.t,
    example_translations: { ar: item.t.ar, ti: item.t.ti, om: item.t.om, so: item.t.so, en: item.t.en },
    simple_example_translations: { ar: item.t.ar, ti: item.t.ti, om: item.t.om, so: item.t.so, en: item.t.en },
    svg: makeSvg()
  });
});

moreC2.forEach((item, i) => {
  words.push({
    id: `w_c2_extra_${i+1}`,
    word: item.w,
    article: item.w.startsWith("de ") ? "de" : "het",
    base_word: item.w.replace(/^(de|het)\s+/, ""),
    category: item.c,
    level: "C2",
    example: item.s,
    simple_example: item.w,
    translations: item.t,
    example_translations: { ar: item.t.ar, ti: item.t.ti, om: item.t.om, so: item.t.so, en: item.t.en },
    simple_example_translations: { ar: item.t.ar, ti: item.t.ti, om: item.t.om, so: item.t.so, en: item.t.en },
    svg: makeSvg()
  });
});

fs.writeFileSync(wordsFile, JSON.stringify(words, null, 2), "utf8");
fs.writeFileSync(wordsJsFile, "window.TAALVRIEND_WORDS = " + JSON.stringify(words, null, 2) + ";\n", "utf8");
console.log("Updated words count:", words.length);
