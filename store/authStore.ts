// Zustand -- like simple redux store
// for small projects probably

import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";

// instant return!
const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: response.data }); // that is all we need to do for Zustand
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
