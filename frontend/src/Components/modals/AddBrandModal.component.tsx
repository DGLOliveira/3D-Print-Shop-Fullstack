import { useState } from 'react'
import { Plus } from 'lucide-react'

export const AddBrandButton = () => {

    const openModal = () => {
        const dialog = document.getElementById('add-new-brand') as HTMLDialogElement | null
        if (dialog) {
            dialog.showModal()
        }
    }

    return (
        <button className="btn btn-ghost w-fit ml-2 p-1" title="Add New Brand" onClick={openModal}>
            <Plus />
        </button>
    )
}

export const AddBrandModal = () => {

    const [logoBackground, setLogoBackground] = useState("light");
    const [brandForm, setBrandForm] = useState({
        name: "",
        summary: "",
        website: "",
        logo: ""
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* TODO */
    }

    return (
        <dialog id="add-new-brand" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl w-full text-center mb-4">Add New Brand</h3>
                <div className="flex justify-center gap-4 w-full m-1">
                    <div className="flex flex-col justify-center gap-2">
                        <span>Logo Preview:</span>
                        <button className="btn bg-white text-black" onClick={() => setLogoBackground("light")}>Light</button>
                        <button className="btn bg-black text-white" onClick={() => setLogoBackground("dark")}>Dark</button>
                    </div>
                    <object data="https://stackoverflow.com/does-not-exist.png" type="image/png">
                        <img src={brandForm.logo} className="w-32 h-32 contain-content border border-neutral" style={{ backgroundColor: logoBackground === "light" ? "white" : "black" }} />
                    </object>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">Brand Name</span>
                        </label>
                        <input type="text" placeholder="Brand Name" className="input input-bordered" value={brandForm.name} onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })} />
                    </div>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">Website</span>
                        </label>
                        <input type="text" placeholder="Website" className="input input-bordered" value={brandForm.website} onChange={(e) => setBrandForm({ ...brandForm, website: e.target.value })} />
                    </div>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">Logo Image URL</span>
                        </label>
                        <input type="text" placeholder="Logo" className="input input-bordered" value={brandForm.logo} onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })} />
                    </div>
                    <div className="flex justify-between w-full m-1">
                        <label className="label">
                            <span className="label-text">Summary</span>
                        </label>
                        <textarea placeholder="Summary" className="input input-bordered" value={brandForm.summary} onChange={(e) => setBrandForm({ ...brandForm, summary: e.target.value })} />
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
