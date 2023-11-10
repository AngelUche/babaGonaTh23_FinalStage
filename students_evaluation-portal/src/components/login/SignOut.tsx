import { signOut } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebaseAuth"

interface signOutProps{
  onClose:(status:boolean)=>void
}

export const SignOut = ({onClose}:signOutProps) => {
  const navigateTo =useNavigate()
  const [loading, setIsLoading] =useState(false)

  async function signOutUser(){
    try {
        setIsLoading(true)
        const result= await signOut(auth )
             navigateTo('/')
             
             console.log(result);
    } catch (error) {
        console.log(error);
        
    }finally{setIsLoading(false)}
            
      
}
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.43)] flex flex-col justify-center items-center">
   

    {/* MAIN PAGE FOR WELCOME BACK */}
    <div className="mt-[40px] bg-sideNavbg w-[20rem] sm:w-[30rem] md:w-[38rem] py-9 h-max  flex flex-col  px-10 rounded-lg">
      <h1 className="font-bold mb-3 self-center text-[22px] text-gray-100 py-6">
        Are you sure you wat to sign out
      </h1>
      <div className="w-full flex flex-col gap-4  sm:flex-row justify-between">
        <button  className="py-[10px] sm:px-[70px] md:px-[100px] rounded-[6px] bg-amber-700 text-white capitalize" onClick={()=>onClose(false)}>No</button>
        <button className="py-[10px] sm:px-[70px] md:px-[100px] rounded-[6px] bg-amber-700 text-white capitalize" onClick={signOutUser}>{loading?"loading":"Yes"}</button>
      </div>
    </div>
  </div>
  )
}

