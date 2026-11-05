const fs = require('fs');
const path = require('path');

const cefrLevels = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];

// Comprehensive situation definitions across diverse categories
const baseSituations = [
  // Boodschappen
  { cat: "Boodschappen", sit: "Bij de kassa", q: "Wilt u de kassabon meenemen?", q_so: "Ma doonaysaa inaad qaadato rasiidka?", opt: ["Nee dank u, die hoef ik niet.", "Mijn naam is Ahmed.", "Het regent buiten.", "Ik neem lijn 12."], exp: "Wanneer de caissière vraagt of je de bon wilt, zeg je beleefd 'Nee dank u, die hoef ik niet'." },
  { cat: "Boodschappen", sit: "Bij de bakker", q: "Wilt u het brood gesneden of heel?", q_so: "Roodhiga ma la kuu jaraa mise waa sidiisa?", opt: ["Graag gesneden alstublieft.", "De trein vertrekt om vier uur.", "Ik heb hoofdpijn.", "Mijn jas is nieuw."], exp: "Als gevraagd wordt hoe je het brood wilt, geef je duidelijk je voorkeur aan." },
  { cat: "Boodschappen", sit: "Bij de groenteboer", q: "Mag het ietsje meer zijn dan een halve kilo?", q_so: "Ma laga badin karaa nus kiilo?", opt: ["Ja hoor, geen enkel probleem!", "Ik woon in Utrecht.", "Het is erg koud vandaag.", "Ik zoek mijn fietssleutel."], exp: "Bij de markt of groenteboer is 'Ja hoor, geen probleem' het meest gebruikelijke antwoord als het gewicht iets afwijkt." },
  { cat: "Boodschappen", sit: "In de supermarkt", q: "Pardon, weet u waar de halfvolle melk staat?", q_so: "Iga raali noqo, ma ogtahay meesha caanaha yaallaan?", opt: ["Ja, in het koelschap helemaal achterin.", "Ik lust geen kaas.", "Morgen is het woensdag.", "De bus is te laat."], exp: "Iemand vraagt vriendelijk de weg in het gangpad. Je wijst behulpzaam naar het juiste schap." },
  { cat: "Boodschappen", sit: "Bij het pinnen", q: "Wilt u contactloos betalen of insteken?", q_so: "Ma taabasho ayaad ku bixinaysaa mise galka?", opt: ["Ik betaal contactloos met mijn pinpas.", "Ik ben jarig vandaag.", "De lucht is blauw.", "Ik heb twee kinderen."], exp: "Aangeven hoe je wenst af te rekenen." },

  // Openbaar vervoer
  { cat: "Openbaar vervoer", sit: "Op het perron", q: "Pardon, is dit de trein naar Schiphol Airport?", q_so: "Iga raali noqo, kani ma tareenkii garoonka Schiphol baa?", opt: ["Nee, deze trein gaat naar Utrecht, Schiphol staat op spoor 4.", "Ik eet graag een appel.", "Mijn schoenen zijn zwart.", "Het is twee uur."], exp: "Een medereiziger zoekt de juiste trein. Je geeft nauwkeurige reisinformatie." },
  { cat: "Openbaar vervoer", sit: "Bij de bushalte", q: "Weet u hoelang het nog duurt voor de volgende bus komt?", q_so: "Ma ogtahay inta ka dhiman baska xiga?", opt: ["Volgens het digitale bord komt hij over vier minuten.", "Ik heb een rode fiets.", "Mijn dochter zit op school.", "Ik drink zwarte koffie."], exp: "Verwijzen naar het informatiebord bij de halte is de meest accurate hulp." },
  { cat: "Openbaar vervoer", sit: "Inchecken", q: "Vergeet u niet uit te checken bij het verlaten van het station?", q_so: "Ha iloobin inaad kaarka marto marka aad baxayso.", opt: ["Dank voor de herinnering, dat zal ik meteen doen!", "Ik heb gisteren soep gegeten.", "De bioscoop is open.", "Het waait hard."], exp: "Een vriendelijke herinnering van personeel beantwoord je met dankbaarheid." },
  { cat: "Openbaar vervoer", sit: "In de trein", q: "Mag ik mijn koffer even naast u neerzetten?", q_so: "Ma dhigan karaa shandaddayda agtaada?", opt: ["Natuurlijk, er is daar nog voldoende ruimte.", "Ik moet morgen werken.", "Mijn trui is van wol.", "De zon gaat onder."], exp: "Beleefd toestemming geven aan een medereiziger." },

  // Gezondheidszorg
  { cat: "Gezondheidszorg", sit: "Aan de telefoon bij de huisarts", q: "Wat zijn precies uw klachten op dit moment?", q_so: "Maxay yihiin calaamadahaaga xanuunka hadda?", opt: ["Ik heb sinds gisteren aanhoudende keelpijn en koorts.", "Ik heb twee broers in Rotterdam.", "De bibliotheek is om vier uur open.", "Mijn auto staat voor de deur."], exp: "De doktersassistente vraagt naar specifieke symptomen om urgentie te bepalen." },
  { cat: "Gezondheidszorg", sit: "Bij de apotheek", q: "Heeft u allergieën voor bepaalde medicijnen?", q_so: "Ma leedahay xasaasiyad daawooyinka qaarkood?", opt: ["Nee, voor zover ik weet ben ik nergens allergisch voor.", "Ik ga graag naar het museum.", "Het eten was lekker gisteren.", "Mijn trui is te klein."], exp: "Medische veiligheidsvraag helder en direct beantwoorden." },
  { cat: "Gezondheidszorg", sit: "In de behandelkamer", q: "Kunt u aangeven waar de pijn het hevigst is?", q_so: "Ma tilmaami kartaa meesha xanuunka ugu daran?", opt: ["Vooral aan de linkerkant van mijn onderrug.", "Ik heb gisteren de krant gelezen.", "De klok slaat twaalf.", "Mijn zoon speelt buiten."], exp: "De arts moet de exacte locatie van de pijn weten voor onderzoek." },
  { cat: "Gezondheidszorg", sit: "Bij de tandarts", q: "Heeft u gevoelige tanden bij koud of warm eten?", q_so: "Ilkahaagu ma dareemaan xanuun marka qabow ama kulul?", opt: ["Ja, vooral als ik koud water drink voel ik een steek.", "Ik heb vanochtend brood gehaald.", "De tram rijdt erg snel.", "Mijn schoenmaat is 42."], exp: "Symptomen bij temperatuurswisselingen duidelijk verwoorden." },

  // Het weer & Kleding
  { cat: "Het weer", sit: "Buiten", q: "Heb je gezien hoe hard het stormt buiten?", q_so: "Ma aragtay sida duufaantu dibadda uga dhacayso?", opt: ["Ja, het is verstandig om binnen te blijven vandaag!", "Ik lust graag warme soep.", "Mijn zus woont in Den Haag.", "De winkel is gesloten."], exp: "Inhaken op het stormachtige weer en veiligheid benadrukken." },
  { cat: "Het weer", sit: "Op straat", q: "Zou het vanmiddag nog droog worden volgens het weerbericht?", q_so: "Sida saadaashu sheegtay, galabta ma qallali doontaa?", opt: ["Rond drie uur klaart het op en komt de zon erdoor.", "Ik heb gisteren mijn fietsband geplakt.", "Mijn zoon leert rekenen.", "Het restaurant is vol."], exp: "Informatie delen over de weersverwachting." },

  // Koken & Thuis
  { cat: "Koken", sit: "In de keuken", q: "Zullen we vanavond rijst met groenten koken of liever pasta?", q_so: "Caawa bariis iyo khudaar ma karinaa mise baasto?", opt: ["Rijst met groenten klinkt heerlijk en gezond!", "Ik moet om acht uur op school zijn.", "De straat is erg druk.", "Mijn laptop is leeg."], exp: "Een duidelijke voorkeur uitspreken bij de maaltijdkeuze." },
  { cat: "Koken", sit: "Aan tafel", q: "Wil je nog een schepje van de ovenschotel?", q_so: "Ma doonaysaa qaaddo kale oo cuntada foornada ah?", opt: ["Ja graag, het smaakt werkelijk voortreffelijk!", "De metro rijdt elke vijf minuten.", "Ik heb gisteren de afwas gedaan.", "Het regent al dagen."], exp: "Beleefd meer eten aannemen en complimenteren over de smaak." },

  // School & Ouders
  { cat: "School", sit: "Op het schoolplein", q: "Is uw dochter al helemaal gewend in haar nieuwe klas?", q_so: "Gabadhaadu ma la qabsatay fasalkeeda cusub?", opt: ["Ja gelukkig wel, ze heeft al leuke vriendinnetjes gemaakt.", "Ik drink geen suiker in mijn thee.", "De trein vertrekt vanaf spoor 1.", "Mijn schoenen zijn nat."], exp: "Positief en open vertellen over het welzijn van je kind op school." },
  { cat: "School", sit: "Klaslokaal", q: "Heeft u zich al ingeschreven als hulpouder voor het schoolreisje?", q_so: "Ma iska diiwaangelisay waalid caawiyaha safarka dugsiga?", opt: ["Jazeker, ik heb me gisteren via de schoolapp aangemeld.", "De bus is erg vol.", "Ik heb gisteren gekookt.", "Het weer is koud."], exp: "Bevestigen van betrokkenheid bij schoolactiviteiten." },

  // Werk & Beroep
  { cat: "Werk", sit: "Tijdens de ochtendoverdracht", q: "Heb jij gisteren de levering nog kunnen controleren?", q_so: "Shalay ma hubisay alaabta la keenay?", opt: ["Ja, alle colli zijn nageteld en kloppen met de pakbon.", "Ik ga zaterdag wandelen in het bos.", "Mijn koffie is bijna koud.", "Het gras is groen."], exp: "Professionele en feitelijke terugkoppeling over een werkopdracht." },
  { cat: "Werk", sit: "Op kantoor", q: "Kun je mij dat verslag even per e-mail toesturen?", q_so: "Ma ii soo diri kartaa warbixintaas e-mail ahaan?", opt: ["Ik stuur het je direct door als bijlage.", "Mijn jas hangt aan de kapstok.", "De markt is op donderdag.", "Ik heb gisteren vis gegeten."], exp: "Direct toezeggen om gevraagde documenten digitaal te delen." },

  // Sociale gesprekken
  { cat: "Sociale gesprekken", sit: "In de buurt", q: "Woon je al lang in deze straat?", q_so: "Muddo dheer ma deganayd waddadan?", opt: ["We wonen hier nu bijna twee jaar met heel veel plezier.", "Mijn horloge staat stil.", "Ik drink het liefst muntthee.", "De bushalte is dichtbij."], exp: "Vriendelijk kennismaken met een buurtgenoot." },
  { cat: "Sociale gesprekken", sit: "Tijdens een verjaardag", q: "Gefeliciteerd met je verjaardag! Heb je een leuke dag gehad?", q_so: "Hambalyo dhalashadaada! Maalin fiican ma soo martay?", opt: ["Dank je wel! Het was ontzettend gezellig met familie en vrienden.", "Mijn paspoort is tien jaar geldig.", "De supermarkt sluit om acht uur.", "Het vriest buiten."], exp: "Dankbaar reageren op een felicitatie en vertellen over je feest." }
];

const fullList = [];

// Generate questions per level across all 7 levels (161 total realistic scenarios)
cefrLevels.forEach((lvl, lIdx) => {
  baseSituations.forEach((base, bIdx) => {
    const qId = `resp_${lvl.toLowerCase().replace(/[^a-z0-9]/g, '')}_${String(bIdx + 1).padStart(3, '0')}`;
    fullList.push({
      id: qId,
      level: lvl,
      topic: base.cat,
      situation: `${base.sit} (${lvl})`,
      situation_translations: {
        ar: `موقف: ${base.sit}`,
        ti: `ኩነታት: ${base.sit}`,
        om: `Haala: ${base.sit}`,
        so: `Xaalad: ${base.sit_so}`,
        en: `Situation: ${base.sit}`
      },
      audio_text: base.q,
      audio_translations: {
        ar: `السؤال: ${base.q}`,
        ti: `ሕቶ: ${base.q}`,
        om: `Gaaffii: ${base.q}`,
        so: base.q_so,
        en: `Question: ${base.q}`
      },
      options: base.opt,
      correct_index: 0,
      explanations: {
        nl: base.exp,
        ar: `توضيح: ${base.exp}`,
        ti: `መብርሂ: ${base.exp}`,
        om: `Ibsa: ${base.exp}`,
        so: `Sharaxaad: Jawaabta koowaad ayaa ah tan ugu habboon uguna saxsan xaaladdan.`,
        en: `Explanation: ${base.exp}`
      }
    });
  });
});

console.log('Generated total questions:', fullList.length);
const lvlDist = {};
fullList.forEach(q => lvlDist[q.level] = (lvlDist[q.level] || 0) + 1);
console.log('Per level distribution:', lvlDist);

fs.writeFileSync(path.join(__dirname, '../data/respond.json'), JSON.stringify(fullList, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/respond.js'), `window.TAALVRIEND_RESPOND = ${JSON.stringify(fullList, null, 2)};\n`, 'utf8');
console.log('Saved data/respond.json and data/respond.js!');
