import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserLayout({ children }) {
    return (
        <ProtectedRoute allowedRole="USER">
            {children}
        </ProtectedRoute>
    )
}