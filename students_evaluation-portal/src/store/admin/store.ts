import { configureStore } from '@reduxjs/toolkit'
import { UserPreviewReducer } from '../../features/admin/userpreviewSlice'
import { UserProfileReducer } from '../../features/admin/userprofileSlice'
import { AddUserReducer } from '../../features/admin/adduserSlice'
import { AuthSliceReducer } from '../../features/admin/userAuth'

// Create a store
export const store = configureStore({
    reducer: {
        userPreview: UserPreviewReducer,
        userProfile: UserProfileReducer,
        addUser: AddUserReducer,
        userAuth: AuthSliceReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch