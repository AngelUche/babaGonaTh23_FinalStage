// jahint esversion:6
import { StudentTableView } from "./studentTableView";
import { useState } from "react";
import { Pagination } from "../../pagination";
import { paginationData } from "../../../../utils";
import { UserProfileInterface } from "../../../../data/AddUserFormInterface";
import { useFetchDatabase } from "../../../../hooks/firebase/useFetchDatabase";
import { Loading } from "../../../../views/admin/Loading";

interface studentTableProps{
    searchQuery:string
    handleItemClick:(item:UserProfileInterface)=>void

    
}
function StudentTable({searchQuery, handleItemClick}:studentTableProps) {
    const { studentData, isLoading} = useFetchDatabase()



    const [currentPage, setCurrentPage] = useState<number>(1);

    const recordsPerPage = 10;

    const { records, totalPageLinks, firstIndex } = paginationData(studentData, currentPage, recordsPerPage);

    function onPrevPage() {
        if (currentPage !== (firstIndex + 1)) {
            setCurrentPage(currentPage - 1);
        }
    }

    function onNextPage() {
        if (currentPage !== totalPageLinks) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCurrentPage(pageNumber: number) {
        setCurrentPage(pageNumber);
    }

        if(isLoading){
           return <div className="mt-6">

               <Loading title="fetching all users"/>
           </div> 
        }

    return (
        <>
            <StudentTableView Users={records}  searchQuery={searchQuery} handleItemClick={handleItemClick}/>
            <div className="mt-4">
              {records.length>0 &&<Pagination totalPageLinks={totalPageLinks} onPrevPage={onPrevPage} onNextPage={onNextPage} changeCurrentPage={changeCurrentPage} currentPage={currentPage} />} 
            </div>
        </>
    );
}

export { StudentTable }