
import { EditProfileInterface } from "../../data/AddUserFormInterface";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseAuth";

interface AddUserViewProps {
  user: EditProfileInterface;
  setUser: any;
}

export const EditProfileForm = ({setUser,user,  }:AddUserViewProps) => {
  const [signInedWIth, setSignedInWith] = useState<string|undefined>("");
       // to get how individual signed in
       useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            
          // if (user?.providerData[0].providerId === "password") {
            setSignedInWith(user?.providerData[0].providerId );
          // }
        });
        return () => {
          listen();
        };
      }, []);


  return (
    <div>
    {/* Form fields */}
    <div className="py-1 max-h-[45vh] flex flex-col gap-y-2 overflow-y-auto px-5 justify-center ">
      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* FirstName */}
        <div className="flex flex-col">
          <label className="text-sm font-bold capitalize text-gray-700" htmlFor="surname">First Name</label>
          <input
          className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
          type="text"
          value={user.firstName}
          required
          onChange={(e) => {
            setUser((currentUser: EditProfileInterface) => {
            return { ...currentUser, firstName: e.target.value };});}}/>
        </div>

      {/* Othername */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-700"htmlFor="otherName">Other Name</label>
          <input
            className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
            value={user?.otherName}
            required
            onChange={(e) => {setUser((currentUser: EditProfileInterface) => {return { ...currentUser, otherName: e.target.value };});}}
          />
      </div>

           
    </div>

        {/* Email and phone Number section*/}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
             {/* LastName */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-700"htmlFor="surname">Last Name</label>
        <input
          className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
          type="text"
          value={user?.lastName}
          required
          onChange={(e) => {setUser((currentUser: EditProfileInterface) => {return { ...currentUser, lastName: e.target.value };});}}
        />
      </div>

            {/* Email - if found */}
      {signInedWIth==="password" &&
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700"htmlFor="email">Email</label>
          <input
            className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
            type="email"
            id="email"
            value={user.email}
            required
            onChange={(e) => {setUser((currentUser: EditProfileInterface) => {return { ...currentUser, email: e.target.value };});}}
            />
        </div>
      }
           
    </div>
    </div>
</div>
  )
}

