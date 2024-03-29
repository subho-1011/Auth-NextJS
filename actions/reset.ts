"use server";

import { z } from "zod";

import { ResetSchema } from "@/schemas";

import { getAccountByUserId } from "@/data/account";
import { getUserByEmail } from "@/data/user";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const { email } = values;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found" };
    }

    // if provided google credentials then not reset password
    const account = await getAccountByUserId(existingUser.id);
    if (account?.provider == "google" || account?.provider == "github") {
        return { error: "You are not allowed to reset password" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset email sent!" };
};
