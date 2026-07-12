import { useState, useEffect } from 'react'
import { useBrandsStore, type BrandForm } from '../../stores/useBrands.store.tsx'
import { ButtonFactory, ModalFactory } from "../factories/addProductModalFactory.component.tsx";

const modalId = "brand-modal";

export const BrandModalButtons = ({ canAdd, canEdit, setModalMode }: { canAdd: boolean, canEdit: boolean, setModalMode: React.Dispatch<React.SetStateAction<string>> }) => {
    return <ButtonFactory modalId={modalId} title="Brand" canAdd={canAdd} canEdit={canEdit} setMode={setModalMode} />
}

export const BrandModal = ({ modalMode }: { modalMode: string }) => {

    const { brands, isLoading, isCreating, isUpdating, selectedBrand, createBrand, updateBrand, deleteBrand} = useBrandsStore();

    const [logoBackground, setLogoBackground] = useState("light");
    const [brandForm, setBrandForm]: [BrandForm, React.Dispatch<React.SetStateAction<BrandForm>>] = useState({
        name: "",
        summary: "",
        website: "",
        logo: ""
    });

    const title = modalMode === "add" ? "Add New Brand" : "Edit Brand";

    const formTypes = [
        {
            type: "input",
            label: "Name",
            value: brandForm.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrandForm({ ...brandForm, name: e.target.value })
        },
        {
            type: "input",
            label: "Website",
            value: brandForm.website,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrandForm({ ...brandForm, website: e.target.value })
        },
        {
            type: "input",
            label: "Logo",
            value: brandForm.logo,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBrandForm({ ...brandForm, logo: e.target.value })
        },
        {
            type: "textarea",
            label: "Summary",
            value: brandForm.summary,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setBrandForm({ ...brandForm, summary: e.target.value })
        }
    ]

    useEffect(() => {
        if (modalMode === "add") {
            setBrandForm({
                name: "",
                summary: "",
                website: "",
                logo: ""
            })
        } else {
            if (selectedBrand !== null) {
                setBrandForm({
                    name: brands[selectedBrand].name,
                    summary: brands[selectedBrand].summary === null ? "" : brands[selectedBrand].summary,
                    website: brands[selectedBrand].website,
                    logo: brands[selectedBrand].logo === null ? "" : brands[selectedBrand].logo
                })
            }
        }
    }, [selectedBrand, modalMode])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dialog = document.getElementById(modalId) as HTMLDialogElement
        if (modalMode === "add") {
            createBrand(brandForm, dialog);
        } else {
            if (selectedBrand === null) return
            updateBrand(brands[selectedBrand].id, brandForm, dialog);
        }
    }

    const handleDelete = () => {
        if (selectedBrand === null) return
        deleteBrand(brands[selectedBrand].id);
    }

    const LogoPreview = () => {
        return (

            <div className="flex justify-center gap-4 w-full m-1">
                <div className="flex flex-col justify-center gap-2">
                    <span>Logo Preview:</span>
                    <button className="btn bg-white text-black" onClick={() => setLogoBackground("light")}>Light</button>
                    <button className="btn bg-black text-white" onClick={() => setLogoBackground("dark")}>Dark</button>
                </div>
                <object data="https://stackoverflow.com/does-not-exist.png" type="image/png">
                    <img src={brandForm.logo === "" ? "https://stackoverflow.com/does-not-exist.png" : brandForm.logo} className="w-32 h-32 contain-content border border-neutral" style={{ backgroundColor: logoBackground === "light" ? "white" : "black" }} />
                </object>
            </div>
        )
    }

    return (
        <ModalFactory title={title} modalId={modalId} formTypes={formTypes} mode={modalMode} Content={<LogoPreview />} handleSubmit={handleSubmit} handleDelete={handleDelete} />
    )
}