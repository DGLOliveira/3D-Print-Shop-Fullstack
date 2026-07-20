import { useState, useEffect, type JSX } from "react"
import { SquarePlus } from 'lucide-react'
import { useOutletContext, Link } from "react-router"
import { toast } from "react-hot-toast"
import { useCategoriesStore, type CategoryForm, type SubCategoryForm } from "../../stores/useCategories.store.tsx"
import handleImageUpload from "../../utils/handleImageUpload.util.tsx"

const ManageCategories = () => {

  const [page, setPage] = useState("List")
  const [prepareExit, setPrepareExit] = useState(false);
  const [_title, setTitle] = useOutletContext<[title: JSX.Element, setTitle: React.Dispatch<React.SetStateAction<JSX.Element>>]>();
  const { categories, selectedPrimaryCategory, selectedSecondaryCategory, selectedTerciaryCategory, setPrimaryCategory, setSecondaryCategory, setTerciaryCategory, isUpdating, isDeleting, createPrimaryCategory, createSecondaryCategory, createTerciaryCategory, updatePrimaryCategory, updateSecondaryCategory, updateTerciaryCategory, deletePrimaryCategory, deleteSecondaryCategory, deleteTerciaryCategory } = useCategoriesStore()


  useEffect(() => {
    if (page === "add") {
      setTitle(
        <div className="breadcrumbs text-sm">
          <ul>
            <li><Link to="/admin/manage-categories" className="btn btn-ghost" onClick={() => setPage("List")}>Manage Categories</Link></li>
            <li><a className="btn btn-ghost">Add Category</a></li>
          </ul>
        </div>
      )
    } else if (page === "edit") {
      setTitle(
        <div className="breadcrumbs text-sm">
          <ul>
            <li><Link to="/admin/manage-categories" className="btn btn-ghost" onClick={() => setPage("List")}>Manage Categories</Link></li>
            <li><a className="btn btn-ghost">Edit Category</a></li>
          </ul>
        </div>
      )
    } else {
      setTitle(
        <div className="breadcrumbs text-sm">
          <ul>
            <li><a className="btn btn-ghost">Manage Categories</a></li>
          </ul>
        </div>
      )
    }
  }, [page])

  const CategoriesList = () => {
    console.log(categories)
    const setCreatePrimary = () => {
      setPrimaryCategory(null)
      setPage("add")
    }
    const setEditPrimary = (primaryId: number) => {
      setPrimaryCategory(primaryId)
      setPage("edit")
    }
    const setCreateSecondary = (primaryId: number) => {
      setPrimaryCategory(primaryId)
      setPage("add")
    }
    const setEditSecondary = (primaryId: number, secondaryId: number) => {
      setPrimaryCategory(primaryId)
      setSecondaryCategory(secondaryId)
      setPage("edit")
    }
    const setCreateTerciary = (primaryId: number, secondaryId: number) => {
      setPrimaryCategory(primaryId)
      setSecondaryCategory(secondaryId)
      setPage("add")
    }
    const setEditTerciary = (primaryId: number, secondaryId: number, terciaryId: number) => {
      setPrimaryCategory(primaryId)
      setSecondaryCategory(secondaryId)
      setTerciaryCategory(terciaryId)
      setPage("edit")
    }

    return (

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center my-2">Categories List</h1>
        <div className="flex flex-col items-center gap-4 p-2 box-border">
          <div className="card bg-base-200 h-16 w-200 shadow-sm flex flex-row justify-center items-center border border-dashed hover:cursor-pointer hover:*:text-info" onClick={() => setCreatePrimary()}>
            <SquarePlus className="size-12" />
            <span className="text-md">Add Primary Category</span>
          </div>
          {Object.keys(categories).map((primaryId, index) => (
            <div key={index} className="card flex-row w-200 bg-base-100 shadow-sm border border-neutral">
              <div className="flex flex-col">
                <figure className="w-25 h-25">
                  <img
                    className="w-full h-full object-contain"
                    src={categories[Number(primaryId)].image_url ? categories[Number(primaryId)].image_url : "https://stackoverflow.com/does-not-exist.png"}
                  />
                </figure>
                <div className="card-actions">
                  <button className="btn btn-primary w-25" onClick={() => { setEditPrimary(Number(primaryId)) }}>Edit</button>
                </div>
              </div>
              <div className="card-body">
                <h2 className="card-title">{categories[Number(primaryId)].name}</h2>
                <div className="collapse collapse-arrow  bg-base-100 border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title font-semibold">Subcategories</div>
                  <div className="collapse-content text-sm">

                    <div className="card bg-base-200 h-10 shadow-sm flex flex-row justify-center gap-2 items-center border border-dashed hover:cursor-pointer hover:*:text-info" onClick={() => { setCreateSecondary(Number(primaryId)) }}>
                      <SquarePlus className="size-6" />
                      <span className="text-md">Add Secondary Category</span>
                    </div>

                    {categories[Number(primaryId)].subcategories && Object.keys(categories[Number(primaryId)].subcategories).map((secondaryId, secondaryIndex) => (
                      <div key={secondaryIndex} className="card flex-row w-full  bg-base-100 shadow-sm border border-neutral mt-2">

                        <div className="flex flex-col">
                          <figure className="w-20 h-20">
                            <img
                              className="w-full h-full object-contain"
                              src={categories[Number(primaryId)].subcategories[Number(secondaryId)].image_url ? categories[Number(primaryId)].subcategories[Number(secondaryId)].image_url : "https://stackoverflow.com/does-not-exist.png"}
                            />
                          </figure>
                          <div className="card-actions">
                            <button className="btn btn-primary w-20" onClick={() => { setEditSecondary(Number(primaryId), Number(secondaryId)) }}>Edit</button>
                          </div>
                        </div>
                        <div className="card-body">
                          <h2 className="card-title">{categories[Number(primaryId)].subcategories[Number(secondaryId)].name}</h2>
                          <div className="collapse collapse-arrow  bg-base-100 border border-base-300">
                            <input type="checkbox" />
                            <div className="collapse-title font-semibold">Subcategories</div>
                            <div className="collapse-content text-sm">

                              <div className="card bg-base-200 h-10 shadow-sm flex flex-row justify-center gap-2 items-center border border-dashed hover:cursor-pointer hover:*:text-info" onClick={() => { setCreateTerciary(Number(primaryId), Number(secondaryId)) }}>
                                <SquarePlus className="size-6" />
                                <span className="text-md">Add Terciary Category</span>
                              </div>
                              {categories[Number(primaryId)].subcategories[Number(secondaryId)].subcategories && Object.keys(categories[Number(primaryId)].subcategories[Number(secondaryId)].subcategories).map((terciaryId, terciaryIndex) => (
                                <div key={terciaryIndex} className="card bg-base-200 shadow-sm flex flex-row justify-center gap-2 items-center border border-neutral hover:cursor-pointer">

                                  <div className="flex flex-col">
                                    <figure className="w-20 h-20">
                                      <img
                                        className="w-full h-full object-contain"
                                        src={categories[Number(primaryId)].subcategories[Number(secondaryId)].subcategories[Number(terciaryId)].image_url ? categories[Number(primaryId)].subcategories[Number(secondaryId)].subcategories[Number(terciaryId)].image_url : "https://stackoverflow.com/does-not-exist.png"}
                                      />
                                    </figure>
                                  </div>
                                  <div className="card-body">
                                    <h2 className="card-title">{categories[Number(primaryId)].subcategories[Number(secondaryId)].subcategories[Number(terciaryId)].name}</h2>
                                  </div>
                                    <div className="card-actions mr-2">
                                      <button className="btn btn-primary w-20" onClick={() => { setEditTerciary(Number(primaryId), Number(secondaryId), Number(terciaryId)) }}>Edit</button>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }


  const AddCategory = () => {
    const [categoryNest, setCategoryNest] = useState<1 | 2 | 3>(1)
    const [form, setForm] = useState<CategoryForm | SubCategoryForm>({
      name: "",
      image: "",
    })
    useEffect(() => {
      if (selectedSecondaryCategory) {
        setCategoryNest(3)
        setForm({
          name: "",
          image: null,
          parent_id: selectedSecondaryCategory
        })
      }
      else if (selectedPrimaryCategory) {
        setCategoryNest(2)
        setForm({
          name: "",
          image: null,
          parent_id: selectedPrimaryCategory
        })
      }
      else {
        setCategoryNest(1)
        setForm({
          name: "",
          image: null,
        })
      }
    }, [])

    function changeImage(base64Image: string | ArrayBuffer | null) {
      setForm({ ...form, image: base64Image })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (form.image === null) {
        toast.error("Please upload an image");
      } else if (form.name === "") {
        toast.error("Please fill name field");
      } else {
        if (categoryNest === 1) {
          createPrimaryCategory(form);
        } else if (categoryNest === 2 && "parent_id" in form) {
          createSecondaryCategory(form);
        } else if (categoryNest === 3 && "parent_id" in form) {
          createTerciaryCategory(form);
        } else {
          toast.error("Something went wrong");
          setPage("List");
        }
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
        <h1 className="text-2xl font-bold text-center">Add Category</h1>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-center w-full m-1">
            <figure className="w-40 h-40 border" onClick={() => handleImageUpload(changeImage)}>
              {form.image !== null ?
                <img className="w-full h-full object-contain cursor-pointer" src={String(form.image)} /> :
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
            <input type="text" className="input input-bordered" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="flex justify-center w-full m-1">
            <button disabled={isUpdating} type="submit" className="btn btn-primary">{isUpdating ? "Uploading..." : "Submit"}</button>
          </div>
        </div>
      </form>
    )
  }

  const EditCategory = () => {

    const [categoryNest, setCategoryNest] = useState<1 | 2 | 3>(1)
    const [form, setForm] = useState<CategoryForm | SubCategoryForm>({
      name: "",
      image: null,
    })
    useEffect(() => {
      if (selectedTerciaryCategory) {
        setCategoryNest(3)
        setForm({
          name: categories[Number(selectedPrimaryCategory)].subcategories[Number(selectedSecondaryCategory)].subcategories[Number(selectedTerciaryCategory)].name,
          image: categories[Number(selectedPrimaryCategory)].subcategories[Number(selectedSecondaryCategory)].subcategories[Number(selectedTerciaryCategory)].image_url,
          parent_id: Number(selectedSecondaryCategory)
        })
      }
      else if (selectedSecondaryCategory) {
        setCategoryNest(2)
        setForm({
          name: categories[Number(selectedPrimaryCategory)].subcategories[Number(selectedSecondaryCategory)].name,
          image: categories[Number(selectedPrimaryCategory)].subcategories[Number(selectedSecondaryCategory)].image_url,
          parent_id: Number(selectedPrimaryCategory)
        })
      }
      else {
        setCategoryNest(1)
        setForm({
          name: categories[Number(selectedPrimaryCategory)].name,
          image: categories[Number(selectedPrimaryCategory)].image_url,
        })
      }
    }, [])

    function changeImage(base64Image: string | ArrayBuffer | null) {
      setForm({ ...form, image: base64Image })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (form.image === null) {
        toast.error("Please upload an image");
      } else if (form.name === "") {
        toast.error("Please fill name field");
      } else {
        if (categoryNest === 1) {
          updatePrimaryCategory(Number(selectedPrimaryCategory), form);
        } else if (categoryNest === 2 && "parent_id" in form) {
          updateSecondaryCategory(Number(selectedSecondaryCategory), form);
        } else if (categoryNest === 3 && "parent_id" in form) {
          updateTerciaryCategory(Number(selectedTerciaryCategory), form);
        } else {
          toast.error("Something went wrong");
          setPage("List");
        }
      }
    }

    const handleDelete = () => {
      if (categoryNest === 1) {
        deletePrimaryCategory(Number(selectedPrimaryCategory));
      } else if (categoryNest === 2) {
        deleteSecondaryCategory(Number(selectedSecondaryCategory));
      } else if (categoryNest === 3) {
        deleteTerciaryCategory(Number(selectedTerciaryCategory));
      }
    }

    useEffect(() => {
      if (isDeleting) {
        setPrepareExit(true);
      } else if (prepareExit) {
        setPage("List");
        setPrepareExit(false);
      }
    }, [isDeleting])
    return (<>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Edit Category</h1>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-center w-full m-1">
            <figure className="w-40 h-40 border" onClick={() => handleImageUpload(changeImage)}>
              {form.image !== null ?
                <img className="w-full h-full object-contain cursor-pointer" src={String(form.image)} /> :
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
            <input type="text" className="input input-bordered" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="flex justify-center w-full my-1">
            <button disabled={isUpdating || isDeleting} type="submit" className="btn btn-primary w-30">{isUpdating ? "Uploading..." : "Submit"}</button>
          </div>
        </div>
      </form>
      <div className="flex justify-center w-full my-5">
        <button disabled={isDeleting || isUpdating} className="btn btn-error w-30" onClick={handleDelete}>{isDeleting ? "Deleting..." : "Delete"}</button>
      </div>
    </>)
  }

  return (
    <div>
      {page === "List" && <CategoriesList />}
      {page === "add" && <AddCategory />}
      {page === "edit" && <EditCategory />}
    </div>
  )
}

export default ManageCategories