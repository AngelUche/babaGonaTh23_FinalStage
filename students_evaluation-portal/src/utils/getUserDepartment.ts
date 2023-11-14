import { classData, DepartMents } from '../data/studentData'; // Adjust the path to your data

export function getDepartmentsForFaculty(facultyId:string) {

  // Find the entry in classData based on the facultyId
  const facultyEntry = classData.find((entry) => entry.id === facultyId);

  if (facultyEntry) {
    // Find the corresponding entry in DepartMents based on the facultyId
    const departmentsEntry = DepartMents.find((entry) => entry.id === facultyId);

    if (departmentsEntry) {
      return departmentsEntry.departments;
    }
  }

  // If no matching facultyId is found, or no departments are found, return an empty array or handle it as needed.
  return [];
}


