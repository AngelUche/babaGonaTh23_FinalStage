// jshint esversion:6
// import { useNavigate } from "react-router-dom";
import { CancelSVG } from "../../../../assets/admin";
import { getUserClass } from "../../../../utils/getUserClass";
// import { useAppDispatch, } from "../../../../hooks/redux";
import { Link } from "react-router-dom";
import { UserProfileInterface } from "../../../../data/AddUserFormInterface";

/**
 * @desc: View a preview of the User profile | redirect to the main user profile page
 * @param id: Id used to retrieve user details from mock DB 
 * @returns User object containing details about User
 * 
 */
interface userPreviewProps{
    selectedItem:UserProfileInterface
    onClose:any
}
function UserPreviewModal({selectedItem, onClose}:userPreviewProps) {

    return (
        <div className="w-[350px] bg-white rounded-[10px] overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Preview wrapped */}
            <div className="flex flex-col">

                {/* Preview Hero image */}
                <img className="w-[350px] h-[240px]" src={selectedItem.image} alt="avatar-img" />

                {/* User Preview Details */}
                <div className="flex flex-col gap-3 py-6 px-5">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col justify-between">
                            <h3 className="text-gray-700">Faculty</h3>
                            <span className="text-[12px] text-gray-500">ID: {selectedItem.studentId}</span>
                        </div>
                        <div className="h-full flex flex-col gap-1 justify-between items-end">
                            {selectedItem!.faculty && <p className="text-[12px] text-gray-800 font-mono"> {getUserClass(selectedItem!.faculty)?.faculty}</p>}
                            <a href={`mailto:${selectedItem.email}`} className="text-[12px] text-blue-700 font-mono">{selectedItem.email}</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-2">
                            <p className="text-sm py-2 text-gray-900 uppercase w-full border-b-[1px] border-gray-300"> {selectedItem.lastName} {selectedItem.firstName} {selectedItem.otherName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-700 pb-2 border-b-[1px] border-gray-300">{selectedItem.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[5fr,_1fr] gap-3">
                      
                    <Link to={`/userprofile/${selectedItem.docId}`} className="p-1 py-3 mt-3 flex items-center justify-center rounded bg-[#038f4d] text-white hover:bg-[#055c32]">
                     <button >View Profile</button>
                    </Link>
                        <button className="p-1 py-3 mt-3 flex justify-center items-center rounded bg-danger text-white hover:bg-[#a5201b] " 
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose()
                        }}
                        >
                            <CancelSVG size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { UserPreviewModal }
