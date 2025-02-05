import { create } from "zustand";

const useMyStore = create((set) => ({
  userDetail: null,
  setZustandUser: (userData) => set({ userDetail: userData }),
  clearZustandUser: () => set({ user: null }),
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

export default useMyStore;
