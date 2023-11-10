// jshint esversion:6

import { useFetchDatabase } from "../hooks/firebase/useFetchDatabase";

function getTotalUsers() {
    const { studentData} = useFetchDatabase()


    const studentCount = studentData.reduce((acc, student) => {
        return acc + 1;
    }, 0);

 

    return (
        { studentCount, teacherCount: 12 }
    );
}

export { getTotalUsers };