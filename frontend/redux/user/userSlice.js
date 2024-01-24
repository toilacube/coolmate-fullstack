import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    phoneNumber: "",
    username: "",
    birthday: "",
    gender: "",
    weight: "",
    height: "",
    password: "",
    isAdmin: false,
  },
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        phoneNumber = "",
        username = "",
        birthday = "",
        gender = "",
        weight = "",
        height = "",
        password = "",
        isAdmin = false,
      } = action.payload;
      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.username = username ? username : state.username;
      state.birthday = birthday ? birthday : state.birthday;
      state.phoneNumber = phoneNumber ? phoneNumber : state.phoneNumber;
      state.gender = gender ? gender : state.gender;
      state.height = height ? height : state.height;
      state.weight = weight ? weight : state.weight;
      state.password = password ? password : state.password;
      state.isAdmin =
        isAdmin === true || isAdmin === "1" ? isAdmin : state.isAdmin;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.username = "";
      state.birthday = "";
      state.phoneNumber = "";
      state.gender = "";
      state.height = "";
      state.weight = "";
      state.password = "";
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
