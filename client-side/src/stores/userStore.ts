import { create } from "zustand";
import User from "../models/User";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUsers: (user: User) => void;
  removeUser: () => void
}

const useUsersStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        id: 2,
        username: "joemama",
      },
      setUsers: async (user) => {
        set({ user });
      },
      removeUser: () => {
        set({ user: null });
      }
    }),
    {
      name: "user",
    }
  )
);

export default useUsersStore;
