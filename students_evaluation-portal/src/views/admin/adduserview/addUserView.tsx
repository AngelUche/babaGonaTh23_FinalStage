// jshint esversion:6
import { FormEvent, useState } from "react";
import { CancelFillSVG } from "../../../assets/admin";
import { UploadImage } from "../../../components/admin";
// import {  } from "../../../data/admin";
import { toggleAddUserPromptStatus } from "../../../features/admin/adduserSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { AddUserForm } from "./AddUserForm";
import { useAdduserDetails } from "../../../hooks/fileupload/useAddUserDetails";

import { CustomWebcam } from "./CustomeWebCam";


type WebcamProp = {
    setImageURL: (imgSrc: any | null) => void
}


function AddUserView() {

    const {addUseInfo,imageURL, setImageURL,currentUser, setCurrentUser,selectedClass, setSelectedClass ,selectedGender, setSelectedGender, isLoading} =useAdduserDetails()
    const dispatch = useAppDispatch();

    // const { status, type: UserPositionType } = useAppSelector((store) => store.addUser);

    const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);
 
    function handleOpenAddUserModal() {
        // toggleAddUserPromptStatus({ status: true, type: undefined });
        dispatch(toggleAddUserPromptStatus({ status: true, type: undefined }))
    }


  async function submitEditedProfile(e:FormEvent) {
    e.preventDefault()
    await addUseInfo()

  }



    // function handleImageFileUpload(event: any) {
    //     setImageURL(URL.createObjectURL(event.target.files[0]));
    // }

    return (
     <>
     <form className="max-w-[900px] mx-auto mt-6 px-6 py-[30px]" onSubmit={submitEditedProfile}>
          {/* Form container */}
       <div className="relative shadow-md py-5 px-4 bg-[#ffffff]">
          {/* Cancel button */}
         <div className="absolute  top-5 right-5 cursor-pointer">
           <div className="text-red-500 hover:shadow-lg hover:text-red-700" onClick={handleOpenAddUserModal}><CancelFillSVG size={20} /></div>
         </div>
        <div className="flex flex-col gap-5">
          <div className="py-3 border-b-[1px] border-b-gray-400 flex items-start gap-3">
                 {/* User Rounded Image */}
            {isWebcamOpen &&<CustomWebcam setImageURL={setImageURL} closeModal={() => setIsWebcamOpen(false)}/>}
            <div className="w-[80px] h-[80px] rounded-sm overflow-hidden" onClick={()=>setIsWebcamOpen(true)}> 
            <UploadImage imageURL={imageURL} />
            </div>
                            {/* User ID */}
            <div className="text-gray-600">
            {/* <h2 className="text-gray-800">{`${currentUser?.firstName} ${currentUser?.lastName}`}</h2> */}
              <span className="font-bold text-xs">ID: </span>
              <span className="text-xs">{currentUser?.studentId}</span>
            </div>

                     {/* User POSITION */}
            <div className="ml-auto text-xs text-gray-700 font-mono self-center">
              {currentUser.firstName !="" || currentUser.lastName !="" &&<p className="text-sm font-mono text-gray-600 capitalize">{`${currentUser.firstName} ${currentUser.lastName}`}</p>}
            </div>
         </div>

      
        <AddUserForm currentUser={currentUser} selectedClass={selectedClass} selectedGender={selectedGender} setCurrentUser={setCurrentUser} setSelectedClass={setSelectedClass} setSelectedGender={setSelectedGender}/>
        </div>
                </div>

                <div className="mt-5 flex justify-center">
                    <button
                        type="submit"
                        className="w-full max-w-[300px] mx-auto rounded uppercase py-3 bg-[#0e6931] hover:bg-[#0d791f] hover:shadow-xl text-white font-mono font-bold"
                    >
                       {isLoading?"laoding": "Save User profile"}
                    </button>
                </div>
            </form>
        </>
    );
}

export { AddUserView };
