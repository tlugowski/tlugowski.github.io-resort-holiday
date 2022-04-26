LoginView;

import { api } from "../api/api";
import { navigationItems } from "../navigation/Navigation";
import "./login.scss";

export async function LoginView() {
  const loginBtn = document.querySelector(".login-btn");

  if (loginBtn.textContent === "Logout") {
    loginBtn.textContent = "Login";
  }
  const login = document.createElement("div");
  login.innerHTML = `
        <form action="" id="formLogin">
            <label class="login-header">Login</label>
            <div class="container-form-userName container-form-input">
                <label for="email">User name</label>
                <input type="email" placeholder="User Name" name="email" required>
            </div>
            <div class="container-form-userPassword container-form-input">
                <label for="userPasswrod">Password</label>
                <input type="password" placeholder="User Password" name="userPassword" onfocus="this.value=''" required>
            </div>
            <button class="btn-registration">
                You have not account? Sign up!
            </button>
            <button type="submit" class="js-form-btn">Submit</button>
            <div class="credentials-error-message">
            <span>Provide a valid login and password</span></div>
        </div> 
        </form>
`;

  const form = login.querySelector("form");
  const emailField = login.querySelector('input[type="email"]');
  const passwordField = login.querySelector('input[type="password"]');
  const loginErrorMsg = login.querySelector(".credentials-error-message");
  const linkNewAccount = login.querySelector(".btn-registration");

  linkNewAccount.addEventListener("click", (e) => {
    e.preventDefault();
    const RegistrationComponent = navigationItems.find(
      (item) => item.name === "Registration"
    );

    const navigateEvent = new CustomEvent("navigate", {
      detail: RegistrationComponent.component,
    });

    document.body.dispatchEvent(navigateEvent);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formValue = {
      email: emailField.value,
      password: passwordField.value,
    };

    const users = await api.auth.getUsers();
    const isUserValid = users.some(
      (user) =>
        user.email === formValue.email && user.password === formValue.password
    );
    if (isUserValid) {
      const RoomCompnent = navigationItems.find(
        (item) => item.name === "Rooms"
      );

      loginBtn.textContent = "Logout";

      const navigateEvent = new CustomEvent("navigate", {
        detail: RoomCompnent.component,
      });

      document.body.dispatchEvent(navigateEvent);
    } else {
      loginErrorMsg.classList.add("enabled");
    }
  });

  return login;
}
