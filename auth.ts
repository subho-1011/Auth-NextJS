import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);
            if (!existingUser?.emailVerified) {
                return false;
            }

            // TODO: Add 2FA check

            return true;
        },
        async session({ token, session }) {
            console.log({ sessionToken: token });

            return session;
        },

        async jwt({ token }) {
            console.log({ token });

            return token;
        },
    },

    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
