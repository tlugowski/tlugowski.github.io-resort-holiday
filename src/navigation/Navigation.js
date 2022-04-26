import { Rooms } from "../views/RoomsView";
import { Attractions } from "../views/AttractionsView";
import { NavigationButton } from "./NavigationButton";
import "./navigation.scss";
import { Cart } from "../views/CartView";
import { LoginView } from "../views/LoginView";
import { RegistrationView } from "../views/RegistrationView";

export const navigationItems = [
  { component: Rooms, name: "Rooms" },
  { component: Attractions, name: "Attractions" },
  { component: Cart, name: "🛒" },
  { component: LoginView, name: "Login" },
  { component: RegistrationView, name: "Registration" },
];

export function Navigation() {
  const nav = document.createElement("nav");
  nav.classList.add("nav-header");

  const navigationButtons = navigationItems.reduce((collector, item) => {
    const { component, name } = item;
    if (name == "Registration") {
      return collector;
    }
    return [...collector, NavigationButton(component, name)];
  }, []);

  navigationButtons[0].classList.add("active-btn");

  nav.append(...navigationButtons);

  navigationButtons[3].classList.add("active-btn-login", "login-btn");

  return nav;
}
