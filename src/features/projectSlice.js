import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projectList: [],
  },
  reducers: {
    setProjects: (state, action) => {
      state.projectList = action.payload; // full array of projects
    },
  },
});


export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;

