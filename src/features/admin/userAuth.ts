import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileInterface } from "../../data/AddUserFormInterface";

type AuthStateType = {
  displayName: string | null;
  photoURL: string | null | undefined;
  email: string | null | undefined;
  studentData:UserProfileInterface[]
  
};

const initialState: AuthStateType = {
  displayName: null,
  photoURL: null,
  email: "",
  studentData:[]
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

