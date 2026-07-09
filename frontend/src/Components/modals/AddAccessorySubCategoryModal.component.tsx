import { useState } from 'react'
import { Plus } from 'lucide-react'

export const AddAccessorySubCategoryButton = () => {

    const openModal = () => {
        const dialog = document.getElementById('add-new-accessory-subcategory') as HTMLDialogElement | null
        if (dialog) {
            dialog.showModal()
        }
    }

    return (
        <button className="btn btn-ghost w-fit ml-2 p-1" title="Add New Accessory SubCategory" onClick={openModal}>
            <Plus />
        </button>
    )
}

export const AddAccessorySubCategoryModal = () => {

    const [accessoryForm, setAccessoryForm] = useState({
        name: "",
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* TODO */
    }

    return (
        <dialog id="add-new-accessory-subcategory" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl w-full text-center mb-4">Add New SubCategory</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">SubCategory Name</span>
                        </label>
                        <input type="text" placeholder="Category Name" className="input input-bordered" value={accessoryForm.name} onChange={(e) => setAccessoryForm({ ...accessoryForm, name: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-error">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
