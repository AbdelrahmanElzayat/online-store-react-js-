import react, { useEffect } from 'react';
import './checkout.css';
import Helmet from '../../components/Helmet/Helmet';
import CommonSection from '../../components/UI/CommonSection';
import { Col, Container, Row, Form , FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const Checkout = ()=>{

    const totalQty = useSelector(state => state.cart.totalQuantity); 
    const totalAmt = useSelector(state => state.cart.totalAmount); 
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return( 
        <>
            <Helmet  title='Checkout'/>

            <CommonSection title="Checkout"/>
            
            <section className='py-4'>
                <Container>
                    <Row>

                        <Col lg="8">
                            <h6 className='my-4 fw-bold'>Billing Information</h6>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter Your Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Your Email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="number" placeholder="Phone number" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Street Address" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="City" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="number" placeholder="Postal Code" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Country" />
                                </Form.Group>
                            </Form>
                        </Col>

                        <Col lg="4">
                            <div className='checkout_cart my-4'>
                                <h6>Total Qty: <span>{totalQty} items</span></h6>
                                <h6>Subtotal: <span>${totalAmt}</span></h6>
                                <h6>
                                    <span>
                                        Shipping: <br/>
                                        Free shipping
                                    </span>
                                    <span>$0</span>
                                </h6>
                                <h4>Total cost: <span>${totalAmt}</span></h4>
                                <button className='buy_btn auth_btn w-100 mt-4'>Place an order</button>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    )
}
export default Checkout;