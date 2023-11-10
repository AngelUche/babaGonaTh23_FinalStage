// jshint esversion:6
import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { AsideNavigation } from "../../components/admin";
import { useAppSelector } from "../../hooks";
import imageProfile from '@/assets/ProfileImage.png'

function AdminLayout() {
    const { photoURL} = useAppSelector((state)=>state.userAuth)

    const [navOpen, setNavOpen] = useState<boolean>(false);


    function toggleNav() {
        setNavOpen(!navOpen);
    }


    return (
        <div onClick={()=>setNavOpen(false)}>
            {/* Admin Navigation - Visible across all screen sizes */}
            <nav
                className="sticky top-0 w-full h-[60px] flex items-center justify-center px-4 py-2 md:px-6 md:py-2 bg-sideNavbg shadow-lg"
                onClick={(e) => e.stopPropagation()}>
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-3xl text-white font-bold"> <NavLink to="/home">Virtuos</NavLink></h1>
                    <div>
                    <div className="hidden lg:block h-[50px] w-[50px] overflow-hidden rounded-full mr-12"><img src={photoURL? photoURL:imageProfile} className="w-full h-full" alt="" /></div>

                    </div>

                    {/* Mobile hamburger open and close menu */}
                    <div className="block lg:hidden cursor-pointer" onClick={toggleNav}>
                        {navOpen ? (
                            <AiOutlineClose size={25} color={"#ffffff"} />
                        ) : (
                            <AiOutlineMenu size={25} color={"#ffffff"} />
                        )}
                    </div>
                </div>
            </nav>
            {/* both mobile and desktop view side bar */}
            <div className={`fixed inset-y-0 lg:w-[15rem] mt-[60px] w-[271px] ${!navOpen && "-left-full"}  lg:left-0 z-[50]`}><AsideNavigation /> </div>
           
                {/* OutLet to render the components */}
             <div className="lg:pl-[15rem] h-[91.5vh] overflow-y-auto  grid grid-rows-1"onClick={() => setNavOpen(false)}>
                 <Outlet />
             </div>
        </div>
    );
}

export { AdminLayout };