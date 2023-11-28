// jshint esversion:6
import { UserProfileModal } from "../../../../components/admin/modals";

function UserProfilePage() {

    return (
        <div className=" bg-signUpBgImg pt-8 bg-cover bg-no-repeat bg-center">
            <div className="">
             <div className="fixed inset-0 bg-[rgba(0,0,0,0.43)] flex flex-col justify-center md:ml-44 items-center">
                <UserProfileModal />
             </div>
            </div>
        </div>
    );
}

export { UserProfilePage }