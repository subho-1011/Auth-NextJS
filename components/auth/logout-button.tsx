"use client";

import { logout } from "@/actions/logout";

import { useRouter } from "next/navigation";

export const LogoutButton = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();

    const onClick = () => {
        logout();
    };
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
