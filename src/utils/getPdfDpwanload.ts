
import jsPDF from 'jspdf';
import { UserProfileInterface } from '../data/AddUserFormInterface';
import 'jspdf-autotable';

export const downloadPdf = (data: UserProfileInterface[]) => {
  // initialize the new pdf
  const pdf = new jsPDF();

  // set the default size and Name
  pdf.text('User Data', 20, 20);

  // set the default columns and rows detaials for the table
  const usersCol = ["Name", "Faculty", "Student ID","Gender", "Age","Email" ];
  const usersRows = data.map((user) => [
    `${user.firstName} ${user.otherName} ${user.lastName}`,
    user.faculty,
    user.studentId,
    user.gender,
    user.age,
    user.email,
  ]);

  // get where the vertical line starts
  const startY = 10 + (data.length + 1);

  // set the tabe and format appropriately
  (pdf as any).autoTable({
    head: [usersCol],
    body: usersRows,
    startY,
    theme: 'grid',
    styles: {
      fontSize: 12,
    },
  });

  // save the pdf
  pdf.save('user_data.pdf');
};



