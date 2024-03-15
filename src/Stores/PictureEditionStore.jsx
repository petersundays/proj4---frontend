import { create } from "zustand";

export const PictureEditionStore = create((set) => ({
    profilePicUrl: "",
    setProfilePicUrl: (url) => set({ profilePicUrl: url }),
}));
