// excelUtils.ts
import * as XLSX from 'xlsx';

import { UserProfileInterface } from '../data/AddUserFormInterface';

export const downloadExcel = (data: UserProfileInterface[], filename: string) => {
  // Check if data is empty
  if (data.length === 0) {
    console.error('No data to export.');
    return;
  }

  // get the sheet abd book of the excel file and store the data in it
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  XLSX.writeFile(wb, filename);
};
