const fs = require('fs');
const path = require('path');

const sentences = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/sentences.json'), 'utf8'));
const existing = new Set(sentences.map(s => s.dutch.toLowerCase().trim()));

const more = [
  ["basis", "Wonen", "De sleutel van de berging hangt aan het haakje in de gang.", "مفتاح غرفة التخزين معلق على الخطاف في الممر.", "መፍትሕ መኽዘን ኣብቲ ኣብ መተሓላለፊ ዘሎ መንጠልጠሊ ተሰቒሉ ኣሎ።", "Furtuun kuusaa karra manaa irratti fannifameera.", "The key to the storage room hangs on the hook in the hallway."],
  ["basis", "Wonen", "We maken samen een lekker ontbijt op zondagochtend.", "نحن نحضر معاً وجبة إفطار لذيذة صباح يوم الأحد.", "ሰንበት ንግሆ ሓቢርና ጥዑም ቁርሲ ንሰርሕ ኣለና።", "Dilbata ganama ciree mi'aawaa waliin qopheessina.", "We make a delicious breakfast together on Sunday morning."],
  ["basis", "Winkelen", "Vergeet niet om appelsap en bruiswater mee te nemen.", "لا تنس أن تأخذ عصير التفاح والمياه الغازية معك.", "ናይ ቱፋሕ ጽማቕን ጋዝ ዘለዎ ማይን ምውሳድ ኣይትረስዕ።", "Bishaan lallaafoo fi burtukaana fudhachuu hin dagatin.", "Do not forget to pick up apple juice and sparkling water."],
  ["basis", "Gezondheid", "Het is verstandig om dagelijks vers fruit en groenten te eten.", "من الحكمة والصحي تناول الفواكه والخضروات الطازجة يومياً.", "ኩሉ መዓልቲ ሓድሽ ፍረታትን ኣሕምልትን ምብላዕ ጥበባዊ እዩ።", "Guyyaa hunda muduraafi fuduraa haaraa nyaachuun gaariidha.", "It is sensible to eat fresh fruit and vegetables daily."],
  ["basis", "Vervoer", "De stoptrein naar Gouda vertrekt over precies vier minuten.", "القطار المحلي إلى خاودا يغادر بعد أربع دقائق بالضبط.", "እቲ ናብ ጎውዳ ዝኸይድ ባቡር ድሕሪ ኣርባዕተ ደቒቕ ይነቅል።", "Baaburri gara Gouda daqiiqaa afur booda ka'a.", "The local train to Gouda leaves in exactly four minutes."],
  ["basis", "School", "Mijn dochter heeft haar gymspullen netjes in haar tas gedaan.", "وضعت ابنتي أغراض الرياضة بنظام وترتيب في حقيبتها.", "ጓለይ ናይ ስፖርት ኣቑሑታ ብስርዓት ኣብ ቦርሳኣ ኣእትያቶ ኣላ።", "Intalli koo meeshaa ispoortii koorojoo ishee keessa keesse.", "My daughter put her gym gear neatly in her bag."],
  ["basis", "Familie", "We gaan vanmiddag op bezoek bij onze oom en tante.", "سنذهب بعد ظهر اليوم لزيارة عمنا وعمتنا في منزلهم.", "ሎሚ ድሕሪ ቐትሪ ንሓወቦናን ንኣሞናን ክንበጽሖም ክንከይድ ኢና።", "Har'a waaree booda wasiilaafi adaadaa keenya daawwanna.", "We are visiting our uncle and aunt this afternoon."],
  ["basis", "Begroeting", "Hartelijk dank voor de gastvrijheid en tot ziens!", "شكراً جزيلاً لك على حسن الضيافة وإلى اللقاء القريب!", "ስለቲ ዝገበርኩምልና ምዉቕ ኣቀባብላ ኣዝየ የቐንየለይ፡ ደሓን ኩኑ!", "Keessummeessuu keessaniif baay'ee galatoomaa, walgarra!", "Thank you very much for the hospitality and goodbye!"],
  ["gevorderd", "Werk", "Tijdens de toolboxmeeting bespreken we veiligheid op de werkplek.", "خلال اجتماع السلامة الدوري نناقش إجراءات الأمان في موقع العمل.", "ኣብ ናይ ድሕንነት ኣኼባ ብዛዕባ ድሕንነት ስራሕ ንመያየጥ ኣለና።", "Walga'ii nageenyaa irratti nageenya bakka hojii mari'anna.", "During the toolbox meeting we discuss workplace safety."],
  ["gevorderd", "Werk", "Ik heb mijn leidinggevende gevraagd om een referentie voor mijn sollicitatie.", "طلبت من مديري المباشر كتابة خطاب توصية رسمي لتقديمي للوظيفة.", "ንሓላፊየይ ንናይ ስራሕ መመልከቲ ዝኸውን ናይ ምስክርነት ደብዳበ ሓቲተዮ ኣለኹ።", "Geggeessaa koo xalayaa ragaa hojii gaafadheera.", "I asked my manager for a reference for my job application."],
  ["gevorderd", "Financiën", "U kunt huurtoeslag met terugwerkende kracht aanvragen tot één september.", "يمكنك التقدم بطلب للحصول على بدل الإيجار بأثر رجعي حتى الأول من سبتمبر.", "ናይ ገዛ ክራይ ደገፍ ክሳብ ሓደ መስከረም ናይ ዝሓለፈ ግዜ ክትሓትት ትኽእል ኢኻ።", "Kireeffannaa mana mootummaa Fulbaana tokko dura deebiftanii gaafachuu dandeessu.", "You can apply for rent allowance retroactively until the first of September."],
  ["gevorderd", "Zorg", "De huisarts verwees mij door naar een gespecialiseerde kniearts.", "أحالني طبيب الأسرة مباشرة إلى طبيب عظام متخصص في علاج الركبة.", "ሓኪም ስድራቤት ናብ ናይ ብርኪ ስፔሻሊስት ሓኪም መሪሑኒ ኣሎ።", "Dooqtoorri maatii gara ogeessa jilbaatti na erge.", "The GP referred me to a specialist knee doctor."],
  ["gevorderd", "Wonen", "De verhuurder moet zorgen voor een goed werkende mechanische ventilatie.", "يلتزم مالك العقار بتوفير نظام تهوية ميكانيكي يعمل بكفاءة في الشقة.", "እቲ ኣካራዪ ጽቡቕ ዝሰርሕ ናይ ኣየር መዘወሪ ናይ ምቕራብ ሓላፍነት ኣለዎ።", "Abbaan manaa meeshaa qilleensa naannessu sirreessuuf itti gaafatamummaa qaba.", "The landlord must ensure properly functioning mechanical ventilation."],
  ["gevorderd", "Gemeente", "U kunt bij verlies van uw paspoort direct online een melding maken.", "يمكنك في حال فقدان جواز سفرك تقديم بلاغ رسمي فوراً عبر الإنترنت.", "ፓስፖርትካ እንተጠፊኡካ ብቐጥታ ኣብ ኢንተርኔት ሓበሬታ ክትህብ ትኽእል ኢኻ።", "Paaspoortiin yoo bade battalumatti toora irratti beeksisuu dandeessu.", "If you lose your passport, you can report it directly online."],
  ["gevorderd", "School", "Tijdens de schoolvakanties organiseert de gemeente leuke sportactiviteiten.", "تنظم البلدية أنشطة رياضية وترفيهية ممتعة للأطفال خلال العطلات المدرسية.", "ኣብ ናይ ቤት ትምህርቲ ዕረፍቲ፡ ማዘጋጃ ቤት ደስ ዝብሉ ናይ ስፖርት ንጥፈታት ተዳልው።", "Baqonnaa mana barumsaatti mootummaan naannoo tapha ispoortii qopheessa.", "During school holidays the municipality organizes fun sports activities."],
  ["moeilijk", "Bestuursrecht", "Een bezwaarschrift kan wegens kennelijke niet-ontvankelijkheid zonder horen worden afgewezen.", "يجوز رفض الاعتراض دون جلسة استماع بسبب عدم القبول الشكلي الواضح والصريح.", "ናይ ተቓውሞ ደብዳበ ቅቡልነት ብዘይምርካቡ ብዘይ ስምዒት ክውድቕ ይኽእል እዩ።", "Iyyannoon seeraan ala ta'uu isaatiin dhaggeeffannaa malee kuffifamuu danda'a.", "An objection may be rejected without a hearing due to manifest inadmissibility."],
  ["moeilijk", "Arbeidsrecht", "Het concurrentiebeding mag de werknemer niet onbillijk belemmeren in zijn arbeidsmarktpositie.", "يحظر أن يمنع شرط عدم المنافسة الموظف بشكل غير عادل من إيجاد عمل ملائم.", "ናይ ተወዳዳርነት ደንቢ ንሰራሕተኛ ኣብ ናይ ስራሕ ዕዳጋ ብዘይፍትሓዊ መገዲ ክዓግቶ የብሉን።", "Waliigalteen dorgommii dhowwu hojjetaa haala hin taaneen miidhuu hin qabu.", "The non-compete clause must not unfairly impede the employee in their labor market position."],
  ["moeilijk", "Belasting", "Bij box drie wordt het werkelijke rendement vanaf toekomstige belastingjaren belast.", "ستخضع العوائد الاستثمارية الحقيقية للضريبة في الصندوق الثالث اعتباراً من الأعوام القادمة.", "ኣብ ቦክስ ሰለስተ ካብ ዝመጽእ ናይ ግብሪ ዓመታት ጀሚሩ እቲ ሓቀኛ መኽሰብ ግብሪ ክኽፈለሉ እዩ።", "Galii dhugaa qabeenya irraa argamu irratti gara fuulduraatti gibirri kaffalama.", "In box three, actual yields will be taxed starting in future tax years."],
  ["moeilijk", "Huisvesting", "De verhuurder mag bij aanvang van de huur ten hoogste twee maanden kale huur als borgsom vragen.", "لا يجوز للمؤجر عند بدء عقد الإيجار طلب أكثر من إيجار شهرين مجردين كوديعة تأمين.", "ኣካራዪ ኣብ መጀመርታ ናይ ክራይ ውዕል ካብ ናይ ክልተ ወርሒ ክራይ ንላዕሊ ውሕስነት ክሓትት ኣይፍቀደሉን እዩ።", "Abbaan manaa kaffaltii qabsiisaa ji'a lamaa caalaa gaafachuu hin danda'u.", "The landlord may request a security deposit of at most two months basic rent at commencement of tenancy."],
  ["moeilijk", "Maatschappij", "Het Handvest van de Grondrechten van de Europese Unie waarborgt menselijke waardigheid en vrijheid.", "يضمن ميثاق الحقوق الأساسية للاتحاد الأوروبي صون الكرامة الإنسانية والحرية الفردية.", "ናይ ኤውሮጳ ሕብረት ናይ መሰረታዊ መሰላት ቻርተር ናይ ሰብኣዊ ክብሪን ናጽነትን የረጋግጽ።", "Waliigalteen mirga bu'uuraa Awurooppaa ulfina namoomaafi bilisummaa eega.", "The Charter of Fundamental Rights of the European Union safeguards human dignity and freedom."]
];

more.forEach(item => {
  if (!existing.has(item[2].toLowerCase().trim())) {
    sentences.push({
      id: `sent_${item[0]}_${String(sentences.length + 1).padStart(3, "0")}`,
      level: item[0],
      topic: item[1],
      dutch: item[2].trim(),
      translations: {
        ar: item[3].trim(),
        ti: item[4].trim(),
        om: item[5].trim(),
        en: item[6].trim()
      }
    });
    existing.add(item[2].toLowerCase().trim());
  }
});

const levelCounters = { basis: 0, gevorderd: 0, moeilijk: 0 };
sentences.forEach(s => {
  levelCounters[s.level] = (levelCounters[s.level] || 0) + 1;
  s.id = `sent_${s.level}_${String(levelCounters[s.level]).padStart(3, "0")}`;
  s.dutch = s.dutch.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, "").trim();
});

console.log("Updated sentences count:", sentences.length);
fs.writeFileSync(path.join(__dirname, "../data/sentences.json"), JSON.stringify(sentences, null, 2), "utf8");
fs.writeFileSync(path.join(__dirname, "../data/sentences.js"), "window.TAALVRIEND_SENTENCES = " + JSON.stringify(sentences, null, 2) + ";\n", "utf8");
console.log("Successfully written sentences JSON and JS!");
