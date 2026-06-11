import { GetUsers } from "@/services/UserService";
import UserManagement from "./UserManagement";

export default function UsersPage() {
    const response = async () => await GetUsers({ page: 1, limit: 10 });

    return (
        <UserManagement initialUsers={response.users} initialPagination={response.pagination} />
    );
}