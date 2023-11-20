// jshint esversion:6
import { getFormattedDate, getTotalUsers } from "../../../utils";
import { SearchBar } from "../../../components/admin";
import { UserOverview  } from "../../../components/admin/dashboard";
import StudentSVG from "../../../assets/admin/svg/studentSVG.svg";
import { useEffect, useState } from "react";
import { StudentTable, } from "../../../components/admin/tables";

import { auth } from "../../../firebase/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useAppSelector } from "../../../hooks/redux";
import { UserProfileInterface } from "../../../data/AddUserFormInterface";
import { BiExport} from 'react-icons/bi'
import { ExportUserDetailModal } from "../../../components/admin/modals/userpreview/ExportUserDetailModal";
import { FacultySizeChart } from "../../../components/admin/dashboard/useroverview/FacultySizeChart";
import { useFetchDatabase } from "../../../hooks/firebase/useFetchDatabase";
import { getDepartmentCount, countFaculty } from "../../../utils/getDepartMentCount";
import { DepartMentSizeCart } from "../../../components/admin/dashboard/useroverview/DepartMentSizeCart";

const regex = /^[^@]+/


// type FacultyCount = { [key: string]: number };



// const resetUserTable = { student: false, staff: false, teacher: false }
interface homeViewProps{
    handleItemClick:(item:UserProfileInterface)=>void
}

function HomeView({handleItemClick}:homeViewProps) {
    const {displayName} = useAppSelector((state)=>state.userAuth)
    const [userEmail, setUserEmail] = useState<string | null>("")
    const [openExport, setOpenExport] = useState<boolean>(false)
    const { studentData, } = useFetchDatabase()

    const facultyCountArray = countFaculty(studentData);
    const departmentCounts = getDepartmentCount(studentData);
    

    
    

    useEffect(()=>{
        const listen =onAuthStateChanged(auth,(user)=>{
            if(user?.providerData[0].providerId==="password"){
                setUserEmail(user.email)
            }   
        })
        return()=>{
            listen()
        }
    },[])

    const { year, month, day } = getFormattedDate();
    const { studentCount } = getTotalUsers();

    const [searchQuery, setSearchQuery] =useState<string>("")
   
    

    return (
        <>
            <div className="px-4 py-7 ">

                {/* Dashboard Title */}
                <div className="flex justify-between items-start gap-x-5 h-[60px] ">
                    <div className="basis-[200px]">
                        <div>
                            <h2 className="text-[#474646]">Welcome Back</h2>
                            {userEmail==="" ||userEmail===null?
                            <h2 className="text-xl capitalize">{ displayName}</h2>:
                            <h2 className="text-xl capitalize">{ userEmail.match(regex)}</h2>
                            }
                        </div>

                    </div>

                    <div className="basis-[200px] grow flex flex-col items-end">
                        <div className="w-full max-w-[400px] flex-1">
                            <SearchBar  setSearchQuery={setSearchQuery}/>
                        </div>
                        <p className="font-mono text-[grey] text-xs my-1">{`${day} ${month}, ${year}`}</p>
                    </div>
                </div>

                {/* Dashboard Area */}
                <div className="mt-7 gap-x-7">
                    {/* Main Viewinf Area */}
                    <div className="overflow-y-auto">
                        <div>
                            <h1 className="font-bold text-xl">Dashboard</h1>
                            <div className="w-full flex flex-nowrap mb-3 py-3 gap-x-5 overflow-x-auto">
                                {/* number of students */}
                                <div className="shrink-0 border-[1px] border-[#f8f6f6] cursor-pointer hover:shadow-md">
                                    <UserOverview title="Number of Students" count={studentCount} avatar={StudentSVG} />
                                </div>
                           
                   
                            </div>
                        </div>
                        {/* Table containig database design */}
                        <div className="mt-9 mb-20 ">
                            <div className="bg-[white] flex justify-between shadow-md border-[1px] border-[#f0eeee]  w-[200px] max-w-[250px]">
                                <div className={`p-3 cursor-pointer hover:bg-[#f0f0fa] border-b-2 border-b-blue-500 bg-[#f0f0fa]`}>Student</div>
                                <div className={`p-3 cursor-pointer hover:bg-[#f0f0fa] `}  onClick={()=>setOpenExport(true)}><BiExport size={30}/></div>
                            </div>
                            <StudentTable searchQuery={searchQuery} handleItemClick={handleItemClick} />

                        </div>
                    </div>
                </div>
                {studentData.length >0 &&
                <div className="flex flex-col gap-y-7 mb-5">
                    <div>
                        <h1 className="text-center mb-2 font-bold font-sans">Top 7 Faculties</h1>
                        <FacultySizeChart data={facultyCountArray}/>
                    </div>
                    <div>
                        <h1 className="text-center mb-2 font-bold font-sans">Popular Departments</h1>
                        <DepartMentSizeCart data={departmentCounts}/>
                    </div>
                </div>
                }
            </div>
            {openExport &&<ExportUserDetailModal onClose={()=>setOpenExport(false)}/>}
        </>
    );

}

export { HomeView };
