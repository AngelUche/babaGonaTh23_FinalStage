// jshint esversion:6
import { AddUserModal } from "../../../../components/admin/modals";

function AddUserPage() {


    return (
        
            <div className="w-full h-full flx justify-center items-center bg-cover bg-no-repeat bg-center bg-signUpBgImg">
                <div className="fixed inset-0 z-10 bg-[rgba(0,0,0,0.43)] flex flex-col justify-center items-center">
                    <AddUserModal />
                </div>
            </div>
    
    );

}

export { AddUserPage }