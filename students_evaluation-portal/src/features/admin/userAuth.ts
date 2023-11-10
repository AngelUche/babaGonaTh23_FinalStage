import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type AuthStateType = {
  displayName: string | null;
  photoURL: string | null | undefined;
  email: string | null | undefined;

  
  studentData: {
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
    docId?: string;
    gender: string;
  }[];
};

const initialState: AuthStateType = {
  displayName: null,
  photoURL: null,
  email: "",
  studentData: [], // Initialize as an empty array
};


// Create the Auth Slice
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<AuthStateType>) => {
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
    },
    
  },

});



export const { setUserDetails } = AuthSlice.actions;
export const AuthSliceReducer = AuthSlice.reducer;

