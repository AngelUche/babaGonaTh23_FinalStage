// jshint esversion:6
import { AddUserView } from "../../../../views/admin";
import { AddUserModal } from "../../../../components/admin/modals";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/admin";

function AddUserPage() {

    const { status: AddUserPrompt } = useSelector((store: RootState) => store.addUser);

    return (
        
            <div className="w-full h-full flx justify-center items-center bg-cover bg-no-repeat bg-center bg-signUpBgImg">
            {/* Render the Add user prompt modal to select a type of user to Add */}
            {(AddUserPrompt) && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.43)] flex flex-col justify-center ml-44 items-center">
                <AddUserModal />
             </div>
            )}

            {/* Render the Add User Form if the modal is not rendered */}
            {
                AddUserPrompt ? null : <AddUserView />
            }

            </div>
    
    );

}

export { AddUserPage }