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
      console.log(response.data);
      sessionStorage.setItem("me", response.data.name);
      return response.data.name;
    }
  } catch (error: any) {
    console.error(error);
    return Error;
  }
};
