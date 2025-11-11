import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  address: "",
  phone: "",
  latitude: null,
  longitude: null,
  geocodedAddress: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
    updateAddress(state, action) {
      state.address = action.payload;
    },
    updatePhone(state, action) {
      state.phone = action.payload;
    },
    updatePosition(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    updateGeocodedAddress(state, action) {
      state.geocodedAddress = action.payload;
    },
    clearPosition(state) {
      state.latitude = null;
      state.longitude = null;
      state.geocodedAddress = "";
    },
  },
});

export const {
  updateName,
  updateAddress,
  updatePhone,
  updatePosition,
  updateGeocodedAddress,
  clearPosition,
} = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
