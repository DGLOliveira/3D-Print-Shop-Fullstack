import { PenLine } from "lucide-react"
import { useNavigate } from "react-router"

const ProductCard = (props: {id:string, title: string, price: number, discount: number, image: string }) => {
    const { id, title, price, discount, image } = props

    const navigate = useNavigate()
    const checkProduct = () =>{
        navigate(`/store/product?category=Accessories&prodId=${id}`)
    }
    return (
        <div className="card bg-base-100 shadow-sm border border-neutral">
            <figure className="w-full h-50">
                <img
                    className="w-full h-50 object-contain"
                    src={image ? image : "https://stackoverflow.com/does-not-exist.png"}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {discount > 0 ?
                    <p><span className="line-through text-gray-400">{price} €</span> {price - Math.round(price * discount) / 100}€</p>
                    : <p>{price}€</p>}
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={checkProduct}>Check Product</button>
                    <button className="btn btn-primary">
                        <PenLine className="size-4" />
                        Edit Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard