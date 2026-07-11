import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib.ts";
import { toast } from "react-hot-toast";
import handleErrorMessage from "../utils/handleErrorMessage.util.tsx";

interface AcessorySubCategory {
    id: number;
}

interface AccessorySubCategories {
    [key: string]: AcessorySubCategory;
}

export interface AcessorySubCategoryForm {
    name: string;
    categoryId: number;
}

interface AcessoryCategory {
    id: number;
    subcategories: AccessorySubCategories;
}


// { categoryName: { id, [subcategories] } }
interface AcessoryCategoryObjects {
    [key: string]: AcessoryCategory;
}
export interface AccessoryCategoryForm {
    name: string;
}

interface Accessory {
    id: number;
    name: string;
    brandName: string;
    subcategoryName: string;
    categoryName: string;
    images: string[];
    price: number;
    discount: number;
    stock: number;
    description: string;
    published: boolean;
}

export interface AccessoryForm {
    id: number;
    name: string;
    brandId: number;
    subcategoryId: number;
    categoryId: number;
    images: string[];
    price: number;
    discount: number;
    stock: number;
    description: string;
    published: boolean;
}

interface AccessoriesState {
    isCreatingCat: boolean;
    isUpdatingCat: boolean;
    isLoadingCat: boolean;
    isCreatingAcc: boolean;
    isUpdatingAcc: boolean;
    isLoadingAcc: boolean;
    categories: AcessoryCategoryObjects;
    accessories: Accessory[];
    selectedAccessoryId: number | null;
    selectedSubCategoryName: string;
    selectedCategoryName: string;

    selectCategory: (name: string) => void;
    selectSubCategory: (name: string) => void;
    selectAccessory: (id: number) => void;

    fetchCategories: () => Promise<void>;
    createCategory: (categoryForm: AccessoryCategoryForm, dialog: HTMLDialogElement) => Promise<void>;
    updateCategory: (categoryForm: AccessoryCategoryForm, dialog: HTMLDialogElement) => Promise<void>;
    deleteCategory: () => Promise<void>;

    createSubCategory: (subcategoryForm: AcessorySubCategoryForm, dialog: HTMLDialogElement) => Promise<void>;
    updateSubCategory: (subcategoryForm: AcessorySubCategoryForm, dialog: HTMLDialogElement) => Promise<void>;
    deleteSubCategory: () => Promise<void>;

    fetchAccessories: () => Promise<void>;
    createAccessory: (accessoryForm: AccessoryForm, dialog: HTMLDialogElement) => Promise<void>;
    updateAccessory: (id: number, accessoryForm: AccessoryForm, dialog: HTMLDialogElement) => Promise<void>;
    deleteAccessory: (id: number) => Promise<void>;
}


const CATEGORY_URL = "/accessories/categories";
const SUBCATEGORY_URL = "/accessories/subcategories";
const ACCESSORY_URL = "/accessories/items";


export const useAccessoriesStore = create<AccessoriesState>((set, get) => ({
    isCreatingCat: false,
    isUpdatingCat: false,
    isLoadingCat: false,
    isCreatingAcc: false,
    isUpdatingAcc: false,
    isLoadingAcc: false,
    categories: {},
    accessories: [],
    selectedAccessoryId: null,
    selectedSubCategoryName: "",
    selectedCategoryName: "",

    selectCategory: (name) => set({ selectedCategoryName: name }),
    selectSubCategory: (name) => set({ selectedSubCategoryName: name }),
    selectAccessory: (id: number) => set({ selectedAccessoryId: id }),

    fetchCategories: async () => {
        try {
            set({ isLoadingCat: true })
            const res = await axiosInstance.get(CATEGORY_URL)
            set({ categories: res.data.data })
        } catch (error) {
            handleErrorMessage(error, "fetchCategories")
        } finally {
            set({ isLoadingCat: true })
        }
    },

    createCategory: async (categoryForm, dialog : HTMLDialogElement) => {
        try {
            set({ isCreatingCat: true });
            const res = await axiosInstance.post(CATEGORY_URL, categoryForm);
            set((state) => ({ categories: { ...state.categories, [res.data.data.name]: res.data.data.id } }));
            toast.success("Category created successfully");
            dialog.close();
        } catch (error) {
            handleErrorMessage(error, "createCategory")
        } finally {
            set({ isCreatingCat: false });
        }
    },

    updateCategory: async (categoryForm, dialog : HTMLDialogElement) => {
        try {
            const id = get().categories[get().selectedCategoryName].id
            set({ isUpdatingCat: true });
            const res = await axiosInstance.put(CATEGORY_URL + "/" + id, categoryForm);
            set((state) => ({ categories: { ...state.categories, [res.data.data.name]: res.data.data.id } }));
            toast.success("Category updated successfully");
            dialog.close();
        } catch (error) {
            handleErrorMessage(error, "updateCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },

    deleteCategory: async () => {
        try {
            set({ isUpdatingCat: true });
            const id = get().categories[get().selectedCategoryName].id
            await axiosInstance.delete(CATEGORY_URL + "/" + id);
            set((state) => ({ categories: Object.fromEntries(Object.entries(state.categories).filter(([key]) => state.categories[key].id !== id)) }));
            toast.success("Category deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },

    createSubCategory: async (subcategoryForm, dialog : HTMLDialogElement) => {
        try {
            set({ isCreatingCat: true });
            const res = await axiosInstance.post(SUBCATEGORY_URL, subcategoryForm);
            set((state) => ({ categories: { ...state.categories, [res.data.data.category.name]: res.data.data.category } }));
            toast.success("Subcategory created successfully");
            dialog.close();
        } catch (error) {
            handleErrorMessage(error, "createSubCategory")
        } finally {
            set({ isCreatingCat: false });
        }
    },

    updateSubCategory: async (subcategoryForm, dialog : HTMLDialogElement) => {
        try {
            set({ isUpdatingCat: true });
            const id = get().categories[get().selectedCategoryName].subcategories[get().selectedSubCategoryName].id
            const res = await axiosInstance.put(SUBCATEGORY_URL + "/" + id, subcategoryForm);
            set((state) => ({ categories: { ...state.categories, [res.data.data.category.name]: res.data.data.category } }));
            toast.success("Subcategory updated successfully");
            dialog.close();
        } catch (error) {
            handleErrorMessage(error, "updateSubCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },

    deleteSubCategory: async () => {
        try {
            set({ isUpdatingCat: true });
            const id = get().categories[get().selectedCategoryName].subcategories[get().selectedSubCategoryName].id
            await axiosInstance.delete(SUBCATEGORY_URL + "/" + id);
            set((state) => ({ categories: Object.fromEntries(Object.entries(state.categories).filter(([key]) => state.categories[key].id !== id)) }));
            toast.success("Subcategory deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteSubCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },


    fetchAccessories: async () => {
        try {
            set({ isLoadingAcc: true });
            const res = await axiosInstance.get(ACCESSORY_URL);
            set({ accessories: res.data.data });
        } catch (error) {
            handleErrorMessage(error, "fetchAccessories")
        } finally {
            set({ isLoadingAcc: false });
        }
    },

    createAccessory: async (accessoryForm) => {
        try {
            set({ isCreatingAcc: true });
            const res = await axiosInstance.post(ACCESSORY_URL, accessoryForm);
            set((state) => ({ accessories: [...state.accessories, res.data.data] }));
            toast.success("Accessory created successfully");
        } catch (error) {
            handleErrorMessage(error, "createAccessory")
        } finally {
            set({ isCreatingAcc: false });
        }
    },

    updateAccessory: async (id, accessoryForm) => {
        try {
            set({ isUpdatingAcc: true });
            const res = await axiosInstance.put(ACCESSORY_URL + "/" + id, accessoryForm);
            set((state) => ({ accessories: state.accessories.map((accessory) => accessory.id === id ? res.data.data : accessory) }));
            toast.success("Accessory updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateAccessory")
        } finally {
            set({ isUpdatingAcc: false });
        }
    },

    deleteAccessory: async (id) => {
        try {
            set({ isUpdatingAcc: true });
            await axiosInstance.delete(ACCESSORY_URL + "/" + id);
            set((state) => ({ accessories: state.accessories.filter((accessory) => accessory.id !== id) }));
            toast.success("Accessory deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteAccessory")
        } finally {
            set({ isUpdatingAcc: false });
        }
    },

}))