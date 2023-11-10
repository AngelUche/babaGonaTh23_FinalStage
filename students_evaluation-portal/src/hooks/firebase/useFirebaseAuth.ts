import { auth } from "../../firebase/firebaseAuth";
import { createUserWithEmailAndPassword , updateProfile  } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../redux";
import { setUserDetails } from "../../features/admin/userAuth";

interface firebaseSignUp{
  email: string;
  password:string
  confirmPassword:string
  displayName:string
  
}
export function useFirebaseAuth(){

  const user = auth.currentUser;

  let myTimeout: NodeJS.Timeout | undefined;
 // state to display error if password do not match
 const [error, setError] = useState("")
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const dispatch =useAppDispatch()
 

 const navigate = useNavigate();

   async function fireBaseSignUpWithEmail({email, password, confirmPassword,}:firebaseSignUp){
    try {
      // to make sure that the password matches
      if(password !== confirmPassword) {
        setError("Password do not match")
        myTimeout = setTimeout(() =>{setError("")},3000)
        return
      }
       
      // check if the password is greater 6
      if(password.length<6 || confirmPassword.length <6){
        setError("Password must be atleast six charatcters")
        myTimeout = setTimeout(() =>{setError("")},3000)
        return
      }

      // login with password and email and navigate to home
      setIsLoading(true)
      const data = await createUserWithEmailAndPassword(auth, email, password)
        navigate('/login');
      dispatch(
        setUserDetails({
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          email: data.user.email,
          studentData: [],
        })
      );
      } catch (error:any) {
        console.log(error);
        alert(error.message)
      }finally{
        setIsLoading(false)
      }
  }

    // Make sure to clear the timeout when the component unmounts
    useEffect(() => {
      return () => {
        if (myTimeout) {
          clearTimeout(myTimeout);
        }
      };
    }, []);

  return {fireBaseSignUpWithEmail, error, isLoading}
}