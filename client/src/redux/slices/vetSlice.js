import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vets: [],
}

export const vetSlice = createSlice({
  name: 'vets',
  initialState,
  reducers: {
    setVets: (state, action) => {
      state.vets = action.payload
    },
  },
})

export const { setVets } = vetSlice.actions

export default vetSlice.reducer