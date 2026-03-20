import { loginUser } from "../services/loginService";

const header = document.getElementById("header");

export const initLogin = async () => {
  const email = (document.getElementById("loginEmail") as HTMLInputElement)
    .value;
  const password = (
    document.getElementById("loginPassword") as HTMLInputElement
  ).value;

  const loggedInUser = await loginUser(email, password);

  if (loggedInUser) {
    const status = document.createElement("h2");
    status.textContent = `Logged in as ${loggedInUser.name}`;
    header?.appendChild(status);
  }
};
