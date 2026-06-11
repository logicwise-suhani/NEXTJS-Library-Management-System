import { createFormAction } from "@/app/actions/auth";
import Login from "./Login";

export default function LoginPage() {
    return <Login createFormAction={createFormAction} />
}