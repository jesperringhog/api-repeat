import { loginUser } from "../services/loginService";
import { createUser } from "../services/registerService";

export const initRegister = async () => {
  const username = (document.getElementById("registerName") as HTMLInputElement)
    .value;
  const email = (document.getElementById("registerEmail") as HTMLInputElement)
    .value;
  const password = (
    document.getElementById("registerPassword") as HTMLInputElement
  ).value;

  const success = await createUser({ username, email, password });

  if (success) {
    await loginUser(email, password);
    window.location.href = "http://localhost:5173";
  }
};
