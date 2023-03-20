import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
function ProductDetails(){
    const params = useParams();
    const api_url_id = `https://fakestoreapi.com/products`;
    const [product , setProduct] = useState({});
    // console.log(params.productId);
    useEffect(()=>{
        fetch("https://fakestoreapi.com/products/"+params.productId)
        .then((response) => response.json())
        .then((product) => setProduct(product));
    },[]);
    return(
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <Product pr = {product} showBtn = {false}/>
                </div>
            </div>
        </div>
        
    )
}

export default ProductDetails;