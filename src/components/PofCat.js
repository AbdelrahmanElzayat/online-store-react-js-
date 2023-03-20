import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

function PofCat(){
    const api_url = "https://fakestoreapi.com/products";
    const params = useParams();
    console.log(params.categoryName);

    const [products , setProducts] = useState([]);

    // const getProducts = ()=>{fetch(api_url)
    //     .then((response)=>response.json())
    //     .then((data) => setProducts(data))};

    const getProductsInCategory = ()=>{fetch(`${api_url}/category/${params.categoryName}`)
                                .then((response)=>response.json())
                                .then((data)=>setProducts(data))};
     useEffect(()=>{
        // getProducts();
        getProductsInCategory();
        },[]);
        
    return(
        <>
        <div className="container">
        <div className="row">
             {products.map((Productt) => {
                        return(
                                <div className="col-3" key={Productt.id}>
                                    <Product pr = {Productt} showBtn = {true}/>
                                </div>
                                )
                            }
                    )}
        </div>
        </div>
        </>
    )
}
export default PofCat;