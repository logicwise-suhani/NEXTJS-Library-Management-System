import Navbar from "@/components/NavBar/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import SidePanel from "@/components/SidePanel/SidePanel";

export default function AdminLayout({ children }) {
    return (
        <ProtectedRoute allowedRole="ADMIN">
            {children}
            <Navbar /> 
            <SidePanel />
        </ProtectedRoute>
    )
} 