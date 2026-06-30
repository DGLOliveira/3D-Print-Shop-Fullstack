
const ProductCardSkeleton = () => {
    return (
        <div className="card bg-base-200 h-96 shadow-sm">
            <figure className="h-2/3">
                <div className="skeleton w-full h-full"></div>
            </figure>
            <div className="card-body">
                <h2 className="card-title w-1/2 h-8">Loading Product</h2>
                <p className=" h-4">Please wait</p>
                <div className="card-actions">
                    <button className="btn btn-primary">
                        <span className="loading loading-spinner loading-sm"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCardSkeleton