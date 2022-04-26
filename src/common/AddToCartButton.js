import { cartManager } from "../cart/cart-manager";
import "./addtocartbutton.scss";

export function AddToCartButton(item) {
  const button = document.createElement("button");
  button.classList.add("btn", "btn-secondary");
  button.setAttribute("type", "button");
  button.innerText = "🛒";

  button.addEventListener("click", () => {
    cartManager.add(item);
  });

  return button;
}
