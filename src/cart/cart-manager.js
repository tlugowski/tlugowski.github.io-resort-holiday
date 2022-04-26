const key = "spaCart";

export const cartManager = {
  add(item) {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      const cartItem = {
        ...item,
        count: 1,
      };
      const serializedCartContents = JSON.stringify([cartItem]);
      localStorage.setItem(key, serializedCartContents);
    } else {
      const cartContents = JSON.parse(cart);
      const foundItemIndex = cartContents.findIndex(
        ({ id, type }) => type === item.type && id === item.id
      );
      if (foundItemIndex > -1) {
        const foundItem = cartContents[foundItemIndex];
        const sigleElPrice = +foundItem.price / +foundItem.count;

        cartContents[foundItemIndex].count++;
        cartContents[foundItemIndex].price += sigleElPrice;
      } else {
        const cartItem = {
          ...item,
          count: 1,
        };
        cartContents.push(cartItem);
      }
      const serializedCartContents = JSON.stringify(cartContents);
      localStorage.setItem(key, serializedCartContents);
    }
  },

  remove(item, removeAll) {
    const cart = localStorage.getItem(key);

    if (cart !== null) {
      const cartContents = JSON.parse(cart);
      const foundItemIndex = cartContents.findIndex(
        ({ id, type }) => type === item.type && id === item.id
      );

      if (foundItemIndex < 0) {
        return;
      }

      let newCartContents;
      if (cartContents[foundItemIndex].count == 1 || removeAll) {
        newCartContents = cartContents.filter(
          (cartItem) => cartItem.name !== item.name
        );
      } else {
        newCartContents = [...cartContents];
        const foundItem = newCartContents[foundItemIndex];
        const sigleElPrice = +foundItem.price / +foundItem.count;

        newCartContents[foundItemIndex].count--;
        newCartContents[foundItemIndex].price -= sigleElPrice;
      }
      const serializedCartContents = JSON.stringify(newCartContents);
      localStorage.setItem(key, serializedCartContents);
    }
  },

  getAll() {
    const cart = localStorage.getItem(key);

    if (cart == null) {
      return [];
    }

    return JSON.parse(cart);
  },

  updateElementDate(item, date) {
    const cart = localStorage.getItem(key);
    const cartContents = JSON.parse(cart);
    const foundItemIndex = cartContents.findIndex(
      ({ id, type }) => type === item.type && id === item.id
    );

    cartContents[foundItemIndex].dateStart = date.minDate;
    cartContents[foundItemIndex].dateEnd = date.maxDate;

    const serializedCartContents = JSON.stringify(cartContents);
    localStorage.setItem(key, serializedCartContents);
  },
};
