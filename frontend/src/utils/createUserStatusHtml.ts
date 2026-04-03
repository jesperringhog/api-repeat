export const createUserStatusHtml = (status: string) => {
  const statusContainer = document.createElement("div");
  const userStatus = document.createElement("p");

  userStatus.textContent = `User: ${status}`;

  statusContainer.appendChild(userStatus);
  document.getElementById("header")?.appendChild(statusContainer);
};
