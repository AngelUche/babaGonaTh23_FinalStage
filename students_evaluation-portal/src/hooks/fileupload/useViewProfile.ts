import { UserProfileInterface } from "../../data/AddUserFormInterface";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { fireStoreTxtData } from "../../firebase/firebaseStorage";

interface useViewProfileProps {
  id: string | undefined;
}

const initialUser: UserProfileInterface = {
  age: undefined,
  docId: "",
  studentId: "",
  firstName: "",
  lastName: "",
  otherName: "",
  address: "",
  phoneNumber: "",
  email: "",
  gender: "",
  image: "",
  faculty: "",
  imageURL: ""
};

export const useViewProfile = ({ id }: useViewProfileProps) => {
  const [currentUser, setCurrentUser] = useState<UserProfileInterface>(initialUser);
  const [isLoading, setIslaoding] =useState(false)

  const fetchUserProfile = async () => {
    if (id) {
      const docRef = doc(fireStoreTxtData, 'user Data', id);
  
      try {
        setIslaoding(true)
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
