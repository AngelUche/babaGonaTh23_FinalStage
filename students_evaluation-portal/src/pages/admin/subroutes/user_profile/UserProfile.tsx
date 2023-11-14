// jshint esversion:6
import { UserProfileModal } from "../../../../components/admin/modals";
import { useSelector } from "react-redux";
import { RootState} from "../../../../store/admin";

function UserProfilePage() {
    // Render the Profile Modal prompt or main profile page
    const { status: EmptyProfileStatus, id: UserId} = useSelector((store: RootState) => store.userProfile);

    return (
        <div className=" bg-signUpBgImg pt-8 bg-cover bg-no-repeat bg-center">

            {/* Render the Profile prompt modal to pick a profile if no profile has been directly selected from dashboard home page */}
            {/* {(EmptyProfileStatus) && ( */}
                <div className="">
                 <div className="fixed inset-0 bg-[rgba(0,0,0,0.43)] flex flex-col justify-center md:ml-44 items-center">
                    <UserProfileModal />
                 </div>
                </div>
            {/* )} */}

          
        </div>
    );
}

export { UserProfilePage }