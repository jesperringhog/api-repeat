import { createUserStatusHtml } from "./createUserStatusHtml";

export const BASE_FRONTEND_URL = "http://localhost:5173";

export const initUserStatus = () => {
  const loggedIn = sessionStorage.getItem("me");

  if (!loggedIn) {
    location.href = `${BASE_FRONTEND_URL}/login`;
  } else {
    createUserStatusHtml(loggedIn);
  }
}