import { onSnapshot, collection } from "firebase/firestore";
import { fireStoreTxtData } from "../../firebase/firebaseStorage";
import { UserProfileInterface } from "../../data/AddUserFormInterface";
import { useEffect, useState } from "react";


export const useFetchDatabase = () => {
  const [studentData, setStudentData] = useState<UserProfileInterface[]>([]);
  const [isLoading, setIsLaoding] =useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const dataValue = collection(fireStoreTxtData, "user Data");
      let allData: UserProfileInterface[] = [];

      // Use try-catch for error handling
      try {
        setIsLaoding(true)
        const unsubscribe = onSnapshot(dataValue, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            // get the user details and assign them to the user data
            const userData: UserProfileInterface = {
              docId: doc.id,
              age:doc.data().age,
            
              lastName: 'Orjii',
            
              gender: 'Female',
            
              image: doc.data().image,
            
                
              faculty: doc.data().faculty,
            
              phoneNumber: doc.data().phoneNumber,
            
              studentId:doc.data().studentId,
            
              address: doc.data().address,
            
              firstName: doc.data().firstName,
            
              otherName:doc.data().otherName,
            
              email: doc.data().email,
            
              department: doc.data().department,
            
              isBlackListed: doc.data().isBlacklisted,
              // docId: doc.id,
              ...doc.data(),
            }


            allData.push(userData);
          });

          setStudentData(allData);
        });

        // Clean up the snapshot listener when the component unmounts
        return () => unsubscribe();
      } catch (error:any) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
        throw new Error(error.message);
      }finally{
        setIsLaoding(false)
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will only run once when the component mounts

  return { studentData, isLoading };
};
