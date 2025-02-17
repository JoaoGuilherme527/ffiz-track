/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteUserExpense, getUserExpenses, isUserLogged, loginUserService, postNewExpenseItem, registerUserService } from "../services/auth-services";

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
  redirect("/dashboard");
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
  redirect("/dashboard");
}

export async function addExpenseItem(formData: FormData) {
  const expenseItem = {
    name: formData.get("name"),
    amount: formData.get("amount"),
    type: formData.get("type")
  }

  const response = await postNewExpenseItem({
    name: expenseItem.name as string,
    amount: Number(expenseItem.amount),
    type: expenseItem.type as string
  });

  return response
}

export async function getExpenses() {
  const response = await getUserExpenses()
  return response
}

export async function deleteExpense(id: string) {
  const response = await deleteUserExpense(id)
  return response

}

export async function logoutAction() {
  const cks = await cookies();
  cks.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

export async function checkUserLogged() {
  const user = await isUserLogged()
  return user

}