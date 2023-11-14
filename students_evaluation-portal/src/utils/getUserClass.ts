// // jshint esversion:6

// import { classData } from "../data/studentData";

// function getUserClass(id: string|undefined) {
//     return classData.find((classdata) => classdata.id === id);
// }

// export { getUserClass }
// jshint esversion:6

import { classData } from "../data/studentData";

function getUserClass(id: string | undefined) {
    if (id === undefined) {
        return undefined; // Return undefined for an undefined id
    }

    return classData.find((classdata) => classdata.id === id);
}

export { getUserClass };
