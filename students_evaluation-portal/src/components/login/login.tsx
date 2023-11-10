// import logo from "../../assets/logo.png";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState} from "react";
import { useAppDispatch, } from "../../hooks";
import { KeySVG } from "../../assets/admin";
    // navigate to ome after setting the user details 
import { useUpdateUser } from "../../hooks/redux/useUpdateUser";
import { useSignInWithEmailAndPassword } from "../../hooks";

// }
const Login = () => {

  
    const dispatch = useAppDispatch();

  // DEFINENING HOOKS TO HANDLE THE INPUT
  const [PersonsLoggedin, setPersonsLoggedin] = useState({
    email: "",
    password: "",
  });

  // getting the function from the custom hook

  const {signInWithGoogleAuth, isSIWGoogleLoading} =useUpdateUser()
  const {error, SignInWithEmailAndPassword,isLoading} =useSignInWithEmailAndPassword()

  // FUNCTION TO HANDLE IN CHANGE EVENT

  // FUNCTION TO NAVIGATE TO THE VARIOUS USER DASHBOARD
  function NavigateToAdminDashbord(e: any) {
    e.preventDefault();
   const {email, password} =PersonsLoggedin
   SignInWithEmailAndPassword({email,password})

  }


  function HandleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setPersonsLoggedin({ ...PersonsLoggedin, [name]: value });
    
  }

  

  return (
    // BACKGROUND IMAGE SET UP
    <div
      className="w-full h-screen relative bg-loginBgImg bg-cover bg-no-repeat bg-center">
      {/* <div className="home-image-con">
        <img src={coridor} alt="coridor" className="home-image" />
      </div> */}

      <div className="fixed inset-0 bg-[rgba(0,0,0,0.43)] flex flex-col justify-center items-center">
        {/* LOGO SET UP */}
        {/* <div className="absolute top-[7vh] left-[50%] translate-x-[-60%] overflow-hidden">
          <img className="w-full h-full" src={logo} alt="logo" />
        </div> */}

        {/* MAIN PAGE FOR WELCOME BACK */}
        <div className="mt-[40px] bg-sideNavbg w-[20rem] sm:w-[30rem] md:w-[38rem] h-max  flex flex-col py-8 px-10 rounded-lg">
          <h1 className="font-bold mb-3 self-start text-gray-100">
            Welcome Back, Kindly Login Here
          </h1>
          <p className='f text-red-500 font-mono text-[17px]'>{error}</p>

          <div className="flex flex-col mt-3 gap-y-14">
            <form
              className="flex flex-col gap-y-9"
              onSubmit={NavigateToAdminDashbord}
            >
              {/* ID FIELD DATA */}
              <div className="relative h-12">
                <i>
                  <BsFillPersonFill
                    className="absolute top-[50%] translate-y-[-50%] left-3"
                    color="gray"
                    size={22}
                  />
                </i>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="border-2 focus:border-amber-700 rounded-sm pl-[40px]
                  w-full h-full mb-6 outline-none"
                  value={PersonsLoggedin.email}
                  name="email"
                  required
                  onChange={HandleChange}
                />
              </div>

              <div>
                {/* PASSWORD FIELD */}
                <div className="flex text-xs justify-between mr-2 font-semibold  text-amber-500 mb-2 ">
                  <h1> Password</h1>
                </div>

                <div className="relative h-12">
                  <span className="absolute top-[50%] translate-y-[-50%] text-[grey] left-3">
                    <KeySVG size={22} />
                  </span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="border-2 focus:border-amber-700 rounded-sm pl-[40px] w-full h-full mb-6 outline-none"
                    required
                    name="password"
                    value={PersonsLoggedin.password}
                    onChange={HandleChange}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 sm:flex-row justify-between">
              <button type="submit" className="py-[10px] sm:px-[70px] md:px-[100px] rounded-[6px] bg-amber-700 text-white capitalize">{isLoading?"loading":"login"}</button>
                <Link to='/signUp' className=" py-[10px] sm:px-[70px] md:px-[100px] rounded-[6px] bg-amber-700 text-white capitalize flex justify-center">Sign Up</Link>

              </div>
            </form>
              <button  className="py-[18px] sm:px-[70px] md:px-[100px] rounded-[6px]
              transition ease-in-out delay-150   duration-300 
              hover:bg-[#a5886b] bg-[#7a6045] text-white capitalize" onClick={signInWithGoogleAuth}>{isSIWGoogleLoading?"loading":"Sign In WIth Google" }</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
