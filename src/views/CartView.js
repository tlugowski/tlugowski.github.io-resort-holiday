import { cartManager } from "../cart/cart-manager";
import { RemoveFromCartButton } from "../common/RemoveFromCartButton";
import "./cartview.scss";

const add = (a, b) => a + b;
const calculateTotal = (items) =>
  items
    .map((item) => item.price)
    .reduce(add, 0)
    .toFixed(2);

export async function Cart() {
  const section = document.createElement("section");

  const createTable = () => {
    section.innerHTML = `
    <h2>Cart</h2>
`;
    const cartItems = cartManager.getAll();

    const table = document.createElement("table");
    table.classList.add("table");

    const tableHead = document.createElement("tr");
    tableHead.innerHTML = `
        <th>Item</th>
        <th>Price</th>
        <th>Count</th>
        <th>Element actions</th>
        <th>Details</th>
        <th></th>
    `;

    const tableRows = cartItems.map((item) => {
      const tr = document.createElement("tr");
      tr.className = "tr-element";

      const addBtn = document.createElement("button");
      addBtn.innerText = "➕";
      addBtn.className = "add-btn";
      addBtn.addEventListener("click", () => {
        cartManager.add(item);
        createTable();
      });

      const substractBtn = document.createElement("button");
      substractBtn.innerText = "➖";
      substractBtn.className = "substract-btn";
      substractBtn.addEventListener("click", () => {
        cartManager.remove(item);
        createTable();
      });

      const date = new Date();
      const year = date.getFullYear();
      const monthWithoutSth = date.getMonth() + 1;
      const month =
        monthWithoutSth < 10 ? `0${monthWithoutSth}` : monthWithoutSth;
      const day = date.getDate();
      const minDate = `${year}-${month}-${day}`;

      const maxDate = `${year + 1}-${month}-${day}`;
      tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.count}</td>
            <td class="buttons-container">
            </td>
            <td class="date-container">
            <div>
            <label for="from">Arrival date</label>
              <input type='date' min="${minDate}" id="from"  value="${
        item.dateStart || ""
      }" name="from"/>
      </div>
      <div>
      <label for="to">Departure date</label>
              <input type='date' max="${maxDate}" id="to" value="${
        item.dateEnd || ""
      }" name="to"/>
      </div>
              <span></span>
              <button class="set-date" disabled="true" >Set date</button>
            </td>
            <td></td>
        `;

      const buttonsContainer = tr.querySelector(".buttons-container");
      const dateMinInput = tr.querySelector(
        ".date-container input[name='from']"
      );

      const dateMaxInput = tr.querySelector(".date-container input[name='to']");
      const setDateInfoBtn = tr.querySelector(".date-container button");
      const errorContainer = tr.querySelector(".date-container span");

      const dateValidator = (fromDate, toDate) => {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const current = new Date();

        return (
          from <= to && to <= current.setFullYear(current.getFullYear() + 1)
        );
      };

      const validDate = (minDate, maxDate) => {
        const isValid = dateValidator(minDate, maxDate);

        if (isValid) {
          errorContainer.textContent = "";
          setDateInfoBtn.removeAttribute("disabled");
        } else {
          errorContainer.textContent = "Date validation error";
          setDateInfoBtn.setAttribute("disabled", "true");
        }

        return isValid;
      };

      dateMinInput.addEventListener("input", () => {
        const minValue = dateMinInput.value;
        const maxValue = dateMaxInput.value;

        validDate(minValue, maxValue);
      });

      dateMaxInput.addEventListener("input", () => {
        const minValue = dateMinInput.value;
        const maxValue = dateMaxInput.value;

        validDate(minValue, maxValue);
      });

      setDateInfoBtn.addEventListener("click", () => {
        const minValue = dateMinInput.value;
        const maxValue = dateMaxInput.value;

        alert("The date has properly set up");

        if (validDate(minValue, maxValue)) {
          cartManager.updateElementDate(item, {
            minDate: minValue,
            maxDate: maxValue,
          });
        }
      });

      buttonsContainer.append(addBtn);
      buttonsContainer.append(substractBtn);
      tr.lastElementChild.append(RemoveFromCartButton(item));

      return tr;
    });

    const tableFooter = document.createElement("tr");
    tableFooter.innerHTML = `
        <td></td>
        <td>${calculateTotal(cartItems)}</td>
        <td></td>
    `;

    table.append(tableHead, ...tableRows, tableFooter);
    section.append(table);
  };

  createTable();
  return section;
}
