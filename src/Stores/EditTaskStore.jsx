import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";

export const EditTaskStore = create(
    (set) => ({
        task: '',
    }),
    {
        name: 'edit-task-storage',
        getStorage: () => createJSONStorage(() => sessionStorage),
    }
);