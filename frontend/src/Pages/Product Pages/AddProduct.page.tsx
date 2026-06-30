import { useState } from 'react'

const AddProduct = () => {

  const [productFormData, setProductFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [] as File[],
    publish: false,
  })

  const imageUpload = (event : React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProductFormData({...productFormData, images: [...productFormData.images, event.target.files[0] as File]})
    }
  }

  const submitProduct = (event : React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={submitProduct} className="flex flex-col gap-2">
      <div className="flex w-full justify-center align-middle mt-2">
          <input type="text" placeholder="Title" className="input input-bordered text-center text-2xl" value={productFormData.title} onChange={(event) => setProductFormData({...productFormData, title: event.target.value})} />
      </div>
      <div className="flex flex-row">
        <div>
          <label>
            Images:
            <input type="file" multiple onChange={imageUpload}/>
          </label>
        </div>
      </div>
      <div>
        <label>
          Description:
          <textarea value={productFormData.description} onChange={(event) => setProductFormData({...productFormData, description: event.target.value})} />
        </label>
      </div>
      <div className="flex justify-center">
      <button type="submit" className="btn btn-primary m-2 w-fit">
        Submit
      </button>
      </div>
    </form>
  )
}

export default AddProduct