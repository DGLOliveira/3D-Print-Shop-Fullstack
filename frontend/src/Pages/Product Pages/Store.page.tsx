import { useEffect, Fragment } from "react"
import { useSearchParams, createSearchParams, Outlet, useLocation, useNavigate } from "react-router"

import StoreList from '../../Components/StoreList.component.tsx'
import StoreFilter from '../../Components/StoreFilter.component.tsx'

import { useCategoriesStore } from "../../stores/useCategories.store.tsx"
import { useBrandsStore } from "../../stores/useBrands.store.tsx"

const StorePage = () => {

    const { selectedPrimaryCategory, setPrimaryCategory, selectedSecondaryCategory, setSecondaryCategory, selectedTerciaryCategory, setTerciaryCategory, categories } = useCategoriesStore()
    const { brands, selectedBrand, selectBrand } = useBrandsStore()
    const location = useLocation();
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()


    const validateCategoriesParams = () => {
        //Check if categories in search params are valid, if any of them are invalid, redirect to store
        if (searchParams.get("category1") !== null && selectedPrimaryCategory === null) {
            const category1Id = Object.keys(categories).find(key => categories[Number(key)].name === searchParams.get("category1"));
            if (category1Id !== undefined) {
                setPrimaryCategory(Number(category1Id));
                if (searchParams.get("category2") !== null && selectedSecondaryCategory === null) {
                    const category2Id = Object.keys(categories[Number(category1Id)].subCategories).find(key => categories[Number(category1Id)].subCategories[Number(key)].name === searchParams.get("category2"));
                    if (category2Id !== undefined) {
                        setSecondaryCategory(Number(category2Id));
                        if (searchParams.get("category3") !== null && selectedTerciaryCategory === null) {
                            const category3Id = Object.keys(categories[Number(category1Id)].subCategories[Number(category2Id)].subcategories).find(key => categories[Number(category1Id)].subCategories[Number(category2Id)].subcategories[Number(key)].name === searchParams.get("category3"));
                            if (category3Id !== undefined) {
                                setTerciaryCategory(Number(category3Id));
                            } else { navigate("/store") }
                        }
                    } else { navigate("/store") }
                }
            } else { navigate("/store") }
        }

    }

    const validateBrands = () => {
        if (searchParams.get("brand") !== null && selectedBrand === null) {
            const brandIndex = brands.findIndex((brand) => brand.name === searchParams.get("brand"));
            console.log(brandIndex)
            if (brandIndex !== undefined) {
                selectBrand(brandIndex);
            } else { navigate("/store") }
        }
    }

    const formatSanitizeParams = () => {
        let newSearchParams = new URLSearchParams();
        //Create new search params with only valid params
        if (selectedPrimaryCategory !== null) {
            newSearchParams.set("category1", categories[selectedPrimaryCategory].name);
            if (selectedSecondaryCategory !== null) {
                newSearchParams.set("category2", categories[selectedPrimaryCategory].subCategories[selectedSecondaryCategory].name);
                if (selectedTerciaryCategory !== null) {
                    newSearchParams.set("category3", categories[selectedPrimaryCategory].subCategories[selectedSecondaryCategory].subcategories[selectedTerciaryCategory].name);
                }
            }
        }
        if (selectedBrand !== null) {
            newSearchParams.set("brand", brands[selectedBrand].name);
        }
        //Check if unused params exist, if they do, remove from url
        if (searchParams !== newSearchParams) {
            setSearchParams(newSearchParams)
        }
    }

    // Check if user entered directly into this page, and validate params
    useEffect(() => {

        //App.tsx automatically fetches categories and brands
        if (categories !== null && brands !== null) {
            validateCategoriesParams()
            validateBrands()
            formatSanitizeParams()
        }

    }, [categories, brands])


    const PrimaryCategoryCard = ({ id, name, image }: { id: number, name: string, image: string }) => {

        const handleClick = () => {
            setPrimaryCategory(id)
            setSearchParams(createSearchParams({ category: name }))
        }

        return (
            <button className="w-44 card bg-base-100 border-neutral border cursor-pointer hover:border-primary focus:border-primary" onClick={handleClick}>
                <figure className="">
                    <img
                        src={image}
                        alt="Shoes"
                        className="h-40 w-40" />
                </figure>
                <div className="card-body items-center text-center p-2">
                    <h3 className={id === selectedPrimaryCategory ? "card-title text-info" : "card-title"}>{name}</h3>
                </div>
            </button >
        )
    }

    return (
        <>
            {location.pathname === "/store" ?
                <>
                    <div className="w-full border-b border-primary bg-base-200 p-4">
                        <div className="flex flex-row justify-around ">
                            {Object.keys(categories).map((id, index) =>
                                <Fragment key={index}>
                                    <PrimaryCategoryCard id={Number(id)} name={categories[Number(id)].name} image={categories[Number(id)].image_url} />
                                </Fragment>
                            )}
                        </div>
                    </div>
                    {selectedPrimaryCategory === null ?
                        <div className="h-[50vh] w-screen flex justify-center items-center text-4xl">
                            <h2>Select a category</h2>
                        </div>
                        :
                        <div className="flex flex-row w-full h-full relative">
                            <StoreFilter />
                            <StoreList />
                        </div>
                    }
                </>
                :
                <Outlet />}
        </>
    )
}

export default StorePage