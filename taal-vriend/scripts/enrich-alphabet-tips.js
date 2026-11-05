const fs = require('fs');
const path = require('path');

const alphabetJsonPath = path.join(__dirname, '../data/alphabet.json');
const alphabetJsPath = path.join(__dirname, '../data/alphabet.js');

const alphabet = JSON.parse(fs.readFileSync(alphabetJsonPath, 'utf8'));

const tipTranslations = {
  "klank-aa": {
    ar: "افتح فمك بشكل واسع مع إرخاء اللسان. يشبه حرف الألف الممدود كما في 'vader'.",
    so: "Afka si ballaaran u fur, carrabkuna ha nasto. Waxay u dhawaaqdaa sida 'aa' oo dheer.",
    ti: "ኣፍካ ብሰፊሑ ክፈት፡ መልሓስካ ኣዕርፍ። ከም ነዊሕ 'aa' ይድመጽ።",
    om: "Afaan bal\'isii banii, arraba qabbaneessi. Akka 'aa' dheeraatti sagaleeffama.",
    en: "Open your mouth wide, relax the tongue. Sounds like the long 'a' in 'father'."
  },
  "klank-ee": {
    ar: "اسحب زاويتي الفم جانباً كأنك تبتسم، مع رفع اللسان إلى مقدمة الفم.",
    so: "Dhinacyada bushimaha dib u jiid adoo dhoolla-caddaynaya, carrabkana kor u qaad.",
    ti: "ከም ፍሽኽታ ኩርናዓት ከናፍርካ ናብ ጎኒ ስሓቦም፡ መልሓስካ ድማ ንላዕሊ ኣልዕሎ።",
    om: "Qarqara afaanii gamaatti diriirsi akka nama seequutti, arraba ol qabi.",
    en: "Pull the corners of your mouth back (smile), tongue high in the front."
  },
  "klank-oo": {
    ar: "ضم شفتيك بقوة على شكل دائرة، مع إصدار الصوت من مؤخرة الحلق.",
    so: "Bushimahaaga si adag goobaabin uga dhig, codkuna dhuunta xaggeeda dambe ha ka yimaado.",
    ti: "ከናፍርካ ብጽኑዕ ክቢ ግበሮም፡ ካብ ድሕሪት ጎረሮኻ ድማ ድመጾ።",
    om: "Hidhii kee akka geengoo taasisii qabi, sagaleen qoonqoo keessaa ha ba\'u.",
    en: "Round your lips firmly into a circle, sounding from the back of the throat."
  },
  "klank-uu": {
    ar: "ضم شفتيك كما تنطق الواو 'oe'، ولكن حاول نطق الياء 'ie' في نفس الوقت!",
    so: "Bushimaha u soo taag sida adoo dhihi raba 'oe', laakiin isku day inaad tiraahdo 'ie'!",
    ti: "ከናፍርካ ከም 'oe' ንቕድሚት ግበሮም፡ ግን 'ie' ንምባል ፈትን!",
    om: "Hidhii kee akka 'oe' gara fuulduraatti buti, garuu 'ie' jechuuf yaali!",
    en: "Pucker your lips for an 'oo', but try to say 'ee' at the same time!"
  },
  "klank-ie": {
    ar: "ابتسامة عريضة، الشفاه مفرودة ومسترخية، واللسان يلامس الأسنان العلوية.",
    so: "Dhoolla-caddayn dheer, bushimaha fidsan, carrabkuna taabanayo ilkaha sare.",
    ti: "ነዊሕ ፍሽኽታ፡ ዝተዘርግሐ ከናፍር፡ መልሓስካ ምስ ላዕለዎት ኣስنانካ ይተሓሓዝ።",
    om: "Seeqisa dheeraa, hidhiin diriiree, arrabni ilkaan gubbaa tuqa.",
    en: "Long smile, lips relaxed and flat, tongue close to upper front teeth."
  },
  "klank-oe": {
    ar: "مد شفتيك للأمام على شكل دائرة صغيرة. مثل الواو في كلمة 'koe'.",
    so: "Bushimaha hore u soo taag sida goobaabin yar. Sida 'oe' ee 'koe'.",
    ti: "ከናፍርካ ከም ንእሽቶ ክቢ ንቕድሚት ኣውጽኣዮም። ከም 'oe' ኣብ 'koe'።",
    om: "Hidhii kee akka geengoo xiqqootti fuulduratti buti.",
    en: "Stick lips forward like a small circle. Sounds like 'oo' in 'shoe'."
  },
  "klank-eu": {
    ar: "شفاه مستديرة، حاول نطق 'ee' بينما تشكل شفتاك شكل الحرف 'o'.",
    so: "Bushimo wareegsan, dheh 'ee' inta bushimahaagu samaynayaan 'o'.",
    ti: "ክቢ ከናፍር፡ ከናፍርካ 'o' እናሰርሑ 'ee' በል።",
    om: "Hidhiin geengoo ta\'ee, otuu hidhiin 'o' tolchu 'ee' jedhi.",
    en: "Rounded lips; pronounce 'ay' while your lips form an 'o'."
  },
  "klank-ui": {
    ar: "ابدأ بفم مسترخٍ ('uh') ثم انزلق بسلاسة نحو صوت الياء ('ie').",
    so: "Ku bilow af dabacsan ('uh') kuna dhammaaw si fudud 'ie'.",
    ti: "ብዝተዛነየ ኣፍ ('uh') ጀምር እሞ ብልስሉስ ናብ 'ie' ሕለፍ።",
    om: "Afaan qabbanaa\'aan jalqabii suuta gara 'ie'tti ce\'i.",
    en: "Start with a relaxed mouth ('uh') and slide smoothly into 'ee'."
  },
  "klank-ei-ij": {
    ar: "لهما نفس النطق تماماً في الهولندية! ابدأ بصوت 'e' وانزلق إلى 'ie'.",
    so: "Isku dhawaaq buuxa ayay ku leeyihiin Af-Hollandeeska! Ku bilow 'e' kuna dhufo 'ie'.",
    ti: "ኣብ ቋንቋ ኔዘርላንድስ ሓደ ዓይነት ድምጺ ኣለዎም! ብ 'e' ጀሚርካ ናብ 'ie' ሕለፍ።",
    om: "Afaan Daajii keessatti sagalee tokkicha qabu! 'e'n jalqabii 'ie'tti ce\'i.",
    en: "Sound exactly the same in Dutch! Start with 'e' and glide to 'ee'."
  },
  "klank-ou-au": {
    ar: "ابدأ بصوت 'o' واستدر بشفتيك نحو 'oe' مثل 'ow' بالإنجليزية.",
    so: "Ku bilow 'o' bushimahana u wareeji dhanka 'oe'.",
    ti: "ብ 'o' ጀምር እሞ ከናፍርካ ናብ 'oe' ዙሮም።",
    om: "'o'n jalqabi hidhii gara 'oe'tti geengessi.",
    en: "Start with 'o' and round your lips toward 'oo' (like 'ow' in 'cow')."
  },
  "klank-ch-sch": {
    ar: "حك الصوت برفق في مؤخرة الحلق كحرف الخاء. وصوت SCH هو سين + خاء.",
    so: "Dhuunta gadaasheeda si tartiib ah ugu xaglo codka 'kh'. SCH waa 's' + 'kh'.",
    ti: "ኣብ ድሕሪት ጎረሮኻ ብልስሉስ ሕኸኽ፡ ከም 'ኸ'። SCH ድማ 's' + 'ch' እዩ።",
    om: "Qoonqoo keessa suuta sagaleessi. SCH jechuun 's' + 'ch' dha.",
    en: "Gently scrape at the back of the throat. SCH is 's' followed by 'ch'."
  },
  "klank-ng-nk": {
    ar: "مؤخرة اللسان تغلق مجرى الحلق ويخرج الهواء عبر الأنف (صوت أنفي).",
    so: "Qeybta dambe ee carrabka ayaa xirta dhuunta, hawaduna waxay ka baxaysaa sanka.",
    ti: "ድሕሪት መልሓስካ ንጎረሮ ይዓጽዎ፡ ኣየር ድማ ብኣፍንጫ ይወጽእ።",
    om: "Dukki arrabaa qoonqoo cufa, qilleensi funyaan keessa baha.",
    en: "Back of the tongue closes against the soft palate; air flows through the nose."
  },
  "letter-a": {
    ar: "الحرف الأول. ينطق قصيراً في 'appel' وطويلاً في 'tafel'.",
    so: "Xarafka koowaad. Gaaban 'appel' iyo dheer 'tafel'.",
    ti: "ቀዳማይ ፊደል። ሓጺር ኣብ 'appel'፡ ነዊሕ ኣብ 'tafel' ይድመጽ።",
    om: "Qubee jalqabaa. Gabaabaa 'appel' fi dheeraa 'tafel' keessatti.",
    en: "The first letter. Short in 'appel' and long in 'tafel'."
  },
  "letter-b": {
    ar: "أطبق الشفتين معاً ثم افتحهما بصوت انفجاري كالباء العربية.",
    so: "Labada bushimmood isku qabo ka dibna fur adoo samaynaya dhawaaq 'b'.",
    ti: "ክልቲኦም ከናፍርካ ዕጸዎም እሞ ብፍንጀላዊ ድምጺ ክፈቶም።",
    om: "Hidhoota lamaan walitti qabiitii bansi.",
    en: "Close both lips and release with a gentle burst of air."
  },
  "letter-c": {
    ar: "تنطق كالسين أمام e و i (مثل cent) وكالكاف أمام a و o و u (مثل computer).",
    so: "Waxay u dhawaaqdaa 's' marka ay ka horreyso e/i, iyo 'k' marka ay ka horreyso a/o/u.",
    ti: "ቅድሚ e/i ከም 's' ይድመጽ፡ ቅድሚ a/o/u ከም 'k' ይድመጽ።",
    om: "Dura e/i yoo dhufu akka 's'tti, dura a/o/u yoo dhufu akka 'k'tti sagaleeffama.",
    en: "Sounds like 's' before e/i (cent), and like 'k' before a/o/u (computer)."
  },
  "letter-d": {
    ar: "طرف اللسان على منبت الأسنان العلوية. وفي نهاية الكلمة تنطق 't' تماماً!",
    so: "Caarada carrabka oo taabanaysa ciridka sare. Dhamaadka erayga waxay noqotaa 't'!",
    ti: "ጫፍ መልሓስካ ምስ ላዕለዋይ ድድኻ ይተሓሓዝ። ኣብ መወዳእታ ቃል ከም 't' ይድመጽ!",
    om: "Fiixeen arrabaa ilkaan gubbaa tuqa. Xumura jechaa irratti akka 't'tti sagaleeffama!",
    en: "Tongue tip against upper gum ridge. At word ends, it is pronounced as 't'!"
  },
  "letter-e": {
    ar: "الحرف الأكثر تكراراً بالهولندية. قد ينطق طويلاً 'ee' أو قصيراً 'e' أو كالسكون 'uh'.",
    so: "Xarafka ugu badan ee Dutch-ka. Wuxuu u dhawaaqi karaa 'ee', 'e' ama 'uh'.",
    ti: "እቲ ዝበዝሐ ዝርከብ ፊደል ኣብ ኔዘርላንድስ። 'ee'፡ 'e' ወይ 'uh' ክድመጽ ይኽእል።",
    om: "Qubee baay\'ee beekamaadha. 'ee', 'e' yookaan 'uh' ta\'ee sagaleeffamuu danda\'a.",
    en: "The most frequent Dutch letter. Can sound like 'ay', short 'e', or schwa ('uh')."
  },
  "letter-f": {
    ar: "الأسنان العلوية تلامس الشفة السفلية برفق مع نفخ الهواء للخارج.",
    so: "Ilkaha sare oo si tartiib ah u taabanaya bushimta hoose, dabadeed hawo soo afuuf.",
    ti: "ላዕለዎት ኣስናንካ ኣብ ታሕተዋይ ከናፍርካ ብምግባር ኣየር ብሓይሊ ኣውጽእ።",
    om: "Ilkaan gubbaa hidhii gadii irratti qabiitii qilleensa baasi.",
    en: "Upper teeth lightly touching lower lip, blow air through."
  },
  "letter-g": {
    ar: "صوت الحلق الهولندي الشهير (مثل حرف الخاء أو الغين العربي).",
    so: "Codka dhuunta caanka ah ee Dutch-ka. Ka dhawaaji dhuunta adoo hawo xooggan marinaya.",
    ti: "ፍሉጥ ናይ ጎረሮ ድምጺ ኔዘርላንድስ። ኣብ ድሕሪት ጎረሮኻ ብኣየር ሕኸኽ።",
    om: "Sagalee qoonqoo beekamaa Daajii. Qoonqoo keessaa hawwisii baasi.",
    en: "Famous Dutch guttural throat sound; friction in the back of the throat."
  },
  "letter-h": {
    ar: "أخرج زفيراً قوياً من الرئتين مع فتح الفم (كالهاء تماماً).",
    so: "Hawo xooggan ka soo saar sambabada adoo afka furan.",
    ti: "ኣፍካ ኸፊትካ ካብ ሳምቡእኻ ብሓይሊ ኣስተንፍስ።",
    om: "Afaan bantaa somba keessaa qilleensa baasi.",
    en: "Exhale forcefully from the lungs with open mouth (like 'h' in 'hat')."
  },
  "letter-i": {
    ar: "قصير وقوي في 'vis'، ويكون طويلاً عند اقترانه مع 'e' ككلمة 'fiets'.",
    so: "Gaaban oo adag 'vis', dheerna marka ay la socoto 'e' (fiets).",
    ti: "ሓጺርን ሓያልን ኣብ 'vis'፡ ነዊሕ ምስ 'e' ክኸውን ከሎ (fiets)።",
    om: "Gabaabaa 'vis' keessatti, yoo 'e' wajjin dhufe dheeraadha (fiets).",
    en: "Short and crisp in 'vis', long vowel when paired with 'e' (fiets)."
  },
  "letter-j": {
    ar: "ينطق كحرف الياء في 'yes' وينساب بسلاسة في الحرف التالي.",
    so: "Wuxuu u dhawaaqaa sida 'y' ee 'yes', wuxuuna si fiican ugu darsamaa xarafka xiga.",
    ti: "ከም 'y' ኣብ 'yes' ይድመጽ፡ ናብቲ ዝቕጽል ፊደል ድማ ብቕልጡፍ ይሕወስ።",
    om: "Akka 'y'tti sagaleeffama, gara qubee itti aanutti suuta ce\'a.",
    en: "Sounds like the English 'y' in 'yes', gliding smoothly into next vowel."
  },
  "letter-k": {
    ar: "صوت انفجاري حاد في سقف الحلق الخلفي (كحرف الكاف).",
    so: "Cod 'k' ah oo afka salka sare kaga dhaca.",
    ti: "ኣብ ላዕለዋይ ውሽጢ ኣፍካ ዝፍጠር ሓያል ናይ 'k' ድምጺ።",
    om: "Sagalee 'k' cimaa ta\'ee keessa afaaniitii ba\'u.",
    en: "Sharp plosive against the soft palate (like 'k' in 'kite')."
  },
  "letter-l": {
    ar: "طرف اللسان يلامس منبت الأسنان العلوية برفق مع اهتزاز الأوتار الصوتية.",
    so: "Caarada carrabka oo ku dhegta ilkaha sare, codkuna dhuunta ka guuxayo.",
    ti: "ጫፍ መልሓስካ ምስ ድድኻ ይተሓሓዝ፡ ድምጺ ይንብድባድ።",
    om: "Fiixeen arrabaa ilkaan gubbaa tuqa, sagaleen ni hollata.",
    en: "Tongue tip touches the upper gum ridge, voiced."
  },
  "letter-m": {
    ar: "أطبق الشفتين معاً تماماً، ويخرج رنين الصوت عبر الأنف (كالميم).",
    so: "Bushimaha oo isku qabta, codkuna sanka ka soo baxayo.",
    ti: "ከናፍርካ ብጽኑዕ ዕጸዎም፡ ድምጺ ብኣፍንጫ ይርዕድ።",
    om: "Hidhii walitti qabi, sagaleen funyaan keessaan baha.",
    en: "Lips closed together, sound resonates through the nose."
  },
  "letter-n": {
    ar: "طرف اللسان يلامس سقف الحلق العلوى، والهواء يمر عبر الأنف (كالنون).",
    so: "Caarada carrabka oo taabanaysa saqafka afka, hawaduna sanka ka marayso.",
    ti: "ጫፍ መልሓስካ ኣብ ናሕሲ ኣፍካ ይጣበቕ፡ ኣየር ብኣፍንጫ ይወጽእ።",
    om: "Fiixeen arrabaa gubbaa afaanii tuqa, qilleensi funyaan keessaan baha.",
    en: "Tongue tip against upper ridge, air flows through the nose."
  },
  "letter-o": {
    ar: "قصير في 'kop' وطويل في 'rood'. ضم الشفتين على شكل دائري.",
    so: "Gaaban 'kop', dheerna 'rood'. Bushimaha goobaabin ka dhig.",
    ti: "ሓጺር ኣብ 'kop'፡ ነዊሕ ኣብ 'rood'። ከናፍርካ ክቢ ግበሮም።",
    om: "Gabaabaa 'kop', dheeraa 'rood'. Hidhii geengessi.",
    en: "Short in 'kop', long in 'rood'. Round your lips."
  },
  "letter-p": {
    ar: "صوت انفجاري سريع بالشفتين بدون اهتزاز الأوتار الصوتية (P غير مهموسة).",
    so: "Cod 'p' degdeg ah oo labada bushimmood ka dhasha.",
    ti: "ብኽልቲኦም ከናፍርካ ዝፍጠር ሓጺር ናይ ፍንጀላ ድምጺ 'p'።",
    om: "Hidhoota lamaaniin sagalee 'p' gabaabaa uumi.",
    en: "Crisp voiceless puff of air made with both lips."
  },
  "letter-q": {
    ar: "يأتي دائماً تقريباً متبوعاً بحرف 'u' وينطقان معاً 'kw'.",
    so: "Had iyo jeer wuxuu la socdaa 'u' wuxuuna u dhawaaqaa 'kw'.",
    ti: "ዳርጋ ኩሉ ግዜ ምስ 'u' ይመጽእ እሞ 'kw' ተባሂሉ ይድመጽ።",
    om: "Yeroo baay\'ee 'u' wajjin dhufa, akka 'kw'tti sagaleeffama.",
    en: "Almost always followed by 'u' (pronounced together as 'kw')."
  },
  "letter-r": {
    ar: "ينطق إما برنين اللهاة في مؤخرة الحلق أو بتدحرج طرف اللسان.",
    so: "Waxaa loogu dhawaaqaa dhuunta ama carrabka oo ruxma.",
    ti: "ኣብ ድሕሪት ጎረሮ ብልስሉስ ይድመጽ ወይ ብጫፍ መልሓስካ ይንቀጥቀጥ።",
    om: "Qoonqoo keessatti yookaan arraba sochoosuun sagaleeffama.",
    en: "Uvular French/German style in throat or rolled with tongue tip."
  },
  "letter-s": {
    ar: "صوت صفير واضح بين طرف اللسان والأسنان الأمامية (كالسين).",
    so: "Cod firiiriq ah oo ka dhasha carrabka iyo ilkaha dhexdooda.",
    ti: "ኣብ መንጎ ጫፍ መልሓስካን ኣስናንካን ዝፍጠር ፊሽካ መሰል ድምጺ 's'።",
    om: "Arraba fi ilkaan gidduutti sagalee 's' baasi.",
    en: "Hissing sound between tongue tip and upper front teeth."
  },
  "letter-t": {
    ar: "اضغط بطرف اللسان بقوة على منبت الأسنان الأمامية ثم اتركه فجأة.",
    so: "Caarada carrabka ku qabo ilkaha hore ka dibna si xoog leh u sii daa.",
    ti: "ጫፍ መልሓስካ ኣብ ቀዳሞት ኣስናንካ ብሓይሊ ኣጣብቆ።",
    om: "Fiixee arrabaa ilkaan fuulduraa irratti cimsii qabi.",
    en: "Press tongue tip firmly against front teeth and release crisply."
  },
  "letter-u": {
    ar: "قصير في 'bus' وطويل في 'uur'. ضم شفتيك بإحكام للأمام.",
    so: "Gaaban 'bus', dheerna 'uur'. Bushimaha aad hore ugu soo taag.",
    ti: "ሓጺር ኣብ 'bus'፡ ነዊሕ ኣብ 'uur'። ከናፍርካ ጽኑዕ ክቢ ግበሮም።",
    om: "Gabaabaa 'bus', dheeraa 'uur'. Hidhii cimsii geengessi.",
    en: "Short in 'bus', long in 'uur'. Tightly round your lips forward."
  },
  "letter-v": {
    ar: "صوت ناعم، الأسنان العلوية تلامس الشفة السفلية مع اهتزاز مسموع.",
    so: "Cod jilicsan, ilkaha sare oo taabanaya bushimta hoose oo leh gariir.",
    ti: "ልስሉስ ድምጺ፡ ላዕለዎት ኣስናንካ ንታሕተዋይ ከናፍርካ ብምንብድባድ ይትንክፉ።",
    om: "Sagalee lallaafaa, ilkaan gubbaa hidhii gadii tuqee hollata.",
    en: "Voiced, gentle buzzing between upper teeth and lower lip."
  },
  "letter-w": {
    ar: "مميز للهولندية: الشفة السفلية تلامس حافة الأسنان العلوية بلمسة خفيفة جداً.",
    so: "Kala duwan Af-Hollandeeska: bushimta hoose waxay si aad u fudud u taabataa ilkaha sare.",
    ti: "ፍሉይ ናይ ኔዘርላንድስ፡ ታሕተዋይ ከናፍርካ ንላዕለዎት ኣስናንካ ብቐሊሉ ይትንክፍ።",
    om: "Daajii keessatti addadha: hidhiin gadii ilkaan gubbaa salphaatti tuqa.",
    en: "Dutch characteristic: lower lip very lightly brushes upper front teeth."
  },
  "letter-x": {
    ar: "تركيب صوتي يجمع بين الكاف والسين ('ks').",
    so: "Isku-darka codadka 'k' iyo 's' ('ks').",
    ti: "ሕውስዋስ ናይ 'k'ን 's'ን ድምጺ ('ks')።",
    om: "Walitti makiinsa sagalee 'k' fi 's' ('ks').",
    en: "Compound sound of 'k' followed directly by 's'."
  },
  "letter-y": {
    ar: "يسمى 'IJ اليونانية'. ينطق كالياء الممدودة في 'baby' أو ياء في 'yoghurt'.",
    so: "Waxaa badanaa loogu yeeraa 'Griekse ij'. Wuxuu u dhawaaqaa 'ie' ama 'j'.",
    ti: "መብዛሕትኡ ግዜ 'Griekse ij' ይበሃል። ከም 'ie' (baby) ወይ 'j' (yoghurt) ይድመጽ።",
    om: "'Griekse ij' jedhama. Akka 'ie' yookaan 'j'tti sagaleeffama.",
    en: "Often called 'Greek ij'. Sounds like 'ee' (baby) or 'y' (yoghurt)."
  },
  "letter-z": {
    ar: "صوت الزاي، اهتزاز مسموع للأوتار الصوتية يشبه طنين النحلة.",
    so: "Cod 'z' oo gariiraya, sida dhawaaqa shinnida.",
    ti: "ከም ድምጺ ንህቢ ዝንብድባድ ናይ 'z' ድምጺ።",
    om: "Akka sagalee nindiitti hollannaa 'z' uumi.",
    en: "Voiced buzzing 's', like the buzz of a bee."
  }
};

let enriched = 0;
alphabet.forEach(item => {
  if (tipTranslations[item.id]) {
    item.tip_translations = tipTranslations[item.id];
    enriched++;
  }
});

console.log(`Enriched ${enriched} alphabet items with tip translations!`);

fs.writeFileSync(alphabetJsonPath, JSON.stringify(alphabet, null, 2), 'utf8');
fs.writeFileSync(alphabetJsPath, 'window.TAALVRIEND_ALPHABET = ' + JSON.stringify(alphabet, null, 2) + ';\n', 'utf8');
console.log('Successfully updated alphabet.json and alphabet.js!');
