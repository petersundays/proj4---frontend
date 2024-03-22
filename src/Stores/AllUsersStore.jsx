import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const AllUsersStore = create(
    persist(
        (set) => ({
            users: [],
            displayContainer: false,
            newUser: false,
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
            setDisplayContainer: (value) => { 
                set({ displayContainer: value });
            },
            setNewUser: (value) => { 
                set({ newUser: value });
            },
        }),
        {
            name: 'users-storage',
            getStorage: () => createJSONStorage(() => sessionStorage),
        }
    )
);