import {motion} from 'framer-motion'
import { Col, Container, Row } from "react-bootstrap";
import './Dashboard.css'
import useGetData from '../custom-hooks/useGetData';
import { useEffect } from 'react';


const Dashboard = ()=>{
    
    const {data : products} = useGetData('products');
    const {data : users} = useGetData('users');
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return(
        <>
            <section className='my-5'>
                <Container className='py-5'>
                    <Row>
                        <Col lg="3">
                            <motion.div whileHover={{scale:1.1}} className='or_box'  style={{backgroundColor:`#fdefe6`}}>
                                <div>
                                    <h5>Total Sales</h5>
                                    <span>$7890</span>
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg="3">
                            <motion.div whileHover={{scale:1.1}} className='or_box' style={{backgroundColor:`#ceebe9`}}>
                                <div>
                                    <h5>Total Orders</h5>
                                    <span>7890</span>
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg="3">
                            <motion.div whileHover={{scale:1.1}} className='or_box' style={{backgroundColor:`#e2f2b2`}}>
                                <div>
                                    <h5>Total Products</h5>
                                    <span>{products ? products.length : 0}</span>
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg="3">
                            <motion.div whileHover={{scale:1.1}} className='or_box' style={{backgroundColor:`#d6e5fb`}}>
                                <div>
                                    <h5>Total Users</h5>
                                    <span>{users ? users.length : 0}</span>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>
            </>
        )
    }
export default Dashboard;