
import {SiMicrosoftexcel} from 'react-icons/si'
import {FaFilePdf} from 'react-icons/fa' 
import {RxCross2} from 'react-icons/rx'
import { downloadExcel } from '../../../../utils/getExcelFilex'
import { useFetchDatabase } from '../../../../hooks/firebase/useFetchDatabase'
import { useEffect, useState } from 'react'
import { downloadPdf } from '../../../../utils/getPdfDpwanload'

interface exportProps{
  onClose:()=>void
}

export const ExportUserDetailModal = ({onClose}:exportProps) => {
  const { studentData} = useFetchDatabase()
  const [errorMessage, setErrorMessage] =useState<string>("")

    // set a variable to get the timer
    let MyTimeOut: NodeJS.Timeout | undefined;

   // Download Excel
   const handleExcelDownload = () => {
    // add check to make sure that the function does not execute if the data is empty
    if(studentData.length ===0){
      setErrorMessage("Sorry, no data to download")
      MyTimeOut=setTimeout(()=>{
        setErrorMessage("")
      }, 3000)
      return
    }
    downloadExcel(studentData, 'user_data.xlsx');
    onClose()
  };


  // Download Excel
  const handlePDFDownload = () => {
    // add check to make sure that the function does not execute if the data is empty
    if(studentData.length ===0){
      setErrorMessage("Sorry, no data to download")
      MyTimeOut=setTimeout(()=>{
        setErrorMessage("")
      }, 3000)
      return
    }
    downloadPdf(studentData);
    onClose()
  };

  useEffect(() => {
    if (MyTimeOut) {
      clearTimeout(MyTimeOut);
    }
  }, []);
  return (
    <div className="bg-black/60 fixed inset-0 flex justify-center items-center z-[300]">
      <div className="flex items-center flex-col justify-start gap-5 mb-4 bg-[#f1e4e4] w-[280px] md:w-[320px] h-[220px] py-3 px-4 relative">
        <RxCross2 className='j self-end text-red-600 font-bold cursor-pointer text-[32px]' onClick={onClose}/>
        <p className='text-red-500'>{errorMessage}</p>
        <p className='font-sans font-bold text-lg'>Download User data</p>
        <div className='flex gap-9'>
          <button className="px-4 py-2 rounded-[16px] shadow-2xl "> <SiMicrosoftexcel className='text-[48px]' onClick={handleExcelDownload}/></button>
          <button className="px-4 py-2 rounded-[16px] shadow-2xl "> <FaFilePdf className='text-[48px]' onClick={handlePDFDownload}/></button>
        </div>
      </div>
    </div>
  )
}

