import { SignOutUser, userStateListener } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children?:ReactNode
}

export const AuthContext = createContext({
    //user come from firebase auth-public.d.ts
    currentUser: {} as User | null,
    setCurrentUser:(_user:User) => {},
    signOut:() => {}
});

export const AuthProvider = ({children}:Props) => {
    const [currentUser,setCurrentUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const unsubscribe = userStateListener((user)=>{
            if(user){
                setCurrentUser(user);
            }
        });
        return unsubscribe
    },[setCurrentUser]);

    // As soon as setting the current user to null
    // the user will be redirect to the home page
    const signOut = () => {
        SignOutUser()        
        setCurrentUser(null)
        navigate('/auth/signin');
    }
    const value = {
        currentUser,
        setCurrentUser,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}