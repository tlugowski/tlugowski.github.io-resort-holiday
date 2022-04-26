import { AddToCartButton } from "../common/AddToCartButton";
import "./attractions.scss";

export function Attraction(attraction) {
  const { name, area, time, price, img } = attraction;
  const article = document.createElement("article");

  const div = document.createElement("div");
  const image = document.createElement("img");
  div.append(image);
  image.classList.add("attraction-img");
  if (img) {
    image.src = img;
  }

  article.className = "text-article";

  article.innerHTML = `
        <h4>${name}</h4>
        <p>Area: ${area}</p>
        <p>Time: ${time} minutes</p>
        <footer>
            <strong>${price.toFixed(2)}</strong>
            ${price < 100 ? "✔️" : "❌"}
        </footer>
    `;

  article.append(AddToCartButton(attraction));
  article.append(div);

  return article;
}
