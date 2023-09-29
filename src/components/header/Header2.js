import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import './Header2.css';
import user_icon from '../../assets/images/user-icon.png';
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { useRef } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import {toast} from 'react-toastify';

import { NavLink } from 'react-router-dom';
import { Row } from 'react-bootstrap';

const Header2 = ()=>{

    const {currentUser} = useAuth({});

    const profileActionRef = useRef(null);
    const menuRef = useRef(null);

    const productsInState = useSelector(state=>state.cart); // to get length of state to shaw it in cart icon

    const navigate = useNavigate()

    const toggleMenuAction = ()=> menuRef.current.classList.toggle('active_menu');

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
            <header className='header'>
                <Container>
                    <Row>
                        <div className='nav_wrapper'>
                            <div className='logo'>
                                <div>
                                    <NavLink to='/' className={(navClass)=> navClass.isActive ? 'nav_active' : ''}> <h1>Z-STORE</h1></NavLink>   
                                </div>
                            </div>
                        
                            <div className='navigation' ref={menuRef} onClick={toggleMenuAction}>
                                <ul className='menu'>
                                    <li className='nav_item'>
                                        <NavLink to='/' className={(navClass)=> navClass.isActive ? 'nav_active' : ''}>Home</NavLink>
                                    </li>
                                    <li className='nav_item'>
                                        <NavLink to='shop' className={(navClass)=> navClass.isActive ? 'nav_active' : ''}>Shop</NavLink>
                                    </li>
                                    <li className='nav_item'>
                                        <NavLink to='cart' className={(navClass)=> navClass.isActive ? 'nav_active' : ''}>Cart</NavLink>
                                    </li>
                                </ul>
                            </div>

                            <div className='nav_icons'>
                                <span className='heartIcon'>
                                    <i className="ri-heart-line hearti"></i>
                                    <span className='badge'>1</span>
                                </span>
                                
                                <span className='cartIcon'>
                                    <NavLink to='cart'>
                                        <i className='ri-shopping-bag-line'></i>
                                        <span className='badge'>{productsInState.totalQuantity}</span>
                                    </NavLink>
                                </span>
                                
                                <div className='profile'>
                                    <motion.img whileTap={{scale: 1.2}} onClick={toggleProfileAction} src={currentUser ? currentUser.photoURL : user_icon} alt='userIcon'/>
                                    <div className='profile_actions' ref={profileActionRef} onClick={toggleProfileAction}>
                                    {
                                        currentUser ? <div><span onClick={logOut}>Logout</span> {currentUser.uid === "xb8paUosNSajUoGN8NmbDxkQ7rY2" && <Link to={'/dashboard'} > Dashboard </Link>}</div>: 
                                        <div className='d-flex align-items-center justify-content-center flex-column'>
                                            <Link to={'/login'} > Login </Link>
                                            <Link to={'/signup'} > Signup </Link>
                                        </div>
                                    }
                                    </div>
                                </div>
                                
                                <div className='mobile_menu'>
                                    <span onClick={toggleMenuAction}><i className="ri-menu-line"></i></span>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </header>
        </>
    )
}
export default Header2;