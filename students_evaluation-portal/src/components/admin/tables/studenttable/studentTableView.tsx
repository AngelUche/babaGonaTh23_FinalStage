// jshint esversion:6
import { InfoFillSVG } from "../../../../assets/admin/svg";
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
            <table className="max-w-[94vw] w-full border-spacing-1 table-fixed relative">
                <thead>
                    <tr className="[&>*]:p-3">
                        <th className="hidden lg:table-cell font-medium text-left w-[5%]" >Sign </th>
                        <th className=" font-medium text-left"><span>Name</span></th>
                        <th className="font-medium text-left ">ID</th>
                        <th className=" font-medium text-center ">Faculty</th>
                        <th className="hidden sm:table-cell  font-medium text-left ">Department</th>
                        <th className="hidden lg:table-cell  font-medium text-center w-[10%] lg:w-[6%]">Age</th>
                        <th className="hidden lg:table-cell  font-medium text-left w-[14%] lg:w-[9%]">Gender</th>
                        <th className="w-[8%] lg:w-[5%] font-medium text-left"></th>
                    </tr>
                </thead>
                <tbody>
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
                            // to get the users that are black listed
                            const isCurrentRowBlackListed = user.isBlackListed;

                         

                            return (
                                <>
                                
                                <tr key={user.studentId} 
                                className={`cursor-pointer [&>*:last-child]:hover:text-gray-600 text-[#575656]   text-[17px] font-mono [&>*]:p-3 ${isCurrentRowBlackListed ? "bg-[#a9a7a7]" : ""}`} 
                                    onClick={()=>{
                                        handleItemClick(user)}}
                                >
                                    <td className="lg:inline-block hidden w-full truncate "><span>{ index +1}</span></td>
                                    <td className="w-full h-full truncate capitalize  "><span>{`${user.firstName} ${user.lastName}`}</span></td>
                                    <td className="inline-block w-full truncate "><span>{user.studentId}</span></td>
                                    <td className="table-cell w-full text-center truncate capitalize "><span>{user?.faculty}</span></td>
                                    <td className="hidden h-full sm:table-cell truncate capitalize"><span>{user.department}</span></td>
                                    <td className="hidden lg:table-cell w-full text-center truncate "><span>{user.age}</span></td>
                                    <td className="hidden lg:table-cell w-full text-left truncate capitalize"><span>{user.gender}</span></td>
                                    <td className="text-gray-300" ><InfoFillSVG size={16} /></td>
                                    {/* {isCurrentRowBlackListed && <td className="text-red-500 w-[20px]">Blacklisted</td>} */}
                               

                                </tr>
                                </>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export { StudentTableView };