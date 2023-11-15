interface UserProfileInterface {
  // Assuming you have the necessary properties
  faculty: string;
}

type FacultyCount = { [key: string]: number };

export function countFaculty(studentData: UserProfileInterface[]): { faculty: string; numberOfStudent: number }[] {
  const facultyCount: FacultyCount = {};

  studentData.forEach((profile) => {
    const faculty = profile.faculty;
    if (facultyCount[faculty]) {
      facultyCount[faculty]++;
    } else {
      facultyCount[faculty] = 1;
    }
  });

  const facultyCountArray = Object.entries(facultyCount).map(([faculty, numberOfStudent]) => ({ faculty, numberOfStudent }));
  return facultyCountArray;
}
