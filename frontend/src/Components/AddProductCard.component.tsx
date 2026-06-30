import { SquarePlus } from 'lucide-react'
import { Link } from 'react-router'

const AddProductCard = () => {

  return (
    <Link to={`/store/add-product`} className="card bg-base-200 h-96 shadow-sm flex flex-col justify-center items-center border-4 border-dashed hover:cursor-pointer hover:*:text-info">
      <SquarePlus className="size-32 mb-4" />
      <span className="text-2xl">Add Product</span>
    </Link>
  )
}

export default AddProductCard