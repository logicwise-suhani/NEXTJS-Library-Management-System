import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
    return (
        <ProtectedRoute allowedRole="ADMIN">
            {children}
        </ProtectedRoute>
    )
}