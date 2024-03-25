import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-t from-sky-200/80 to-blue-400/70">
            {children}
        </div>
    );
};

export default AuthLayout;
