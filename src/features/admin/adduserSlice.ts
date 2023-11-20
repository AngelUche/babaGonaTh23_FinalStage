// jshint esversion:6
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Create the interface for the state
interface AddUserType {
    status: boolean
    faculty: string
    department: string
}

// Define the initial state
const initialState: AddUserType = {
    status: false,
    faculty: "",
    department:"",
}

// Create the slice
const addUserSlice = createSlice({
    name: "AddUserSlice",
    initialState,
    reducers: {
        toggleAddUserPromptStatus: (state, action: PayloadAction<AddUserType>) => {
            const { payload } = action
            state.status = payload.status
            state.faculty = payload.faculty
            state.department = payload.department
        }
    }
})

// Export slice reducer actions
export const { toggleAddUserPromptStatus } = addUserSlice.actions

// Export slice reducer to store
export const AddUserReducer = addUserSlice.reducer;