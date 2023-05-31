import getNumberFromString from "./getNumberFromString";
const arabicMapper = new Map([
  ["واحد", 1],
  ["وحد", 1],
  ["اثنين", 2],
  ["اتنين", 2],
  ["اتنان", 2],
  ["اثنان", 2],
  ["اثنينة", 2],
  ["إثنين", 2],
  ["إتنين", 2],
  ["إتنان", 2],
  ["إثنان", 2],
  ["إثنينة", 2],
  ["ثنتين", 2],
  ["ثلاثة", 3],
  ["تلاثة", 3],
  ["ثلاثه", 3],
  ["تلاته", 3],
  ["ثلاث", 3],
  ["ثلاث", 3],
  ["تلات", 3],
  ["أربعة", 4],
  ["اربعة", 4],
  ["أربعه", 4],
  ["اربعه", 4],
  ["أربع", 4],
  ["اربع", 4],
  ["خمسة", 5],
  ["خمسه", 5],
  ["خمس", 5],
  ["ستة", 6],
  ["سته", 6],
  ["سبعة", 7],
  ["سبعه", 7],
  ["سبع", 7],
  ["ثمانية", 8],
  ["ثمانيه", 8],
  ["ثماني", 8],
  ["ثمان", 8],
  ["تمانية", 8],
  ["تمانيه", 8],
  ["تماني", 8],
  ["تمان", 8],
  ["تسعة", 9],
  ["تسعه", 9],
  //   ["تسع", 9],
  ["عشرة", 10],
  ["عشره", 10],
  ["عشر", 10],
  ["حداشر", 11],
  ["حضاشر", 11],
  ["احدعشر", 11],
  ["أحدعشر", 11],
]);

export function parseArabicNumber(arabicString) {
  return arabicMapper.get(arabicString);
}

export function cleanArabicWord(str) {
  let result = parseArabicNumber(str);
  if (result) return result;
  result = getNumberFromString(str);
  if (result) return result;
  for (let key of arabicMapper.keys()) {
    if (RegExp(key).test(str)) {
      result = parseArabicNumber(key);
      break;
    }
  }
  return result ? result : str;
}
