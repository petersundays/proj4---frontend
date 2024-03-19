import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const MyTasksStore = create(
    persist(
        (set) => ({
            tasks: [],
            addTask: (task) => {
                console.log("STORE! Task added to store:", task);
                set((state) => ({
                    tasks: [...state.tasks, task],
                }));
            },
            removeTask: (taskId) => {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== taskId),
                }));
            },
            updateTask: (updatedTask) => {
                set((state) => ({
                    tasks: state.tasks.map((task) => {
                        if (task.id === updatedTask.id) {
                            return updatedTask;
                        }
                        return task;
                    }),
                }));
            },
        }),
        {
            name: 'tasks-storage',
            getStorage: () => createJSONStorage(() => sessionStorage),
        }
    )
);