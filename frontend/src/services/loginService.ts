export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status === 200) return response.ok;
  } catch (error) {
    console.error(error);
  }
};
