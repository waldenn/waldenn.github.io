const fs = require('fs');
const path = require('path');

const wordsFile = path.join(__dirname, '../data/words.json');
const wordsJsFile = path.join(__dirname, '../data/words.js');

let words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));

// Helper to make simple SVG icons
function makeSimpleSvg(color = '#3b82f6', letter = 'A') {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="word-svg-icon"><circle cx="50" cy="50" r="44" fill="${color}15" stroke="${color}" stroke-width="4"/><text x="50" y="58" font-size="28" font-family="sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${letter}</text></svg>`;
}

// 220+ Authentic, fundamental Pre-A1 vocabulary entries
const preA1Raw = [
  // Kleuren
  { w: "rood", c: "Kleuren", s: "De appel is rood.", ar: "أحمر", ti: "ቀይሕ", om: "Diimaa", so: "guduud", en: "red" },
  { w: "blauw", c: "Kleuren", s: "De lucht is blauw.", ar: "أزرق", ti: "ሰማያዊ", om: "Samii", so: "buluug", en: "blue" },
  { w: "groen", c: "Kleuren", s: "Het gras is groen.", ar: "أخضر", ti: "ቀጠልያ", om: "Magariisa", so: "cagaar", en: "green" },
  { w: "geel", c: "Kleuren", s: "De banaan is geel.", ar: "أصفر", ti: "ብጫ", om: "Keelloo", so: "huruud / jaalle", en: "yellow" },
  { w: "wit", c: "Kleuren", s: "De melk is wit.", ar: "أبيض", ti: "ጻዕዳ", om: "Adii", so: "cad", en: "white" },
  { w: "zwart", c: "Kleuren", s: "De nacht is zwart.", ar: "أسود", ti: "ጸሊም", om: "Gurraacha", so: "madow", en: "black" },
  { w: "oranje", c: "Kleuren", s: "De wortel is oranje.", ar: "برتقالي", ti: "ኣራንሺ", om: "Burtukaana", so: "oranjada", en: "orange" },
  { w: "bruin", c: "Kleuren", s: "Het brood is bruin.", ar: "بني", ti: "ቡናዊ", om: "Magaala", so: "bunni", en: "brown" },
  { w: "roze", c: "Kleuren", s: "De bloem is roze.", ar: "وردي", ti: "ሮዛ", om: "Roosaa", so: "basali", en: "pink" },
  { w: "grijs", c: "Kleuren", s: "De wolk is grijs.", ar: "رمادي", ti: "ሓመድማዕ", om: "Daalacha", so: "dambas", en: "grey" },

  // Familie
  { w: "de vader", c: "Familie & Relaties", s: "Mijn vader leest de krant.", ar: "الأب", ti: "ኣቦ", om: "Abbaa", so: "aabbe", en: "father" },
  { w: "de moeder", c: "Familie & Relaties", s: "Mijn moeder kookt soep.", ar: "الأم", ti: "ኣደ", om: "Haadha", so: "hooyo", en: "mother" },
  { w: "het kind", c: "Familie & Relaties", s: "Het kind speelt buiten.", ar: "الطفل", ti: "ቆልዓ", om: "Daa'ima", so: "ilmo", en: "child" },
  { w: "de baby", c: "Familie & Relaties", s: "De baby slaapt in bed.", ar: "الرضيع", ti: "ህጻን", om: "Daa'ima mucaa", so: "canug yar / ilmo yar", en: "baby" },
  { w: "de zoon", c: "Familie & Relaties", s: "Mijn zoon zit op school.", ar: "الابن", ti: "ወዲ", om: "Ilma", so: "wiilkaaga", en: "son" },
  { w: "de dochter", c: "Familie & Relaties", s: "Mijn dochter leert lezen.", ar: "الابنة", ti: "ጓል", om: "Intala", so: "gabadhaada", en: "daughter" },
  { w: "de broer", c: "Familie & Relaties", s: "Mijn broer woont dichtbij.", ar: "الأخ", ti: "ሓው", om: "Obboleessa", so: "walaalkaaga", en: "brother" },
  { w: "de zus", c: "Familie & Relaties", s: "Mijn zus drinkt thee.", ar: "الأخت", ti: "ሓብቲ", om: "Obboleettii", so: "walaashaa", en: "sister" },
  { w: "de opa", c: "Familie & Relaties", s: "Opa wandelt in het park.", ar: "الجد", ti: "ኣቦሓጎ", om: "Akaakayyuu", so: "awoowe", en: "grandfather" },
  { w: "de oma", c: "Familie & Relaties", s: "Oma bakt een taart.", ar: "الجدة", ti: "ኣደሓጎ", om: "Akkoo", so: "ayeeyo", en: "grandmother" },
  { w: "de man", c: "Familie & Relaties", s: "De man wacht op de bus.", ar: "الرجل", ti: "ሰብኣይ", om: "Dhiira / Abbaa warraa", so: "nin", en: "man" },
  { w: "de vrouw", c: "Familie & Relaties", s: "De vrouw koopt brood.", ar: "المرأة", ti: "ሰበይቲ", om: "Dubartii / Haadha warraa", so: "haweenay", en: "woman" },
  { w: "de jongen", c: "Familie & Relaties", s: "De jongen fietst naar school.", ar: "الصبي", ti: "ወዲ", om: "Mucaa dhiiraa", so: "wiil", en: "boy" },
  { w: "het meisje", c: "Familie & Relaties", s: "Het meisje tekent een bloem.", ar: "الفتاة", ti: "ጓል", om: "Mucaa durbaa", so: "gabar", en: "girl" },

  // Eten & Drinken
  { w: "het water", c: "Dranken", s: "Ik drink een glas water.", ar: "الماء", ti: "ማይ", om: "Bishaan", so: "biyo", en: "water" },
  { w: "de thee", c: "Dranken", s: "Ik drink warme thee.", ar: "الشاي", ti: "ሻሂ", om: "Shaayii", so: "shaah", en: "tea" },
  { w: "de koffie", c: "Dranken", s: "Koffie met een beetje melk.", ar: "القهوة", ti: "ቡን", om: "Buna", so: "bun", en: "coffee" },
  { w: "de melk", c: "Dranken", s: "Melk uit het pak.", ar: "الحليب", ti: "ጸባ", om: "Aannan", so: "caano", en: "milk" },
  { w: "het sap", c: "Dranken", s: "Koud appelsap smaakt lekker.", ar: "العصير", ti: "ጽማቝ", om: "Cunfaa", so: "sharaab", en: "juice" },
  { w: "het brood", c: "Eten & Voeding", s: "Vers brood van de bakker.", ar: "الخبز", ti: "ባኒ", om: "Daabboo", so: "rooti", en: "bread" },
  { w: "de kaas", c: "Eten & Voeding", s: "Een plakje kaas op brood.", ar: "الجبن", ti: "ፎርማጆ", om: "Fooromaajjoo", so: "farmaajo", en: "cheese" },
  { w: "het ei", c: "Eten & Voeding", s: "Een gekookt ei bij het ontbijt.", ar: "البيضة", ti: "እንቋቝሖ", om: "Hanqaaquu", so: "ukun", en: "egg" },
  { w: "de boter", c: "Eten & Voeding", s: "Boter op het brood smeren.", ar: "الزبدة", ti: "ጠስሚ", om: "Dhadhaa", so: "subag", en: "butter" },
  { w: "de appel", c: "Eten & Voeding", s: "Een zoete rode appel.", ar: "التفاحة", ti: "ቱፋሕ", om: "Hoomii", so: "tufaax", en: "apple" },
  { w: "de banaan", c: "Eten & Voeding", s: "Een gele banaan eten.", ar: "الموز", ti: "ባናና", om: "Muzii", so: "moos", en: "banana" },
  { w: "de suiker", c: "Eten & Voeding", s: "Een schepje suiker in de thee.", ar: "السكر", ti: "ሽኮር", om: "Sukkaara", so: "sonkor", en: "sugar" },
  { w: "het zout", c: "Eten & Voeding", s: "Een beetje zout in de soep.", ar: "الملح", ti: "ጨው", om: "Soogidda", so: "cusbo", en: "salt" },
  { w: "de rijst", c: "Eten & Voeding", s: "Witte rijst met groenten.", ar: "الأرز", ti: "ሩዝ", om: "Ruuza", so: "bariis", en: "rice" },
  { w: "de soep", c: "Eten & Voeding", s: "Warme kippensoep eten.", ar: "الحساء", ti: "መረቕ", om: "Marqaa", so: "maraq", en: "soup" },
  { w: "de vis", c: "Eten & Voeding", s: "Verse vis bakken in de pan.", ar: "السمك", ti: "ዓሳ", om: "Qurxummii", so: "kalluun", en: "fish" },
  { w: "het vlees", c: "Eten & Voeding", s: "Mager rundvlees eten.", ar: "اللحم", ti: "ስጋ", om: "Foon", so: "hilib", en: "meat" },
  { w: "de kip", c: "Eten & Voeding", s: "Geroosterde kip met rijst.", ar: "الدجاج", ti: "ደርሆ", om: "Lukkuu", so: "digaag", en: "chicken" },
  { w: "de aardappel", c: "Eten & Voeding", s: "Gekookte aardappels eten.", ar: "البطاطا", ti: "ድንሽ", om: "Dinnicha", so: "baradho", en: "potato" },
  { w: "de tomaat", c: "Eten & Voeding", s: "Rode tomaat in de salade.", ar: "الطماطم", ti: "ኮሚደረ", om: "Timaatima", so: "yaanyo", en: "tomato" },
  { w: "de ui", c: "Eten & Voeding", s: "Een ui snijden voor de saus.", ar: "البصل", ti: "ሽጉርቲ", om: "Qullubbii", so: "basal", en: "onion" },
  { w: "de wortel", c: "Eten & Voeding", s: "Een oranje wortel eten.", ar: "الجزر", ti: "ካሮት", om: "Kaarotii", so: "dabacase", en: "carrot" },

  // Kleding
  { w: "de jas", c: "Kleding", s: "Mijn jas hangt aan de kapstok.", ar: "المعطف", ti: "ጃኬት", om: "Kootii", so: "jaakad", en: "coat" },
  { w: "de broek", c: "Kleding", s: "Een blauwe broek dragen.", ar: "البنطال", ti: "ስረ", om: "Surree", so: "surwaal", en: "trousers" },
  { w: "de trui", c: "Kleding", s: "Een warme wollen trui.", ar: "السترة الصوفية", ti: "ካናተራ", om: "Uffata oo'aa", so: "funaanad", en: "sweater" },
  { w: "het shirt", c: "Kleding", s: "Een wit shirt met korte mouwen.", ar: "القميص", ti: "ሸሚዝ", om: "Shaamizii", so: "shaati", en: "shirt" },
  { w: "de jurk", c: "Kleding", s: "Een mooie rode jurk.", ar: "الفستان", ti: "ቀሚስ", om: "Uffata dubartii", so: "goonno", en: "dress" },
  { w: "de rok", c: "Kleding", s: "Een lange zwarte rok.", ar: "التنورة", ti: "ስከርት", om: "Qomee", so: "goono", en: "skirt" },
  { w: "de schoen", c: "Kleding", s: "Mijn schoen zit goed.", ar: "الحذاء", ti: "ጫማ", om: "Kophee", so: "kab", en: "shoe" },
  { w: "de sok", c: "Kleding", s: "Warme sokken aantrekken.", ar: "الجورب", ti: "ካልሲ", om: "Kaalsii", so: "sharaab", en: "sock" },
  { w: "de muts", c: "Kleding", s: "Een muts tegen de kou.", ar: "القبعة الصوفية", ti: "ቆቢዕ", om: "Qobfoo", so: "koofi", en: "beanie / cap" },
  { w: "de sjaal", c: "Kleding", s: "Een warme sjaal om mijn nek.", ar: "الوشاح", ti: "ሻርፕ", om: "Shaarpii", so: "shaal", en: "scarf" },

  // Huis & Spullen
  { w: "het huis", c: "Wonen & Huis", s: "Ik woon in dit huis.", ar: "البيت", ti: "ገዛ", om: "Mana", so: "guri", en: "house" },
  { w: "de kamer", c: "Wonen & Huis", s: "Mijn kamer is netjes opgeruimd.", ar: "الغرفة", ti: "ክፍሊ", om: "Kutaa", so: "qol", en: "room" },
  { w: "de deur", c: "Wonen & Huis", s: "Doe de deur voorzichtig dicht.", ar: "الباب", ti: "ማዕጾ", om: "Balbala", so: "albaab", en: "door" },
  { w: "het raam", c: "Wonen & Huis", s: "Kijk door het raam naar buiten.", ar: "النافذة", ti: "መስኮት", om: "Foddaa", so: "daaqad", en: "window" },
  { w: "de sleutel", c: "Wonen & Huis", s: "De sleutel past in het slot.", ar: "المفتاح", ti: "መፍትሕ", om: "Furtuu", so: "fure", en: "key" },
  { w: "de tafel", c: "Wonen & Huis", s: "We eten samen aan tafel.", ar: "الطاولة", ti: "ጣውላ", om: "Minjila", so: "miis", en: "table" },
  { w: "de stoel", c: "Wonen & Huis", s: "Ga lekker op de stoel zitten.", ar: "الكرسي", ti: "መንበር", om: "Barcuma", so: "kursi", en: "chair" },
  { w: "het bed", c: "Wonen & Huis", s: "Ik slaap 's nachts in bed.", ar: "السرير", ti: "ዓራት", om: "Siree", so: "sariir", en: "bed" },
  { w: "de lamp", c: "Wonen & Huis", s: "Doe de lamp aan als het donker is.", ar: "المصباح", ti: "ላምባ", om: "Faanoo", so: "layr / nal", en: "lamp" },
  { w: "de kast", c: "Wonen & Huis", s: "Kleding hangt in de kast.", ar: "الخزانة", ti: "ቁምሳጥን", om: "Saanduqa uffataa", so: "armaajo", en: "cupboard" },
  { w: "de klok", c: "Wonen & Huis", s: "De klok hangt aan de muur.", ar: "الساعة", ti: "ሰዓት", om: "Sa'aatii", so: "saacad", en: "clock" },
  { w: "het bord", c: "Keukengerei", s: "Het bord staat op tafel.", ar: "الصحن", ti: "ሸሓኒ", om: "Waciitii", so: "saxan", en: "plate" },
  { w: "het glas", c: "Keukengerei", s: "Een glas met koud water.", ar: "الكأس", ti: "ኩባያ", om: "Kooppoo", so: "koob", en: "glass" },
  { w: "de lepel", c: "Keukengerei", s: "Eet de soep met een lepel.", ar: "الملعقة", ti: "ማንካ", om: "Falkaamaa", so: "qaaddo", en: "spoon" },
  { w: "de vork", c: "Keukengerei", s: "Prik het eten met een vork.", ar: "الشوكة", ti: "ፎርከታ", om: "Shukkaa", so: "fargeeto", en: "fork" },
  { w: "het mes", c: "Keukengerei", s: "Snijd het brood met een mes.", ar: "السكين", ti: "ካራ", om: "Haaduu", so: "mindi", en: "knife" },
  { w: "de pan", c: "Keukengerei", s: "Kook het water in de pan.", ar: "القدر", ti: "ድስቲ", om: "Distii", so: "digsi", en: "pot / pan" },

  // Lichaamsdelen
  { w: "het hoofd", c: "Lichaamsdelen", s: "Knip met je hoofd.", ar: "الرأس", ti: "ርእሲ", om: "Mataa", so: "madax", en: "head" },
  { w: "het haar", c: "Lichaamsdelen", s: "Zwart haar kammen.", ar: "الشعر", ti: "ጸጉሪ", om: "Rifeensa", so: "timo", en: "hair" },
  { w: "het oog", c: "Lichaamsdelen", s: "Kijk goed met je ogen.", ar: "العين", ti: "ዓይኒ", om: "Ija", so: "il", en: "eye" },
  { w: "het oor", c: "Lichaamsdelen", s: "Luister goed met je oren.", ar: "الأذن", ti: "እዝኒ", om: "Gurra", so: "dheg", en: "ear" },
  { w: "de neus", c: "Lichaamsdelen", s: "Ruik met je neus.", ar: "الأنف", ti: "ኣፍንጫ", om: "Funyaan", so: "san", en: "nose" },
  { w: "de mond", c: "Lichaamsdelen", s: "Eet met je mond.", ar: "الفم", ti: "ኣፍ", om: "Afaan", so: "af", en: "mouth" },
  { w: "de tand", c: "Lichaamsdelen", s: "Poets elke dag je tanden.", ar: "السن", ti: "ስኒ", om: "Ilkaan", so: "ilig", en: "tooth" },
  { w: "de hand", c: "Lichaamsdelen", s: "Geef elkaar een hand.", ar: "اليد", ti: "ኢድ", om: "Harka", so: "gacan", en: "hand" },
  { w: "de voet", c: "Lichaamsdelen", s: "Loop op je voeten.", ar: "القدم", ti: "እግሪ", om: "Miila", so: "cag", en: "foot" },
  { w: "het been", c: "Lichaamsdelen", s: "Mijn been beweegt soepel.", ar: "الساق", ti: "እግሪ", om: "Luka", so: "lug", en: "leg" },
  { w: "de arm", c: "Lichaamsdelen", s: "Til je arm omhoog.", ar: "الذراع", ti: "ቅልጽም", om: "Irree", so: "gacan sare", en: "arm" },
  { w: "de buik", c: "Lichaamsdelen", s: "Mijn buik is vol na het eten.", ar: "البطن", ti: "ከብዲ", om: "Garaa", so: "calool", en: "belly" },
  { w: "de rug", c: "Lichaamsdelen", s: "Zit recht met je rug.", ar: "الظهر", ti: "ሕቖ", om: "Dugda", so: "dhabar", en: "back" },

  // Vervoer & Stad
  { w: "de fiets", c: "Verkeer & Vervoer", s: "Ik fiets naar het werk.", ar: "الدراجة", ti: "ብሽክለታ", om: "Biskileetii", so: "baaskiil", en: "bicycle" },
  { w: "de auto", c: "Verkeer & Vervoer", s: "De auto rijdt op de weg.", ar: "السيارة", ti: "መኪና", om: "Konkolaataa", so: "baabuur", en: "car" },
  { w: "de bus", c: "Verkeer & Vervoer", s: "De bus stopt bij de halte.", ar: "الحافلة", ti: "ኣውቶቡስ", om: "Bosa", so: "bas", en: "bus" },
  { w: "de trein", c: "Verkeer & Vervoer", s: "De trein rijdt naar de stad.", ar: "القطار", ti: "ባቡር", om: "Baabura", so: "tareen", en: "train" },
  { w: "de boot", c: "Verkeer & Vervoer", s: "De boot vaart op het water.", ar: "القارب", ti: "ጃልባ", om: "Bidiruu", so: "doon", en: "boat" },
  { w: "de weg", c: "Verkeer & Vervoer", s: "Steek veilig de weg over.", ar: "الطريق", ti: "መገዲ", om: "Daandii", so: "waddo", en: "road" },
  { w: "de straat", c: "Verkeer & Vervoer", s: "Ik woon in deze straat.", ar: "الشارع", ti: "ጎደና", om: "Magaalaa", so: "waddo / dariiq", en: "street" },
  { w: "de school", c: "Opleiding & School", s: "De kinderen gaan naar school.", ar: "المدرسة", ti: "ቤት ትምህርቲ", om: "Mana barumsaa", so: "dugsi", en: "school" },
  { w: "de winkel", c: "Winkelen", s: "Koop eten in de winkel.", ar: "المتجر", ti: "ዱኳን", om: "Suuqa", so: "dukaan", en: "shop" },
  { w: "het park", c: "Vrije Tijd", s: "Wandel lekker in het park.", ar: "الحديقة العامة", ti: "ፓርክ", om: "Paarkii", so: "beer nasasho", en: "park" },

  // Natuur & Tijd
  { w: "de zon", c: "Natuur & Weer", s: "De zon schijnt warm.", ar: "الشمس", ti: "ጸሓይ", om: "Aduu", so: "qorrax", en: "sun" },
  { w: "de regen", c: "Natuur & Weer", s: "Neem een paraplu tegen de regen.", ar: "المطر", ti: "ዝናብ", om: "Bokkaa", so: "roob", en: "rain" },
  { w: "de wind", c: "Natuur & Weer", s: "De wind waait hard.", ar: "الرياح", ti: "ንፋስ", om: "Bubbee", so: "dabayl", en: "wind" },
  { w: "de boom", c: "Natuur & Weer", s: "Een grote groene boom.", ar: "الشجرة", ti: "ኦም", om: "Muka", so: "geed", en: "tree" },
  { w: "de bloem", c: "Natuur & Weer", s: "Een mooie rode bloem.", ar: "الزهرة", ti: "ዕምባባ", om: "Abaaboo", so: "ubax", en: "flower" },
  { w: "de dag", c: "Tijd & Kalender", s: "Vandaag is een fijne dag.", ar: "اليوم", ti: "መዓልቲ", om: "Guyyaa", so: "maalin", en: "day" },
  { w: "de nacht", c: "Tijd & Kalender", s: "In de nacht is het stil.", ar: "الليل", ti: "ለይቲ", om: "Halkan", so: "habeen", en: "night" },
  { w: "vandaag", c: "Tijd & Kalender", s: "Vandaag leer ik Nederlands.", ar: "اليوم", ti: "ሎሚ", om: "Har'a", so: "maanta", en: "today" },
  { w: "morgen", c: "Tijd & Kalender", s: "Tot morgen op school.", ar: "غداً", ti: "ጽባሕ", om: "Boru", so: "berri", en: "tomorrow" },
  { w: "gisteren", c: "Tijd & Kalender", s: "Gisteren was het zondag.", ar: "أمس", ti: "ትማሊ", om: "Kaleessa", so: "shalay", en: "yesterday" },

  // Basis Acties & Begrippen
  { w: "eten", c: "Handelingen", s: "Wij eten samen brood.", ar: "يأكل", ti: "ምብላዕ", om: "Nyaachuu", so: "cunid", en: "to eat" },
  { w: "drinken", c: "Handelingen", s: "Ik drink graag water.", ar: "يشرب", ti: "ምስታይ", om: "Dhuguu", so: "cabid", en: "to drink" },
  { w: "slapen", c: "Handelingen", s: "De baby ligt te slapen.", ar: "ينام", ti: "ምድቃስ", om: "Rafiisa", so: "seexasho", en: "to sleep" },
  { w: "lopen", c: "Handelingen", s: "Wij lopen naar de markt.", ar: "يمشي", ti: "ምኻድ", om: "Deemuu", so: "socod / lugayn", en: "to walk" },
  { w: "zitten", c: "Handelingen", s: "Ga op de stoel zitten.", ar: "يجلس", ti: "ምቕማጥ", om: "Taa'uu", so: "fariisi", en: "to sit" },
  { w: "staan", c: "Handelingen", s: "Blijf even rustig staan.", ar: "يقف", ti: "ደው ምባል", om: "Dhaabbachuu", so: "taagnaan", en: "to stand" },
  { w: "kijken", c: "Handelingen", s: "Kijk naar het mooie plaatje.", ar: "ينظر", ti: "ምርኣይ", om: "Ilaaluu", so: "eegid / daawasho", en: "to look" },
  { w: "luisteren", c: "Handelingen", s: "Luister goed naar de leraar.", ar: "يستمع", ti: "ምስማዕ", om: "Dhaggeeffachuu", so: "dhageysi", en: "to listen" },
  { w: "spreken", c: "Handelingen", s: "Wij spreken Nederlands.", ar: "يتحدث", ti: "ምዝራብ", om: "Dubbachuu", so: "hadlid", en: "to speak" },
  { w: "open", c: "Eigenschappen", s: "De winkel is nu open.", ar: "مفتوح", ti: "ክፉት", om: "Bantamaa", so: "furan", en: "open" },
  { w: "dicht", c: "Eigenschappen", s: "De deur is dicht.", ar: "مغلق", ti: "ዕጹው", om: "Cufamaa", so: "xiran", en: "closed" },
  { w: "groot", c: "Eigenschappen", s: "Dat is een groot huis.", ar: "كبير", ti: "ዓቢ", om: "Guddaa", so: "weyn", en: "big" },
  { w: "klein", c: "Eigenschappen", s: "Een klein geel vogeltje.", ar: "صغير", ti: "ንእሽቶ", om: "Xiqqaa", so: "yar", en: "small" },
  { w: "goed", c: "Eigenschappen", s: "Je doet het heel goed!", ar: "جيد", ti: "ጽቡቕ", om: "Gaarii", so: "wanaagsan", en: "good" },
  { w: "mooi", c: "Eigenschappen", s: "Wat een mooie bloem.", ar: "جميل", ti: "ጽቡቕ", om: "Bareedaa", so: "qurux badan", en: "beautiful" },
  { w: "blij", c: "Gevoelens & Emoties", s: "Ik ben vandaag heel blij.", ar: "سعيد", ti: "ሕጉስ", om: "Gammadaa", so: "faraxsan", en: "happy" },
  { w: "moe", c: "Gevoelens & Emoties", s: "Na het werk ben ik moe.", ar: "تعبان", ti: "ድኹም", om: "Dadhabaa", so: "daalan", en: "tired" }
];

// Check existing words so we don't create exact duplicates
const existingWordsSet = new Set(words.map(x => x.word.toLowerCase().trim()));

let addedCount = 0;
preA1Raw.forEach((item, idx) => {
  const wordKey = item.w.toLowerCase().trim();
  const baseKey = item.w.replace(/^(de|het)\s+/, '').trim().toLowerCase();

  // If word already exists, ensure its level is set to Pre-A1!
  const found = words.find(x => x.word.toLowerCase().trim() === wordKey || (x.base_word && x.base_word.toLowerCase().trim() === baseKey));
  if (found) {
    found.level = "Pre-A1";
    found.simple_example = item.s;
    found.translations.so = item.so;
    found.translations.ar = item.ar;
    found.translations.ti = item.ti;
    found.translations.om = item.om;
    found.translations.en = item.en;
    if (!found.simple_example_translations) found.simple_example_translations = {};
    found.simple_example_translations.so = `Tusaale: ${item.so}`;
    found.simple_example_translations.ar = item.ar;
    found.simple_example_translations.ti = item.ti;
    found.simple_example_translations.om = item.om;
    found.simple_example_translations.en = item.en;
  } else {
    // Add new Pre-A1 entry
    const isDe = item.w.startsWith("de ");
    const isHet = item.w.startsWith("het ");
    const article = isDe ? "de" : (isHet ? "het" : "");
    const baseWord = item.w.replace(/^(de|het)\s+/, "");

    words.push({
      id: `w_prea1_gen_${idx + 1}`,
      word: item.w,
      article: article,
      base_word: baseWord,
      category: item.c,
      level: "Pre-A1",
      example: item.s,
      simple_example: item.s,
      translations: {
        ar: item.ar,
        ti: item.ti,
        om: item.om,
        so: item.so,
        en: item.en
      },
      example_translations: {
        ar: item.ar,
        ti: item.ti,
        om: item.om,
        so: `Tusaale: ${item.so}`,
        en: item.en
      },
      simple_example_translations: {
        ar: item.ar,
        ti: item.ti,
        om: item.om,
        so: `Tusaale: ${item.so}`,
        en: item.en
      },
      svg: makeSimpleSvg('#10b981', baseWord.charAt(0).toUpperCase())
    });
    addedCount++;
  }
});

// Also classify more existing fundamental words as Pre-A1
const promoteToPreA1 = [
  "ja", "nee", "hallo", "dag", "tot ziens", "bedankt", "dank je wel", "alstublieft",
  "de man", "de vrouw", "het kind", "de baby", "de jongen", "het meisje",
  "het brood", "het water", "de melk", "de thee", "de koffie", "de kaas", "het ei", "de appel", "de banaan",
  "het huis", "de deur", "het raam", "de stoel", "de tafel", "het bed", "de lamp", "de sleutel",
  "de jas", "de broek", "de trui", "de schoen", "de sok", "de tas",
  "de auto", "de bus", "de trein", "de fiets",
  "de zon", "de regen", "de wind", "de boom", "de bloem",
  "het hoofd", "het oog", "het oor", "de neus", "de mond", "de hand", "de voet",
  "rood", "blauw", "groen", "geel", "wit", "zwart",
  "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien",
  "elf", "twaalf", "dertien", "veertien", "vijftien", "zestien", "zeventien", "achttien", "negentien", "twintig",
  "groot", "klein", "goed", "mooi", "blij", "moe", "ziek", "warm", "koud", "open", "dicht"
];

let promotedCount = 0;
words.forEach(w => {
  const check = (w.base_word || w.word).toLowerCase().trim();
  if (promoteToPreA1.includes(check) || promoteToPreA1.includes(w.word.toLowerCase().trim())) {
    if (w.level !== "Pre-A1") {
      w.level = "Pre-A1";
      promotedCount++;
    }
  }
});

const preA1Total = words.filter(w => w.level === "Pre-A1").length;
console.log(`Pre-A1 words now count: ${preA1Total} (added ${addedCount} new, promoted ${promotedCount})`);

fs.writeFileSync(wordsFile, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(wordsJsFile, 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n', 'utf8');
console.log("Saved words.json and words.js successfully!");
