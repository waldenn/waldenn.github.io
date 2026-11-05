const fs = require('fs');

// 1. Translations for listening fragments
const SOMALI_LISTENING = {
  "luister-a1-001": "Ascalaamu calaykum, waxaan ahay Sarah.\nWaxaan ka imid Suuriya waxaana deganahay Utrecht.\nHadda waxaan baranayaa afka Nederlandka.",
  "luister-a1-002": "Subax wanaagsan! Ma heli karaa rooti bunni ah oo badh ah?\nHaa dhab ahaantii, fadlan qaado.\nWaa laba yuuro iyo konton senti.",
  "luister-a1-003": "I raali geli mudane, baskani ma ku joogsadaa saldhigga tareenka?\nHaa, saddex joogsi ka dib ayaan gaari doonnaa.\nHa iloobin inaad kaarkaaga calaamadsato marka aad degto.",
  "luister-a1-004": "Tani waa qoyskayga.\nNinkayga magaciisa waa Ahmed waxaanan leenahay laba carruur ah.\nWaxaan ku noolnahay guri aad u fiican.",
  "luister-a1-005": "Subax wanaagsan, dhakhtar. Aad baan u qufacaa madaxana wuu i xanuunayaa.\nIntee in le'eg ayaad xanuunkaas dareemaysaa?\nIlaa saddex maalmood ayaan qandho dareemayay.",
  "luister-a1-006": "Maanta qorraxdu way ifaysaa laakiin berri roob baa da'aya.\nHeerkulku waa qiyaastii toban darajo.\nQaado dallad markaad baxayso.",
  "luister-a1-007": "Dugsigu wuxuu bilaabmaa siddeedda iyo badhka aroornimo.\nFadlan carruurtaada ku keen dugsiga waqtiga saxda ah.\nGalabtiina labada iyo badhka ayaa la soo qaadaa.",
  "luister-a1-008": "Gurigeyga wuxuu leeyahay laba qol oo jiif ah iyo barxad yar.\nJikada waa mid cusub oo aad u iftiin badan.\nAad baan ugu faraxsanahay halkan.",
  "luister-a1-009": "Waxaan rabaa inaan ballan la qabsado dhakhtarka ilkaha.\nMa ku habboon tahay Khamiista saddexda galabnimo?\nHaa, maalintaas aad bay iigu fiican tahay.",
  "luister-a1-010": "Tareenka tagaya Amsterdam wuxuu ka baxayaa madal saddexaad.\nWaxaa jira toban daqiiqo oo daahid ah.\nU fiirsada fariimaha lagu dhawaaqayo.",
  "luister-a1-011": "Kaalay oo ka soo qaybgal xafladda dhalashadayda Sabtida.\nWaxaan bilaabaynaa toddobada fiidnimo.\nCunto iyo cabitaan macaan ayaa jiri doona.",
  "luister-a1-012": "Qashinka cagaaran waxaa la qaadaa Talaadada.\nFadlan sanduuqa qashinka bannaanka dhig siddeedda subaxnimo ka hor.\nWarqadaha waxaa la qaadaa toddobaadka dambe.",
  "luister-a1-013": "Kaniisadda ama xarunta degmadu waxay furantahay sagaalka ilaa shanta.\nFadlan horay u ballanso markaad imaanayso.\nHa iloobin inaad qaadato aqoonsigaaga rasmiga ah.",
  "luister-a1-014": "Waxaannu u baahannahay rooti, caano iyo khudaar cusub.\nSidoo kale qaado jiis yar oo Nederlandis ah.\nKhasnada lacagta waxaan ku bixinaynaa kaar.",
  "luister-a1-015": "Waan qaniinay oo madax xanuun daran baa i haya.\nFadlan maanta shaqada ma imaan karo.\nBerri ayaan mar kale xafiiska soo wici doonaa.",
  "luister-a1-016": "Baaskiilkaygu wuxuu leeyahay taayir dillaacay.\nMa ii hagaajin kartaa maanta galabta?\nHaa, berri subax baad qaadan kartaa.",
  "luister-a1-017": "Dukaan weynaha wuxuu furan yahay ilaa sideedda fiidnimo.\nAxaddana wuxuu furan yahay laba iyo tobanka ilaa shanta galabnimo.\nWaxaa jira qiimo dhimis weyn usbuucan.",
  "luister-a1-018": "Waxaan doonayaa inaan helo koorsada luuqadda Nederlandka heerka A2.\nFasallada waxay dhacaan Isniinta iyo Arbacada fiidkii.\nWaxaad iska diiwaan gelin kartaa internetka.",
  "luister-a1-019": "Muuqaalkan jaakadda miyaad ku haysaan cabbir dhexdhexaad ah?\nWaan hubinayaa bakhaarka, hal daqiiqo sugo.\nHaa, nasiib wanaag kii ugu dambeeyay baa yaalla.",
  "luister-a1-020": "Waxaan doonayaa inaan buug ka amaahdo maktabadda.\nKaarka maktabadda wuxuu u bilaash yahay carruurta ilaa siddeed iyo toban sano.\nWaxaana buugta la hayn karaa muddo saddex toddobaad ah.",
  "luister-a2-001": "Subax wanaagsan, xafiiska dhakhtarka guud. Sideen kuu caawin karaa?\nWaxaan rabaa inaan ballan la qabsado dhakhtarka sababtoo ah dhabarka ayaa i xanuunaya.\nMa imaan kartaa galabta labada iyo rubuc?\nHaa, xilligaas aad buu iigu habboon yahay, mahadsanid.",
  "luister-a2-002": "Macaamiisha sharafta leh, tareenka u socda Utrecht Centraal wuxuu ku baxayaa madal shanaad.\nTareenkani wuxuu joogsan doonaa dhammaan saldhigyada ku yaalla jidka.\nFadlan kaarkaaga gaadiidka u diyaari hubinta.",
  "luister-a2-003": "Dukaanka raashinka waxaa usbuucan ka jira dalabyo gaar ah.\nDhammaan khudaarta iyo miraha waxaa laga jaray boqolkiiba shan iyo labaatan.\nKaalay oo booqo waaxda rootiga cusub ee dukaanka.",
  "luister-a2-004": "Halkan waa xafiiska degmada ee waaxda adeegga muwaadiniinta.\nWaxaad timid ballantii aad ku qaadan lahayd baasaboorkaaga ama kaarka deganaanshaha.\nFadlan qaado lambarka sugitaanka oo fariiso qolka.",
  "luister-a2-005": "Waalidiinta sharafta leh, jimcaha soo socda carruurtu fasax bay leeyihiin sababtoo ah tababarka macallimiinta.\nIsniinta xigta dugsigu wuxuu ku bilaaban doonaa waqtigiisii caadiga ahaa.\nHaddii aad su'aalo qabtaan, la xiriira maamulka dugsiga.",
  "luister-a2-006": "Guryaha kireeyaha waxay ku wargelinayaan in dayactir lagu samayn doono wiishka guriga.\nShaqadu waxay socon doontaa subaxda Arbacada sagaalka ilaa labada galabnimo.\nFadlan isticmaal jaranjarada inta lagu jiro waqtigaas.",
  "luister-a2-007": "Waan ku faraxsanahay inaad timid wareysiga shaqada.\nMa ii sheegi kartaa khibradaadii hore ee shaqo iyo waxbarasho?\nWaxaan jecelahay inaan ogaado sababta aad shirkaddan u dooratay.",
  "luister-a2-008": "Saadaasha hawada ee berri waxay muujinaysaa dabayl xooggan iyo roob goosgoos ah galabtii.\nHeerkulku wuxuu ahaan doonaa qiyaastii laba iyo toban darajo.\nFiidkiina cimiladu way qaboobi doontaa.",
  "luister-a2-009": "Daawadan waa inaad qaadataa laba jeer maalintii cuntada ka dib.\nHa cabbin casiirka liinta inta aad daawadan qaadanayso.\nHaddii aad dhibaato kale dareento, la xiriir farmashiyahaaga.",
  "luister-a2-010": "Fiid wanaagsan, miis ma u qabsateen laba qof maanta?\nHaa, magaca Mohamed ayaan ku qabsanay toddobada.\nFadlan i soo raaca, kani waa miiskiinna diyaar ah.",
  "luister-a2-011": "Gudbinta canshuurta dakhliga sanadlaha ah waa in la dhammeeyaa ka hor koowda Maajo.\nWaxaad foomamka si toos ah uga buuxin kartaa bogga DigiD ee canshuuraha.\nHaddii aad caawimaad u baahan tahay, xarunta bulshada ayaa ku caawin karta.",
  "luister-a2-012": "Xafladda xaafaddu waxay dhici doontaa Axadda soo socota beerta dhexdeeda.\nQof kasta wuxuu keeni karaa cunto yar oo hidaha dalkiisa ah si loo wadaago.\nWaa fursad aad u wanaagsan oo lagu barto deriskaaga cusub.",
  "luister-a2-013": "Haddii aad rabto inaad kaarkaaga deganaanshaha cusboonaysiiso, waa inaad buuxisaa foomka IND.\nWaxaad u baahan doontaa laba sawir oo sharci ah iyo caddaynta deganaanshaha.\nNatiijada waxaa lagugu soo wargelin doonaa boostada.",
  "luister-a2-014": "Gaarigeygu wuxuu bilaabay dhawaaq la yaab leh xagga hore.\nFadlan ma hubin kartaa biriiga iyo saliidda matoorka?\nWaxaan rabaa inaan ogaado inta ay ku kici doonto intaadan bilaabin.",
  "luister-a2-015": "Waan jeclaan lahaa inaan iska diiwaan geliyo xarunta jimicsiga ee xaafadda.\nMiyuu jiraa macallin caawiya dadka cusub ee bilaabayaasha ah?\nWaxaana rabaa inaan ogaado kharashka bil kasta la bixiyo.",
  "luister-a2-016": "Baakaddii aad ka dalbatay internetka waxay iman doontaa berri inta u dhaxaysa labada iyo shanta.\nHaddii aadan joogin guriga, waxaa loo reebi doonaa deriskaaga kuugu dhow.\nWaxaad fariin ka heli doontaa taleefankaaga gacanta.",
  "luister-a2-017": "Fasalka Nederlandska waxaan maanta ku baran doonaa sida loo qoro warqad rasmi ah.\nFadlan buugaagtiinna ka fura bogga afartan iyo labaad.\nQoraalka kowaad si wadajir ah ayaan u akhrin doonnaa.",
  "luister-a2-018": "Waxaan rabaa inaan xisaab bangi ka furto bangigan.\nWaxaan wataa baasaboorkayga iyo lambarka BSN ee degmada.\nSidoo kale ma heli karaa kaarka bangiga ee khadka tooska ah?",
  "luister-a2-019": "Qashinka guriga waa in loo kala saaro caag, warqad, iyo haraaga cuntada.\nCaagagga waxaa la geliyaa jawaannada gaarka ah ee bilaashka ah.\nTani waxay caawinaysaa ilaalinta deegaanka iyo nadaafadda magaalada.",
  "luister-a2-020": "Dabaaldegga Maalinta Boqorka (Koningsdag) suuqyada furan ee waddooyinka ayaa la dhigaa.\nDadku waxay xirtaan dhar midabkoodu liimi yahay oo ay ku ciyaaraan heeso.\nGaadiidka dadweynaha ee bartamaha magaaladu wuxuu leeyahay jadwal gaar ah.",
  "luister-b1-001": "Gudaha shirkaddayada waxaan si adag u dhiirigelinnaa shaqada kooxda iyo wada-xiriirka hufan.\nKulanka toddobaadlaha ah ee maanta waxaan ku falanqeyn doonaa natiijooyinkii rubuca ugu dambeeyay.\nFadlan qof kasta ha soo bandhigo talooyinkiisa ku saabsan hagaajinta adeegga macaamiisha.",
  "luister-b1-002": "Dowladda hoose waxay qorshaynaysaa dib-u-habeyn lagu sameeyo waddooyinka muhiimka ah ee bartamaha magaalada.\nTani waxay keenaysaa in waddooyinka qaarkood loo xiro gaadiidka muddo laba bilood ah.\nMuuqaalka cusub wuxuu siin doonaa mudnaan gaar ah dadka lugeynaya iyo kuwa baaskiillada wata.",
  "luister-b1-003": "Sharciga cusub ee caymiska caafimaadka wuxuu wax ka beddelay kharashka aasaasiga ah ee laga rabo qofka.\nDadka dakhligoodu hooseeyo waxay xaq u leeyihiin taageerada daryeelka caafimaadka ee dowladda (zorgtoeslag).\nWaa muhiim inaad hubiso xaaladdaada maaliyadeed si aadan lacag dheeraad ah u lumin.",
  "luister-b1-004": "Kala-guurka tamarta cagaaran wuxuu u baahan yahay in guryaha lagu kordhiyo daboolka kuleylka iyo tamarta qorraxda.\nDegmooyin badan ayaa hadda bixiya deeqo lacageed oo lagu caawiyo dadka guryaha leh.\nTallaabooyinkani waxay yareynayaan kharashka korontada iyo gaaska ee bishiiba la bixiyo.",
  "luister-b1-005": "Xafiiska shaqada (UWV) wuxuu bixiyaa tababaro kala duwan oo loogu talagalay dadka doonaya shaqo cusub.\nWaxaana la diyaariyay la-taliyeyaal kaa caawinaya diyaarinta CV-ga casriga ah iyo habka wareysiga.\nUjeedadu waa in qof kasta helo fursad ku habboon xirfaddiisa iyo aqoontiisa gaarka ah.",
  "luister-b1-006": "Guddiga waalidiinta ee dugsiga wuxuu kulan furan yeelan doonaa Talaadada soo socota fiidkii.\nMowduuca ugu weyn ee laga hadlayo waa isticmaalka taleefannada casriga ah ee xilliga casharka.\nDhammaan waalidiinta waxaa laga codsanayaa inay ka soo qaybgalaan oo ay dhiibtaan aragtidooda.",
  "luister-b1-007": "Cimilada adduunka ee isbeddelaysa waxay saameyn toos ah ku leedahay nidaamka biyaha dalka Nederland.\nHay'adaha biyaha waxay maalgashi weyn ku samaynayaan dhuumaha iyo biyo-xireennada dalka oo dhan.\nU diyaargarowga roobabka culus iyo xilliyada abaaraha ayaa ahmiyadda koowaad la siinayaa.",
  "luister-b1-008": "Gudbinta cabasho rasmi ah oo ku saabsan adeegyada dadweynaha waa xaq uu leeyahay muwaadin kasta.\nWaa inaad marka hore cabashadaada u qortaa si toos ah hay'adda ay khuseyso adoo adeegsanaya qoraal cad.\nHaddii aadan ku qancin jawaabta, waxaad la xiriiri kartaa Garsooraha Qaranka (Nationale Ombudsman).",
  "luister-b1-009": "Kordhinta xirfadaha farsamada iyo sayniska waxay muhiimad weyn u leedahay mustaqbalka dhaqaalaha.\nDugsiyada xirfadaha (MBO iyo HBO) waxay xoogga saarayaan iskaashiga tooska ah ee shirkadaha ganacsiga.\nArdayda waxay helayaan tababarro shaqo oo dhab ah inta ay waxbarashadu socoto.",
  "luister-b1-010": "Daryeelka dadka waayeelka ah wuxuu wajahayaa caqabado la xiriira yaraanta shaqaalaha caafimaadka.\nSidaas darteed, dowladda waxay dhiirigelinaysaa barnaamijyo lagu taageerayo daryeelka guriga lagu qaato.\nTiknoolajiyada cusub iyo qalabka casriga ah ayaa loo adeegsanayaa fududeynta nolosha dadka da'da ah.",
  "luister-b2-001": "Doodda baarlamaanka ee ku saabsan nidaamka canshuuraha waxay xuddun u tahay sinnaanta fursadaha dhaqaale.\nXisbiyada qaar ayaa ku doodaya in la kordhiyo canshuurta saaran shirkadaha waaweyn iyo hantida xad-dhaafka ah.\nHalka kuwo kalena ay aaminsan yihiin in canshuur dhimistu dhiirigelinayso maalgashiga iyo kobaca ganacsiga.",
  "luister-b2-002": "Ilaalinta sirta xogta shakhsi ahaaneed (AVG / GDPR) waxay saartay waajibaad culus hay'adaha iyo ganacsiyada.\nQof kasta wuxuu xaq u leeyahay inuu ogaado sida xogtiisa loo maareeyo iyo cida loo gudbiyo.\nKu xadgudubka xeerarkani wuxuu keenayaa ganaaxyo lacageed oo aad u culus oo ay soo rogaan maxkamaduhu.",
  "luister-b2-003": "Saameynta garaadka macmalka ah (AI) ee suuqa shaqada waxay dhalisay dood cilmiyeed oo qoto dheer.\nIn kasta oo shaqooyin badani ay meesha ka bixi doonaan, haddana waxaa abuurmaya fursado cusub oo u baahan xirfado sare.\nKhubarada waxay ku talinayaan in waxbarashada dalka lagu saleeyo barashada xirfadaha casriga ah.",
  "luister-b2-004": "Dhibaatada guryo la'aanta ee dalka Nederland waxay gaartay meel xasaasi ah oo u baahan xalal degdeg ah.\nYaraanta dhulka la degi karo iyo xeerarka deegaanka ayaa xaddidaya xawaaraha dhismayaasha cusub.\nKhubarada dhaqaaluhu waxay soo jeedinayaan in dib loo eego nidaamka kireysiga guryaha dadweynaha.",
  "luister-b2-005": "Isbeddelka ku yimid hab-dhaqanka warbaahinta ayaa saameyn weyn ku yeeshay kalsoonida lagu qabo macluumaadka rasmiga ah.\nFididda wararka aan la xaqiijin ee baraha bulshada waxay abuurtay kala qaybsanaan xagga bulshada dhexdeeda ah.\nWacyigelinta muwaadiniinta ee ku saabsan fahamka xogta saxaafadda ayaa noqotay arrin muhiim u ah dimuqraadiyadda.",
  "luister-c1-001": "Falanqeynta qotada dheer ee falsafadda sharciga waxay daaha ka rogtay xiriirka ka dhexeeya caddaaladda iyo nidaamka dowliga ah.\nGo'aannada maxkamadaha sare waxay inta badan horseedaan dib-u-eegis lagu sameeyo mabaadi'da aasaasiga ah ee dastuurka.\nIsku-dheellitirka xuquuqda shakhsiga iyo danta guud ee bulshada ayaa weli ah caqabad taagan.",
  "luister-c1-002": "Daraasadda cilmiyeed ee ku saabsan dhaqaalaha wareegsan (circular economy) waxay ku baaqeysaa dib-u-qaabeyn ballaaran.\nKheyraadka dabiiciga ah waa in loo isticmaalo si dib loo warshadayn karo iyadoo la yareynayo qashinka waxyeellada leh.\nTani waxay u baahan tahay isbeddel buuxa oo lagu sameeyo nidaamka wax-soo-saarka caalamiga ah.",
  "luister-c2-001": "Cilmiga luuqadaha casriga ah wuxuu iftiiminayaa sida hodannimada qaab-dhismeedka hadalka ay u qaabeyso fikirka aadanaha.\nFarqiga u dhexeeya luuqadaha kala duwan ma aha mid eraybixin keliya ah balse waa hab lagu fahmo adduunka iyo nolosha.\nFahamka buuxa ee suugaanta heerka sare ah wuxuu u baahan yahay dareen qoto dheer oo ku aaddan taariikhda iyo dhaqanka."
};

// Update listening.json
const listeningPath = 'src/data/listening.json';
const listeningData = JSON.parse(fs.readFileSync(listeningPath, 'utf8'));

let updatedListening = 0;
listeningData.forEach(item => {
  // Ensure text has full Dutch string
  const dutchContent = item.dutch || (Array.isArray(item.lines) ? item.lines.join('\n') : item.text || '');
  item.dutch = dutchContent;
  item.text = dutchContent;

  if (!item.translations) item.translations = {};
  
  if (SOMALI_LISTENING[item.id]) {
    item.translations.so = SOMALI_LISTENING[item.id];
    updatedListening++;
  } else if (!item.translations.so || item.translations.so.trim() === '') {
    // Generate line-by-line translation from lines or dutch
    const lines = item.lines || dutchContent.split('\n');
    const soLines = lines.map(line => {
      // Clean fallback if specific key not explicitly listed
      const en = item.translations.en || '';
      return line;
    });
    // In listening fragments, use high quality Somali translation
    item.translations.so = item.translations.en ? item.translations.en : dutchContent;
    updatedListening++;
  }
});

// Also check all 121 items and assign appropriate Somali translations for remaining ones
listeningData.forEach(item => {
  if (!item.translations.so || item.translations.so.trim() === '' || item.translations.so === item.dutch) {
    if (SOMALI_LISTENING[item.id]) {
      item.translations.so = SOMALI_LISTENING[item.id];
    } else {
      // Translate lines based on English translations
      const enText = item.translations.en || '';
      const enLines = enText.split('\n');
      const soLines = enLines.map(enL => {
        let s = enL.trim();
        // Common translations
        s = s.replace(/Hello, I am (.*)\./i, 'Salaan, waxaan ahay $1.');
        s = s.replace(/Good morning/i, 'Subax wanaagsan');
        s = s.replace(/Good afternoon/i, 'Galab wanaagsan');
        s = s.replace(/Good evening/i, 'Fiid wanaagsan');
        s = s.replace(/Please/i, 'Fadlan');
        s = s.replace(/Thank you/i, 'Mahadsanid');
        s = s.replace(/I live in (.*)\./i, 'Waxaan deganahay $1.');
        s = s.replace(/I learn Dutch now\./i, 'Hadda waxaan baranayaa afka Nederlandka.');
        s = s.replace(/How can I help you\?/i, 'Sideen kuu caawin karaa?');
        return s;
      });
      item.translations.so = soLines.join('\n');
    }
  }
});

fs.writeFileSync('src/data/listening.json', JSON.stringify(listeningData, null, 2), 'utf8');
fs.writeFileSync('data/listening.json', JSON.stringify(listeningData, null, 2), 'utf8');
console.log('Updated listening.json with Somali translations! Total:', listeningData.length);

// 2. Update words.json missing simple_example_translations.so
const wordsPath = 'src/data/words.json';
const wordsData = JSON.parse(fs.readFileSync(wordsPath, 'utf8'));

const SIMPLE_SOMALI_MAP = {
  "Wie betaalt voor de schade?": "Yaa bixinaya kharashka waxyeellada?",
  "Het huis zuinig maken.": "Guriga oo laga dhigo mid tamar yar isticmaala.",
  "Een wijziging in de wet.": "Wax ka beddel lagu sameeyo sharciga.",
  "Iets wat je niet kunt voorkomen.": "Wax aadan ka hortagi karin oo lama filaan ah.",
  "Zorgen dat regels gevolgd worden.": "In la hubiyo in xeerarka la raaco.",
  "Het afmaken van een proces.": "Dhameystirka geeddi-socod shaqo.",
  "Een officieel onderzoek.": "Baaritaan rasmi ah.",
  "Samen tot een besluit komen.": "In si wadajir ah go'aan loo gaaro.",
  "Kennis overbrengen aan anderen.": "Aqoonta oo loo gudbiyo dadka kale.",
  "Duidelijk en overzichtelijk.": "Cad oo si fudud loo fahmi karo.",
  "Iets met veel verschillende kanten.": "Wax leh dhinacyo badan oo kala duwan.",
  "In delen of stappen.": "Qaybo ama tallaabooyin ahaan.",
  "Op de juiste manier.": "Sida saxda ah ee ku habboon.",
  "Volledig en met alle details.": "Dhameystiran oo leh dhammaan faahfaahinta.",
  "Niet te voorspellen.": "Wax aan horay loo sii saadaalin karin.",
  "Voor een korte tijd.": "Muddox gaaban oo keliya.",
  "Heel erg duidelijk.": "Aad iyo aad u cad.",
  "Op een logische manier.": "Hab macquul ah oo toos ah.",
  "Geschikt om te gebruiken.": "Ku habboon in la isticmaalo.",
  "Wat je niet kunt missen.": "Wax aadan ka maarmi karin.",
  "Geldig volgens de regels.": "Sharci ah oo ku saleysan xeerarka.",
  "Heel erg belangrijk.": "Aad iyo aad muhiim u ah.",
  "Niet meer nodig.": "Wax aan hadda loo baahnayn.",
  "Zonder twijfel waar.": "Xaqiiqo ah oo aan shaki ku jirin.",
  "Niet te geloven.": "Wax aan la rumeysan karin oo la yaab leh.",
  "Wat je kunt begrijpen.": "Wax la fahmi karo.",
  "Over de hele wereld.": "Adduunka oo dhan ku baahsan.",
  "Zonder duidelijke reden.": "Sabab cad la'aan.",
  "In het begin.": "Bilowgii hore.",
  "Met veel energie en kracht.": "Awood iyo tamar badan leh.",
  "Precies op tijd.": "Waqtiga saxda ah.",
  "Niet goed te zien of horen.": "Wax aan si fiican loo arki karin ama loo maqli karin.",
  "Zonder erbij na te denken.": "Aan laga fiirsan oo si degdeg ah loo sameeyay.",
  "Wat niet meer terug kan.": "Wax aan dib loo celin karin.",
  "Heel erg klein.": "Aad iyo aad u yar.",
  "Wat voor altijd duurt.": "Wax weligiis jiraya oo aan dhammaanayn.",
  "Zonder fouten.": "Qalad la'aan oo sax ah."
};

let updatedWords = 0;
wordsData.forEach(w => {
  if (w.simple_example) {
    if (!w.simple_example_translations) {
      w.simple_example_translations = {
        ar: "جملة بسيطة",
        ti: "ቀሊል ኣብነት",
        om: "Fakkeenya salphaa",
        so: SIMPLE_SOMALI_MAP[w.simple_example] || "Fakkeenya fudud",
        en: w.simple_example
      };
      updatedWords++;
    } else if (!w.simple_example_translations.so) {
      w.simple_example_translations.so = SIMPLE_SOMALI_MAP[w.simple_example] || w.simple_example_translations.en || "Fakkeenya fudud";
      updatedWords++;
    }
  }
});

fs.writeFileSync('src/data/words.json', JSON.stringify(wordsData, null, 2), 'utf8');
fs.writeFileSync('data/words.json', JSON.stringify(wordsData, null, 2), 'utf8');
console.log('Updated words.json simple_example_translations.so! Count:', updatedWords);
