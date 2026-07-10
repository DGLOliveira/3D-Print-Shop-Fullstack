import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib.ts";

export interface BrandForm {
    name: string;
    website: string;
    logo: string;
    summary: string;
}

interface Brand {
    id: number;
    name: string;
    website: string;
    logo: string;
    summary: string;
}

interface BrandsArray extends Array<Brand> {} 


interface BrandsState {
    isLoading: boolean;
    isCreating: boolean;
    brands: [] | BrandsArray;
    selectedBrand: number | null;
    fetchBrands: () => Promise<void>;
    createBrand: (brandForm: BrandForm) => Promise<void>;
    deleteBrand: (id: number) => Promise<void>;
}


export const useBrandsStore = create<BrandsState>((set) => ({
    isLoading: false,
    isCreating: false,
    brands: [] ,
    selectedBrand: null,

    fetchBrands: async () => {
        try {
            set({isLoading: true});
            const res = await axiosInstance.get("/brands");
            set({brands: res.data.data});
        } catch (error) {
            console.log("Error in getAllBrands: " + error);
        } finally {
            set({isLoading: false});
        }
    },

    createBrand: async (brandForm) => {
        try {
            set({isCreating: true});
            const res = await axiosInstance.post("/brands", brandForm);
            set((state) => ({brands: [...state.brands, res.data.data]}));
        } catch (error) {
            console.log("Error in createBrand: " + error);
        } finally {
            set({isCreating: false});
        }
    },

    deleteBrand: async (id : number) => {
        try {
            set({isCreating: true});
            await axiosInstance.delete("/brands/" + id);
            set((state) => ({brands: state.brands.filter((brand) => brand.id !== id)}));
        } catch (error) {
            console.log("Error in delete Brand: " + error);
        } finally {
            set({isCreating: false});
        }
    }
}))

/*
export const useAccessoriesStore = create<AccessoriesState>((set) => ({
    
}))
*/