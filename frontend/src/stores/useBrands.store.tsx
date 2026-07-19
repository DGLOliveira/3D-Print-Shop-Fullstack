import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios.lib.ts";
import handleErrorMessage from "../utils/handleErrorMessage.util.tsx";

export interface BrandForm {
    name: string;
    website: string;
    logo: string | ArrayBuffer | null;
    summary: string;
}

export interface Brand {
    id: number;
    name: string;
    website: string;
    image_url: string;
    summary: string;
}

interface BrandsArray extends Array<Brand> { }


interface BrandsState {
    isUpdating: boolean;
    isDeleting: boolean;
    brands: [] | BrandsArray;
    selectedBrand: number | null;
    selectBrand: (index: number | null) => void;
    fetchBrands: () => Promise<void>;
    createBrand: (brandForm: BrandForm) => Promise<void>;
    updateBrand: (id: number, brandForm: BrandForm) => Promise<void>;
    deleteBrand: (id: number) => Promise<void>;
}


export const useBrandsStore = create<BrandsState>((set, get) => ({
    isUpdating: false,
    isDeleting: false,
    brands: [],
    selectedBrand: null,

    selectBrand: (index) => {
        set({ selectedBrand: index });
    },

    fetchBrands: async () => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.get("/brands");
            set({ brands: res.data.data });
        } catch (error) {
            handleErrorMessage(error, "fetchBrands");
        } finally {
            set({ isUpdating: false });
        }
    },

    createBrand: async (brandForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post("/brands", brandForm);
            set((state) => ({ brands: [...state.brands, res.data.data] }));
            toast.success("Brand created successfully");
        } catch (error) {
            handleErrorMessage(error, "createBrand");
        } finally {
            set({ isUpdating: false });
            set({ selectedBrand: get().brands.length - 1});
        }
    },

    updateBrand: async (id, brandForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.put("/brands/" + id, brandForm);
            let newBrands = get().brands;
            if(get().selectedBrand !== null){
                console.log(get().selectedBrand)
                newBrands[Number(get().selectedBrand)] = res.data.data;
            }else{
                console.log(newBrands)
                newBrands.map((brand) => brand.id === id ? res.data.data : brand)
            }
            console.log(res)
            console.log(newBrands)
            set({ brands: newBrands });
            toast.success("Brand updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateBrand");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteBrand: async (id) => {
        try {
            set({ isDeleting: true });
            console.log("deleting")
            await axiosInstance.delete("/brands/" + id);
            console.log("deleted")
            set((state) => ({ brands: state.brands.filter((brand) => brand.id !== id) }));
            toast.success("Brand deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteBrand");
        } finally {
            set({ isDeleting: false });
            set({ selectedBrand: null });
        }
    }
}))
