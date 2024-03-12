import { create } from "zustand";
import { persist, createJsonStorage } from "zustand/middleware";

export const UserStore = create(
    persist(
        (set) => ({
            user: {
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                phone: '',
                photoUrl: '',
                typeOfUser: ''
            },
            updateUser: (updatedUser) => {
                set((state) => ({
                    user: {
                        ...state.user,
                        email: updatedUser.email || state.user.email,
                        firstName: updatedUser.firstName || state.user.firstName,
                        lastName: updatedUser.lastName || state.user.lastName,
                        phone: updatedUser.phone || state.user.phone,
                        photoUrl: updatedUser.photoUrl || state.user.photoUrl,
                    },
                }));
            },
        }),
        {
            name: 'user-storage',
            getStorage: () => createJsonStorage(() => sessionStorage),
        }
    )
);