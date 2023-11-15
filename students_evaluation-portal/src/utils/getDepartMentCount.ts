// interface UserProfileInterface {
//   faculty: string;
//   department: string;
// }

// type FacultyCount = { [key: string]: number };
// type DepartMentCount = { [key: string]: number };

// export function countFaculty(studentData: UserProfileInterface[]): { faculty: string; numberOfStudent: number }[] {
//   const facultyCount: FacultyCount = {};

//   studentData.forEach((profile) => {
//     const faculty = profile.faculty;
//     if (facultyCount[faculty]) {
//       facultyCount[faculty]++;
//     } else {
//       facultyCount[faculty] = 1;
//     }
//   });

//   const facultyCountArray = Object.entries(facultyCount).map(([faculty, numberOfStudent]) => ({ faculty, numberOfStudent }));
//   return facultyCountArray;
// }

// export function getDepartmentCount(studentData: UserProfileInterface[]): { department: string; numberOfStudent: number }[] {
//   const departmentCount: DepartMentCount = {};

//   studentData.forEach((profile) => {
//     const department = profile.department;
//     if (departmentCount[department]) {
//       departmentCount[department]++;
//     } else {
//       departmentCount[department] = 1;
//     }
//   });

//   const departmentCountArray = Object.entries(departmentCount).map(([department, numberOfStudent]) => ({ department, numberOfStudent }));
//   return departmentCountArray;
// }

interface UserProfileInterface {
  faculty: string;
  department: string;
}

// Define a type for counting occurrences
type CountResult = { [key: string]: number };

/**
 * Count the number of students in each faculty and return the top 5.
 * @param studentData Array of UserProfileInterface representing student data.
 * @returns Array of objects with faculty and numberOfStudent for the top 5 faculties.
 */
export function countFaculty(studentData: UserProfileInterface[]): { faculty: string; numberOfStudent: number }[] {
  // Create an object to store the counts
  const facultyCount: CountResult = {};

  // Iterate over the student data to count occurrences
  studentData.forEach((profile) => {
    const faculty = profile.faculty;
    if (facultyCount[faculty]) {
      facultyCount[faculty]++;
    } else {
      facultyCount[faculty] = 1;
    }
  });

  // Convert the count object to an array of objects
  const facultyCountArray = Object.entries(facultyCount)
    .map(([faculty, numberOfStudent]) => ({ faculty, numberOfStudent }))
    // Sort the array in descending order based on numberOfStudent
    .sort((a, b) => b.numberOfStudent - a.numberOfStudent)
    // Get the top 5 results
    .slice(0, 7);

  return facultyCountArray;
}

/**
 * Count the number of students in each department and return the top 5.
 * @param studentData Array of UserProfileInterface representing student data.
 * @returns Array of objects with department and numberOfStudent for the top 5 departments.
 */
export function getDepartmentCount(studentData: UserProfileInterface[]): { department: string; numberOfStudent: number }[] {
  // Create an object to store the counts
  const departmentCount: CountResult = {};

  // Iterate over the student data to count occurrences
  studentData.forEach((profile) => {
    const department = profile.department;
    if (departmentCount[department]) {
      departmentCount[department]++;
    } else {
      departmentCount[department] = 1;
    }
  });

  // Convert the count object to an array of objects
  const departmentCountArray = Object.entries(departmentCount)
    .map(([department, numberOfStudent]) => ({ department, numberOfStudent }))
    // Sort the array in descending order based on numberOfStudent
    .sort((a, b) => b.numberOfStudent - a.numberOfStudent)
    // Get the top 5 results
    .slice(0, 5);

  return departmentCountArray;
}
