import { useState } from 'react'
import { Plus } from 'lucide-react'

export const AddMaterialButton = () => {

    const openModal = () => {
        const dialog = document.getElementById('add-new-material') as HTMLDialogElement | null
        if (dialog) {
            dialog.showModal()
        }
    }

    return (
        <button className="btn btn-ghost w-fit ml-2 p-1" title="Add New Material" onClick={openModal}>
            <Plus />
        </button>
    )
}

export const AddMaterialModal = () => {

    const [materialForm, setMaterialForm] = useState({
        name: "",
        summary: ""
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* TODO */
    }

    return (
        <dialog id="add-new-material" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl w-full text-center mb-4">Add New Material</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">Material Name</span>
                        </label>
                        <input type="text" placeholder="Material Name" className="input input-bordered" value={materialForm.name} onChange={(e) => setMaterialForm({ ...materialForm, name: e.target.value })} />
                    </div>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">Summary</span>
                        </label>
                        <textarea placeholder="Summary" className="input input-bordered" value={materialForm.summary} onChange={(e) => setMaterialForm({ ...materialForm, summary: e.target.value })} />
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
