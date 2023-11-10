// jshint esversion:6
import { InfoFillSVG } from "../../../../assets/admin/svg";
// import { getUserClass } from "../../../../utils/admin";
// import { classData } from "../../../../data/admin/studentData";
import { UserProfileInterface } from "../../../../data/AddUserFormInterface";
import { Loading } from "../../../../views/admin/Loading";

interface StudTableViewProps {
    Users: UserProfileInterface[]
    searchQuery:string;
    handleItemClick:(item:UserProfileInterface)=>void

}

function StudentTableView({ Users,searchQuery, handleItemClick }: StudTableViewProps) {
    
    if(Users.length===0){
        return <div className="mt-9 font-bold font-serif lg:text-[20px]"><Loading title="No user yet"/></div> 
    }
    

    
    return (
        <>
            <table className="max-w-[92vw] w-full border-spacing-1 table-fixed">
                <thead>
                    <tr className="[&>*]:p-3">
                        <th className=" font-medium text-left">Sign </th>
                        <th className=" font-medium text-left"><span>Firstname</span></th>
                        <th className="hidden sm:table-cell  font-medium text-left ">Lastname</th>
                        <th className=" font-medium text-left ">ID</th>
                        <th className="hidden xs:table-cell font-medium text-center ">Class</th>
                        <th className="hidden lg:table-cell  font-medium text-center ">Age</th>
                        <th className="hidden lg:table-cell  font-medium text-left">Gender</th>
                    </tr>
                </thead>
                <tbody className="[&>*:nth-child(even)]:bg-[#f0f0fa]">
                    {
                        Users?.filter((user: UserProfileInterface) => {
                            const names = `${ user.firstName} ${user.lastName}`;
                            const id = user?.studentId ?? "";
                            const emails = user.email ?? "";
                            const StudentClass=user.faculty ??""
                            // const StudentClass = user.classDesignation ?? "";
                            const gender = user.gender?? "";
                            return (
                              names.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              StudentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              emails.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                          })
                        .map((user, index: number) => {
                            return (
                                <tr key={user.studentId} className="cursor-pointer [&>*:last-child]:hover:text-gray-600 text-[#575656]  text-[17px] font-mono [&>*]:p-3" 
                               
                                >
                                    <td className="inline-block w-full truncate "><span>{ index +1}</span></td>
                                    <td className="w-full h-full truncate capitalize"><span>{user.firstName}</span></td>
                                    <td className="hidden h-full sm:table-cell truncate capitalize"><span>{user.lastName}</span></td>
                                    <td className="inline-block w-full truncate "><span>{user.studentId}</span></td>
                                    <td className="hidden xs:table-cell w-full text-center truncate capitalize "><span>{user?.faculty}</span></td>
                                    <td className="hidden lg:table-cell w-full text-center truncate "><span>{user.age}</span></td>
                                    <td className="hidden lg:table-cell w-full text-left truncate capitalize"><span>{user.gender}</span></td>
                                    <td className="text-gray-300"  onClick={()=>handleItemClick(user)}><InfoFillSVG size={16} /></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export { StudentTableView };