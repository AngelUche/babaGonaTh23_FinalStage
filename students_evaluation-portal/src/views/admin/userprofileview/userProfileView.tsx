// jshint esversion:6
// import {  useState } from "react";
// import { retrieveUserData } from "../../../utils/admin";
import { EditSVG, CancelFillSVG } from "../../../assets/admin";;
import { FormHeader, FormInput } from "../../../components/admin/userprofile";
import { classData } from "../../../data/studentData";
import { UserProfileInterface, } from "../../../data/AddUserFormInterface";
import { useParams } from "react-router-dom";
import { useViewProfile } from "../../../hooks/fileupload/useViewProfile";
import { Loading } from "../Loading";
import { Modal } from "../../../components/admin/modals/Modal";
import { AdminPin } from "../../../components/admin/modals/resetpassword/AdminPin";
import { useUpdateDoc } from "../../../hooks/firebase/useUpdateDoc";
import { CustomWebcam } from "../adduserview/CustomeWebCam";
import { useState } from "react";



function UserProfileView() {


    // const studentData = useAppSelector((state) => state.userAuth.studentData); 
  const {id}= useParams()
    const {currentUser, setCurrentUser, isLoading} =useViewProfile({id})

    const {temporaryUser,updateUserData, setTemporaryUser, updateDocLoading,isOpenPINForm, setIsOpenPINForm,editProfileStatus, setEditProfileStatus,imageURL, setImageURL} =useUpdateDoc()
    const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);

    
    
    function setProfileImage() {
        setCurrentUser((currentUser: UserProfileInterface) => ({
          ...currentUser,
          image: imageURL,
        }));
      }

    // if (!currentUser) {
    //     return null;
    // };
    if (isLoading){
        return <Loading title="Loading user Info ..."/>
    }



    // User saves Changes
     function submitEditedProfile() {
        // Set the Edit profile to hold latest user changes
        setTemporaryUser({ ...currentUser });

             updateUserData()
        // Clear Edit menu
    }

    return (
        <div className=" bg-signUpBgImg pt-8 bg-cover bg-no-repeat bg-center">
        <div className="h-full max-w-[900px] mx-auto px-6 py-[30px]">

            {/* Form container */}
            <div className="relative shadow-md py-5 px-4 bg-[#fffcfc]">

                {/* Edit | Cancel button */}
                <div className="absolute  top-5 right-5 cursor-pointer">
                    {editProfileStatus ?
                        (<div className="text-red-500 hover:shadow-lg hover:text-red-700" onClick={()=>{
                            setEditProfileStatus(false);
                            if (temporaryUser) {
                                setCurrentUser(temporaryUser);
                            }
                        }}>
                            <CancelFillSVG size={20} />
                        </div>) :
                        (<div className="text-blue-600 hover:text-blue-900" onClick={()=> setEditProfileStatus(true)}><EditSVG size={20} /></div>)
                    }
                </div>

                {/* Form Header */}
                <div className="flex flex-col gap-5">
                    <FormHeader userId={currentUser.studentId} imageURL={imageURL} editProfileStatus={editProfileStatus} OpenWebCam={()=>setIsWebcamOpen(true)} userImage={currentUser.image} userFirstName={currentUser.firstName} userLastName={currentUser.lastName}  userSection={currentUser?.faculty} />

                    {/* Form fields */}
                    <div className="py-1 flex flex-col gap-y-2 max-h-[51vh] overflow-y-auto">

                        {/* Name Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

                            {/* FirstName */}
                            <FormInput id="firstName" type="text" label="First name" editProfileStatus={editProfileStatus} value={currentUser.firstName} onChange={(e) => {
                                setCurrentUser((currentUser: UserProfileInterface) => {
                                    return { ...currentUser, firstName: e.target.value }
                                })
                            }} />



                            {/* Othername */}
                            <FormInput id="otherName" type="text" label="Other name" editProfileStatus={editProfileStatus} value={currentUser.otherName} onChange={(e) => {
                                setCurrentUser((currentUser: UserProfileInterface) => {
                                    return { ...currentUser, otherName: e.target.value }
                                })
                            }} />

                            {/* LastName */}
                            <FormInput id="lastName" type="text" label="Last name" editProfileStatus={editProfileStatus} value={currentUser.lastName} 
                            onChange={(e) => {
                                setCurrentUser((currentUser: UserProfileInterface) => {
                                    return { ...currentUser, lastName: e.target.value }
                                })
                            }} 
                            />
                        </div>

                        {/* Email and phone NUmber section*/}
                        <div className="flex flex-col gap-y-2">
                                    <FormInput id="email" type="email" label="Email" editProfileStatus={editProfileStatus} value={currentUser.email?.toLowerCase()} onChange={(e) => {
                                        setCurrentUser((currentUser:UserProfileInterface) => {
                                            return { ...currentUser, email: e.target.value }
                                        })
                                    }} />

                            {/* Phone Number */}
                            <FormInput id="telephone" type="tel" label="Phone number" editProfileStatus={editProfileStatus} value={currentUser.phoneNumber} onChange={(e) => {
                                setCurrentUser((currentUser:UserProfileInterface) => {
                                    return { ...currentUser, phoneNumber: e.target.value }
                                })
                            }} />

                        </div>

                        {/* Address */}
                        <FormInput id="address" type="text" label="Address" editProfileStatus={editProfileStatus} value={currentUser.address}
                         onChange={(e) => {
                            setCurrentUser((currentUser:UserProfileInterface) => {
                                return { ...currentUser, address: e.target.value }
                            })
                        }} 
                        />


                        {/* Position, Gender, Class? */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

                            {/* Gender */}
                            <div className="flex flex-col justify-end basis-full">
                                <label className="text-sm font-bold text-gray-700" htmlFor="gender">Gender</label>
                                <select id="gender" 
                                className={`p-[10px] text-gray-700 text-[14px] rounded-sm ${editProfileStatus ? "border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none" : "bg-formFieldBg"} `} 
                                disabled={!editProfileStatus} value={currentUser.gender} 
                                  onChange={(e) => {
                                    setCurrentUser((currentUser:UserProfileInterface) => {
                                        return { ...currentUser, gender: e.target.value }
                                    })
                                }} 
                                >
                                    <option value={"Male"}>Male</option>
                                    <option value={"Female"}>Female</option>
                                </select>
                            </div>

                            {/* Designation */}
                            {/* {currentUser?.faculty && ( */}
                                <div className="flex flex-col basis-full">
                                    <label className="text-sm font-bold text-gray-700" htmlFor="designation">Designation</label>
                                    <select
                                        className={`p-[10px] text-gray-700 text-[14px] rounded-sm ${editProfileStatus ? "border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none" : "bg-formFieldBg"} `}
                                        value={currentUser.faculty}
                                        disabled={!editProfileStatus} 
                                    //     onChange={(e) => {
                                    //         setSelectedClass(e.target.value)
                                    //     }}
                                    // >
                                    onChange={(e) => {
                                        setCurrentUser((currentUser:UserProfileInterface) => {
                                            return { ...currentUser, faculty: e.target.value }
                                        })
                                    }} 
                                    >
                                        {
                                            classData.map((classData) => {
                                                return (
                                                    <option key={classData.id} value={classData.faculty}>
                                                        { classData.faculty}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            {/* )} */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Open Modal to input pin */}
                 {isOpenPINForm && <Modal closeModal={()=>setIsOpenPINForm(false)}> <AdminPin ProcceToADD={submitEditedProfile} title={updateDocLoading?"loading":"Submit"}/></Modal>}
                                        
            {/* Button to render based on edit profile status */}
            <div className="mt-5 flex justify-center">
                {editProfileStatus ?
                    (<button className="w-full max-w-[300px] mx-auto rounded uppercase py-3 bg-[#0e6931] hover:bg-[#0d791f] hover:shadow-xl text-white font-mono font-bold" onClick={()=>setIsOpenPINForm(true)} >Save User profile</button>)
                    :
                    (<button className="w-full max-w-[300px] mx-auto rounded uppercase py-3 bg-[blue] hover:bg-[#0202c5] hover:shadow-xl text-white font-mono font-bold" onClick={()=> setEditProfileStatus(true)} >Edit user profile</button>)
                }

            </div>
        </div >
        {isWebcamOpen &&<CustomWebcam setProfileImage={setProfileImage} setImageURL={setImageURL} closeModal={() => setIsWebcamOpen(false)}/>}

    </div>

    )
}

export { UserProfileView };