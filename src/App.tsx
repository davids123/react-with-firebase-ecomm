
import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import routes from './routes'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Ecommerce from './pages/Dashboard/Ecommerce';
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from './context/auth-context';
import RequireAuth from '@/components/require-auth';
import AuthActions from '@/components/auth-actions';
import AuthUserActions from './pages/Authentication/AuthUserActions';
import ConfirmEmail from './pages/Authentication/ConfirmEmail';
import Spinner from './components/Spinner';
//import HomePage from './pages/client/HomePage';


const DefaultLayout = lazy(()=>import('./layout/DefaultLayout'));
export default function App() {
  const [loading,setLoading] = useState<boolean>(true);
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  // NOTE: console log for testing purposes
  console.log('User:', !!currentUser);
  let location = useLocation();
  
  useEffect(()=>{
    
    if(currentUser){
      //setLoading(true);
      navigate(location);
      
      
    }
    setTimeout(()=>setLoading(false),1000);

  },[currentUser])

  return loading ? (
    <Spinner />
  ) : (
    
      <>
        <Toaster />
        <Routes>
          {/* <Route index element={<HomePage/>} /> */}
          <Route path="/auth/signin" element={<SignIn/>} />
          <Route path="/auth/signup" element={<SignUp/>} />
          <Route path="/auth/confirm-email" element={<ConfirmEmail/>} />
          <Route 
                path="/auth/action" 
                element={
                  <AuthActions>
                    <AuthUserActions />
                  </AuthActions>
                } 
          />
          <Route element={ <RequireAuth><DefaultLayout /></RequireAuth>}>
            <Route index element={<Ecommerce />} />
            { routes.map((routes,index)=>{
                const {path,component:Component } = routes;
                return(
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<Spinner />}
                      >
                        <Component />
                      </Suspense>
                    }
                  />
                )
              })
            }
          </Route>
        </Routes>        
      </>
    
  )
}


