import './Footer.css'
import {Container , Col , Row , ListGroup , ListGroupItem} from 'react-bootstrap'
import { Link } from 'react-router-dom';


const date = new Date();
const year = date.getFullYear();

const Footer = ()=>{
    return(
        <div className='footer'>
            <Container>
                <Row>
                    <Col lg="4" md="6" className='mb-4'>
                        <div className='logo'>
                            <div>
                                <h1>Z-STORE</h1>
                            </div>
                        </div>
                        <p className='footer_text mt-4'>
                            Lorem ipsum dolor sit amet, ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </Col>
                    <Col lg="3" md="6" className='mb-4'>
                        <div className='footer_links'>
                            <h4 className='links_title'>Top Categories</h4>
                            <ListGroup className='ul'>
                                <ListGroupItem className='ps-0 border-0 li'>
                                    <Link to = "#">Mobile Phones</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0 li'>
                                    <Link to = "#">Modern Sofa</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0 li'>
                                    <Link to = "#">Arm Chair</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0 li'>
                                    <Link to = "#">Smart Watches</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg="2" md="6" className='mb-4'>
                    <div className='footer_links'>
                            <h4 className='links_title'>Useful Links</h4>
                            <ListGroup className='ul'>
                                <ListGroupItem className='ps-0 border-0 li'>
                                    <Link to = "/shop">Shop</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0 li'>
                                    <Link to = "/cart">Cart</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0 li'>
                                    <Link to = "/login">Login</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0 li'>
                                    <Link to = "#">Privacy Policy</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg="3" md="6">
                    <div className='footer_links'>
                            <h4 className='links_title'>Contact Us</h4>
                            <ListGroup className='footer_contact ul'>
                                <ListGroupItem className='ps-0 border-0 li d-flex align-items-center gap-2'>
                                    <span><i className="ri-map-pin-line"></i></span>
                                    <p>123 Tanta, Elgharpia, Egypt</p>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0 li d-flex align-items-center gap-2'>
                                    <span><i className="ri-phone-line"></i></span>
                                    <p>(+20) 123 456 789</p>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0 li d-flex align-items-center gap-2'>
                                    <span><i className="ri-mail-line"></i></span>
                                    <p>abdo530@hotmail.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg="12 text-center copy">
                        <p>Copyright &copy; {year} Development By Abdelrahman Elzayat, All Rights Reserved</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Footer;