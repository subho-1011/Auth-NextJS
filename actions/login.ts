"use server";

import { z } from "zod";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/settings",
        });

        return { success: "Email sent!" };
    } catch (err: any) {
        console.log(err);
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }

        throw err;
    }
};
