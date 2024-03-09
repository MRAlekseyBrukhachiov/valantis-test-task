import { create } from "zustand";

export const useStore = create(set => ({
    activeFilter: 'none',
    setActiveFilter: (activeFilter) => {
        set({ activeFilter })
    },
    products: [],
    setProducts: (products) => {
        set({ products })
    }
}));