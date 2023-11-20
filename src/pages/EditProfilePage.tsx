import { EditUserProfile } from "../components/editProfile/EditUserProfile"

export const EditProfilePage = () => {
  return (


    <div className="w-full h-full flx justify-center items-center bg-cover bg-no-repeat bg-center bg-signUpBgImg">

    {/* Render the Add User Form if the modal is not rendered */}
     <EditUserProfile />
    </div>
  )
}

