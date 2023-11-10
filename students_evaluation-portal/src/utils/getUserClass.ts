// jshint esversion:6

import { classData } from "../data/studentData";

function getUserClass(faculty: string) {
    return classData.find((classdata) => classdata.faculty === faculty);
}

export { getUserClass }