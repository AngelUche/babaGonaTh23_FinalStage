import { EditProfileForm } from "./EditProfileForm"
import { useEditProfile } from "../../hooks/firebase/useEditProfile"
import { CancelFillSVG } from "../../assets/admin";
import { useAppSelector } from "../../hooks";
import { UploadUserImage } from "../admin/modals/adduser/UploadUserImage";
import { FormEvent } from "react";

export const EditUserProfile = () => {
  const  {setUser, user,isLoading,  updateUserDetails, setPreviewImage, previewImage} =useEditProfile()
  const {displayName,email} = useAppSelector((state)=>state.userAuth)

 function submitForm(e:FormEvent){
  e.preventDefault()
  updateUserDetails()
 }



  return (
    <form className="max-w-[900px] mx-auto mt-[80px] px-6 py-[30px]" onSubmit={submitForm}>
    {/* Form container */}
    <div className="relative shadow-md py-[60px] pt-[70px] px-4  bg-[#ffffff]">
    {/* Cancel button */}
      <div className="absolute  top-5 right-5 cursor-pointer">
        <div className="text-red-500 hover:shadow-lg hover:text-red-700" ><CancelFillSVG size={20} /></div>
      </div>
        <div className="flex flex-col gap-5">
            <div className="py-3 border-b-[1px] border-b-gray-400 flex items-start gap-3">
                  {/* User Rounded Image */}
              <div className="w-[80px] h-[80px] rounded-sm overflow-hidden" > <UploadUserImage setPreviewImage={setPreviewImage} previewImage={previewImage} /></div>
              {/* user name */}
              <div className="ml-auto text-xs text-gray-700 font-mono mr-4 self-center">
                {displayName !="" &&<p className="text-sm font-mono text-gray-600 capitalize">{`${displayName}`}</p>}
                {email !="" &&<p className="text-sm font-mono text-gray-600">{`${email}`}</p>}
              </div>
          </div>
          <EditProfileForm user={user} setUser={setUser}/>
        </div>
    </div>
        <div className="mt-5 flex justify-center">
           <button
             type="submit"
              className="w-full max-w-[300px] mx-auto rounded uppercase py-3 bg-[#0e6931] hover:bg-[#0d791f] hover:shadow-xl text-white font-mono font-bold">
                 {isLoading?"laoding": "Save User profile"}
            </button>
          </div>
      </form>
  )
}

