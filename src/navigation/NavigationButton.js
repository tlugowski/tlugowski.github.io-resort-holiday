export function NavigationButton(Component, text) {
  const button = document.createElement("button");

  button.classList.add("btn", "btn-dark");
  button.setAttribute("type", "button");
  button.innerText = text;

  button.addEventListener("click", () => {
    const navigateEvent = new CustomEvent("navigate", {
      detail: Component,
    });

    document.body.dispatchEvent(navigateEvent);

    Array.from(button.parentElement.children).forEach((element) => {
      element.classList.remove("active-btn");
    });

    button.classList.add("active-btn");
  });

  return button;
}
