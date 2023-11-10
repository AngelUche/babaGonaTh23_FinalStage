import { auth } from "../../firebase/firebaseAuth";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../redux";
import { setUserDetails } from "../../features/admin/userAuth";
interface firebaseSignUp{
  email: string;
  password:string
  
}

// Define a regex pattern to match the error code
const errorCodePattern = /auth\/([^)]+)\)/;



export function useSignInWithEmailAndPassword(){
  let myTimeout: NodeJS.Timeout | undefined;
 // state to display error if password do not match
 const [error, setError] = useState("")
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const navigate = useNavigate();
 const dispatch =useAppDispatch()



   async function SignInWithEmailAndPassword({email, password}:firebaseSignUp){
    try {
    
    if(password.length<6){
      setError("Password must be atleast six charatcters")
      myTimeout = setTimeout(() =>{setError("")},3000)

      return
    }

    setIsLoading(true)
    const data = await signInWithEmailAndPassword(auth, email, password,)
      // Signed up 
      dispatch(
        setUserDetails({
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          email: data.user.email,
        })
      );
      navigate('/home');        
    } catch (error:any) {
    const errorMessage = error.message;
      const errorCodeMatch = errorMessage.match(errorCodePattern);
      const errorCode = errorCodeMatch ? errorCodeMatch[1] : "unknown";
        setError(errorCode);
        
      }finally{setIsLoading(false)}
  }

    // Make sure to clear the timeout when the component unmounts
    useEffect(() => {
      return () => {
        if (myTimeout) {
          clearTimeout(myTimeout);
        }
      };
    }, []);

  return {SignInWithEmailAndPassword, error, isLoading}
}