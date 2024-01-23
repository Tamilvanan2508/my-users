"use server";

const URL = "https://api.github.com/users";

export const getUsersList = async () => {
  try {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const getUserDetails = async (userName: string) => {
  try {
    const response = await fetch(`${URL}/${userName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
};
