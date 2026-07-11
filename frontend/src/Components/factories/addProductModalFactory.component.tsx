import { Plus, PenLine } from 'lucide-react'

export const ButtonFactory = ({ modalId, title, canEdit, setMode }: { modalId: string, title: string, canEdit: boolean, setMode: React.Dispatch<React.SetStateAction<string>> }) => {

    const openModal = () => {
        const dialog = document.getElementById(modalId) as HTMLDialogElement | null
        if (dialog) dialog.showModal()
    }

    return (
        <>
            <button className="btn btn-ghost w-fit ml-2 p-1" title={"Add New " + title} onClick={() => { openModal(); setMode("add"); }}>
                <Plus />
            </button>
            <button disabled={!canEdit} className="btn btn-ghost w-fit ml-2 p-1" title={"Edit " + title} onClick={() => { openModal(); setMode("edit"); }}>
                <PenLine />
            </button>
        </>
    )
}

interface FormType {
    type: string,
    label: string,
    value: any,
    onChange: any
}

interface FormTypes extends Array<FormType> { }


export const ModalFactory = ({ title, modalId, formTypes, mode, Content, handleSubmit, handleDelete }: { title: string, modalId: string, formTypes: FormTypes, mode: string, Content: any, handleSubmit: any, handleDelete: any }) => {


    const Input = ({ formType }: { formType: FormType }) => {
        return (
            <div className="flex justify-between w-full m-1">
                <label className="label">
                    <span className="label-text">{formType.label}</span>
                </label>
                <input type="text" className="input input-bordered" value={formType.value} onChange={(e) => formType.onChange(e)} />
            </div>
        )
    }

    const TextArea = ({ formType }: { formType: FormType }) => {
        return (
            <div className="flex justify-between w-full m-1">
                <label className="label">
                    <span className="label-text">{formType.label}</span>
                </label>
                <textarea className="input input-bordered text-wrap" value={formType.value} onChange={(e) => formType.onChange(e)} />
            </div>
        )
    }

    const formElementFactory = (formType: FormType) => {
        switch (formType.type) {
            case "input":
                return <Input formType={formType} />
            case "textarea":
                return <TextArea formType={formType} />
        }
    }

    return (

        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl w-full text-center mb-4">{title}</h3>
                {Content}
                <form onSubmit={handleSubmit}>
                    {formTypes.map((formType) => formElementFactory(formType))}
                    <div className="flex justify-center w-full m-1">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        {mode === "edit" && <button className="btn btn-error" onClick={handleDelete}>Delete</button>}
                        <button className="btn btn-error">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

