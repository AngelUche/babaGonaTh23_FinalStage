// jshint esversion:6
// import { studentData } from "../../data/admin";
import { useFetchDatabase } from "../hooks/firebase/useFetchDatabase";
/**
 * 
 * @param id: Id used to retrieve user details from mock DB 
 * @returns User object containing details about User
 */
export function retrieveUserData(id: string | undefined) {
    const { studentData } = useFetchDatabase()

    const User = studentData.find((user) => user.studentId === id);
    return User;
}