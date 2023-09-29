import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ref ,uploadBytesResumable , getDownloadURL, getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = ()=>{
    
    const [enterTitle , setEnterTitle] = useState('');
    const [enterSortDescription , setEnterShortDescription] = useState('');
    const [enterDescription , setEnterDescription] = useState('');
    const [enterPrice , setEnterPrice] = useState('');
    const [enterCategory , setEnterCategory] = useState('');
    const [enterProductImg , setEnterProductImg] = useState('');
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    const createProduct =async (e)=>{
        e.preventDefault();
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`); // make storage for product_imgs
            const uploadTask = await uploadBytesResumable(storageRef, enterProductImg); // to upload img to product_imgs folder
            if (uploadTask.state === "success") {
                const url = await getDownloadURL(uploadTask.ref)
                         await fetch('https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/products/',
                                         {method:'POST' ,
                                          body: JSON.stringify({
                                                fields:{
                                                        title: {stringValue : enterTitle},
                                                        shortDesc:{stringValue: enterSortDescription},
                                                        desc:{stringValue: enterDescription},
                                                        price:{stringValue: enterPrice},
                                                        category:{stringValue: enterCategory},
                                                        imgUrl:{stringValue: url},
                                                        avgRating:{stringValue: "4.5"},
                                                        
                                                    }
                                                })
                                    });                
                       setLoading(false);
                       toast.success('product added successfully');
                       navigate('/dashboard/all-products');
            } else {
                toast.error("image not uploaded!");  
            }
        }
        catch (error) {
                    // console.log(error);
                    setLoading(false);
                    toast.error("product not added!");  
                }
            }
   

    return (
    <section className="py-5">
        <Container>
            <Row>
                <Col lg="12">
                    {loading ? <h4 className="py-5">Loading...</h4> :
                        <>
                        <h4 className="mb-5">Add Product</h4>
                            <Form onSubmit={createProduct}>
                                <Form.Group className="mb-3">
                                    <Form.Label for="title">Product Title</Form.Label>
                                    <Form.Control id="title" type="text" placeholder="Double sofa" value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label for="shortDesc">Short Description</Form.Label>
                                    <Form.Control id="shortDesc" type="text" placeholder="lorem ipusm........" value={enterSortDescription} onChange={e => setEnterShortDescription(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label for="desc">Description</Form.Label>
                                    <Form.Control id="desc" type="text" placeholder="Description........" value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required/>
                                </Form.Group>


                                <div className="row">
                                    <div className="col">
                                        <Form.Group className="mb-3">
                                            <Form.Label for="price">Price</Form.Label>
                                            <Form.Control id="price" type="number" placeholder="$100" value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required/>
                                        </Form.Group>                            
                                    </div>
                                    <div className="col">
                                        <Form.Group className="mb-3">
                                            <Form.Label for="category">Category</Form.Label>
                                            <select id="category" className="form-select" aria-label="Default select example" value={enterCategory} onChange={e => setEnterCategory(e.target.value)} required>
                                                <option defaultValue="Open this select menu">Open this select menu</option>
                                                <option value="chair">chair</option>
                                                <option value="sofa">sofa</option>
                                                <option value="mobile">mobile</option>
                                                <option value="watch">watch</option>
                                                <option value="wireless">wireless</option>
                                            </select>
                                        </Form.Group>                            
                                    </div>
                                </div>

                                <div>
                                    <Form.Group className="mb-3">
                                        <label for="formFile" className="form-label">Product Image</label>
                                        <input className="form-control" type="file" id="formFile" onChange={e => setEnterProductImg(e.target.files[0])} required/>                            
                                    </Form.Group>
                                </div>

                                <button className="btn btn-dark buy_btn mt-4" type="submit">Add Product</button>
                            </Form>
                        </>
                    }
                </Col>
            </Row>
        </Container>
    </section>)
}

export default AddProduct;