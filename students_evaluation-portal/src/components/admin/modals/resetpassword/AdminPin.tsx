
import { useState, useRef , useEffect, FormEvent} from "react";


const userPinLength = 4;
interface AdminPinProps{
  ProcceToADD:any,
  title:string
}

export const AdminPin = ({ProcceToADD, title}:AdminPinProps) => {
  const [ErrorMs, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [pin, setPin] = useState("");
  const [isError, setIsError] =useState(false)


  let myTimeout:number |undefined

  // If Error, Clear pin, Change button desc from loading to initial title
  useEffect(() => {

    if (isError) {
      setPin("");
      // Focus the input again
      inputRef.current?.focus();
      return;
    }
  }, [isError]);

  async function onSubmit(e: FormEvent) {
    // Prevent refresh of page
    e.preventDefault();

    if (pin.length < userPinLength) {
      setErrorState(true);

      // Focus the input again
      inputRef.current?.focus();
      return;
    }

  
    // next();
    if (myTimeout) {
      clearTimeout(myTimeout); 
    }

  }



  return (
    <form onSubmit={(e) => { onSubmit(e); }}  >
      {/* Container */}
      <div className="w-full mx-auto h-[160px] flex flex-col bg-white mt-5 ">
        {/* Form Header */}
        <div className="flex flex-col items-center text-base pointer-events-none">
          <p className="text-[1rem] w-[300px] sm:w-[400px] md:w-[430px] text-center px-7 font-CabinetGrotesk-Bold ">Please enter your PIN</p>
          <h2 className="text-[red] font-Manrope-Regular text-[13px] text-center">{ErrorMs}</h2>
        </div>

        {/* Form Input */}
        <div className=" flex justify-center gap-x-3 mt-6 mb-2">
          <input
            ref={inputRef}
            type="text"
            autoFocus
            className="opacity-0 absolute top-[42.5%] border-[1px] border-blue-300 h-[46px] w-[50%] bg-red-500 "
            maxLength={6}
            inputMode="numeric" // Display the user numeric keypad
            value={pin}
            // Ensure only digits from 1 to 9 is entered and nothing else
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1"); }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setErrorState(false);
              setPin(e.target.value);
            }}
            // Refocus input element when out of focus
            onBlur={() => inputRef.current?.focus()} />

          {/* Form Pin Input Display */}
          <div className={`w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] bg-gray-200 border-[2px] rounded-[10px] flex items-center justify-center ${pin.length == 0 ? `${errorState || isError ? `border-red-500` : `border-brandColor`}` : "border-gray-300"} `}>{pin.length >= 1 ? pin.slice(0,1) : ""}</div>
          <div className={`w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] bg-gray-200 border-[2px] rounded-[10px]  flex items-center justify-center ${pin.length == 1 ? `${errorState || isError ? `border-red-500` : `border-brandColor`}` : "border-gray-300"} `}> {pin.length >= 2 ? pin.slice(1,2): ""} </div>
          <div className={`w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] bg-gray-200 border-[2px] rounded-[10px]  flex items-center justify-center ${pin.length == 2 ? `${errorState || isError ? `border-red-500` : `border-brandColor`}` : "border-gray-300"} `} > {pin.length >= 3 ? pin.slice(2,3): ""}</div>
          <div className={`w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] bg-gray-200 border-[2px] rounded-[10px]  flex items-center justify-center ${pin.length >= 4 ? `${errorState || isError ? `border-red-500` : `border-brandColor`}` : "border-gray-300"} `}>{pin.length >= 4 ? pin.slice(3,4) : ""}</div>
        </div>

        <div className="w-full flex justify-center mt-3 text-[16px] font-Manrope-Regular">
          <button type="submit" className="bg-sideNavbg w-[80%] py-3 text-white rounded" onClick={ProcceToADD}>{title}</button>
        </div>
      </div>
    </form>
  )
}

