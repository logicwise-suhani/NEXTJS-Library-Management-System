import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import SidePanel from "@/components/SidePanel";

export default function AdminLayout({ children }) {
    return (
        <ProtectedRoute allowedRole="ADMIN">
            {children}
            <Navbar />
            <SidePanel />
        </ProtectedRoute>
    )
} 