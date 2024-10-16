"use server";
import { LoginSchema } from "@/schemas/auth";
import { DEFAULT_LOGIN_RIDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import * as z from "zod";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!!" };
  }
  console.log("HITTT ACTION");
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_RIDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        case "CallbackRouteError":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Someting went wrong!" };
      }
    }
    throw error;
  }
};

export const registerAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = await LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!!" };
  }

  return { success: "Valid" };
};
