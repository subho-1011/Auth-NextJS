"use server";

import { z } from "zod";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email or password is incorrect!" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation email sent!" };
    }

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
