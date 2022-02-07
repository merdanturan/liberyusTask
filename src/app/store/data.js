import { createSlice } from '@reduxjs/toolkit';

const data = createSlice({
  name: "data",
  initialState: {
      allDomains: []
  },
  reducers: {
      setAllDomains (state, action) {
          state.allDomains = action.payload
      }
  },
});

export const { setAllDomains } = data.actions;

export default data.reducer;
