/* eslint-disable @typescript-eslint/no-unused-vars */

import { getApiURL } from "@/src/lib/utils";
import { getUserMeLoader } from "./get-user-me-loader";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  email: string;
  password: string;
}

interface ExpenseItem {
  name: string;
  amount: number;
}

const baseUrl = getApiURL();

export async function registerUserService(userData: RegisterUserProps) {
  const url = `${baseUrl}/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = `${baseUrl}/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function postNewExpenseItem({ amount, name }: ExpenseItem) {
  const { data } = await getUserMeLoader()
  console.log(data);
  const { id } = data
  const url = `${baseUrl}/${id}/expenses`;
  console.log({ amount, name });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    });

    return response.json();
  } catch (error) {
    console.error("Post Expense Item Service Error:", error);
  }
}

export async function getUserExpenses() {
  const { data } = await getUserMeLoader()
  const { id } = data
  const url = `${baseUrl}/${id}/expenses`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error("Get User Expenses Service Error:", error);
  }
}

export async function isUserLogged() {
  const user = await getUserMeLoader()
  return user

}