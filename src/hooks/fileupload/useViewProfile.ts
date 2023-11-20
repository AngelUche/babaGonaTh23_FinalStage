import { UserProfileInterface } from "../../data/AddUserFormInterface";
import {  doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { fireStoreTxtData } from "../../firebase/firebaseStorage";
import { initialUser } from "../../data/AddUserFormInterface";

interface useViewProfileProps {
  id: string | undefined;
}

export const useViewProfile = ({ id }: useViewProfileProps) => {
  const [currentUser, setCurrentUser] = useState<UserProfileInterface>(initialUser);
  const [isLoading, setIslaoding] =useState(false)

  const fetchUserProfile = async () => {
    setIslaoding(true)
    if (id) {
      const docRef = doc(fireStoreTxtData, 'user Data', id);
  
      try {
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserProfileInterface;
          setCurrentUser(userData);
          
        } else {
          console.error("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }finally{
        setIslaoding(false)
      }
    } else {
      console.error("ID is undefined");
    }
  };
  

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  return { currentUser, setCurrentUser, isLoading };
};
