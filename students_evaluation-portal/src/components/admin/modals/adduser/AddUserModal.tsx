// jshint esversion:6
import { useState} from "react";
import { PersonvcardSVG } from "../../../../assets/admin";
import { classData, DepartmentInterface } from "../../../../data/studentData";
import { AdminPin } from "../resetpassword/AdminPin";
import { Modal } from "../Modal";

import { toggleAddUserPromptStatus } from "../../../../features/admin/adduserSlice";
import { useAppDispatch } from "../../../../hooks/redux";
import { getDepartmentsForFaculty } from "../../../../utils/getUserDepartment";
import {  } from "../../../../data/studentData";
import { Navigate, useLocation , useNavigate} from "react-router-dom";


interface ChosenClasses{
    faculty:string,
    department:string,
}

function AddUserModal() {
    // const {studentData} = useAppSelector(state=>state.userAuth)

    const [isOpenPINForm, setIsOpenPINForm]=useState<boolean>(false)
    const [facultId, setFacultyId] = useState<DepartmentInterface[]>([])
    
const NavitgateTo= useNavigate()
    

    const dispatch = useAppDispatch();

    // Determine type of user to view profile
    const [selectedPosition, setSelectedPosition] = useState<ChosenClasses>({
    faculty:"",
    department:"",
    });

    // Add New User upon submit
    function handleProfileSubmit() {
        setIsOpenPINForm(true)
        
    }
    
    function OpeneditForm(){
        dispatch(toggleAddUserPromptStatus({ status: false, faculty: selectedPosition.faculty, department:selectedPosition.department }))
        NavitgateTo('/adduser/view')
    }

    return (
        <>
            <div className="sm:w-[370px] w-max py-10 sm:px-10 px-5 bg-white rounded-[10px] overflow-hidden shadow-xl flex flex-col gap-y-6" onClick={(e) => {
                // Prevent propagation of button click to avoid closing the modal when operating it
                e.stopPropagation();
            }}>
                {/* User Profile Header */}
                <div className="flex text-gray-700 items-center gap-3 ">
                    <h2 className="text-lg font-bold text-gray-700">Add New User</h2>
                    <PersonvcardSVG size={28} />
                </div>

                {/* user Input fields container */}
                <div className="flex flex-col gap-y-5">
                    <div>
                        {/* Select User Position field */}
                        <select
                            className="w-full p-3 rounded outline-none text-gray-700 focus:border-2 focus:border-[#0bdf8d]"
                            aria-label="Select a list of class names to get available students"
                            value={selectedPosition.faculty}
                            onChange={(event) => {
                                setSelectedPosition((prevState) => ({
                                    ...prevState,
                                    faculty: event.target.value
                                }));
                            }}
                        >
                            <option value="" disabled>Select Faculty</option>

                            {
                                classData.map((positionData) => {
                                    return (
                                        <option key={positionData.id} value={positionData.faculty} onClick={()=>{
                                            const depts=getDepartmentsForFaculty(positionData.id)
                                            setFacultyId(depts)
                                        }
                                            }
                                            >
                                            {positionData.faculty}
                                        </option>
                                    );
                                })

                            }

                        </select>
                    </div>
                      {/* {facultId.length !=0 &&  */}
                      <div>
                       <select
                            className="w-full p-3 rounded outline-none text-gray-700 focus:border-2 focus:border-[#0bdf8d]"
                            aria-label="Select a list of class names to get available students"
                            // value={selectedPosition}
                            onChange={(event) => {
                                setSelectedPosition((prevState) => ({
                                    ...prevState,
                                    department: event.target.value
                                }));
                            }}
                        >
                            <option value="" disabled>Select Department</option>
                            {
                                facultId.map((positionData) => {
                                    return (
                                        <option key={positionData.id} value={positionData.dpt} 
                                            >
                                            {positionData.dpt}
                                        </option>
                                    );
                                })

                            }
                        </select>
                      </div>
                        {/* } */}
                </div>
                <button className="w-full rounded uppercase py-3 bg-[blue] hover:bg-[#0202c5] hover:shadow-xl text-white font-mono font-bold" onClick={handleProfileSubmit}
                 disabled={selectedPosition .department== ""}>{"Add New User"}</button>
            </div>
           
        {isOpenPINForm && <Modal closeModal={()=>setIsOpenPINForm(false)}> <AdminPin ProcceToADD={OpeneditForm} title="Proceed"/></Modal>}

        </>
    );
}

export { AddUserModal };