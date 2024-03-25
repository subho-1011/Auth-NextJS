import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don`t have an account"
            backButtonHref="/auth/register"
            showSocial
        >
            <div>Login Form!</div>
        </CardWrapper>
    );
};
