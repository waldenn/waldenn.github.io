const fs = require('fs');
const path = require('path');

const wordsFile = path.join(__dirname, '../data/words.json');
const wordsJsFile = path.join(__dirname, '../data/words.js');

let words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));

// C1 Words & Example Sentences
const c1Words = [
  {
    word: "de aansprakelijkheid",
    category: "Werk & Beroep",
    level: "C1",
    example: "De fabrikant wijst iedere aansprakelijkheid voor gevolgschade resoluut van de hand.",
    simple_example: "Wie betaalt voor de schade?",
    translations: {
      ar: "المسؤولية القانونية",
      ti: "ሕጋዊ ተሓታትነት",
      om: "Itti gaafatamummaa seeraa",
      so: "Mas'uuliyadda sharciga ah",
      en: "liability / legal responsibility"
    },
    example_translations: {
      ar: "ترفض الشركة المصنعة أي مسؤولية عن الأضرار اللاحقة.",
      ti: "እቲ ኣፍራዪ ትካል ንዝመጽእ ዝኾነ ጉድኣት ካብ ተሓታትነት ነጻ ምዃኑ ይገልጽ።",
      om: "Warshichi miidhaa booda dhufu kamiyyuuf itti gaafatamummaa hin fudhadhu jedhe.",
      so: "Warshadda soo saartay badeecaddu waxay si buuxda isaga fogeysay mas'uuliyadda waxyeellada dambe.",
      en: "The manufacturer firmly denies any liability for consequential damages."
    }
  },
  {
    word: "de verduurzaming",
    category: "Wonen & Huishouden",
    level: "C1",
    example: "De verduurzaming van historische panden vereist aanzienlijke maatwerkinvesteringen.",
    simple_example: "Het huis zuinig maken.",
    translations: {
      ar: "الاستدامة والتحول البيئي",
      ti: "ምዕቃብ ጸዓትን ከባቢን",
      om: "Eegumsa naannoo fi misooma itti fufiinsa qabu",
      so: "Horumarinta waarista deegaanka",
      en: "sustainability transition"
    },
    example_translations: {
      ar: "يتطلب تحسين استدامة المباني التاريخية استثمارات مخصصة.",
      ti: "ነቶም ጥንታውያን ህንጻታት ብዘላቒ መገዲ ምሕዳስ ዓቢ ወጻኢታት ይሓትት።",
      om: "Gamoowwan durii gara eegumsa naannootti jijjiiruun baasii guddaa gaafata.",
      so: "Ka dhigista dhismayaasha qadiimiga ah kuwo tamar ahaan waara waxay u baahan tahay maalgashi gaar ah.",
      en: "Making historical buildings sustainable requires significant tailor-made investments."
    }
  },
  {
    word: "het amendement",
    category: "Samenleving & Politiek",
    level: "C1",
    example: "Het parlement stemde unaniem in met het ingediende amendement op de begroting.",
    simple_example: "Een wijziging in de wet.",
    translations: {
      ar: "تعديل تشريعي",
      ti: "ሕጋዊ ምምሕያሽ",
      om: "Fooyya'iinsa seeraa",
      so: "Wax ka beddel sharci",
      en: "legislative amendment"
    },
    example_translations: {
      ar: "وافق البرلمان بالإجماع على التعديل المقترح للميزانية.",
      ti: "ፓርላማ ነቲ ኣብ በጀት ዝቐረበ ናይ ምምሕያሽ ሓሳብ ብምሉእ ድምጺ ኣጽዲቕዎ።",
      om: "Paarlaamaan fooyya'iinsa baajataa dhiyaate sagalee guutuudhaan fudhate.",
      so: "Baarlamaanku wuxuu si aqlabiyad ah ku ansixiyay wax ka beddelka miisaaniyadda.",
      en: "Parliament unanimously approved the submitted budget amendment."
    }
  },
  {
    word: "de overmacht",
    category: "Werk & Beroep",
    level: "C1",
    example: "Wegens extreme weersomstandigheden beroept de vervoerder zich op overmacht.",
    simple_example: "Iets wat je niet kunt voorkomen.",
    translations: {
      ar: "القوة القاهرة",
      ti: "ካብ ዓቕሚ ንላዕሊ ዝኾነ ኩነታት",
      om: "Humnaa ol ta'uu",
      so: "Awoodda ka baxsan (force majeure)",
      en: "force majeure"
    },
    example_translations: {
      ar: "بسبب الظروف الجوية القاسية تتذرع شركة النقل بالقوة القاهرة.",
      ti: "ብምኽንያት ብርቱዕ ህቦብላ বርትዕ እቲ መጓዓዝያ ትካል ካብ ዓቕሚ ንላዕሊ ምዃኑ ገሊጹ።",
      om: "Sababa haala qilleensaatiin kampaaniin geejjibaa humnaa ol ta'uu ibse.",
      so: "Xaaladaha cimilada daran dartiis, shirkadda gaadiidku waxay cuskatay awood ka baxsan qorshaha.",
      en: "Due to extreme weather conditions, the carrier invokes force majeure."
    }
  },
  {
    word: "de handhaving",
    category: "Samenleving & Politiek",
    level: "C1",
    example: "Gemeenten investeren intensief in preventieve handhaving van de openbare orde.",
    simple_example: "Zorgen dat regels gevolgd worden.",
    translations: {
      ar: "إنفاذ القانون وضبط النظام",
      ti: "ምኽባር ሕግን ስርዓትን",
      om: "Seera kabachiisuu",
      so: "Dhaqangelinta sharciga iyo nidaamka",
      en: "enforcement / compliance"
    },
    example_translations: {
      ar: "تستثمر البلديات بشكل مكثف في الضبط الوقائي للنظام العام.",
      ti: "ምምሕዳራት ኣብ ምኽባር ህዝባዊ ጸጥታ ብዙሕ ወጻኢታት ይገብሩ ኣለዉ።",
      om: "Bulchiinsonni seera kabachiisuuf qabeenya guddaa ramadaa jiru.",
      so: "Dawladaha hoose waxay maalgashi weyn ku samaynayaan ilaalinta nidaamka guud.",
      en: "Municipalities invest heavily in preventive public order enforcement."
    }
  },
  {
    word: "de discrepantie",
    category: "Werk & Beroep",
    level: "C1",
    example: "Er bestaat een aanzienlijke discrepantie tussen de begroting en de daadwerkelijke uitgaven.",
    simple_example: "Een groot verschil.",
    translations: {
      ar: "تفاوت أو تناقض",
      ti: "ዘይቃዶ ፍልልይ",
      om: "Garaagarummaa guddaa",
      so: "Farqi weyn ama is-waafaqid la'aan",
      en: "discrepancy / gap"
    },
    example_translations: {
      ar: "يوجد تفاوت ملحوظ بين الميزانية المقدرة والمصروفات الفعلية.",
      ti: "ኣብ መንጎ ዝተመደበ ባጀትን ዝወጸ ገንዘብን ዓቢ ፍልልይ ኣሎ።",
      om: "Baajata karoorfamee fi baasii qabatamaa gidduu garaagarummaa guddaatu jira.",
      so: "Waxaa jira farqi weyn oo u dhexeeya miisaaniyadda iyo kharashka dhabta ah.",
      en: "There is a significant discrepancy between the budget and actual expenditures."
    }
  },
  {
    word: "de implementatie",
    category: "Werk & Beroep",
    level: "C1",
    example: "De implementatie van de nieuwe software verloopt volgens de vastgestelde tijdslijnen.",
    simple_example: "Het invoeren van een systeem.",
    translations: {
      ar: "التنفيذ والتطبيق",
      ti: "ምትግባር ሓዲሽ ስርዓት",
      om: "Hojiirra oolmaa",
      so: "Hirgelinta nidaamka cusub",
      en: "implementation / rollout"
    },
    example_translations: {
      ar: "يسير تطبيق البرنامج الجديد وفق الجداول الزمنية المحددة.",
      ti: "እቲ ሓዲሽ ሶፍትዌር ኣብ ግብሪ ምውዓል ብመሰረት ዝተመደበሉ ግዜ ይካየድ ኣሎ።",
      om: "Sirna sooftiweeraa haaraa hojiirra oolchuun akka karooraatti deemaa jira.",
      so: "Hirgelinta barnaamijka cusub waxay ku socotaa jadwalkii loogu talagalay.",
      en: "The implementation of the new software proceeds according to schedule."
    }
  },
  {
    word: "de waarborging",
    category: "Werk & Beroep",
    level: "C1",
    example: "Kwaliteitscontrole vormt de waarborging voor de veiligheid van onze producten.",
    simple_example: "Garantie geven voor veiligheid.",
    translations: {
      ar: "الضمان والتأمين",
      ti: "ውሕስነት ምሃብ",
      om: "Wabii kennuu",
      so: "Dammaanad qaadid",
      en: "safeguarding / warranty"
    },
    example_translations: {
      ar: "تشكل مراقبة الجودة ضماناً لسلامة منتجاتنا.",
      ti: "ምቁጽጻር ጽሬት ንደሕንነት ፍርያትና ቀንዲ ውሕስነት እዩ።",
      om: "Qulqullina to'achuun nageenya oomisha keenyaaf wabiidha.",
      so: "Xaqiijinta tayada waxay dammaanad u tahay badbaadada alaabtayada.",
      en: "Quality control safeguards the safety of our products."
    }
  }
];

// C2 Words & Example Sentences
const c2Words = [
  {
    word: "het paradigma",
    category: "Opleiding & School",
    level: "C2",
    example: "Deze wetenschappelijke doorbraak ontketende een fundamentele verschuiving in het heersende paradigma.",
    simple_example: "Een manier van denken.",
    translations: {
      ar: "النموذج الفكري السائد",
      ti: "ቀንዲ ናይ ኣተሓሳስባ መለክዒ",
      om: "Seera fi ilaalcha bu'uuraa",
      so: "Qaab-dhismeedka aragtiyeed (paradigm)",
      en: "paradigm"
    },
    example_translations: {
      ar: "أحدث هذا الاكتشاف تحولاً جذرياً في النموذج الفكري العلمي السائد.",
      ti: "እዚ ሓዲሽ ርክብ ኣብቲ ዝነበረ ናይ ኣተሓሳስባ መለክዒ ዓቢ ምቅይያር ፈጢሩ።",
      om: "Argannoon saayinsii kun ilaalcha beekamaa ture jijjiireera.",
      so: "Horumarkan cilmiyeed wuxuu keenay isbeddel qoto dheer oo ku yimid aragtida guud.",
      en: "This scientific breakthrough triggered a fundamental paradigm shift."
    }
  },
  {
    word: "de epistemologie",
    category: "Opleiding & School",
    level: "C2",
    example: "In zijn proefschrift reflecteert de onderzoeker op de epistemologie van empirisch bewijs.",
    simple_example: "Hoe we weten wat waar is.",
    translations: {
      ar: "نظرية المعرفة / الإبستمولوجيا",
      ti: "ፍልስፍና ናይ ፍልጠት",
      om: "Qo'annoo beekumsaa",
      so: "Aragtida cilmiga iyo aqoonta (epistemology)",
      en: "epistemology"
    },
    example_translations: {
      ar: "يتناول الباحث في أطروحته فلسفة ونظرية المعرفة القائمة على الأدلة.",
      ti: "እቲ ተመራማሪ ኣብ መጽናዕቱ ብዛዕባ መበቆል ፍልጠት ይትንትን።",
      om: "Qorataan kun barreeffama isaa keessatti madda beekumsaa xiinxaleera.",
      so: "Cilmi-baaruhu wuxuu qoraalkiisa ku lafo-guray aragtida dhabta ah ee aqoonta.",
      en: "In his dissertation the researcher reflects on the epistemology of empirical evidence."
    }
  },
  {
    word: "de coherentie",
    category: "Werk & Beroep",
    level: "C2",
    example: "De beleidsnota blinkt uit door een opmerkelijke conceptuele coherentie.",
    simple_example: "Alles past goed bij elkaar.",
    translations: {
      ar: "الاتساق والترابط المنطقي",
      ti: "ምስምማዕን ጥምረትን",
      om: "Wal-simiinsa yaadaa",
      so: "Isku-xirnaan iyo isku-dheellitirnaan sugan",
      en: "coherence / logical consistency"
    },
    example_translations: {
      ar: "تتميز الورقة السياسية بترابط واتساق منطقي متكامل.",
      ti: "እቲ ፖሊሲ ጽሑፍ ጽቡቕ ናይ ሓሳባት ጥምረት ኣለዎ።",
      om: "Barreeffamni imaammataa kun wal-simiinsa yaadaa gaarii qaba.",
      so: "Warqadda siyaasaddu waxay ku caan baxday isku-xirnaan xagga fikirka ah oo aad u sarreysa.",
      en: "The policy memorandum is distinguished by remarkable conceptual coherence."
    }
  },
  {
    word: "de ambivalentie",
    category: "Gevoelens & Emoties",
    level: "C2",
    example: "Zijn toespraak ademde een onmiskenbare ambivalentie over de noodzaak tot ingrijpen.",
    simple_example: "Twee verschillende gevoelens tegelijk hebben.",
    translations: {
      ar: "ازدواجية المشاعر أو التردد",
      ti: "ክልተ ዝተፈላለየ ስምዒት ምሕዳር",
      om: "Mamiin fi yaada lamatti qoodamu",
      so: "Shaki ama dareen laba-dhinac ah",
      en: "ambivalence"
    },
    example_translations: {
      ar: "عكست كلمته تردداً واضحاً وازدواجية بشأن ضرورة التدخل.",
      ti: "መደረኡ ክልተ ዝተፈላለየ ስምዒት ዘንጸባርቕ ነይሩ።",
      om: "Haasaan isaa murtoo dabarsuuf yaaddoo qabaachuu agarsiise.",
      so: "Khudbaddiisu waxay muujisay dareen laba-dhinac ah oo ku saabsan faragelinta.",
      en: "His speech radiated an unmistakable ambivalence regarding the need to intervene."
    }
  },
  {
    word: "de soevereiniteit",
    category: "Samenleving & Politiek",
    level: "C2",
    example: "Nationale soevereiniteit moet worden afgewogen tegen internationale verdragsverplichtingen.",
    simple_example: "Zelf de baas zijn in je land.",
    translations: {
      ar: "السيادة الوطنية",
      ti: "ልዑላውነት ሃገር",
      om: "Abbaa biyyummaa fi birmadummaa",
      so: "Madaxbannaanida iyo gobanimada qaran",
      en: "sovereignty"
    },
    example_translations: {
      ar: "يجب الموازنة بين السيادة الوطنية والالتزامات التعاهدية الدولية.",
      ti: "ልዑላውነት ሃገር ምስ ኣህጉራዊ ውዕላት ክመዛዘን ይግባእ።",
      om: "Birmadummaan biyyaa waliigalteewwan addunyaa wajjin wal simuu qaba.",
      so: "Madaxbannaanida qaranka waa in lala miisaamaa heshiisyada caalamiga ah.",
      en: "National sovereignty must be weighed against international treaty obligations."
    }
  },
  {
    word: "de rechtsstatelijkheid",
    category: "Samenleving & Politiek",
    level: "C2",
    example: "Het waarborgen van de rechtsstatelijkheid is de hoeksteen van een democratische samenleving.",
    simple_example: "Iedereen moet zich aan de wet houden.",
    translations: {
      ar: "سيادة دولة القانون",
      ti: "ልዕልና ሕጊ",
      om: "Olaantummaa seeraa",
      so: "Sarreeynta sharciga iyo dawladnimada",
      en: "rule of law / constitutionalism"
    },
    example_translations: {
      ar: "حماية سيادة القانون هي حجر الزاوية للمجتمع الديمقراطي.",
      ti: "ልዕልና ሕጊ ምኽባር ቀንዲ መሰረት ናይ ዲሞክራስያዊ ሕብረተሰብ እዩ።",
      om: "Olaantummaa seeraa kabachiisuun bu'uura dimokraasiiti.",
      so: "Ilaalinta sarreeynta sharcigu waa udub-dhexaadka bulsho dimuqraadi ah.",
      en: "Safeguarding the rule of law is the cornerstone of a democratic society."
    }
  }
];

// Helper to make SVG placeholder for newly added advanced words
function makeAdvancedSvg(word) {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="word-svg-icon"><circle cx="50" cy="50" r="44" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/><text x="50" y="58" font-size="28" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">NL</text></svg>`;
}

// Add SVG and id to new words
c1Words.forEach((w, i) => {
  w.id = `w_c1_${i + 1}`;
  w.article = w.word.startsWith("de ") ? "de" : "het";
  w.base_word = w.word.replace(/^(de|het)\s+/, "");
  w.svg = makeAdvancedSvg(w.word);
  words.push(w);
});

c2Words.forEach((w, i) => {
  w.id = `w_c2_${i + 1}`;
  w.article = w.word.startsWith("de ") ? "de" : "het";
  w.base_word = w.word.replace(/^(de|het)\s+/, "");
  w.svg = makeAdvancedSvg(w.word);
  words.push(w);
});

console.log(`Words now total: ${words.length}`);
const finalCounts = {};
words.forEach(w => finalCounts[w.level] = (finalCounts[w.level] || 0) + 1);
console.log("Final level distribution:", finalCounts);

fs.writeFileSync(wordsFile, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(wordsJsFile, 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n', 'utf8');
console.log("Saved words.json and words.js successfully!");
