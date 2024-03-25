import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-gradient-to-t from-sky-200/80 to-blue-400/70">
            <div className="space-y-6 text-center">
                <h1>
                    <span className={cn(font.className, "text-4xl")}>🔐 Next.js</span>
                    <span className={cn(font.className, "text-4xl")}> Auth</span>
                </h1>
                <p className=" to-white text-lg">A simple authentication service</p>
                <LoginButton>
                    <Button variant="secondary" size="lg">
                        {" "}
                        Sign in
                    </Button>
                </LoginButton>
            </div>
        </main>
    );
}
