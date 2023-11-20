import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { UserProfileInterface } from "../../data/AddUserFormInterface";
import { fireStoreTxtData,FirebaseImageData } from "../../firebase/firebaseStorage";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useViewProfile } from "../fileupload/useViewProfile";
import { uid } from 'uid';

export function useUpdateDoc(){
    // State to hold current user and edit user profile to make reverting possible.
    const [temporaryUser, setTemporaryUser] = useState<UserProfileInterface |undefined>();
    const {id} =useParams()
    const {currentUser, } =useViewProfile({id})
    const [imageURL, setImageURL] = useState<any | null>("")   




    // boolan to reder loading 
    const [updateDocLoading, setUpdateDocLoading] =useState<boolean>(false)

    // to open the pin for for admin to put in their pin
    const [isOpenPINForm, setIsOpenPINForm]=useState<boolean>(false)


    // to edit userDetail
    const [editProfileStatus, setEditProfileStatus] = useState<boolean>(false);



    async function updateUserData() {
      if (!temporaryUser || !id) {
        // Handle the case where temporaryUser or docId is missing
        
        return;
      }
      
      
      setUpdateDocLoading(true)
      const dataRef = doc(fireStoreTxtData, "user Data", id);
      let img=imageURL
      try {
        if(imageURL!=""){

          const images = ref(FirebaseImageData, `images/${uid()}`);
          // uploading the images to the firebase server
          const  result = await uploadBytes(images, imageURL)
          
          // getting the image url from the firebase server
          img = await getDownloadURL(result.ref)
        }
        console.log(temporaryUser.isBlackListed);
        
        
        const dataToUpdate = {
          age: temporaryUser.age ||currentUser.age,
          email: temporaryUser.email,
          faculty: temporaryUser.faculty ||currentUser.faculty,
          department: temporaryUser.department ||currentUser.department,
          firstName: temporaryUser.firstName ,
          gender: temporaryUser.gender ||currentUser.gender,
          lastName: temporaryUser.lastName,
          otherName: temporaryUser.otherName,
          phoneNumber: temporaryUser.phoneNumber,
          studentId: temporaryUser.studentId ,
          address:temporaryUser.address,
          image:temporaryUser.image ||img,
          isBlackListed:temporaryUser.isBlackListed  ||currentUser.isBlackListed
        };

        if (temporaryUser.address) {
          dataToUpdate.address = temporaryUser.address;
        }

        await updateDoc(dataRef, dataToUpdate);
        alert("User details updated successfully")
        setIsOpenPINForm(false)
        setEditProfileStatus(false);

      } catch (error:any) {
        // Handle errors
        alert(`Error updating document: ${error.message}`);
      }finally{setUpdateDocLoading(false)}
    }
    
  return{updateUserData, temporaryUser, updateDocLoading,setTemporaryUser, isOpenPINForm, setIsOpenPINForm,editProfileStatus, setEditProfileStatus,imageURL, setImageURL}
}