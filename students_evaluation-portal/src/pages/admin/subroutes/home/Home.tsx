// jshint esversion:6
import { HomeView } from "../../../../views/admin";
import { UserPreviewModal } from "../../../../components/admin/modals";
import { useState } from "react";
import { UserProfileInterface } from "../../../../data/AddUserFormInterface";

function Home() {
  // Create the dispatch to carry out actions
  const [selectedItem, setSelectedItem] = useState<UserProfileInterface | null>(null);

  const handleItemClick = (item: UserProfileInterface) => {
    setSelectedItem(item);
  };

  // Get the state from the store

  return (

    <div className="w-full h-full">
      {/* Display preview if toggled */}
      {selectedItem !=null && (
        <div className="fixed top-0 bottom-0 left-0 lg:left-[240px] right-0 overflow-y-auto flex justify-center  items-center bg-[#00000044] z-10" >
          <UserPreviewModal selectedItem={selectedItem} onClose={() => setSelectedItem(null)}/>
        </div>)
         }

      <div className="w-full h-full">
        <HomeView  handleItemClick={handleItemClick}/>
      </div>
    </div>
    
  );
}

export { Home };
