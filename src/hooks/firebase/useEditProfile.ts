import { updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";
import { useState } from "react";
import { EditProfileInterface } from "../../data/AddUserFormInterface";
// import { useAppSelector } from "../redux";


export function useEditProfile() {
  const [user, setUser] = useState({} as EditProfileInterface);
  const [isLoading, setIsLoading] =useState<boolean>(false)
  // const { photoURL} = useAppSelector((state)=>state.userAuth)

  const [previewImage, setPreviewImage] = useState<string>("")

  interface ProfileUpdateData {
    displayName: string;
    photoURL?: string;
  }  

  async function updateUserDetails() {
    try {
      // Get the current user from Firebase authentication
      const currentUser = auth.currentUser;
  
      // Check if the user is authenticated
      if (currentUser) {
        // Update the user's profile
        setIsLoading(true);
  
        const profileData: ProfileUpdateData = {
          displayName: `${user.firstName} ${user.lastName} ${user.otherName}`,
        };
  
        // Include the photoURL only if previewImage is not empty
        if (previewImage) {
          profileData.photoURL = previewImage;
        }
  
        await updateProfile(currentUser, profileData);
  
        alert("Profile updated successfully");
  
        // Check if the user wants to update their email address
        if (user.email) {
          // Update the user's email address
          await updateEmail(currentUser, user.email);
          alert("Profile updated successfully");
        }
      } else {
        // Handle the case where the user is not authenticated
        throw new Error("User not authenticated");
      }
    } catch (error) {
      // Handle errors, such as displaying an error message or logging the error
      console.error("Error updating user profile:", error);
    } finally {
      // Reset the loading state, regardless of success or failure
      setIsLoading(false);
    }
  }
  

  return { updateUserDetails, setUser, user , isLoading, setPreviewImage, previewImage};
}
