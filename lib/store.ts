import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CourseStore {
    selectedCourseId: number | null;
    setSelectedCourseId: (id: number) => void;
}

export const useCourseStore = create<CourseStore>()(
    persist(
        (set) => ({
            selectedCourseId: null,
            setSelectedCourseId: (id) => set({ selectedCourseId: id }),
        }),
        {
            name: 'course-storage', // unique name for localStorage key
        }
    )
);
