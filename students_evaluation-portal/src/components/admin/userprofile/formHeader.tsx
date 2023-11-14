// jshint esversion:6

interface UserProfileFormHeaderProps {
    userImage: string
    // userName: string
    userFirstName: string
    userLastName: string
    userSection: string
    userId: string
    OpenWebCam:any
    imageURL:any|null
    editProfileStatus:boolean

}

function FormHeader({ userImage, userFirstName, userLastName, userSection, userId, OpenWebCam , imageURL,editProfileStatus}: UserProfileFormHeaderProps) {
    return (
        <div className="py-3 border-b-[1px] border-b-gray-400 flex items-center gap-3 capitalize">
            {/* User Rounded Image */}
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                <img className="w-full h-full" src={imageURL.preview?imageURL.preview:userImage} alt="" 
                onClick={editProfileStatus ? OpenWebCam : undefined}
                />
            </div>

            {/* User ID */}
            <div className="text-gray-600">
                <h2 className="text-gray-800">{`${userFirstName} ${userLastName}`}</h2>
                <span className="font-bold text-xs">ID: </span>
                <span className="text-xs">{userId}</span>
            </div>

            {/* User POSITION */}
            <div className="ml-auto text-xs text-gray-700 font-mono">
                <p className="text-sm font-mono text-gray-600 uppercase" >{`${userSection}`}</p>
            </div>
        </div>

    );
}

export { FormHeader }