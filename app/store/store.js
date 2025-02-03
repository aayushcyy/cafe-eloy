import { create } from "zustand";

const useMyStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

export default useMyStore;
