import { generate as generateId } from "shortid";

export class Item {
  constructor(title, count) {
    this.id = generateId();
    this.title = title;
    this.count = count ? count : 1;
  }
}
