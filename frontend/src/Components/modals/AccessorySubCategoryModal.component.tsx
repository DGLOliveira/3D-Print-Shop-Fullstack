import { useState, useEffect } from 'react'
import { ButtonFactory, ModalFactory } from "../factories/addProductModalFactory.component.tsx";
import { useAccessoriesStore, type AcessorySubCategoryForm } from '../../stores/useAccessories.store.tsx';

const modalId = "accessory-subcategory-modal";

export const AccessorySubCategoryButtons = ({canAdd, canEdit, setModalMode }: {canAdd : boolean, canEdit: boolean, setModalMode: React.Dispatch<React.SetStateAction<string>> }) => {
    return <ButtonFactory modalId={modalId} title="Brand" canAdd={canAdd} canEdit={canEdit} setMode={setModalMode} />
}

export const AccessorySubCategoryModal = ({ modalMode }: { modalMode: string }) => {

    const accessoryStore = useAccessoriesStore();
    const [subcategoryForm, setSubcategoryForm]: [AcessorySubCategoryForm, React.Dispatch<React.SetStateAction<AcessorySubCategoryForm>>] = useState({
        name: "",
        categoryId: -1
    });

    const title = modalMode === "add" ? "Add New Category" : "Edit Category";

    const formTypes = [
        {
            type: "input",
            label: "Name",
            value: subcategoryForm.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })
        },
    ]


    useEffect(() => {
        if (accessoryStore.selectedSubCategoryName !== "") {
            if (modalMode === "edit") {
                setSubcategoryForm({ categoryId: accessoryStore.categories[accessoryStore.selectedCategoryName].id, name: accessoryStore.selectedSubCategoryName })
            } else {
                setSubcategoryForm({ categoryId: accessoryStore.categories[accessoryStore.selectedCategoryName].id, name: "" })
            }
        } else {
            setSubcategoryForm({ categoryId: -1, name: "" })
        }
    }, [modalMode, accessoryStore.selectedCategoryName])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dialog = document.getElementById(modalId) as HTMLDialogElement
        if (modalMode === "add") {
            accessoryStore.createSubCategory(subcategoryForm, dialog);
        } else {
            accessoryStore.updateSubCategory(subcategoryForm, dialog);
        }
    }

    const handleDelete = () => {
        accessoryStore.deleteSubCategory();
    }

    return (
        <ModalFactory title={title} modalId={modalId} formTypes={formTypes} mode={modalMode} Content={<></>} handleSubmit={handleSubmit} handleDelete={handleDelete} />
    )
}
