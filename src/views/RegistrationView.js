import { api } from "../api/api";
import { navigationItems } from "../navigation/Navigation";
import "../views/registration.scss";

export async function RegistrationView() {
  const registration = document.createElement("div");

  registration.innerHTML = `
        <form action="" id="formRegistration">
        <label class="registration-header">Registration</label>
            <div class="container-form-userName container-form-input-reg">
                <label for="email">User name</label>
                <input type="email" placeholder="User Name" name="email" required>
            </div>
            <div class="container-form-userPassword container-form-input-reg">
                <label for="userPasswrod">Password</label>
                <input class="first-password-field" type="password" value-"cos1" placeholder="User Password" name="userPassword" onfocus="this.value=''" required>
            </div>
            <div class="container-form-retyped-password container-form-input-reg">
                <label for="retyped-password">Retype password</label>
                <input class="second-password-field"" type="password" value-"cos2" placeholder="Retype Password" name="userPassword" onfocus="this.value=''" required>
            </div>

            <button type="submit" class="js-form-btn-reg">Submit</button>
            <div class="credentials-error-message">
              <span>Provide a valid login and password</span>
            </div>
            <div class="user-exist-error-message">
              <span>This user currently exist in database</span>
            </div>
            <div class="different-password-error-message">
              <span>The paswords are not the same</span>
            </div>

          </div>
        </form>
`;

  const form = registration.querySelector("form");
  const emailField = registration.querySelector('input[type="email"]');
  const passwordFirstField = registration.querySelector(
    'input[class="first-password-field"]'
  );
  const passwordSecondField = registration.querySelector(
    'input[class="second-password-field"]'
  );
  const loginErrorMsg = registration.querySelector(
    ".credentials-error-message"
  );

  const loginExistError = registration.querySelector(
    ".user-exist-error-message"
  );

  const differentPasswordError = registration.querySelector(
    ".different-password-error-message"
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formValue = {
      email: emailField.value,
      password1: passwordFirstField.value,
      password2: passwordSecondField.value,
    };

    const users = await api.auth.getUsers();
    const isUserInDb = users.some((user) => user.email === formValue.email);
    if (isUserInDb) {
      loginExistError.classList.add("enabled");
      return;
    } else {
      loginExistError.classList.remove("enabled");
    }

    const isPasswordTheSame = formValue.password1 === formValue.password2;

    if (!isPasswordTheSame) {
      differentPasswordError.classList.add("enabled");
      return;
    } else {
      differentPasswordError.classList.remove("enabled");
    }

    const newUser = {
      email: formValue.email,
      password: formValue.password1,
    };

    await api.auth.addUser(newUser);

    const RoomCompnent = navigationItems.find((item) => item.name === "Rooms");

    const navigateEvent = new CustomEvent("navigate", {
      detail: RoomCompnent.component,
    });

    document.body.dispatchEvent(navigateEvent);
  });

  return registration;
}
