import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib.ts";
import { toast } from "react-hot-toast";
import handleErrorMessage from "../utils/handleErrorMessage.util.tsx";

interface Image {
    id: number,
    url: string
}

interface ImageForm {
    url: string
}

interface Descritpion {
    id: number,
    title: string,
    description_md: string
}

interface DescritpionForm {
    title: string,
    description_md: string
}

interface Version {
    id: number,
    subtitle: string,
    price: number,
    discount: number,
    stock: number,
    details: string,
    publish: boolean,
    images: Image[],
    descriptions: Descritpion[]
}

interface VersionForm {
    subtitle: string,
    price: number,
    discount: number,
    stock: number,
    details: string,
    publish: boolean
}

export interface Versions {
    [name: string] : Version
}

interface Product {
    id: number,
    description: string,
    versions: Versions
}

interface ProductForm {
    name: string,
    description: string,
}

interface Products {
    [name: string] : Product
}

interface Model {
    id: number,
    brand_id: number,
    collection_id: number | null,
    primary_category_id: number,
    secondary_category_id: number | null,
    terciary_category_id: number | null,
    products: Products
}

interface ModelForm {
    name: string,
    brand_id: number,
    collection_id: number | null,
    primary_category_id: number,
    secondary_category_id: number | null,
    terciary_category_id: number | null
}

interface Models {
    [name: string] : Model
}


interface ProductsState {
    isUpdating: boolean;
    models: Models;
    selectedModel: Model | null;
    selectedModelName: string | null;

    fetchAllModels: () => Promise<void>;

    createModel: (modelForm: ModelForm) => Promise<void>;
    updateModel: (id: number, modelForm: ModelForm) => Promise<void>;
    deleteModel: (id: number) => Promise<void>;

    createProduct: (modelForm: ProductForm) => Promise<void>;
    updateProduct: (id: number, modelForm: ProductForm) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;

    createVersion: (modelForm: VersionForm) => Promise<void>;
    updateVersion: (id: number, modelForm: VersionForm) => Promise<void>;
    deleteVersion: (id: number) => Promise<void>;

    createImage: (versionId: number, imageForm: ImageForm) => Promise<void>;
    updateImageIndex: (id: number, index: number) => Promise<void>;
    deleteImage: (id: number) => Promise<void>;

    createDescription: (versionId: number, descriptionForm: DescritpionForm) => Promise<void>;
    updateDescription: (id: number, index: number) => Promise<void>;
    deleteDescription: (id: number) => Promise<void>;

}

const MODEL_URL = "/products/model/";
const PRODUCT_URL = "/products/product/";
const VERSION_URL = "/products/version/";
const IMAGE_URL = "/products/versionImage/";
const DESCRIPTION_URL = "/products/versionDescription/";

export const useProductsStore = create<ProductsState>((set, get) => ({
    isUpdating: false,
    models: {},
    selectedModel: null,
    selectedModelName: null,

    fetchAllModels: async () => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.get("/products/all/");
            set({ models: res.data.data });
        } catch (error) {
            handleErrorMessage(error, "fetchModels");
        } finally {
            set({ isUpdating: false });
        }
    },



    createModel: async (modelForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(MODEL_URL, modelForm);
            //set((state) => ({ models: { ...state.models, [res.data.data.id]: res.data.data } }));
            toast.success("Model created successfully");
        } catch (error) {
            handleErrorMessage(error, "createModel");
        } finally {
            set({ isUpdating: false });
        }
    },

    updateModel: async (id, modelForm) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.put(`${MODEL_URL}/${id}`, modelForm);
            //set((state) => ({ models: { ...state.models, [id]: res.data.data } }));
            toast.success("Model updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateModel");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteModel: async (id) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.delete(`${MODEL_URL}/${id}`);
            //set((state) => ({ models: { ...state.models } }));
            toast.success("Model deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteModel");
        } finally {
            set({ isUpdating: false });
        }
    },



    createProduct: async (modelForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(PRODUCT_URL, modelForm);
            //set((state) => ({ models: { ...state.models, [res.data.data.id]: res.data.data } }));
            toast.success("Product created successfully");
        } catch (error) {
            handleErrorMessage(error, "createProduct");
        } finally {
            set({ isUpdating: false });
        }
    },

    updateProduct: async (id, modelForm) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.put(`${PRODUCT_URL}/${id}`, modelForm);
            //set((state) => ({ models: { ...state.models, [id]: res.data.data } }));
            toast.success("Product updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateProduct");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteProduct: async (id) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.delete(`${PRODUCT_URL}/${id}`);
            //set((state) => ({ models: { ...state.models } }));
            toast.success("Product deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteProduct");
        } finally {
            set({ isUpdating: false });
        }
    },



    createVersion: async (modelForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(VERSION_URL, modelForm);
            //set((state) => ({ models: { ...state.models, [res.data.data.id]: res.data.data } }));
            toast.success("Version created successfully");
        } catch (error) {
            handleErrorMessage(error, "createVersion");
        } finally {
            set({ isUpdating: false });
        }
    },

    updateVersion: async (id, modelForm) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.put(`${VERSION_URL}/${id}`, modelForm);
            //set((state) => ({ models: { ...state.models, [id]: res.data.data } }));
            toast.success("Version updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateVersion");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteVersion: async (id) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.delete(`${VERSION_URL}/${id}`);
            //set((state) => ({ models: { ...state.models } }));
            toast.success("Version deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteVersion");
        } finally {
            set({ isUpdating: false });
        }
    },



    createImage: async (versionId, imageForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(`${IMAGE_URL}/${versionId}`, imageForm);
            //set((state) => ({ models: { ...state.models, [res.data.data.id]: res.data.data } }));
            toast.success("Image created successfully");
        } catch (error) {
            handleErrorMessage(error, "createImage");
        } finally {
            set({ isUpdating: false });
        }
    },

    updateImageIndex: async (id, index) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.put(`${IMAGE_URL}/${id}`, index);
            //set((state) => ({ models: { ...state.models, [id]: res.data.data } }));
            toast.success("Image updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateImage");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteImage: async (id) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.delete(`${IMAGE_URL}/${id}`);
            //set((state) => ({ models: { ...state.models } }));
            toast.success("Image deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteImage");
        } finally {
            set({ isUpdating: false });
        }
    },



    createDescription: async (versionId, descriptionForm) => {
        try {
            set({ isUpdating: true });
            const res = await axiosInstance.post(`${DESCRIPTION_URL}/${versionId}`, descriptionForm);
            //set((state) => ({ models: { ...state.models, [res.data.data.id]: res.data.data } }));
            toast.success("Description created successfully");
        } catch (error) {
            handleErrorMessage(error, "createDescription");
        } finally {
            set({ isUpdating: false });
        }
    },

    updateDescription: async (id, descriptionForm) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.put(`${DESCRIPTION_URL}/${id}`, descriptionForm);
            //set((state) => ({ models: { ...state.models, [id]: res.data.data } }));
            toast.success("Description updated successfully");
        } catch (error) {
            handleErrorMessage(error, "updateDescription");
        } finally {
            set({ isUpdating: false });
        }
    },

    deleteDescription: async (id) => {
        try {
            set({ isUpdating: true });
            await axiosInstance.delete(`${DESCRIPTION_URL}/${id}`);
            //set((state) => ({ models: { ...state.models } }));
            toast.success("Description deleted successfully");
        } catch (error) {
            handleErrorMessage(error, "deleteDescription");
        } finally {
            set({ isUpdating: false });
        }
    },
}));