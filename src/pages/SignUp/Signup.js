import { useState } from 'react';
import Helmet from '../../components/Helmet/Helmet';
import './signup.css';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

import { setDoc , doc } from 'firebase/firestore';

import { auth } from "../../firebase.config";
import { storage } from "../../firebase.config";
import { db } from "../../firebase.config";

import {toast} from 'react-toastify';
const Signup = ()=>{

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const signup = async (e)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const userCredential = await createUserWithEmailAndPassword(auth , email , password);
          
            const user = await userCredential.user;

            const storageRef = ref(storage , `images/${Date.now() + userName}`);
            const uploadTask = uploadBytesResumable(storageRef , file);

            uploadTask.on((error)=>{
                toast.error(error.message)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{

                    //update user profile
                    await updateProfile(user,{
                        displayName: userName,
                        photoURL: downloadURL,

                    });
                    // store user data in firestore database
                    await setDoc(doc(db,'users',user.uid),{
                        uid: user.uid,
                        displayName: userName,
                        email,
                        photoURL: downloadURL
                    })
                });
            })

            setLoading(false);
            toast.success("Account created successfully");
            navigate("/login")

        }catch (error){
            setLoading(false);
            toast.error("something went wrong");

        }

    }

    return(
        <>
            <Helmet title='Signup'/>
            <section className='signIn pb-4'>
                <Container>
                    <Row>
                        {
                            loading? <Col lg="12" className='text-center'>
                                 <h5 className='fw-bold'>loading....</h5>
                                 </Col> :
                                 <Col lg='6' className='m-auto text-center'>
                                 <h3 className='fw-bold fs-4 mb-4'>Signup</h3>
                                 <Form className='sign_form' onSubmit={signup}>
                                     <Form.Group className="mb-4" controlId="formBasicEmail">
                                         <Form.Control value={userName} type="text" placeholder="Enter Username" onChange={e => setUserName(e.target.value)}/>
                                     </Form.Group>
                                     
                                     <Form.Group className="mb-4" controlId="formBasicEmail">
                                         <Form.Control value={email} type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                                     </Form.Group>
     
                                     <Form.Group className="mb-3" controlId="formBasicPassword">
                                         <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                                     </Form.Group>
                                     
                                     <Form.Group className="mb-3" controlId="formBasicPassword">
                                         <Form.Control type="file" onChange={e => setFile(e.target.files[0])}/>
                                     </Form.Group>
     
                                     <button className='buy_btn login_btn my-3' type="submit">Create an Account</button>
                                     <p>Already have an account? <Link to={'/login'}>Login</Link></p>
     
                                 </Form>
                             </Col>
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default Signup;