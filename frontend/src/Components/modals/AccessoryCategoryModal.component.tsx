import { useState, useEffect } from 'react'
import { ButtonFactory, ModalFactory } from "../factories/addProductModalFactory.component.tsx";
import { useAccessoriesStore, type AccessoryCategoryForm } from '../../stores/useAccessories.store.tsx';

const modalId = "accessory-category-modal";

export const AccessoryCategoryButtons = ({ canAdd, canEdit, setModalMode }: {canAdd : boolean, canEdit: boolean, setModalMode: React.Dispatch<React.SetStateAction<string>> }) => {
    return <ButtonFactory modalId={modalId} title="Brand" canAdd={canAdd} canEdit={canEdit} setMode={setModalMode} />
}


export const AccessoryCategoryModal = ({ modalMode }: { modalMode: string }) => {

    const {isUpdatingCat, selectedCategoryName, createCategory, updateCategory, deleteCategory} = useAccessoriesStore();
    const [categoryForm, setCategoryForm] : [AccessoryCategoryForm, React.Dispatch<React.SetStateAction<AccessoryCategoryForm>>] = useState({
        name: "",
    });

    const title = modalMode === "add" ? "Add New Category" : "Edit Category";

    
    const formTypes = [
        {
            type: "input",
            label: "Name",
            value: categoryForm.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCategoryForm({ ...categoryForm, name: e.target.value })
        },
    ]
    

    useEffect(()=>{
        if (modalMode === "edit") {
            setCategoryForm({name: selectedCategoryName})
        }else{
            setCategoryForm({name: ""})
        }
    },[modalMode, selectedCategoryName, isUpdatingCat])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dialog = document.getElementById(modalId) as HTMLDialogElement
        if (modalMode === "add") {
            createCategory(categoryForm, dialog);
        } else {
            updateCategory(categoryForm, dialog);
        }
    }

    const handleDelete = () => {
        deleteCategory();
    }

    return (
        <ModalFactory title={title} modalId={modalId} formTypes={formTypes} mode={modalMode} Content={<></>} handleSubmit={handleSubmit} handleDelete={handleDelete} />
    )
}
