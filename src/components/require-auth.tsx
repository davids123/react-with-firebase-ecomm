import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { useLocation,Navigate } from "react-router-dom";


function RequireAuth({children}:{children:JSX.Element}){
    const {currentUser} = useContext(AuthContext);
    let location = useLocation();
    //console.log(`===Current User======${JSON.stringify(currentUser)}====location=== ${JSON.stringify(location)}====`);

    if(!currentUser){
        return <Navigate to="/" state={{ from:location }} replace/>
    }   
    

    return children;
}
export default RequireAuth