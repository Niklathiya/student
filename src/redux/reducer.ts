import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student, StudentState } from "../types/types";

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload);
    },
    editStudent(state, action: PayloadAction<Student>) {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent(state, action: PayloadAction<string>) {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;