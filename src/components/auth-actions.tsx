import { Navigate, useSearchParams } from "react-router-dom";

function AuthAction({children}:{children:JSX.Element}){
    const [searchParams] = useSearchParams();

    let mode:string | null = searchParams.get('mode')
    let oobCode:string | null = searchParams.get('oobCode')

    if(mode === 'resetPassword'){
        const resetPasswordPath = `/auth/password-reset?oobCode=${oobCode}`;

        return <Navigate to={resetPasswordPath} replace/>
    }else if( mode === 'verifyEmail'){
        const confirmEmailPath = `/auth/confirm-email?oobCode=${oobCode}`;

        return <Navigate to={confirmEmailPath} replace />
    }

    return children;


}

export default AuthAction