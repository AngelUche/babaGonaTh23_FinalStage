import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseImageData,fireStoreTxtData } from "../../firebase/firebaseStorage";
import { UserProfileInterface, initialUser } from "../../data/AddUserFormInterface";
import { uid } from 'uid';
import { addDoc, collection } from "firebase/firestore";
// import { UserProfileInterface, } from "../../../data/AddUserFormInterface";
import { useState } from "react";



export function useAdduserDetails(){

  // User saves Changes
  // const [imageUpload, setImageUpload] = useState<File>();
  const [imageURL, setImageURL] = useState<any | null>("")   
  const [currentUser, setCurrentUser] = useState({} as UserProfileInterface);

  // Selected class if user a student
  const [selectedClass, setSelectedClass] = useState("");

  // Selected class if user a student
  const [selectedGender, setSelectedGender] = useState("");
  const [isLoading, setIsloading] = useState(false);
  async function addUseInfo() {
   
    // Build up remaining data from select input
    setCurrentUser((currentUser: UserProfileInterface) => {
        return {
            ...currentUser,
            gender: selectedGender,
            Image:imageURL,
            // age:currentUser.age
            id:uid(),
        };
    });

    try {

        if(imageURL===""){
            throw new Error("Image is Required")
            // return
        }
        setIsloading(true)
        const images = ref(FirebaseImageData, `images/${uid()}`);
        // uploading the images to the firebase server
        const  result = await uploadBytes(images, imageURL)

        // getting the image url from the firebase server
        const img = await getDownloadURL(result.ref)

        // setting the data base collection 
        const DataValue =collection(fireStoreTxtData, "user Data")
        await addDoc(DataValue, 
            {firstName:currentUser.firstName, lastName:currentUser.lastName, 
                otherName:currentUser.otherName, faculty:selectedClass,studentId:uid(),
                address:currentUser.address, email:currentUser.email, gender:selectedGender,
                phoneNumber:currentUser.phoneNumber, image:img,age:Number(currentUser.age),
            })
       
            alert("data added succesfully")
            setCurrentUser(initialUser)
            setImageURL("")
    } catch (error:any) {
        alert(error.message)
    }finally{
        setIsloading(false)
    }
}
return {addUseInfo,imageURL, setImageURL,currentUser, setCurrentUser,selectedClass, setSelectedClass ,selectedGender, setSelectedGender, isLoading}
}