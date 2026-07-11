import { useState, useEffect } from 'react'
import { ButtonFactory, ModalFactory } from "../factories/addProductModalFactory.component.tsx";
import { useAccessoriesStore, type AccessoryCategoryForm } from '../../stores/useAccessories.store.tsx';

const modalId = "accessory-category-modal";

export const AccessoryCategoryButtons = ({ canEdit, setModalMode }: { canEdit: boolean, setModalMode: React.Dispatch<React.SetStateAction<string>> }) => {
    return <ButtonFactory modalId={modalId} title="Brand" canEdit={canEdit} setMode={setModalMode} />
}


export const AccessoryCategoryModal = ({ modalMode }: { modalMode: string }) => {

    const accessoryStore = useAccessoriesStore();
    const [accessoryForm, setAccessoryForm] : [AccessoryCategoryForm, React.Dispatch<React.SetStateAction<AccessoryCategoryForm>>] = useState({
        name: "",
    });

    const title = modalMode === "add" ? "Add New Category" : "Edit Category";

    
    const formTypes = [
        {
            type: "input",
            label: "Name",
            value: accessoryForm.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAccessoryForm({ ...accessoryForm, name: e.target.value })
        },
    ]
    

    useEffect(()=>{
        if (modalMode === "edit") {
            setAccessoryForm({name: accessoryStore.selectedCategoryName})
        }else{
            setAccessoryForm({name: ""})
        }
    },[modalMode])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dialog = document.getElementById(modalId) as HTMLDialogElement
        if (modalMode === "add") {
            accessoryStore.createCategory(accessoryForm, dialog);
        } else {
            accessoryStore.updateCategory(accessoryForm, dialog);
        }
    }

    const handleDelete = () => {
        accessoryStore.deleteCategory();
    }

    return (
        <ModalFactory title={title} modalId={modalId} formTypes={formTypes} mode={modalMode} Content={<></>} handleSubmit={handleSubmit} handleDelete={handleDelete} />
    )
}
