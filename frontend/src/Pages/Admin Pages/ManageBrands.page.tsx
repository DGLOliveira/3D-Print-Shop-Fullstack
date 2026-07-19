import { useState, useEffect, type JSX } from "react"
import { SquarePlus } from 'lucide-react'
import { useOutletContext, Link } from "react-router"
import { toast } from "react-hot-toast"
import { useBrandsStore, type BrandForm } from "../../stores/useBrands.store.tsx"
import handleImageUpload from "../../utils/handleImageUpload.util.tsx"

export const ManageBrands = () => {
    const [page, setPage] = useState("List")
    const [prepareExit, setPrepareExit] = useState(false);
    const [_title, setTitle] = useOutletContext<[title: JSX.Element, setTitle: React.Dispatch<React.SetStateAction<JSX.Element>>]>();
    const { brands, selectedBrand, isUpdating, isDeleting, selectBrand, createBrand, updateBrand, deleteBrand } = useBrandsStore()


    useEffect(() => {
        if (page === "add") {
            setTitle(
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/admin/manage-brands" className="btn btn-ghost" onClick={() => setPage("List")}>Manage Brands</Link></li>
                        <li><a className="btn btn-ghost">Add Brand</a></li>
                    </ul>
                </div>
            )
        } else if (page === "edit") {
            setTitle(
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/admin/manage-brands" className="btn btn-ghost" onClick={() => setPage("List")}>Manage Brands</Link></li>
                        <li><a className="btn btn-ghost">Edit Brand</a></li>
                    </ul>
                </div>
            )
        } else {
            setTitle(
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><a className="btn btn-ghost">Manage Brands</a></li>
                    </ul>
                </div>
            )
        }
    }, [page])



    const ListBrands = () => {

        return (
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center my-2">Brands List</h1>
                <div className="flex flex-row flex-wrap gap-4 m-2 box-border justify-center">
                    <div className="card bg-base-200 h-40 w-80 shadow-sm flex flex-col justify-center items-center border border-dashed hover:cursor-pointer hover:*:text-info">
                        <SquarePlus className="size-20 mb-2" onClick={() => setPage("add")} />
                        <span className="text-2xl">Add Brand</span>
                    </div>
                    {brands.map((brand, index) => (
                        <div key={index} className="card flex-row w-80 h-40 bg-base-100 shadow-sm border hover:border-info box-border p-2">
                            <div className="flex flex-col justify-evenly items-center">
                                <figure className="w-25 h-25">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={brand.image_url ? brand.image_url : "https://stackoverflow.com/does-not-exist.png"}
                                    />
                                </figure>
                                    <div className="card-actions">
                                        <button className="btn btn-primary w-25" onClick={() => { setPage("edit"); selectBrand(index) }}>Edit</button>
                                    </div>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">{brand.name}</h2>
                                <a href={brand.website} target="_blank" className="link link-info">{brand.website}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const AddBrand = () => {
        const [brandForm, setBrandForm] = useState<BrandForm>({
            name: "",
            summary: "",
            website: "",
            logo: null
        });

        function changeImage(base64Image: string | ArrayBuffer | null) {
            setBrandForm({ ...brandForm, logo: base64Image })
        }


        const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (brandForm.logo === null) {
                toast.error("Please upload an image");
            } else if (brandForm.name === "" || brandForm.website === "") {
                toast.error("Please fill out all fields");
            } else {
                createBrand(brandForm);
            }
        }

        useEffect(() => {
            if (isUpdating) {
                setPrepareExit(true);
            } else if (prepareExit) {
                setPage("List");
                setPrepareExit(false);
            }
        }, [isUpdating])

        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center">Add Brand</h1>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-center w-full m-1">
                        <figure className="w-40 h-40 border" onClick={() => handleImageUpload(changeImage)}>
                            {brandForm.logo !== null ?
                                <img className="w-full h-full object-contain cursor-pointer" src={String(brandForm.logo)} /> :
                                <div className="skeleton w-full h-full flex flex-col justify-center items-center cursor-pointer">
                                    <span>Load</span>
                                    <span>New</span>
                                    <span>Image</span>
                                </div>
                            }
                        </figure>
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Name:</span>
                        </label>
                        <input type="text" className="input input-bordered" value={brandForm.name} onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Website:</span>
                        </label>
                        <input type="text" className="input input-bordered" value={brandForm.website} onChange={(e) => setBrandForm({ ...brandForm, website: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <label className="label w-20">
                            <span className="label-text">Summary:</span>
                        </label>
                        <textarea className="input input-bordered" value={brandForm.summary} onChange={(e) => setBrandForm({ ...brandForm, summary: e.target.value })} />
                    </div>
                    <div className="flex justify-center w-full m-1">
                        <button disabled={isUpdating} type="submit" className="btn btn-primary">{isUpdating ? "Uploading..." : "Submit"}</button>
                    </div>
                </div>
            </form>
        )
    }

    const EditBrand = () => {
        const [brandForm, setBrandForm] = useState<BrandForm>({
            name: "",
            summary: "",
            website: "",
            logo: null
        });
        useEffect(() => {
            if (selectedBrand !== null) {
                if (brands[selectedBrand] !== undefined) {
                    setBrandForm({
                        name: brands[selectedBrand].name,
                        summary: brands[selectedBrand].summary,
                        website: brands[selectedBrand].website,
                        logo: brands[selectedBrand].image_url
                    });
                } else {
                    setPage("List")
                    selectBrand(null)
                }
            }

        }, [page])

        useEffect(() => {
            if (isDeleting) {
                setPrepareExit(true);
            } else if (prepareExit) {
                setPrepareExit(false);
                setPage("List");
            }
        }, [isDeleting])

        
        function changeImage(base64Image: string | ArrayBuffer | null) {
            setBrandForm({ ...brandForm, logo: base64Image })
        }

        const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (brandForm.logo === null) {
                toast.error("Please upload an image");
            } else if (brandForm.name === "" || brandForm.summary === "" || brandForm.website === "") {
                toast.error("Please fill out all fields");
            } else {
                updateBrand(brands[Number(selectedBrand)].id, brandForm);
            }
        }

        return (
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-center">Add Brand</h1>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-center w-full m-1">
                            <figure className="w-40 h-40 border" onClick={() => handleImageUpload(changeImage)}>
                                {brandForm.logo !== null ?
                                    <img className="w-full h-full object-contain cursor-pointer" src={String(brandForm.logo)} /> :
                                    <div className="skeleton w-full h-full flex flex-col justify-center items-center cursor-pointer">
                                        <span>Load</span>
                                        <span>New</span>
                                        <span>Image</span>
                                    </div>
                                }
                            </figure>
                        </div>
                        <div className="flex justify-center w-full my-1">
                            <label className="label w-20">
                                <span className="label-text">Name:</span>
                            </label>
                            <input type="text" className="input input-bordered" value={brandForm.name} onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })} />
                        </div>
                        <div className="flex justify-center w-full my-1">
                            <label className="label w-20">
                                <span className="label-text">Website:</span>
                            </label>
                            <input type="text" className="input input-bordered" value={brandForm.website} onChange={(e) => setBrandForm({ ...brandForm, website: e.target.value })} />
                        </div>
                        <div className="flex justify-center w-full my-1">
                            <label className="label w-20">
                                <span className="label-text">Summary:</span>
                            </label>
                            <textarea className="input input-bordered" value={brandForm.summary} onChange={(e) => setBrandForm({ ...brandForm, summary: e.target.value })} />
                        </div>
                        <div className="flex justify-center w-full my-1">
                            <button disabled={isUpdating || isDeleting} type="submit" className="btn btn-primary w-30">{isUpdating ? "Updating..." : "Submit"}</button>
                        </div>
                    </div>
                </form>
                <div className="flex justify-center w-full my-5">
                    <button disabled={isDeleting || isUpdating} className="btn btn-error w-30" onClick={() => { deleteBrand(brands[Number(selectedBrand)].id) }}>{isDeleting ? "Deleting..." : "Delete"}</button>
                </div>
            </>
        )
    }


    return (
        <>
            {page === "List" && <ListBrands />}
            {page === "add" && <AddBrand />}
            {page === "edit" && <EditBrand />}
        </>
    )

}

export default ManageBrands