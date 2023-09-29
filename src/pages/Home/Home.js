import Helmet from '../../components/Helmet/Helmet';
import hero_img from '../../assets/images/hero-img.png';
import './Home.css';
import {Container , Col , Row} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import Services from '../../services/Services';
import ProductsList from '../../components/UI/ProductsList';
import counterImg from '../../assets/images/counter-timer-img.png'
import CountDown from '../../components/UI/CountDown';
import {  useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = ()=>{

    const products = useSelector((state)=> state.products.data);
    const loading = useSelector((state)=>state.products.loading);
    const year = new Date().getFullYear();
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return(
        <>
            <Helmet title = {'Home'}/>

            <section className='Hero_Section'>
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className='hero_content'>
                                <p className='hero_subtitle'>
                                    trending products in {year}
                                </p>
                                <h2>
                                    Make your Interior More Minimalistic & Modern 
                                </h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non</p>
                                <motion.button whileTap={{scale:1.2}} className='buy_btn'><Link to='/shop'>SHOP NOW</Link> </motion.button>
                            </div>
                        </Col>
                        <Col lg='6' md='6'>
                            <div className='hero_img'>
                                <img src={hero_img} alt='headImg'/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <Services />

            <section className='trending_products mt-5 pb-5'>
                <Container>
                    <Row>
                        <Col lg="12" className='text-center my-5'>
                            <h2 className='section_title'>Trending Products</h2>
                        </Col>   
                        {
                            loading ? <h5>loading...</h5> :
                         <ProductsList data={products.filter((item)=> item.fields.category.stringValue === 'chair')}/>
                        }
                    </Row>
                </Container>
            </section>

            <section className='best_sales'>
                <Container>
                    <Row>
                        <Col lg="12" className='text-center my-5'>
                            <h2 className='section_title'>Best Sales</h2>

                        </Col>
                        {
                            loading ? <h5>loading...</h5> :
                        <ProductsList data={products.filter((item)=> item.fields.category.stringValue === 'sofa')}/>
                        }
                    </Row>
                </Container>
            </section>

            <section className='countDown my-5'>
                <Container>
                    <Row className='d-flex align-items-center'>
                        <Col lg="6" md="12" className='count-col'>
                            <div className='countInfo'>
                                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                                <h3 className='text-white fs-4 mb-3'>Quality Armchair</h3>
                            </div>
                            <CountDown />
                            <motion.button whileTap = {{ scale : 1.2 }} className='buy_btn'>
                                <Link to='/shop'>Visit Store</Link>
                            </motion.button>
                        </Col>
                        <Col lg="6" md="12" className='text-end'>
                            <img src={counterImg} alt=''/>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='new_arrivals py-5'>
                <Container>
                    <Row>
                        <Col lg="12" className='text-center mb-5'>
                            <h2 className='section_title'>New Arrivals</h2>
                        </Col>
                            {
                                loading ? <h5>loading...</h5> :
                                <ProductsList data={ products.filter((item)=> item.fields.category.stringValue === 'mobile')}/>
                            }
                            {
                                loading ? <h5>loading...</h5> :
                                <ProductsList data={products.filter((item)=> item.fields.category.stringValue === 'wireless')}/>
                            }
                    </Row>
                </Container>
            </section>

            <section className='Popular py-5 mt-5'>
                <Container>
                    <Row>
                        <Col lg="12" className='text-center mb-5'>
                            <h2 className='section_title'>Popular In Category</h2>
                        </Col>
                        {
                            loading ? <h5>loading...</h5> :
                            <ProductsList data={products.filter((item)=> item.fields.category.stringValue === 'watch')}/>
                        }
                    </Row>
                </Container>
            </section>
            
        </>
    )
}
export default Home;