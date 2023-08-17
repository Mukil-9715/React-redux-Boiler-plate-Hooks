import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "tableData",
  initialState: {
    tableWholeData: []
  },
  reducers: {
    storeData : (state,action)=>{
      state.tableWholeData = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { storeData } = counterSlice.actions;

export default counterSlice.reducer;
