import { GetUsers } from "@/services/UserService";
import UserManagement from "./UserManagement";

export const metadata = {
    title: "Users Management",
    description: "Manage library users",
};

export default function UsersPage() {
    console.log("SERVER FETCHING INITIALLY");
    const response = async () => await GetUsers({ page: 1, limit: 10 });

    return (
        <UserManagement initialUsers={response.users} initialPagination={response.pagination} />
    );
}      