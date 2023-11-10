import jsPDF from 'jspdf';
import { UserProfileInterface } from '../data/AddUserFormInterface';

export const downLoadPdf = (data: UserProfileInterface[]) => {
  const pdf = new jsPDF();

  // Add content to the PDF
  pdf.text('User Data', 10, 10);
  
  const usersCol=["Name", "Faculty", "Student ID",]
   data.forEach((user, index) => {
    const yPosition = 20 + index * 10;
    const userInformation = `Name: ${user.firstName} ${user.otherName} ${user.lastName}, Age: ${user.age}, Faculty: ${user.faculty},StudentId: ${user.studentId}  `;
    pdf.text(userInformation, 10, yPosition);
    console.log(user.image);
    
    pdf.addImage(user.image,
      "JPEG",
      15 * 2.83,
      40 * 2.83,
      180 * 2.83,
      120 * 2.83)
  });


  
  // Save the PDF
  pdf.save('user_data.pdf');
};



// import jsPDF from 'jspdf';
// import { UserProfileInterface } from '../data/AddUserFormInterface';
// import 'jspdf-autotable'; 

// export const downloadPdf = (data: UserProfileInterface[]) => {
//   const pdf = new jsPDF();
//   pdf.text('User Data', 10, 10);

//   const usersCol = ["Name", "Faculty", "Student ID"];
//   const usersRows = data.map((user) => [
//     `${user.firstName} ${user.otherName} ${user.lastName}`,
//     user.faculty,
//     user.studentId,
//   ]);

//   data.forEach((user, index) => {
//     const yPosition = 20 + index * 10;
//     const userInformation = `Age: ${user.age}`;
//     pdf.text(userInformation, 10, yPosition);
//     if (user.imageURL) {
//       pdf.addImage(user.imageURL, 15 * 2.83, 40 * 2.83, 180 * 2.83, 120 * 2.83);
//     }
//   });

//   const startY = 20 + (data.length + 1) * 10; 

//   pdf.autoTable({
//     head: [usersCol],
//     body: usersRows,
//     startY,
//     theme: 'grid',
//     styles: {
//       fontSize: 11,
//     },
//   });

//   pdf.save('user_data.pdf');
// };

