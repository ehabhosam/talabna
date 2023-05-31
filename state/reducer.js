import { getItemsFromText } from "../utils/getItemsFromText";

export default function reducer(state, action) {
  // get the item if needed
  let item;
  if (action.payload && action.payload.id) {
    item = state.items.find((item) => item.id === action.payload.id);
  }
  switch (action.type) {
    case "CLEAR_ITEMS":
      return { items: [] };

    case "ADD_ITEM":
      // payload: Item
      return { items: [...state.items, action.payload] };

    case "EDIT_COUNT":
      // payload: { id, newcount }
      const editedItems = [...state.items].map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, count: action.payload.count };
        }
        return item;
      });
      return { items: editedItems };

    case "EDIT_TITLE":
      // payload: { id, newtitle }
      const editedTitleItems = [...state.items].map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.title };
        }
        return item;
      });
      return { items: editedTitleItems };

    case "DELETE_ITEM":
      // payload: { id }
      const itemsWithoutDeleted = [...state.items].filter(
        (item) => item.id !== action.payload.id
      );
      return { items: itemsWithoutDeleted };

    case "ADD_FROM_TEXT":
      // payload: { text }
      const itemsFromText = getItemsFromText(action.payload.text);
      return { items: mergeItems(state.items, itemsFromText) };
  }
}

function mergeItems(items_1, items_2) {
  if (items_1.length < 1) return [...items_2];
  let items = [...items_1];
  for (let item of items_2) {
    const alreadyThere = items.find((_item) => _item.title === item.title);
    if (alreadyThere) {
      alreadyThere.count += item.count;
    } else {
      items.push(item);
    }
  }
  return items;
}
