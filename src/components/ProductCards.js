import Product from "./Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ProductCardsClass.css';
function ProductCards(){
    const [products , setProducts] = useState([]);
    const [categories , setCategories] = useState([]);
    const api_url = "https://fakestoreapi.com/products";

    const getProducts = ()=>{fetch(api_url)
                            .then((response)=>response.json())
                            .then((data) => setProducts(data))};

    const getCategories = ()=>{fetch(`${api_url}/categories`)
                            .then((response)=>response.json())
                            .then((data) => setCategories(data))};

    const getProductsInCategory = (catName)=>{fetch(`${api_url}/category/${catName}`)
                                .then((response)=>response.json())
                                .then((data)=>setProducts(data))};

    useEffect(()=>{
        getProducts();
        getCategories();
    },[]);
    return(
        <>
            <h2 className="ourCat text-center py-5">Our Categories</h2>
            <div className="container mb-5">
            
                <div className="row">
            {categories.map((cat)=> { 
                    return(
                        
                            <div key={cat} className="col-6 my-3 CatBox">
                                <img className="CatImage" src="https://th.bing.com/th/id/R.ba580850eba644ae01bea79d763bbb9b?rik=AwP0NPvIt81ETw&pid=ImgRaw&r=0" />
                                <div className="LinkDiv">
                                    <Link className="catLink" to={`/Category/${cat}`}>{cat}</Link>
                                </div>
                            </div>                        
                    )
                })}
                </div>
            {/* <button className="btn btn-info d-inline mx-2 my-3"
                        onClick = {()=> {getProducts()}}
                        >all
            </button> */}

                {/* {categories.map((cat)=> { 
                    return(
                        <button className="btn btn-info d-inline mx-2 my-3" key={cat}
                        onClick = {()=> getProductsInCategory(cat)}
                        >{cat}</button>
                    )
                })} */}

                {/* <div className="row">
                    {products.map((Productt) => {
                        return(
                                <div className="col-3" key={Productt.id}>
                                    <Product pr = {Productt} showBtn = {true}/>
                                </div>
                                )
                            }
                    )}
                </div> */}
            </div>
        </>
    )
}

export default ProductCards;