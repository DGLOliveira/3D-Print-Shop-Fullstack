import { useState } from 'react'
import { Plus } from 'lucide-react'

export const AddResinCategoryButton = () => {

    const openModal = () => {
        const dialog = document.getElementById('add-new-resin-category') as HTMLDialogElement | null
        if (dialog) {
            dialog.showModal()
        }
    }

    return (
        <button className="btn btn-ghost w-fit ml-2 p-1" title="Add New Resin Category" onClick={openModal}>
            <Plus />
        </button>
    )
}

export const AddResinCategoryModal = () => {

    const [resinForm, setResinForm] = useState({
        name: "",
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* TODO */
    }

    return (
        <dialog id="add-new-resin-category" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl w-full text-center mb-4">Add New Category</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">Category Name</span>
                        </label>
                        <input type="text" placeholder="Category Name" className="input input-bordered" value={resinForm.name} onChange={(e) => setResinForm({ ...resinForm, name: e.target.value })} />
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
