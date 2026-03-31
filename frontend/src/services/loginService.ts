import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email,
        password,
      },
      { withCredentials: true },
    );

    if (response.status >= 200 && response.status < 300) {
      sessionStorage.setItem("me", response.data.username);
      return response.data.username;
    }
  } catch (error) {
    console.error(error);
  }
};
