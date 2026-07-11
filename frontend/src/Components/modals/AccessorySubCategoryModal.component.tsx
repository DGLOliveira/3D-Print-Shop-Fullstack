import { useState, useEffect } from 'react'
import { ButtonFactory, ModalFactory } from "../factories/addProductModalFactory.component.tsx";
import { useAccessoriesStore, type AcessorySubCategoryForm } from '../../stores/useAccessories.store.tsx';

const modalId = "accessory-subcategory-modal";

export const AccessorySubCategoryButtons = ({ canAdd, canEdit, setModalMode }: { canAdd: boolean, canEdit: boolean, setModalMode: React.Dispatch<React.SetStateAction<string>> }) => {
    return <ButtonFactory modalId={modalId} title="Brand" canAdd={canAdd} canEdit={canEdit} setMode={setModalMode} />
}

export const AccessorySubCategoryModal = ({ modalMode }: { modalMode: string }) => {

    const { isUpdatingCat, selectedSubCategoryName, selectedCategoryName, categories, createSubCategory, updateSubCategory, deleteSubCategory } = useAccessoriesStore();
    const [subcategoryForm, setSubcategoryForm]: [AcessorySubCategoryForm, React.Dispatch<React.SetStateAction<AcessorySubCategoryForm>>] = useState({
        name: "",
        categoryId: -1
    });

    const title = modalMode === "add" ? "Add New SubCategory" : "Edit SubCategory";

    const formTypes = [
        {
            type: "input",
            label: "Name",
            value: subcategoryForm.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })
        },
    ]


    useEffect(() => {
        if (selectedSubCategoryName !== "") {
            if (modalMode === "edit") {
                setSubcategoryForm({ categoryId: categories[selectedCategoryName].id, name: selectedSubCategoryName })
            } else {
                setSubcategoryForm({ categoryId: categories[selectedCategoryName].id, name: "" })
            }
        } else {
            if (selectedCategoryName === "") {
                setSubcategoryForm({ categoryId: -1, name: "" })
            } else {
                setSubcategoryForm({ categoryId: categories[selectedCategoryName].id, name: "" })
            }
        }
    }, [modalMode, selectedCategoryName, isUpdatingCat])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dialog = document.getElementById(modalId) as HTMLDialogElement
        if (modalMode === "add") {
            createSubCategory(subcategoryForm, dialog);
        } else {
            updateSubCategory(subcategoryForm, dialog);
        }
    }

    const handleDelete = () => {
        deleteSubCategory();
    }

    return (
        <ModalFactory title={title} modalId={modalId} formTypes={formTypes} mode={modalMode} Content={<></>} handleSubmit={handleSubmit} handleDelete={handleDelete} />
    )
}
