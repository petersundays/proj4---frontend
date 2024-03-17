import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";

export const CategoriesStore = create(
    (set) => ({
        categories: [],
        setCategories: (newCategories) => set({ categories: newCategories }),
    }),
    {
        name: 'categories-storage',
        getStorage: () => createJSONStorage(() => sessionStorage),
    }
);
