/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TransactionItem } from "@/src/types/types";
import { deleteUserTransaction, isUserLogged, loginUserService, postNewTransactionItem, registerUserService, updateUserTransaction, getUserTransactions, getUserData, postNewCard, getUserCards, updateUserCard, deleteUserCard } from "../services/auth-services";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const cks = await cookies();

  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData || responseData.error) {
    return {
      ...prevState,
      message: responseData?.error || "Ops! Something went wrong.",
    };
  }

  cks.set("jwt", responseData.token, config);
  redirect("/layout/dashboard");
}


const schemaLogin = z.object({
  email: z
    .string()
    .min(3, {
      message: "Email must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const cks = await cookies();

  const validatedFields = schemaLogin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData || responseData.error) {
    return {
      ...prevState,
      message: responseData?.error || "Ops! Something went wrong.",
    };
  }
  cks.set("jwt", responseData.token, config);
  redirect("/layout/dashboard");
}

export async function addTransactionItem(formData: FormData) {
  const transactionItem = {
    name: formData.get("name"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    type: formData.get("type"),
    transactionDate: formData.get("transactionDate"),
    frequency: formData.get("frequency"),
  }

  const response = await postNewTransactionItem({
    name: transactionItem.name as string,
    amount: Number(transactionItem.amount),
    category: transactionItem.category as string,
    transactionDate: transactionItem.transactionDate as string,
    type: transactionItem.type as "expense" | "profit",
    frequency: transactionItem.frequency as "variable" | "fixed",
  });

  return response
}
export async function addCardItem(formData: FormData) {
  const cardItem = {
    name: formData.get("name"),
    available: formData.get("available"),
    color: formData.get("color"),
    limit: formData.get("limit"),
    expirationDate: formData.get("expirationDate"),
  }

  const response = await postNewCard({
    name: (cardItem.name as string).trim(),
    available: Number(cardItem.available),
    color: cardItem.color as string,
    limit: Number(cardItem.limit),
    expirationDate: cardItem.expirationDate as string
  });

  return response
}
export async function updateTransactionItem(formData: FormData, id: string) {
  const formDataObj = Object.fromEntries(formData.entries()) as Record<string, string>;

  const filteredData = Object.entries(formDataObj).reduce((acc, [key, value]) => {
    if (!value.trim()) return acc;

    switch (key) {
      case "amount":
        acc[key] = Number(value);
        break;
      case "transactionDate":
      case "type":
      case "category":
      case "frequency":
      case "name":
        acc[key] = value;
        break;
    }

    return acc;
  }, {} as Record<string, string | number>);

  await updateUserTransaction(filteredData, id);
}

export async function getTransactions(type: string) {
  return await getUserTransactions(type)
}

export async function deleteTransaction(id: string) {
  return await deleteUserTransaction(id)
}
export async function deleteCard(id: string) {
  return await deleteUserCard(id)
}

export async function getData() {
  const response = await getUserData()
  return response
}

export async function getCardItems() {
  return await getUserCards()
}

export async function updateCardItem(formData: FormData, id: string) {
  const formDataObj = Object.fromEntries(formData.entries()) as Record<string, string>;

  const filteredData = Object.entries(formDataObj).reduce((acc, [key, value]) => {
    if (!value.trim()) return acc;

    switch (key) {
      case "limit":
      case "available":
        acc[key] = Number(value);
        break;
      case "name":
      case "expirationDate":
        acc[key] = value;
        break;
    }

    return acc;
  }, {} as Record<string, string | number>);

  await updateUserCard(filteredData, id);
}

export async function logoutAction() {
  const cks = await cookies();
  cks.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

export async function checkUserLogged() {
  return await isUserLogged()

}