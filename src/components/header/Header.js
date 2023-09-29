import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaShoppingCart } from 'react-icons/fa';
import user_icon from '../../assets/images/user-icon.png'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { useRef } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import {toast} from 'react-toastify';

const Header = ()=>{

    const {currentUser} = useAuth({});
    const profileActionRef = useRef(null);

    const productsInState = useSelector(state=>state.cart); // to get length of state to shaw it in cart icon

    const navigate = useNavigate()
    const navigateToCart = ()=>{
        navigate("/cart");
    }

    const toggleProfileAction = ()=> profileActionRef.current.classList.toggle('show_profile_actions');
    const logOut = ()=>{
        signOut(auth).then(()=>{
            toast.success("logged out");
            navigate("/")
        }).catch(err=>{
            toast.error(err.message)
        })
    }
    return(
        <>
        
                <Navbar className='fixed-top navBar' collapseOnSelect expand="lg" variant="dark">
                <Container>
                <Link className='navbar-brand' to="/">Z-STORE</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className='navCollapse'>
                    <Nav className="mx-auto">
                    <Link className='nav-link' to="/">Home</Link>
                    <Link className='nav-link' to="/shop">Shop</Link>
                    <Link className='nav-link' to="/cart">Cart</Link>
                    </Nav>
                    <Nav>
                    <span className='userI' onClick={toggleProfileAction}><motion.img whileTap={{scale: 1.2}} src={currentUser ? currentUser.photoURL : user_icon} /></span>
                    <div className='profile_actions' ref={profileActionRef} onClick={toggleProfileAction}>
                        {
                            currentUser ? <div><span onClick={logOut}>Logout</span> <Link to={'/dashboard'} > Dashboard </Link></div>: 
                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                <Link to={'/login'} > Login </Link>
                                <Link to={'/signup'} > Signup </Link>
                            </div>
                        }
                    </div>
                    <Nav.Link href="#deets" className='cart'><i className="ri-heart-line hearti"></i></Nav.Link>
                    <Nav.Link href="" onClick={navigateToCart}><FaShoppingCart size={20} />
                    <span className='cartNo'>{productsInState.totalQuantity}</span>
                    {/* <span className='cartNo'>0</span> */}
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;