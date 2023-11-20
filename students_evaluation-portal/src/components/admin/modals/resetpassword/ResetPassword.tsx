// jshint esversion:6
import { useState } from "react";
import { KeySVG, CancelSVG, CancelFillSVG } from "../../../../assets/admin";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../../firebase/firebaseAuth";
import { updatePassword} from "firebase/auth";



// interface to set the user password
interface UserPassword{
    currentPassword:string,
    newPassword:string,
    confirmPassword:string

}
function ResetPasswordModal() {

    const [Password, setPassword] = useState<UserPassword>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // loadng state
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate();
    const [passwordVissible, setPasswordVissible]=useState<boolean>(false);


    function handleFormClose() {
        navigate("/home");
    }
    
    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Check if the password matches
        if (Password.newPassword !== Password.confirmPassword) {
          alert("Passwords do not match");
          // Exit the function early if passwords don't match
          return; 
        }
      
        const user = auth.currentUser;
        if (user) {
            // Start the loading 
          setLoading(true); 
      
          //  update the user's password
          updatePassword(user, Password.newPassword)
            .then(() => {
              alert("Password successfully changed");
              // Redirect to the login page on success
              navigate("/login"); 
            })
            .catch((error) => {
              alert("Failed to update password: " + error.message);
            })
            .finally(() => {
                // Stop the loading state, regardless of success or failure
              setLoading(false); 
            });
        } else {
          alert("User not authenticated. Please sign in.");
        }
      }
      
    

    return (
        <>
            <div className="w-[380px] p-9 bg-white rounded-md">
                {/* Form Header */}
                <h1 className="flex gap-x-2 items-center">
                    <span className="text-2xl font-bold text-sideNavbg">Reset Password</span>
                    <span className="text-[#038f4d]" ><KeySVG size={25} /></span>
                    <span className="text-red-500 hover:shadow-lg hover:text-red-700 ml-auto" onClick={((e: any) => {
                        e.stopPropagation();
                        handleFormClose();
                    })} ><CancelFillSVG size={20} /></span>
                </h1>

                {/* Form Fields */}
                <form className="flex flex-col my-5 gap-y-5" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-y-1">
                        <label className="font-mono text-sm font-bold text-gray-500" htmlFor="currentPassword">Current password</label>
                        <input
                            type={passwordVissible?"text":"password"}
                            id="currentPassword"
                            value={Password.currentPassword}
                            required
                            className={"p-3 w-full outline-none selection:shadow-inner rounded-[4px] border-[1px] border-[#1e462a59] focus-visible:shadow-md"}
                            // onChange={((e: any) => setPassword({...passwaord, currentPassword:e.target.value}))}
                            onChange={(e) => setPassword((prevPassword) => ({...prevPassword,currentPassword: e.target.value,}))}
                            />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label className="font-mono text-sm font-bold text-gray-500" htmlFor="newPassword">New password</label>
                        <input
                            type={passwordVissible?"text":"password"}

                            id="newPassword"
                            value={Password.newPassword}
                            required
                            onChange={(e) => setPassword((prevPassword) => ({...prevPassword,newPassword: e.target.value,}))}
                            className={"p-3 w-full outline-none selection:shadow-inner rounded-[4px] border-[1px] border-[#1e462a59]  focus-visible:shadow-md"} />
                    </div>

                    <div className="flex flex-col gap-y-1">
                        <label className="font-mono text-sm font-bold text-gray-500" htmlFor="confirmPassword">Confirm password</label>
                        <input
                            type={passwordVissible?"text":"password"}
                            id="confirmPassword"
                            value={Password.confirmPassword}
                            required
                            onChange={(e) => setPassword((prevPassword) => ({...prevPassword,confirmPassword: e.target.value,}))}
                            className={"p-3 w-full outline-none selection:shadow-inner rounded-[4px] border-[1px] border-[#1e462a59]  focus-visible:shadow-md"} />
                    </div>
                    <button type="button" className="p-2 py-2 rounded-[4px] self-start border-[1px] shadow-md border-[#d8d8d8] " onClick={()=>setPasswordVissible((prev=>!prev))}>See Passwod</button>

                    {/* Submit buttons */}
                    <div className="mt-[1rem]">
                        <button type="submit" className="p-1 py-4 w-full mt-3 font-bold rounded bg-[#038f4d] text-white hover:bg-[#055c32]" >{loading?"loading...":"Submit"}</button>
                    </div>
                </form>

            </div>

        </>

    );
}

export { ResetPasswordModal };