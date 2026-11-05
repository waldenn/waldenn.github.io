const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/constants/translations.js');
let code = fs.readFileSync(filePath, 'utf8');

const syrMap = {
  appTitle: 'TaalVriend',
  tagline: 'مدرّبك التفاعلي لتعلّم اللغة الهولندية',
  chooseApp: 'نقّي تطبيق',
  searchPlaceholder: 'دوّر على كلمة، ترجمة أو تصنيف... (/)',
  clearSearch: 'مسح',
  categories: 'التصنيفات',
  allCategories: 'كل التصنيفات',
  allWords: 'كل الكلمات',
  level: 'المستوى',
  allLevels: 'كل المستويات',
  language: 'اللغة',
  nativeLanguage: 'لغتك الأم',
  shuffle: 'ترتيب عشوائي',
  settings: 'الإعدادات',
  fullscreen: 'ملء الشاشة',
  positionCounter: 'الموقع / المجموع',
  prev: 'السابق',
  next: 'التالي',
  listen: 'اسمع',
  speak: 'احكي / انطق',
  spaceKey: 'مسافة',
  colImage: 'الصورة',
  colDutchWord: 'الكلمة الهولندية',
  colTranslation: 'الترجمة',
  colExample: 'جملة مثال',
  noWordsFound: 'ما لقينا كلمات',
  noWordsFilterDesc: 'ما في كلمات بتطابق خيارات البحث أو التصنيف الحالية.',
  showAllWordsOfLevel: 'عرض كل الكلمات',
  randomTime: 'وقت عشوائي',
  whatTimeIsIt: 'قديش الساعة؟',
  lookAtClockHands: 'تطلّع أول شي على عقارب الساعة وجرّب تقرأ الوقت لحالك.',
  revealTimeAudio: 'إظهار الوقت واللفظ',
  dutchTime: 'الوقت بالهولندي',
  chooseMinute: 'نقّي الدقيقة:',
  clock: 'الساعة',
  randomSentence: 'جملة عشوائية',
  sentence: 'جملة',
  of: 'من',
  randomText: 'نص عشوائي',
  listenTask: 'مهمة استماع',
  listenInstruction: 'اسمع منيح للمقطع الهولندي. اضغط على مسافة أو زر الإظهار لتشوف النص والترجمة.',
  listenAudioBtn: 'اسمع الصوت',
  revealTextBtn: 'فرجي النص والترجمة',
  randomQuestion: 'سؤال عشوائي',
  situationTask: 'شو بتقول بهاد الموقف؟',
  listenToQuestion: 'اسمع السؤال (مسافة)',
  chooseAnswer: 'نقّي الجواب الصح:',
  correctFeedback: 'تمام! هاد هو الجواب الصح.',
  tryAgainFeedback: 'مو تماماً. جرّب جواب تاني.',
  allLetters: 'الكل',
  vowelsAndDiphthongs: 'أحرف العلة والأصوات',
  lettersAZ: 'الأحرف من A لـ Z',
  randomLetter: 'حرف عشوائي',
  listenSound: 'اسمع الصوت (مسافة)',
  wordsContainingLetter: 'كلمات فيها هاد الحرف:',
  clickWordToHear: 'انقر على الكلمة لتسمع كيف بتنلفظ',
  settingsTitle: 'الإعدادات والمظهر',
  nativeLangSetting: 'لغتك الأم',
  cefrSetting: 'مستوى اللغة',
  themeSetting: 'المظهر والألوان',
  themeLight: 'فاتح',
  themeDark: 'غامق',
  themeSystem: 'حسب النظام',
  fontFamilySetting: 'نوع الخط',
  fontSizeSetting: 'حجم الخط',
  voiceSetting: 'الصوت الهولندي (TTS)',
  speechRateSetting: 'سرعة الحكي',
  closeBtn: 'إغلاق',
  closeUnderstood: 'فهمت، رجوع للتمرين',
  aboutTitle: 'حول TaalVriend',
  learningModules: 'الأقسام الستة للتعلم (انقر للفتح)',
  offlinePrivacyTitle: '100% بدون إنترنت والخصوصية أولاً',
  offlinePrivacyDesc: 'TaalVriend ما بيجمع أي بيانات شخصية، وما بيطلب حساب، وبيشتغل بالكامل بدون إنترنت بالمتصفح.',
  swipeHintMobile: 'اسحب لليسار أو اليمين لتتنقل'
};

// Add syr right after ar in each key
let updatedCount = 0;
for (const [key, syrVal] of Object.entries(syrMap)) {
  const regex = new RegExp(`(${key}:\\s*{[\\s\\S]*?ar:\\s*['\"][^'\"]*['\"],?)`);
  if (regex.test(code)) {
    if (!code.includes(`syr: '${syrVal}'`)) {
      code = code.replace(regex, `$1\n    syr: '${syrVal}',`);
      updatedCount++;
    }
  }
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated UI_TRANSLATIONS with syr for', updatedCount, 'keys');
