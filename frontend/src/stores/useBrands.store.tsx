import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios.lib.ts";

export interface BrandForm {
    name: string;
    website: string;
    logo: string;
    summary: string;
}

export interface Brand {
    id: number;
    name: string;
    website: string;
    logo: string;
    summary: string;
}

interface BrandsArray extends Array<Brand> { }


interface BrandsState {
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    brands: [] | BrandsArray;
    selectedBrand: number | null;
    fetchBrands: () => Promise<void>;
    createBrand: (brandForm: BrandForm, dialog: HTMLDialogElement) => Promise<void>;
    updateBrand: (id: number, brandForm: BrandForm, dialog: HTMLDialogElement) => Promise<void>;
    deleteBrand: (id: number, dialog: HTMLDialogElement) => Promise<void>;
}


export const useBrandsStore = create<BrandsState>((set) => ({
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    brands: [],
    selectedBrand: null,

    fetchBrands: async () => {
        try {
            set({ isLoading: true });
            const res = await axiosInstance.get("/brands");
            set({ brands: res.data.data });
        } catch (error) {
            console.log("Error in getAllBrands: " + error);
        } finally {
            set({ isLoading: false });
        }
    },

    createBrand: async (brandForm, dialog) => {
        try {
            set({ isCreating: true });
            const res = await axiosInstance.post("/brands", brandForm);
            set((state) => ({ brands: [...state.brands, res.data.data] }));
            toast.success("Brand created successfully");
            dialog.close();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in createBrand: " + error);
        } finally {
            set({ isCreating: false });
        }
    },

    updateBrand: async (id, brandForm, dialog) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.put("/brands/" + id, brandForm);
            console.log(res.data)
            set((state) => ({ brands: state.brands.map((brand) => brand.id === id ? res.data.data[0] : brand) }));
            toast.success("Brand updated successfully");
            dialog.close();
        } catch (error) {
            console.log("Error in updateBrand: " + error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteBrand: async (id, dialog) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.delete("/brands/" + id);
            set((state) => ({ brands: state.brands.filter((brand) => brand.id !== id) }));
            toast.success("Brand deleted successfully");
            dialog.close();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in delete Brand: " + error);
        } finally {
            set({ isUpdating: false });
        }
    }
}))

/*
export const useAccessoriesStore = create<AccessoriesState>((set) => ({
    
}))
*/