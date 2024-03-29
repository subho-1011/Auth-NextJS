"use client";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => onClick("github")}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};
