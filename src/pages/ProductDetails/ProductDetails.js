import { useEffect, useRef, useState } from 'react';
import Helmet from '../../components/Helmet/Helmet';
import CommonSection from '../../components/UI/CommonSection';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import './productDetails.css'
import { motion } from 'framer-motion';
import ProductsList from '../../components/UI/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../rtk/slices/CartSlice';
import { toast } from 'react-toastify';

const ProductDetails = ()=>{

    const {id} = useParams();
    const products = useSelector((state)=> state.products.data);
    const loading = useSelector((state)=>state.products.loading);    
    const [tab,setTab] = useState('desc');
    const [rating,setRating] = useState(null);
    const product = products.find((item)=> item.name.split("/")[item.name.split("/").length-1] === id);
    const {imgUrl , title , price, avgRating , desc, shortDesc, category } = !loading &&  product.fields;
    const [review, setReview] = useState([]);
    const relatedProduct = products.filter((item) => item.fields.category.stringValue === category.stringValue);
    const reviewUser = useRef(null);
    const reviewMsg = useRef(null);

    const getAllReviews = ()=>{
        fetch(`https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/products/${id}/reviews/`)
            .then((res)=>res.json())
            .then((data)=>{
                setReview(data.documents)
            }) 
    }

    const submitHandler = async (e)=>{
        e.preventDefault(); 
        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;
        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        };
        
        fetch(`https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/products/${id}/reviews/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                        fields:{
                        userName:{stringValue: reviewObj.userName},
                        desc:{stringValue: reviewObj.text},
                        rate:{stringValue: `${reviewObj.rating}`}
                                }
                })
          })
          .then(response => response.json())
          .then(data => {
            toast.success("review sent successfully")
            getAllReviews();           
          })
          .catch(error => {
            console.error('Error adding object:', error);
          });
    }

    const dispatch = useDispatch();
    const AddToCart = ()=>{
        dispatch(cartActions.addItem(product));
        toast.success("Product Added Successfully");
    }

    useEffect(()=>{
        getAllReviews();
        window.scrollTo(0,0)
    },[product])
    return( 
        <>
        {
            loading ? <h5>loading</h5>:
            <div>
                <Helmet title={title.stringValue}/>
                <CommonSection title={title.stringValue}/>
                <section className='pt-0 pb-5'>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <img className='w-100' src={imgUrl.stringValue} alt='productImg'/>
                            </Col>
                            <Col lg="6">
                                <div className='ProductDetails'>
                                    <h2>{title.stringValue}</h2>
                                    <div className='productRating d-flex align-items-center gap-5 mb-3'>
                                        <div>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-half-s-fill"></i></span>
                                        </div>
                                        <p>(<span>{avgRating.stringValue}</span> Ratings)</p>
                                    </div>
                                    <div className='d-flex align-items-center gap-5'>
                                        <span className='price'>${price.stringValue}</span>
                                        <span>Category: {category.stringValue.toUpperCase()}</span>
                                    </div>
                                    <p className='mt-3'>{shortDesc.stringValue}</p>
                                    <motion.button whileTap={{scale:1.1}} className='buy_butn btn btn-dark mt-4' onClick={AddToCart}>Add To Cart</motion.button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        }
            <section className='pb-5'>
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className='tab_wrapper d-flex align-items-center gap-5'>
                                <h6 className={`${tab === "desc" ? "active_tab" : ""}`} onClick={()=>setTab('desc')}>Description</h6>
                                <h6 className={`${tab === "rev" ? "active_tab" : ""}`} onClick={()=>setTab('rev')}>Reviews ({review? review.length : 0})</h6>
                            </div>
                            {
                                loading? <h5>loading....</h5>:
                                tab === 'desc' ? (
                                <div className='tab_content mt-4'>
                                    <p>{desc.stringValue}</p>
                                </div>)
                                :(
                                <div className='product_review mt-4'>
                                    <div className='review_wrapper'>
                                        <ul>
                                        {
                                            review?.map((rev,index)=>(
                                                <li key={index} className='mb-4'>
                                                    <h6>{rev.fields.userName.stringValue}</h6>
                                                    <span>{rev.fields.rate.stringValue} Rating</span>
                                                    <p>{rev.fields.desc.stringValue}</p>
                                                </li>
                                                    ))
                                        }
                                        </ul>
                                        <div className='review_form'>
                                            <h4>Leave Your Experience</h4>
                                            <form action='' onSubmit={submitHandler}>
                                                <div className='form_group'>
                                                    <input id='user_name' defaultValue={''} type='text' placeholder='Enter Ur Name' ref={reviewUser} required/>
                                                </div>
                                                <div className='form_group ratingGroup d-flex align-items-center'>
                                                    <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(1)}>1<i className={rating >=1 ?"ri-star-s-fill" : "ri-star-s-line"}></i></motion.span>
                                                    <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(2)}>2<i className={rating >=2 ?"ri-star-s-fill" : "ri-star-s-line"}></i></motion.span>
                                                    <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(3)}>3<i className={rating >=3 ?"ri-star-s-fill" : "ri-star-s-line"}></i></motion.span>
                                                    <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(4)}>4<i className={rating >=4 ?"ri-star-s-fill" : "ri-star-s-line"}></i></motion.span>
                                                    <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(5)}>5<i className={rating >=5 ?"ri-star-s-fill" : "ri-star-s-line"}></i></motion.span>
                                                </div>
                                                <div className='form_group'>
                                                    <textarea id='user_msg' defaultValue={''} rows={4} placeholder='Review Message...' ref={reviewMsg} required/>
                                                </div>
                                                <motion.button type='submit' whileTap={{scale:1.1}} style={{ color:'#fff'}} className='btn btn-dark buy_btn'>submit</motion.button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                    )
                            }
                        </Col>
                        
                        <Col lg='12' className='mt-5 mb-3'>
                            <h2 className='related_title'>You Might Also Like</h2>
                        </Col>
                        {
                        loading ? <h5>loading...</h5> :
                        <ProductsList data={relatedProduct} />
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default ProductDetails;