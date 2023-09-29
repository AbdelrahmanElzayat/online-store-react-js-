import ProductCard from "./ProductCard"


const ProductsList = (props)=>{
    return(
        <>
            
            {props.data?.map((item, i)=>(
                // console.log(item)
                <ProductCard item={item} key={i}/>
            )
            )}
        </>
    )
}

export default ProductsList;