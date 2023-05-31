import { cleanArabicWord } from "./parseArabicNumber";
import { Item } from "../module/Item";

export function getItemsFromText(input) {
  if (!input) return [];
  const inputArray = input.split(" ").map((word) => cleanArabicWord(word));
  let resultArray = [];
  inputArray.forEach((elem) => {
    // if number
    if (!isNaN(elem)) {
      if (resultArray.length > 0)
        resultArray[resultArray.length - 1] =
          resultArray[resultArray.length - 1].trim();
      resultArray.push(elem, "");
    } else {
      resultArray[resultArray.length - 1] += ` ${elem}`;
    }
  });
  resultArray[resultArray.length - 1] =
    resultArray[resultArray.length - 1].trim();

  let items = [];
  for (let idx = 1; idx <= resultArray.length; idx += 2) {
    let [title, count] = [resultArray[idx], resultArray[idx - 1]];
    const oldItem = items.find((item) => item.title == title);
    if (oldItem) {
      oldItem.count += count;
    } else {
      items.push(new Item(title, count));
    }
  }
  return items;
}
