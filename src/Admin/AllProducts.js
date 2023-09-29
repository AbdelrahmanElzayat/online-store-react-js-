import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './allProducts.css'

// import useGetData from "../custom-hooks/useGetData";

const AllProducts = ()=>{
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log(data);
    
    const getAllProducts = ()=>{
        fetch(`https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/products`)
        .then((res)=>res.json())
        .then((data)=>{
            setData(data.documents);
            setLoading(false);
        })
    }

    useEffect(()=>{
        getAllProducts()
        window.scrollTo(0,0)
    },[])

    // const [data , setData] = useState('');
    // const [productName , setProductName] = useState([]);
    const deleteProduct = async (product)=>{
    //     setProductName(product.name.split('/'))
        const x = await fetch(`https://firestore.googleapis.com/v1/${product.name}`,
                         {method:'DELETE'})
            if(x.ok){
                getAllProducts();
                toast.success('product deleted successfully');
            }else{
                toast.error('somthing wrong');

            }
            
    }
    // const deleteProduct = (product)=>{
    // //     setProductName(product.name.split('/'))
    //     fetch(`https://firestore.googleapis.com/v1/${product.name}`,
    //                      {method:'DELETE'}
    //         ).then(res=>res.json)
    //         .then(()=>{
    //             getAllProducts();
    //             toast.success('product deleted successfully');
    //         })
    // }

    return (
        <section className="my-5">
            <Container>
            <Button className="mb-4 btn btn-dark" ><Link style={{color:"#fff" , textDecoration:"none"}} to={'/dashboard/add-products'}>Add New Product</Link></Button>
                <Row>
                    <Col lg='12'>
                        <table>
                            <thead>
                                {
                                    !loading &&
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                            {
                                loading ? <tr><td className="py-5 text-center fs-1 fw-bold">loading...</td></tr> :
                                data?.map((item)=>(
                                <tr key={item.name}>
                                    <td data-label="Image"><img src={item.fields.imgUrl.stringValue} alt={item.fields.title.stringValue} /></td>
                                    <td data-label="Title">{item.fields.title.stringValue}</td>
                                    <td data-label="Category">{item.fields.category.stringValue}</td>
                                    <td data-label="Price">${item.fields.price.stringValue}</td>
                                    <td data-label="Action"><button className="btn btn-danger" onClick={()=>deleteProduct(item)}>Delete</button></td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
        
    )
}

export default AllProducts;