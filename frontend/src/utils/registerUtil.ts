import { createUser } from "../services/registerService";

export const initRegister = async () => {
  const name = (document.getElementById("registerName") as HTMLInputElement)
    .value;
  const email = (document.getElementById("registerEmail") as HTMLInputElement)
    .value;
  const password = (
    document.getElementById("registerPassword") as HTMLInputElement
  ).value;

  const success = await createUser({ name, email, password });

  if (success) {
    //await login
    window.location.href = "http://localhost:5173";
  }
};
