// jshint esversion:6
import { useState } from "react";
import { PersonvcardSVG } from "../../../../assets/admin";
import { Link } from "react-router-dom";
import { useFetchDatabase } from "../../../../hooks/firebase/useFetchDatabase";
import { UserProfileInterface } from "../../../../data/AddUserFormInterface";

function UserProfileModal() {

  // getting the user data
  const { studentData} = useFetchDatabase()

  // Determine type of user to view profile
  const [selectedID, setSelectedID] = useState<UserProfileInterface | null>(null);

  // set the selected item the id
  const handleItemClick = (item: UserProfileInterface) => {
    setSelectedID(item);
  };
  
  // Selected members regardless of position
  const [selectedMember, setSlectedMember] = useState("");

  return (
    <div
      className="w-[350px] py-8 px-8 bg-white rounded-[10px] overflow-hidden shadow-xl flex flex-col gap-y-6"
      onClick={(e) => {
        // Prevent propagation of button click to avoid closing the modal when operating it
        e.stopPropagation();
      }}
    >
      {/* User Profile Header */}
      <div className="flex text-gray-700 items-center gap-3">
        <h2 className="text-lg font-bold text-gray-700">User Profile</h2>
        <PersonvcardSVG size={28} />
      </div>

      {/* user Input fields container */}
      <div className="flex flex-col gap-y-5">
      

        <div>
          <select
            className="w-full p-3 rounded outline-none text-gray-700 focus:border-2 focus:border-[#0bdf8d]"
            aria-label="Select a list of members of a class to view profile"
            required                                
            value={selectedMember}
            onChange={(event) => {
              setSlectedMember(event.target.value);
            }}
            >
            <option value="" disabled>Select Member</option>
            {studentData.map((data) => (
            <option key={data.studentId} value={data.studentId} onClick={() => handleItemClick(data)}>
                {data.firstName ? `${data.firstName} ${data.lastName}` : "No student Member yet"}
            </option>
            ))}
          </select>
        </div>
      </div>
      <Link
        to={`/userprofile/${selectedID?.docId}`} 
        className="p-1 mt-3 flex items-center justify-center w-full rounded uppercase py-3 bg-[blue] hover:bg-[#0202c5] hover:shadow-xl text-white font-mono font-bold">
        View full profile
      </Link>
    </div>
  );
}

export { UserProfileModal };
