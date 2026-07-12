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
    subname: string;
    grouping: string;
    brandName: string;
    subcategoryName: string;
    categoryName: string;
    images: string[];
    price: number;
    discount: number;
    stock: number;
    description: string;
    publish: boolean;
}

export interface AccessoryForm {
    name: string;
    subname: string;
    grouping: string;
    brandId: number;
    categoryId: number;
    subcategoryId: number;
    price: number;
    discount: number;
    stock: number;
    description: string;
    publish: boolean;
}

interface AccessoriesState {
    isUpdatingCat: boolean;
    isUpdatingAcc: boolean;
    updatingAccMsg: string;
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

    createAccessoryImage: (accessoryId: number, image: File, index: number, setImagesState: React.Dispatch<React.SetStateAction<string[]>>) => Promise<void>;

    fetchAccessories: () => Promise<void>;
    createAccessory: (accessoryForm: AccessoryForm, images: File[], setImagesState: React.Dispatch<React.SetStateAction<string[]>>) => Promise<void>;
    updateAccessory: (id: number, accessoryForm: AccessoryForm, dialog: HTMLDialogElement) => Promise<void>;
    deleteAccessory: (id: number) => Promise<void>;
}


const CATEGORY_URL = "/products/accessories/categories";
const SUBCATEGORY_URL = "/products/accessories/subcategories";
const ACCESSORY_URL = "/products/accessories/items";
const IMAGE_URL = "/products/accessories/images";


export const useAccessoriesStore = create<AccessoriesState>((set, get) => ({
    isUpdatingCat: false,
    isUpdatingAcc: false,
    updatingAccMsg: "",
    categories: {},
    accessories: [],
    selectedAccessoryId: null,
    selectedSubCategoryName: "",
    selectedCategoryName: "",

    selectCategory: (name) => { set({ selectedCategoryName: name }), set({ selectedSubCategoryName: "" }) },
    selectSubCategory: (name) => set({ selectedSubCategoryName: name }),
    selectAccessory: (id: number) => set({ selectedAccessoryId: id }),

    fetchCategories: async () => {
        try {
            set({ isUpdatingCat: true })
            const res = await axiosInstance.get(CATEGORY_URL)
            set({ categories: res.data.data })
        } catch (error) {
            handleErrorMessage(error, "fetchCategories")
        } finally {
            set({ isUpdatingCat: false })
        }
    },

    createCategory: async (categoryForm, dialog: HTMLDialogElement) => {
        try {
            set({ isUpdatingCat: true });
            const res = await axiosInstance.post(CATEGORY_URL, categoryForm);
            const newEntry = res.data.data[0]
            let newCategories = get().categories;
            newCategories[newEntry.name] = { id: newEntry.id, subcategories: {} }
            set({ categories: newCategories });
            set({ selectedCategoryName: newEntry.name });
            set({ selectedSubCategoryName: "" });
            toast.success("Category created successfully");
            dialog.close();
        } catch (error) {
            handleErrorMessage(error, "createCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },

    updateCategory: async (categoryForm, dialog: HTMLDialogElement) => {
        try {
            const id = get().categories[get().selectedCategoryName].id
            set({ isUpdatingCat: true });
            const res = await axiosInstance.put(CATEGORY_URL + "/" + id, categoryForm);
            const newEntry = res.data.data[0]
            let newCategories = get().categories;
            newCategories[newEntry.name] = { id: newEntry.id, subcategories: newCategories[get().selectedCategoryName].subcategories }
            delete newCategories[get().selectedCategoryName];
            set({ categories: newCategories });
            set({ selectedSubCategoryName: "" });
            set({ selectedCategoryName: newEntry.name });
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
            let newCategories = get().categories;
            delete newCategories[get().selectedCategoryName];
            set({ selectedCategoryName: "" });
            set({ selectedSubCategoryName: "" });
            set({ categories: newCategories });
            toast.success("Category deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },

    createSubCategory: async (subcategoryForm, dialog: HTMLDialogElement) => {
        try {
            set({ isUpdatingCat: true });
            const res = await axiosInstance.post(SUBCATEGORY_URL, subcategoryForm);
            const newEntry = res.data.data[0]
            let newCategories = get().categories;
            newCategories[get().selectedCategoryName].subcategories[newEntry.name] = { id: newEntry.id }
            set({ categories: newCategories });
            set({ selectedSubCategoryName: newEntry.name });
            toast.success("Subcategory created successfully");
            dialog.close();
        } catch (error) {
            handleErrorMessage(error, "createSubCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },

    updateSubCategory: async (subcategoryForm, dialog: HTMLDialogElement) => {
        try {
            set({ isUpdatingCat: true });
            const id = get().categories[get().selectedCategoryName].subcategories[get().selectedSubCategoryName].id
            const res = await axiosInstance.put(SUBCATEGORY_URL + "/" + id, subcategoryForm);
            const newEntry = res.data.data[0]
            let newCategories = get().categories;
            delete newCategories[get().selectedCategoryName].subcategories[get().selectedSubCategoryName];
            newCategories[get().selectedCategoryName].subcategories[newEntry.name] = { id: newEntry.id }
            set({ categories: newCategories });
            set({ selectedSubCategoryName: newEntry.name });
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
            let newCategories = get().categories;
            delete newCategories[get().selectedCategoryName].subcategories[get().selectedSubCategoryName];
            set({ categories: newCategories });
            set({ selectedSubCategoryName: "" });
            toast.success("Subcategory deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteSubCategory")
        } finally {
            set({ isUpdatingCat: false });
        }
    },

    createAccessoryImage: async (accessoryId, image, index, setImagesState) => {
        try {
            setImagesState((prev) => ({ ...prev, [index]: "Uploading" }))
            const res = await axiosInstance.post(IMAGE_URL + "/" + accessoryId, { image, index })
            //const newEntry = res.data.data[0]
            //let newAccessories = get().accessories;
            //newAccessories.map((accessory) => accessory.id === accessoryId ? { ...accessory, images: [...accessory.images, newEntry] } : accessory)
            //set({ accessories: newAccessories });
            setImagesState((prev) => ({ ...prev, [index]: "Uploaded" }))
        } catch (error) {
            handleErrorMessage(error, "createAccessoryImage")
            setImagesState((prev) => ({ ...prev, [index]: "Error" }))
        }
    },

    fetchAccessories: async () => {
        try {
            set({ isUpdatingAcc: true });
            const res = await axiosInstance.get(ACCESSORY_URL);
            set({ accessories: res.data.data });
        } catch (error) {
            handleErrorMessage(error, "fetchAccessories")
        } finally {
            console.log(get().accessories)
            set({ isUpdatingAcc: false });
        }
    },

    createAccessory: async (accessoryForm, images, setImagesState) => {
        console.log(accessoryForm)
        try {
            set({ isUpdatingAcc: true });
            const res = await axiosInstance.post(ACCESSORY_URL, accessoryForm);
            const newEntry = res.data.data[0]
            //set((state) => ({ accessories: [...state.accessories, newEntry] }));
            toast.success("Accessory created successfully");
            for (let i = 0; i < images.length; i++) {
                await get().createAccessoryImage(newEntry.id, images[i], i, setImagesState);
            }
        } catch (error) {
            handleErrorMessage(error, "createAccessory")
        } finally {
            set({ isUpdatingAcc: false });
            get().fetchAccessories();
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