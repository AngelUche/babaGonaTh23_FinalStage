// import { useState } from "react";
import { UserProfileInterface } from "../../../data/AddUserFormInterface";

import { classData } from "../../../data/studentData";
import { useAppSelector } from "../../../hooks";
// import { getUserClass } from "../../../utils/getUserClass";




interface AddUserViewProps {
  currentUser: UserProfileInterface;
  setCurrentUser: any;
  setSelectedClass:(clas:string)=>void
  setSelectedGender:(clas:string)=>void
  selectedGender:string;
  selectedClass:string;
}
export const AddUserForm = ({currentUser, setCurrentUser, setSelectedClass,setSelectedGender, selectedClass, selectedGender}:AddUserViewProps) => {
const {faculty,department} = useAppSelector((state)=>state.addUser)

    // const [selected, setSelected] =useState(true)    

  return (
    <div>
                        {/* Form fields */}
                        <div className="py-1 max-h-[45vh] flex flex-col gap-y-2 overflow-y-auto">
             {/* Name Section */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {/* FirstName */}
             <div className="flex flex-col">
                <label className="text-sm font-bold capitalize text-gray-700" htmlFor="surname">First Name</label>
                <input
                  className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
                  type="text"
                  value={currentUser.firstName}
                  required
                  onChange={(e) => {
                    setCurrentUser((currentUser: UserProfileInterface) => {
                      return { 
                        ...currentUser, 
                        firstName: e.target.value 
                      };
                    });
                  }}/>
            </div>

            {/* Othername */}
            <div className="flex flex-col">
                                    <label className="text-sm font-bold text-gray-700"htmlFor="otherName">Other Name</label>
                                    <input
                                        className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
                                        value={currentUser?.otherName}
                                        required
                                        onChange={(e) => {
                                            setCurrentUser((currentUser: UserProfileInterface) => {
                                                return { ...currentUser, otherName: e.target.value };
                                            });
                                        }}
                                    />
                                </div>

                                {/* LastName */}
                                <div className="flex flex-col">
                                    <label
                                        className="text-sm font-bold text-gray-700"
                                        htmlFor="surname"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
                                        type="text"
                                        value={currentUser?.lastName}
                                        required
                                        onChange={(e) => {
                                            setCurrentUser((currentUser: UserProfileInterface) => {
                                                return { ...currentUser, lastName: e.target.value };
                                            });
                                        }}
                                    />
                                </div>
                               
                            </div>

                            {/* Email and phone Number section*/}
                            <div className="flex flex-col gap-y-2">
                                {/* Email - if found */}
                                    <div className="flex flex-col">
                                        <label
                                            className="text-sm font-bold text-gray-700"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
                                            type="email"
                                            id="email"
                                            value={currentUser.email}
                                            required
                                            onChange={(e) => {
                                                setCurrentUser((currentUser: UserProfileInterface) => {
                                                    return { ...currentUser, email: e.target.value };
                                                });
                                            }}
                                        />
                                    </div>
                                {/* Phone Number */}
                                <div className="flex flex-col">
                                    <label
                                        className="text-sm font-bold text-gray-700"
                                        htmlFor="telephone"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
                                        type="tel"
                                        id="telephone"
                                        value={currentUser?.phoneNumber}
                                        required
                                        onChange={(e) => {
                                            setCurrentUser((currentUser: UserProfileInterface) => {
                                                return { ...currentUser, phoneNumber: e.target.value };
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col">
                                <label
                                    className="text-sm font-bold text-gray-700"
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                                <input
                                    className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
                                    type="text"
                                    id="address"
                                    value={currentUser?.address}
                                    required
                                    onChange={(e) => {
                                        setCurrentUser((currentUser: UserProfileInterface) => {
                                            return { ...currentUser, address: e.target.value };
                                        });
                                    }}
                                />
                            </div>

                            {/* Position, Gender, Class? */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {/* Position */}
                                <div className="flex flex-col basis-full">
                                    <label className="text-sm font-bold text-gray-700"htmlFor="position">Age</label>
                                    <input
                                        className={`p-2 text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-formFeldBg focus:border-blue-500 outline-none `}
                                        type="text"
                                        id="position"
                                        value={currentUser?.age}
                                        required
                                        // disabled
                                        onChange={(e) => {
                                            setCurrentUser((currentUser: UserProfileInterface) => {
                                                const age = e.target.value 
                                                return { ...currentUser,age };
                                            });
                                        }}
                                    />
                                </div>

                                {/* Gender */}
                                <div className="flex flex-col justify-end basis-full">
                                    <label className="text-sm font-bold text-gray-700"htmlFor="gender">Gender</label>
                                    <select
                                        id="gender"
                                        className={`p-[10px] text-gray-700 text-[14px] rounded-sm border-[1px] border-gray-300 bg-editFormFieldBg focus:border-blue-500 outline-none`}
                                        value={selectedGender}
                                        required
                                        onChange={(e) => {
                                            setSelectedGender(e.target.value);
                                        }}
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                    </select>
                                </div>

            </div>
                {/* , Class? */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                               
                               {/* Designation */}
                    <div className="relative">
                        <label className="text-sm font-bold text-gray-700" htmlFor="designation">Faculty</label>
                        {/* {selected &&<div className="w-full h-[40px] opacity-0  absolute bg-red-400" onClick={()=>setSelected(false)}></div>} */}
                        <select
                            className="w-full p-[10px] text-[14px] rounded-sm outline-none text-gray-700 bg-editFormFieldBg border-[1px] border-gray-300 focus:border-blue-500"
                            aria-label="Select a list of class names to get available students"
                            // value={selectedClass}
                            value={department!==""?department :selectedClass}
                            required
                            disabled={faculty!=""}
                            onChange={(e) => {setSelectedClass(e.target.value);}}> 
                            <option disabled>Select Faculty</option>
                            {classData.map((classData) => {
                            return (
                            <option key={classData.id} value={department!==""?department :selectedClass} >{faculty !=""?faculty:classData.faculty}</option>
                            );
                            })}
                        </select>
                    </div>
                    <div className="relative">
                        <label className="text-sm font-bold text-gray-700" htmlFor="designation">Department</label>
                        <select
                            className="w-full p-[10px] text-[14px] rounded-sm outline-none text-gray-700 bg-editFormFieldBg border-[1px] border-gray-300 focus:border-blue-500"
                            aria-label="Select a list of class names to get available students"
                            // value={selectedClass}
                            value={department!==""?department :selectedClass}
                            required
                             disabled={department!=""}
                            onChange={(e) => {
                                // check to see if the department field is empty 
                                if(department===""){
                                    setSelectedClass(e.target.value);
                                }else{

                                    setSelectedClass(department)
                                }
                                }}> 
                            <option disabled>Select Department</option>
                            {classData.map((classData) => {
                            return (
                            <option key={classData.id} value={department!==""?department :selectedClass} >{department !=""?department:classData.faculty}</option>
                            );
                            })}
                        </select>
                    </div>
            </div>
         </div>
    </div>
  )
}

