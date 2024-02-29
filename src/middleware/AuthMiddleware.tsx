
import { Navigate } from "react-router-dom";

interface AuthMiddlewareProps{
    children:any;
}
export default function AuthMiddleware({children}:AuthMiddlewareProps){
        
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");       
    return user?.token !== undefined ? children : <Navigate to="/auth/signin" replace={true} />;

}