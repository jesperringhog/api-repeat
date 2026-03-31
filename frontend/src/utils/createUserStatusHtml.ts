export const createUserStatusHtml = (loggedIn: string) => {
  const statusContainer = document.createElement("div");
  const userStatus = document.createElement("p");

  userStatus.textContent = `User: ${loggedIn}`;

  statusContainer.appendChild(userStatus);
  document.getElementById("header")?.appendChild(statusContainer);
};
