import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

// Define a type for the slice state
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
export interface CounterState {
  user_list: User[]
}
// Define the initial state using that type
const initialState: CounterState = {
  user_list: [],
}

export const usersSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  SetUserList: (state, {payload}) => {
      state.user_list = payload
    },
    
  },
})

export const { SetUserList } = usersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const user_list = (state: RootState) => state.users.user_list

export default usersSlice.reducer