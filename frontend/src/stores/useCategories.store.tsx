import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib.ts";
import { toast } from "react-hot-toast";
import handleErrorMessage from "../utils/handleErrorMessage.util.tsx";

interface TerciaryCategory {
    name: string;
    image_url: string;
}

interface TerciaryCategories {
    [id: number]: TerciaryCategory;
}

interface SecondaryCategory {
    name: string;
    image_url: string;
    subcategories: TerciaryCategories;
}

interface SecondaryCategories {
    [id: number]: SecondaryCategory;
}

interface PrimaryCategory {
    name: string;
    image_url: string;
    subCategories: SecondaryCategories;
}

interface Categories {
    [id: number]: PrimaryCategory;
}

export interface CategoryForm {
    name: string;
    image: string | ArrayBuffer | null;
}

export interface SubCategoryForm {
    name: string;
    image: string | ArrayBuffer | null;
    parent_id: number;
}

interface CategoriesState {
    isUpdating: boolean;
    isDeleting: boolean;
    selectedPrimaryCategory: number | null;
    selectedSecondaryCategory: number | null;
    selectedTerciaryCategory: number | null;
    categories: Categories;

    setPrimaryCategory: (id: number) => void;
    setSecondaryCategory: (id: number) => void;
    setTerciaryCategory: (id: number) => void;

    fetchCategories: () => Promise<void>;

    createPrimaryCategory: (categoryForm: CategoryForm) => Promise<void>;
    updatePrimaryCategory: (id: number, categoryForm: CategoryForm) => Promise<void>;
    deletePrimaryCategory: (id: number) => Promise<void>;
    
    createSecondaryCategory: (categoryForm: SubCategoryForm) => Promise<void>;
    updateSecondaryCategory: (id: number, categoryForm: SubCategoryForm) => Promise<void>;
    deleteSecondaryCategory: (id: number) => Promise<void>;

    createTerciaryCategory: (categoryForm: SubCategoryForm) => Promise<void>;
    updateTerciaryCategory: (id: number, categoryForm: SubCategoryForm) => Promise<void>;
    deleteTerciaryCategory: (id: number) => Promise<void>;

}

const CATEGORY_URL = "/categories";
const PRIMARY_CATEGORY_URL = `${CATEGORY_URL}/primary`;
const SECONDARY_CATEGORY_URL = `${CATEGORY_URL}/secondary`;
const TERCIARY_CATEGORY_URL = `${CATEGORY_URL}/terciary`;

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
    isUpdating: false,
    isDeleting: false,
    selectedPrimaryCategory: null,
    selectedSecondaryCategory: null,
    selectedTerciaryCategory: null,
    categories: {},

    setPrimaryCategory: (id) => set({ selectedPrimaryCategory: id, selectedSecondaryCategory: null, selectedTerciaryCategory: null }),
    setSecondaryCategory: (id) => set({ selectedSecondaryCategory: id, selectedTerciaryCategory: null }),
    setTerciaryCategory: (id) => set({ selectedTerciaryCategory: id }),

    fetchCategories: async () => {
        try {
            const res = await axiosInstance.get(CATEGORY_URL);
            set({ categories: res.data.data });
        } catch (error) {
            handleErrorMessage(error, "fetchCategories");
        }
    },

    createPrimaryCategory: async (categoryForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(PRIMARY_CATEGORY_URL, categoryForm);
            set((state) => ({ categories: { ...state.categories, [res.data.data.id]: {name: res.data.data.name, image_url: res.data.data.image_url, subCategories: {} }}}));
            toast.success("Primary category created successfully");
        } catch (error) {
            handleErrorMessage(error, "createCategory");
        } finally {
            set({ isUpdating: false });
        }
    },

    updatePrimaryCategory: async (id, categoryForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.put(`${PRIMARY_CATEGORY_URL}/${id}`, categoryForm);
            set((state) => ({ categories: { ...state.categories, [id]: {name: res.data.data.name, image_url: res.data.data.image_url, subCategories: {...state.categories[id].subCategories} }}}));
            toast.success("Primary category updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateCategory");
        } finally {
            set({ isUpdating: false });
        }
    },

    deletePrimaryCategory: async (id) => {
        try {
            set({ isDeleting: true });
            await axiosInstance.delete(`${PRIMARY_CATEGORY_URL}/${id}`);
            let newCategories = get().categories;
            delete newCategories[id];
            set({ categories: newCategories });
            toast.success("Primary category deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteCategory");
        } finally {
            set({ isDeleting: false });
        }
    },

    createSecondaryCategory: async (subCategoryForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(SECONDARY_CATEGORY_URL, subCategoryForm);
            let newCategories = get().categories;
            newCategories[res.data.data.parent_id].subCategories[res.data.data.id] = {name: res.data.data.name, image_url: res.data.data.image_url, subcategories: {} };
            set({ categories: newCategories });
            toast.success("Secondary category created successfully");
        } catch (error) {
            handleErrorMessage(error, "createCategory");
        } finally {
            set({ isUpdating: false });
        }
    },

    updateSecondaryCategory: async (id, subCategoryForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.put(`${SECONDARY_CATEGORY_URL}/${id}`, subCategoryForm);
            let newCategories = get().categories;
            newCategories[res.data.data.parent_id].subCategories[id] = {name: res.data.data.name, image_url: res.data.data.image_url, subcategories: {...newCategories[res.data.data.parent_id].subCategories[id].subcategories} };
            set({ categories: newCategories });
            toast.success("Secondary category updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateCategory");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteSecondaryCategory: async (id) => {
        try {
            set({ isDeleting: true });
            await axiosInstance.delete(`${SECONDARY_CATEGORY_URL}/${id}`);
            let newCategories = get().categories;
            delete newCategories[id];
            set({ categories: newCategories });
            toast.success("Secondary category deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteCategory");
        } finally {
            set({ isDeleting: false });
        }
    },

    createTerciaryCategory: async (subCategoryForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(TERCIARY_CATEGORY_URL, subCategoryForm);
            let newCategories = get().categories;
            const selectedPrimaryCategory = get().selectedPrimaryCategory;
            if (selectedPrimaryCategory !== null) {
                newCategories[selectedPrimaryCategory].subCategories[res.data.data.parent_id].subcategories[res.data.data.id] = {
                    name: res.data.data.name,
                    image_url: res.data.data.image_url,
                };
            }
            set({ categories: newCategories });
            toast.success("Terciary category created successfully");
        } catch (error) {
            handleErrorMessage(error, "createCategory");
        } finally {
            set({ isUpdating: false });
        }
    },

    updateTerciaryCategory: async (id, subCategoryForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.put(`${TERCIARY_CATEGORY_URL}/${id}`, subCategoryForm);
            let newCategories = get().categories;
            const selectedPrimaryCategory = get().selectedPrimaryCategory;
            if (selectedPrimaryCategory !== null) {
                newCategories[selectedPrimaryCategory].subCategories[res.data.data.parent_id].subcategories[id] = {name: res.data.data.name, image_url: res.data.data.image_url};
            }
            set({ categories: newCategories });
            toast.success("Terciary category updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateCategory");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteTerciaryCategory: async (id) => {
        try {
            set({ isDeleting: true });
            await axiosInstance.delete(`${TERCIARY_CATEGORY_URL}/${id}`);
            let newCategories = get().categories;
            const selectedPrimaryCategory = get().selectedPrimaryCategory;
            if (selectedPrimaryCategory !== null) {
                delete newCategories[selectedPrimaryCategory].subCategories[id];
            }
            set({ categories: newCategories });
            toast.success("Terciary category deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteCategory");
        } finally {
            set({ isDeleting: false });
        }
    },

}));