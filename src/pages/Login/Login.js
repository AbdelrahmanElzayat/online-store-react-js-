import { useState } from 'react';
import Helmet from '../../components/Helmet/Helmet';
import './login.css';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const Login = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()

    const signIn = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const userCredential = await signInWithEmailAndPassword(auth , email, password);
            const user = userCredential.user;
            setLoading(false);
            toast.success("Successfully logged in");
            navigate("/")

        }catch(error){
            setLoading(false);
            toast.error(error.message);
        }
    }

    return(
        <>
            <Helmet title='Login'/>
            <section className='signIn pb-4'>
                <Container>
                    <Row>
                        {
                            loading? <Col lg="12" className='text-center'>
                                    <h5 className='fw-bold'>loading....</h5>
                            </Col> : 
                            <Col lg='6' className='m-auto text-center'>
                                <h3 className='fw-bold fs-4 mb-4'>Login</h3>
                                <Form className='sign_form' onSubmit={signIn}>
                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Control value={email} type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                                    </Form.Group>
                                    <button className='buy_btn login_btn my-3' type="submit">Login</button>
                                    <p>Don't have an account? <Link to={'/signup'}>Create an account</Link></p>
                                </Form>
                            </Col>
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default Login;