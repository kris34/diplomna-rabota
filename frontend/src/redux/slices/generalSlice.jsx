import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowLoginForm: false,
  isShowRegisterForm: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState: initialState,
  reducers: {
    setIsShowLoginForm: (state, action) => {
      state.isShowLoginForm = action.payload;
    },
    setIsShowRegisterForm: (state, action) => {
      state.isShowRegisterForm = action.payload;
    },
  },
});

export const { setIsShowLoginForm, setIsShowRegisterForm } =
  generalSlice.actions;
export default generalSlice.reducer;
