import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export default function ProtectedRoute({ children }){
    const { session } = useAuth()
    
    return session ? children : <Navigate to="/login" />
}