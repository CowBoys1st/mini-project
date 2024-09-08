import dynamic from "next/dynamic";

// Dynamic import untuk LoginForm tanpa SSR
const LoginForm = dynamic(() => import("@/components/loginForm"), { ssr: false });

export default function Login() {
    return (
        <>
            <LoginForm />
        </>
    );
}
