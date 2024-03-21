import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const AllUsersStore = create(
    persist(
        (set) => ({
            users: [],
            addUser: (user) => {
                set((state) => ({
                    users: [...state.users, user],
                }));
            },
            removeUser: (userId) => {
                set((state) => ({
                    users: state.users.filter((user) => user.id !== userId),
                }));
            },
            updateUser: (updatedUser) => {
                set((state) => ({
                    users: state.users.map((user) => {
                        if (user.id === updatedUser.id) {
                            return updatedUser;
                        }
                        return user;
                    }),
                }));
            },
        }),
        {
            name: 'users-storage',
            getStorage: () => createJSONStorage(() => sessionStorage),
        }
    )
);