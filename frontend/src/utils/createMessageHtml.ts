import type { Message } from "../models/Message";

export const createMessageHtml = (userMessage: Message) => {
  const chatContainer = document.getElementById("chatContainer");

  const messageContainer = document.createElement("div");
  const messageTag = document.createElement("p");
  const fromTag = document.createElement("p");
  const timeTag = document.createElement("p");
  
  const time = new Date(userMessage.time);

  messageTag.textContent = userMessage.message;
  fromTag.textContent = userMessage.from;
  timeTag.textContent = `${time.toLocaleDateString()} ${time.toLocaleTimeString}`;

  messageContainer.appendChild(fromTag);
  messageContainer.appendChild(messageTag);
  messageContainer.appendChild(timeTag);

  chatContainer?.appendChild(messageContainer);
};
