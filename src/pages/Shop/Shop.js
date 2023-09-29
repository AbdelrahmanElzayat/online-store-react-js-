import { useEffect, useState } from 'react';
import Helmet from '../../components/Helmet/Helmet';
import CommonSection from '../../components/UI/CommonSection';
import { Col, Container, Row } from 'react-bootstrap';
import './Shop.css';
import ProductsList from '../../components/UI/ProductsList';
import { useSelector } from 'react-redux';


const Shop = ()=>{

    const productsR = useSelector((state)=> state.products.data);
    const loadingR = useSelector((state)=>state.products.loading);

    const [productsData , setProductsData] = useState([]);
    const [filredCategory , setFiltredCategory] = useState("");
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        productsR.length === 0 ?
        fetch("https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/products/")
        .then((res)=>res.json())
        .then((data)=>{
            setProductsData(data.documents);
            setFiltredCategory("All Categories");
            setLoading(false);
        }) : 
        setLoading(false)
        setProductsData(productsR);
        setFiltredCategory("All Categories");
            window.scrollTo(0,0)
        },[])
        

    const handleFilter = (e)=>{
        const filterValue = e.target.value;
        setFiltredCategory(e.target.value);
        if(filterValue === 'sofa'){
            const filteredProducts = productsR.filter((item)=> item.fields.category.stringValue === 'sofa');
            setProductsData(filteredProducts);
        }else if(filterValue === 'chair'){
            const filteredProducts = productsR.filter((item)=> item.fields.category.stringValue === 'chair');
            setProductsData(filteredProducts);
        }else if(filterValue === 'mobile'){
            const filteredProducts = productsR.filter((item)=> item.fields.category.stringValue === 'mobile');
            setProductsData(filteredProducts); 
        }else if(filterValue === 'watch'){
            const filteredProducts = productsR.filter((item)=> item.fields.category.stringValue === 'watch');
            setProductsData(filteredProducts); 
        }else if(filterValue === 'wireless'){
            const filteredProducts = productsR.filter((item)=> item.fields.category.stringValue === 'wireless');
            setProductsData(filteredProducts);
        }else if(filterValue === 'All Categories'){
            setProductsData(productsR); 
        }
    }
    const handleSerach = (e)=>{
        const searchTerm = e.target.value;
        const searchedProduct =  productsR.filter((item)=> item.fields.category.stringValue === filredCategory ? item.fields.title.stringValue.toLowerCase().includes(searchTerm.toLowerCase())
        : filredCategory === "All Categories" ? item.fields.title.stringValue.toLowerCase().includes(searchTerm.toLowerCase()) : "");
        setProductsData(searchedProduct);
    }

    // const handleSOrt =(e)=>{
    //     const sortSelected = e.target.value;
    //     if(sortSelected === "ascending"){
    //         const sortItems = productsData.sort((item1,item2) => item1.fields.category.stringValue === filredCategory ? item1.fields.price.stringValue - item2.fields.price.stringValue : 
    //                                                             filredCategory === "All Categories" ?  item1.fields.price.stringValue - item2.fields.price.stringValue :  ""  );
    //         setProductsData(sortItems);
    //     }else if(sortSelected === "descending"){
    //         const sortItems = productsData.sort((item1,item2) => item1.fields.category.stringValue === filredCategory ? item2.fields.price.stringValue - item1.fields.price.stringValue : 
    //         filredCategory === "All Categories" ?  item2.fields.price.stringValue - item1.fields.price.stringValue :  ""  );
    //         setProductsData(sortItems);
    //     }
    // }
    return(
        <>
            <Helmet title = {'shop'}/>
            <CommonSection title = {'Products'} />

            <section className='shop'>
                <Container>
                    <Row>
                        <Col lg='6' md='12' sm="12">
                            <div className='filter_widget text-start'>
                                <select onChange={handleFilter}>
                                    <option>All Categories</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="chair">Chair</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </div>
                        </Col>
                        {/* <Col lg='3' md='6' sm="6" className='text-end'>
                            <div className='filter_widget'>
                                <select onChange={handleSOrt}>
                                    <option>Sort By</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col> */}
                        <Col lg='6' md='12'>
                            <div className='search_box'>
                                <input type='text' placeholder='Search.....' onChange={handleSerach}/>
                                <span>
                                    <i className='ri-search-line'></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='pt-0 pb-5'>
                <Container>
                    <Row>
                        {
                            // console.log(productsData)
                                loading? <h1>Loading...</h1> :
                                 productsData.length === 0 ? <h1 className='text-center fs-3'>No products Are Found!</h1> :
                                <ProductsList data={productsData} />                           
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default Shop;