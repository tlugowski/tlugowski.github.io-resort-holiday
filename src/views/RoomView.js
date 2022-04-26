import { AddToCartButton } from "../common/AddToCartButton";
import { RoomDetails } from "./RoomDetails";
import "./room.scss";

function SeeMoreButton(id) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.innerText = "more details";
  button.className = "see-more-button";

  const navigateEvent = new CustomEvent("navigate", {
    detail: () => RoomDetails(id),
  });

  button.addEventListener("click", () => {
    document.body.dispatchEvent(navigateEvent);
  });

  return button;
}

export function Room(room) {
  const { id, name, price, img } = room;
  const li = document.createElement("li");
  li.className = "li-room-section";

  const div = document.createElement("div");
  const image = document.createElement("img");
  div.append(image);
  image.classList.add("room-img");
  if (img) {
    image.src = img;
  }

  li.innerHTML = `
        <h4>${name}</h4>
        <p>Price: ${price} USD</p>
    `;

  li.append(AddToCartButton(room));
  li.append(SeeMoreButton(id));
  li.append(div);

  return li;
}
