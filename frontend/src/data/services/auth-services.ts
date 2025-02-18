/* eslint-disable @typescript-eslint/no-unused-vars */

import { getApiURL } from "@/src/lib/utils";
import { getUserMeLoader } from "./get-user-me-loader";
import { getAuthToken } from "./get-token";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  email: string;
  password: string;
}

export interface ExpenseItem {
  name: string;
  amount: number;
  type: string
  id?: string
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
    return null;

  }
}

export async function postNewExpenseItem({ amount, name, type }: ExpenseItem) {
  const authToken = await getAuthToken();
  const { data } = await getUserMeLoader()
  const { id } = data
  const url = `${baseUrl}/${id}/expenses`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ name, amount, type }),
    });

    return response.json();
  } catch (error) {
    console.error("Post Expense Item Service Error:", error);
  }
}
export async function updateUserExpense({ amount, id }: Pick<ExpenseItem, "amount" | "id">): Promise<ExpenseItem | string> {
  const authToken = await getAuthToken();
  const url = `${baseUrl}/expenses/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ amount }),
    });

    return response.json();
  } catch (error) {
    console.error("Update Expense Item Service Error:", error);
    return `ERROR: ${error}`
  }
}

export async function getUserExpenses() {
  const authToken = await getAuthToken();
  const { data } = await getUserMeLoader()
  const { id } = data
  const url = `${baseUrl}/${id}/expenses`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });

    return response.json();
  } catch (error) {
    console.error("Get User Expenses Service Error:", error);
  }
}

export async function deleteUserExpense(expenseId: string) {
  const authToken = await getAuthToken();
  const url = `${baseUrl}/expenses/${expenseId}`;

  try {
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });
    return { ok: true }
  } catch (error) {
    console.error("Post Expense Item Service Error:", error);
    return { ok: false }

  }
}

export async function isUserLogged() {
  const user = await getUserMeLoader()
  return user

}