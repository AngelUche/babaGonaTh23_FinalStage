// jshint esversion:6
import { ResetPasswordModal } from "../../../../components/admin/modals";

function PasswordReset() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center  bg-cover bg-no-repeat bg-center bg-signUpBgImg">

                    <ResetPasswordModal />
            </div>
        </>
    );
}

export { PasswordReset }