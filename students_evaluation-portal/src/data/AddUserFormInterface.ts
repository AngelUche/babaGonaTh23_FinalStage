
export interface UserProfileInterface {
  faculty: string;
  otherName: string;
  phoneNumber: string;
  age: number | undefined;
  image: string;
  studentId: string;
  firstName: string;
  address: string;
  lastName: string;
  email?: string | undefined;
  docId: string;
  gender: string;
  // imageURL: any | null;
}

export const initialUser: UserProfileInterface = {
  // You may need to set other initial values here
  age: undefined, 
  docId:"",
  studentId: "",
  firstName: "",
  lastName: "",
  otherName: "",
  address: "",
  phoneNumber: "",
  email: "",
  gender: "",
  image: "",
  faculty: "",
  // imageURL:""

};

export interface EditProfileInterface{
  photoURL:string,
  otherName: string;
  firstName: string;
  lastName: string;
  age:number,
  email:string
}