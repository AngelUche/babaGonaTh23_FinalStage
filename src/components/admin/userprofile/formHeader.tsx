// jshint esversion:6

import { useState } from "react"

interface UserProfileFormHeaderProps {
    userImage: string
    // userName: string
    userFirstName: string
    userLastName: string
    userOtherName: string
    userSection: string
    userId: string
    OpenWebCam:any
    imageURL:any|null
    editProfileStatus:boolean

}

function FormHeader({ userImage, userOtherName, userFirstName, userLastName, userSection, userId, OpenWebCam , imageURL,editProfileStatus}: UserProfileFormHeaderProps) {
    
    const [enlargeImageOpen, setEnlargeImageOpen] =useState<boolean>(false)
    function OpenEnlargeImage(){
        setEnlargeImageOpen(true)
    }
    return (
        <>
        <div className="py-3 border-b-[1px] border-b-gray-400 flex flex-col sm:flex-row items-center gap-3 capitalize">
            {/* User Rounded Image */}
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                <img className="w-full h-full" src={imageURL.preview?imageURL.preview:userImage} alt="" 
                onClick={editProfileStatus ? OpenWebCam : OpenEnlargeImage}
                />
            </div>

            {/* User ID */}
            <div className="text-gray-600">
                <h2 className="text-gray-800">{`${userFirstName} ${userOtherName} ${userLastName} `}</h2>
                <span className="font-bold text-xs">ID: </span>
                <span className="text-xs">{userId}</span>
            </div>

            {/* User Faculty */}
            <div className="sm:ml-auto text-xs gap-x-1 flex text-gray-700 font-mono">
                <p className="font-bold font-arial">FACULTY:</p>
                <p className="text-sm font-mono text-gray-600 uppercase" > {`${ userSection}`}</p>
            </div>
        </div>
    {enlargeImageOpen&&<EnlargeImage image={userImage} onClose={()=>setEnlargeImageOpen(false)}/>}
        </>
    );
}

export { FormHeader }

interface userImageInterface{
    image:string
    onClose:()=>void
}

function EnlargeImage({image, onClose}:userImageInterface){
    return <div className="fixed inset-0 bg-[black]/60 flex justify-center items-center" onClick={()=> onClose()}> 
        
            <img src={image} className="sm:w-[400px] w-[350px] h-[280px] object-cover sm:h-[300px]" alt=""    onClick={(e: React.MouseEvent) => e.stopPropagation()}/>
    </div>
}