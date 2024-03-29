"use client";

import { admin } from "@/actions/admin";

import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/form-success";
import { RoleGate } from "@/components/auth/role-gate";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { UserRole } from "@prisma/client";

import { toast } from "sonner";

const AdminPage = () => {
    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.error) {
                toast.error(data.error);
            }

            if (data.success) {
                toast.success(data.success);
            }
        });
    };

    const onApiRouteClick = () => {
        fetch(`/api/admin`).then((response) => {
            if (response.ok) {
                toast.success("Allowed API routes");
            } else {
                toast.error("Not allowed API routes");
            }
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className=" text-2xl font-semibold text-center">🔑 Admin</p>
            </CardHeader>
            <CardContent className=" space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content" />
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                        <p className="text-sm font-medium">
                            Admin-only API Route
                        </p>
                        <Button onClick={onApiRouteClick}>Click to test</Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                        <p className="text-sm font-medium">
                            Admin-only Server Action
                        </p>
                        <Button onClick={onServerActionClick}>
                            Click to test
                        </Button>
                    </div>
                </RoleGate>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
