import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { 
    NextOrObserver, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut,
    User, 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    applyActionCode
} from "firebase/auth";



const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);

export const registerUser = async(
    displayName:string,
    email:string,
    password:string
) =>{
    if(!email && !password) return;

    const userCredential = await createUserWithEmailAndPassword(
        auth,email,password
    );

    if(userCredential && auth.currentUser){
        try{
            sendEmailVerification(auth.currentUser)
            updateProfile(auth.currentUser,{
                displayName:displayName,
                photoURL:"https://robohash.org/2?set=set2"
            })
        }catch(error){
            console.log(error);
        }
    }

    return userCredential
}

export const confirmUserEmail = async(oobCode:string)=>{
    if(!oobCode) return;

    try{
        await applyActionCode(auth,oobCode)
        .then(()=> alert('Your email has been verified!'))
    }catch(error:any){
        alert(error.code)
    }

    return;
}

export const signInUser = async(
    email:string,
    password:string
) =>{
    if(!email && password) return;

    return await signInWithEmailAndPassword(auth,email,password)
}

export const userStateListener = (callback:NextOrObserver<User>) =>{
    return onAuthStateChanged(auth,callback)
}

export const SignOutUser = async() => await signOut(auth);