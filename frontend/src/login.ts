import { loginUser } from "./services/loginService";
import "./styles/style.scss";
import { BASE_FRONTEND_URL } from "./utils/initUserStatus";

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.getElementById("loginEmail") as HTMLInputElement)
    .value;
  const password = (
    document.getElementById("loginPassword") as HTMLInputElement
  ).value;

  const loggedInUser = await loginUser(email, password);

  if (loggedInUser) {
    location.href = BASE_FRONTEND_URL;
  }
});
