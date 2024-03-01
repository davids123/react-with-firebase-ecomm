// import { AuthContext } from "@/context/auth-context";
// import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps{
    children:React.ReactNode;
}

export default function RequireAuth({children}:RequireAuthProps){   

    console.log("==================current user ================");   
    const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
    console.log('==========current user======');
    console.log(currentUser);
    return currentUser?.stsTokenManager?.accessToken !== undefined ? children : <Navigate to="/auth/signin" replace={true} />;
}
