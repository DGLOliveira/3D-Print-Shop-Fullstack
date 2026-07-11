import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios.lib.ts";
import handleErrorMessage from "../utils/handleErrorMessage.util.tsx";

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
    deleteBrand: (id: number) => Promise<void>;
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
            handleErrorMessage(error, "fetchBrands");
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
            handleErrorMessage(error, "createBrand");
        } finally {
            set({ isCreating: false });
        }
    },

    updateBrand: async (id, brandForm, dialog) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.put("/brands/" + id, brandForm);
            set((state) => ({ brands: state.brands.map((brand) => brand.id === id ? res.data.data[0] : brand) }));
            toast.success("Brand updated successfully");
            dialog.close();
        } catch (error) {
            handleErrorMessage(error, "updateBrand");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteBrand: async (id) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.delete("/brands/" + id);
            set((state) => ({ brands: state.brands.filter((brand) => brand.id !== id) }));
            toast.success("Brand deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteBrand");
        } finally {
            set({ isUpdating: false });
        }
    }
}))
