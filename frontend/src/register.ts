import { loginUser } from "./services/loginService";
import { createUser } from "./services/registerService";
import "./styles/style.scss";
import { BASE_FRONTEND_URL } from "./utils/initUserStatus";

document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (
      document.getElementById("registerName") as HTMLInputElement
    ).value;
    const email = (document.getElementById("registerEmail") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("registerPassword") as HTMLInputElement
    ).value;

    const registeredUser = await createUser({ username, email, password });
    
    if (registeredUser) {
      await loginUser(email, password);
      location.href = BASE_FRONTEND_URL;
    }
  });
