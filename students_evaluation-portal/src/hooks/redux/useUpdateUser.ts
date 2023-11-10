import { auth } from "../../firebase/firebaseAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { setUserDetails } from "../../features/admin/userAuth";
import { useState } from "react";

export function useUpdateUser() {
  const provider = new GoogleAuthProvider();
  const navigateTo = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function
  // const { user } = useAppSelector((state) => state.userAuth);
  const [isSIWGoogleLoading, setIsSIWGoogleLoading] = useState(false);

  async function signInWithGoogleAuth() {
    try {
      setIsSIWGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;

      // Dispatch an action to update user data in the Redux store
      dispatch(
        setUserDetails({
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          email: userData.email,
        })
      );

      navigateTo("/home");
    } catch (error:any) {
      alert(error.message);
    } finally {
      setIsSIWGoogleLoading(false);
    }
  }

  return { signInWithGoogleAuth, isSIWGoogleLoading };
}
