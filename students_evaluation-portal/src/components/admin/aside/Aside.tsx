// jshint esversion:6
import { NavLink } from "react-router-dom"
import { HomeSVG, UserSVG, AddUserSVG, MailSVG, KeySVG } from "../../../assets/admin"
import { toggleShowUserPreview } from "../../../features/admin/userpreviewSlice"
import { toggleShowUserProfile } from "../../../features/admin/userprofileSlice"
import { toggleAddUserPromptStatus } from "../../../features/admin/adduserSlice"
import { useAppDispatch } from "../../../hooks/redux"
// import { useEffect } from "react"
import {AiFillHome} from 'react-icons/ai'
import {FaSignOutAlt} from 'react-icons/fa'
import { SignOut } from "../../login/SignOut"
import { useState } from "react"



function AsideNavigation() {

       const [openSignOut, setOpenSignOut] =useState(false)

  

    const dispatch = useAppDispatch();

    // Close all modals upon any click on the side navigation bar
    function handleCloseAllModalsClick() {
        dispatch(toggleShowUserPreview({ status: false, id: undefined }));
        dispatch(toggleShowUserProfile({ status: true, id: undefined }));
        dispatch(toggleAddUserPromptStatus({ status: true, type: undefined }));
    }

    return (
        <>
            <aside className="w-full h-full bg-[#0f5257] shadow-lg overflow-y-auto" onClick={handleCloseAllModalsClick}>
                {/* <h1 className="p-5 mb-2 absolute font-bold text-white text-2xl md:hidden">Vitcrous</h1> */}
                <div className=" flex flex-col mt-16 gap-y-3">
                    <NavLink to="/home" end
                        className={({ isActive }) => `p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4 ${isActive ? "bg-sideNavbg px-5 border-l-4" : undefined}`}>
                        <HomeSVG />
                        <span className="text-xl">Home</span>
                    </NavLink>
                    <NavLink to="userprofile"
                        className={({ isActive }) => `p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4 ${isActive ? "bg-sideNavbg px-5 border-l-4" : undefined}`}>
                        <UserSVG size={25} />
                        <span className="text-xl">User Profiles</span>
                    </NavLink>
                    <NavLink to="/adduser"
                        className={({ isActive }) => `p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4 ${isActive ? "bg-sideNavbg px-5 border-l-4" : undefined}`}>
                        <AddUserSVG />
                        <span className="text-xl">Add User</span>
                    </NavLink>
                    {/* <NavLink to="viewresult"
                        className={({ isActive }) => `p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4 ${isActive ? "bg-sideNavbg px-5 border-l-4" : undefined}`}>
                        <ResultSVG />
                        <span className="text-xl">View Results</span>
                    </NavLink> */}
                    {/* <NavLink to="broadcastmail"
                        className={({ isActive }) => `p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4 ${isActive ? "bg-sideNavbg px-5 border-l-4" : undefined}`}>
                        <MailSVG />
                        <span className="text-xl">Broadcast Mail</span>
                    </NavLink> */}
                    <NavLink to="passwordreset"
                        className={({ isActive }) => `p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4 ${isActive ? "bg-sideNavbg px-5 border-l-4" : undefined}`}>
                        <KeySVG size={25} />
                        <span className="text-xl">Reset Password</span>
                    </NavLink>
                    <NavLink to="setting"
                        className={({ isActive }) => `p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4 ${isActive ? "bg-sideNavbg px-5 border-l-4" : undefined}`}>
                        <AiFillHome size={25} />
                        <span className="text-xl">Profile Settings</span>
                    </NavLink>

                    <button
                        className={`p-4 pl-5 text-white flex justify-start items-center gap-5 hover:border-l-4  bg-sideNavbgpx-5  `} onClick={()=>setOpenSignOut(true)}>
                        <FaSignOutAlt size={25} />
                    <span className="text-xl">Sign Out</span>
                    </button>
                </div>
            </aside>
            {openSignOut &&  <SignOut onClose={()=>setOpenSignOut(false)}/>}
           
        </>
    )
}
export { AsideNavigation }