import { Container, Row } from "react-bootstrap";
import useAuth from "../custom-hooks/useAuth";
import './AdminNav.css';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef } from "react";

import { signOut } from 'firebase/auth';
import { auth } from "../firebase.config"; 
import {motion} from 'framer-motion';





const AdminNav = ()=>{
    const admin_nav = [
        {
            display: 'Dashboard',
            path: '/dashboard'
        },
        {
            display: 'All_Products',
            path: '/dashboard/all-products'
        },
        // {
        //     display: 'Orders',
        //     path: '/dashboard/orders'
        // },
        {
            display: 'Users',
            path: '/dashboard/users'
        }
    ]

    const {currentUser} = useAuth()
    const navigate = useNavigate()

    const profileActionRef = useRef(null);
    const toggleProfileAction = ()=> profileActionRef.current.classList.toggle('show_profile_actions_Admin');

    const logOut = ()=>{
        signOut(auth).then(()=>{
            toast.success("logged out");
            navigate("/")
        }).catch(err=>{
            toast.error(err.message)
        })
    }

    const searchActiveRef = useRef(null);
    const toggleSearchAction = ()=> searchActiveRef.current.classList.toggle('search-box_Active');
    return (

        <>
        <header className="admin_header">
            <div className="admin_nav-top">
                <Container>
                    <div className="admin_nav-wrapper-top">
                        
                        <div className="logo">
                            <NavLink to='/'><h2>Z-STORE</h2></NavLink>
                        </div>

                        <div className="search-box" ref={searchActiveRef}>
                            <input type="text" placeholder="Search..."/>
                        </div>

                        <div className="nav_top-right">
                            <span onClick={toggleSearchAction}><i className="searchIcon ri-search-line"></i></span>
                            <span><i className="ri-notification-3-line"></i></span>
                            <span><i className="ri-settings-2-line"></i></span>
                            <div className='profile_Admin'>
                                    <motion.img whileTap={{scale: 1.2}} onClick={toggleProfileAction} src={currentUser && currentUser.photoURL } alt='userIcon'/>
                                    <div className='profile_actions_Admin' ref={profileActionRef} onClick={toggleProfileAction}>
                                        {currentUser &&  <span onClick={logOut}>Logout</span> }
                                    </div>
                            </div>

                        </div>

                    </div>
                </Container>
            </div>
        </header>
        
        <section className="admin_menu p-0 m-0">
            <Container>
                <Row>
                    <div className="admin_navigation">
                        <ul className="admin_menu_list">
                            {
                                admin_nav.map((item, index)=>(
                                    <li className="admin_menu_item" key={index}>
                                        <NavLink to={item.path} className={(navClass) => navClass.isActive && 'active-menu-item'}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Row>
            </Container>
        </section>

    </>
    )
}

export default AdminNav;