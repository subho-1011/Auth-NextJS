import React from "react";
import Navbar from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-t from-sky-200/80 to-blue-400/70">
            <Navbar />
            {children}
        </div>
    );
};

export default ProtectedLayout;
