/* eslint-disable @typescript-eslint/no-unused-vars */

import { getApiURL } from "@/src/lib/utils";
import { getUserMeLoader } from "./get-user-me-loader";
import { getAuthToken } from "./get-token";
import { TransactionItem } from "@/src/types/types";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  email: string;
  password: string;
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

export async function postNewTransactionItem({ amount, name, type, transactionDate }: TransactionItem) {
  const authToken = await getAuthToken();
  const { data } = await getUserMeLoader()
  const { id } = data
  const url = `${baseUrl}/${id}/transactions`;
  const date = transactionDate ?? new Date()

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ name, amount, type, transactionDate: date }),
    });

    return response.json();
  } catch (error) {
    console.error("Post Transaction Item Service Error:", error);
  }
}
export async function updateUserTransaction({ amount, id }: Pick<TransactionItem, "amount" | "id">): Promise<TransactionItem | string> {
  const authToken = await getAuthToken();
  const url = `${baseUrl}/transactions/${id}`;

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
    console.error("Update Transaction Item Service Error:", error);
    return `ERROR: ${error}`
  }
}

export async function getUserExpenses() {
  const authToken = await getAuthToken();
  const { data } = await getUserMeLoader()
  const { id } = data
  const url = `${baseUrl}/${id}/transactions/expense`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });

    return response.json();
  } catch (error) {
    console.error("Get User Transactions Service Error:", error);
  }
}

export async function getUserEarnings() {
  const authToken = await getAuthToken();
  const { data } = await getUserMeLoader()
  const { id } = data
  const url = `${baseUrl}/${id}/transactions/earning`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });

    return response.json();
  } catch (error) {
    console.error("Get User Transactions Service Error:", error);
  }
}

export async function deleteUserTransaction(transactionId: string) {
  const authToken = await getAuthToken();
  const url = `${baseUrl}/transactions/${transactionId}`;

  try {
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });
    return { ok: true }
  } catch (error) {
    console.error("Post Transaction Item Service Error:", error);
    return { ok: false }

  }
}

export async function isUserLogged() {
  const user = await getUserMeLoader()
  return user

}