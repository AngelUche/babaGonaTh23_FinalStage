import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpInputForm } from '../forminputcomp/SignUpInputForm';

import {AiFillEyeInvisible} from 'react-icons/ai'
import {MdVisibility} from 'react-icons/md'
import { useFirebaseAuth } from '../../hooks/firebase/useFirebaseAuth';

export interface SignUpDetail {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface passwordVisisbility {

  ispasswordVissible: boolean;
  confirmPasswordVissible: boolean;
}


const SignUp = () => {
  // destructuring the properties for the sign up with enail and password from firebase
  const {fireBaseSignUpWithEmail, error,isLoading} = useFirebaseAuth()
  // nitialize TimeOut

  const [formData, setFormData] = useState<SignUpDetail>({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // state to set the password and confirm password visibility
  const [vissibility, setVissibility] = useState<passwordVisisbility>({
    ispasswordVissible: false,
    confirmPasswordVissible: false,
  });
 
  // function to subit form to the server
  async function HandleSubmitUser(e: React.FormEvent) {
    e.preventDefault();
    // const {email, password}=formData
    fireBaseSignUpWithEmail(formData)
  }



  // function to catch the hanlde change
  function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  }
 


  return (
    <div className="w-full h-screen relative bg-signUpBgImg bg-cover bg-no-repeat bg-center ">
      <div className="sign-up fixed inset-0 bg-[rgba(0,0,0,0.7)] flex flex-col justify-center items-center">
        <div className="text-white px-3">
          <h2 className="title">I do not have an account </h2>
          <span>Sign up with email and password</span>
          <p className='f text-red-500 font-mono text-[17px]'>{error}</p>
        </div>
        <form className="w-[280px] md:w-[320px] relative pb-12" onSubmit={HandleSubmitUser}>
          {/* <SignUpInputForm id="displayName"type="text"value={formData.displayName}HandleChange={HandleChange}label="Display Name"name="displayName" required={true}/> */}
          <SignUpInputForm id="email" type="email"value={formData.email}HandleChange={HandleChange}label="Email"name="email" required/>
          <div className='relative' >
            <SignUpInputForm id='password' type={vissibility.ispasswordVissible?"password" :"text"} value={formData.password} HandleChange={HandleChange} label="Password" name='password' required />
           
            {/* <div className='absolute cursor-pointer top-2 right-[-7px] bg-slate-500' onClick={togglePasswordVisibility}>
              {vissibility.ispasswordVissible?<AiFillEyeInvisible color='white' size={28} className='absolute cursor-pointer top-2 right-[-37px]'/>:
              <MdVisibility color='white' size={28} className='absolute cursor-pointer top-1 right-[-37px]'/>}
            </div> */}
          </div>
          <div className='relative bg-red-400'>
            <SignUpInputForm id="confirmPassword"type={vissibility.confirmPasswordVissible?"password":"text"} value={formData.confirmPassword}HandleChange={HandleChange}label="Confirm Password"required name='confirmPassword'/>
            {/* <div className='absolute cursor-pointer top-2 right-[-7px] bg-slate-500' onClick={toggleConfirmPasswordVisibility}>
              {vissibility.confirmPasswordVissible?<AiFillEyeInvisible color='white' size={28} className='absolute cursor-pointer top-2 right-[-37px]'/>:
              <MdVisibility color='white' size={28} className='absolute cursor-pointer top-1 right-[-37px]'/>}
            </div> */}
          </div>
          <button type="submit" className='text-white bg-[#1b1453] px-9  absolute bottom-0 right-0 py-3 rounded-[8px]'>{isLoading?"loading":"Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
