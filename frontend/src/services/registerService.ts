import axios from "axios";
import type { User } from "../models/User";

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/register",
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      { withCredentials: true },
    );

    if (response.status >= 200 && response.status < 300) return response.data;

    return response.status;
  } catch (error) {
    console.error(error);
  }
};
