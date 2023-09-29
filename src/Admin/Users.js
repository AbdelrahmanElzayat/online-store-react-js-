import { Col, Container, Row } from "react-bootstrap";
import useGetData from "../custom-hooks/useGetData";
import { toast } from "react-toastify";
import './Users.css'
import { useEffect } from "react";

const Users =()=>{

    const {data , loading , setData , setLoading} = useGetData('users');
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const deleteUser = async (user)=>{
        //     setProductName(product.name.split('/'))
            const x = await fetch(`https://firestore.googleapis.com/v1/${user.name}`,
                             {method:'DELETE'})
                if(x.ok){
                    toast.success('user account deleted successfully');
                    fetch(`https://firestore.googleapis.com/v1/projects/z-store-7a8d7/databases/(default)/documents/users`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        setData(data.documents);
                        setLoading(false);
                    })
                }else{
                    toast.error('somthing wrong');
    
                }
                
        }

    return(
        <>
            <section className="my-5">
                <Container>
                    <Row>
                        <Col lg='12'>
                            <h4 className="fw-bold">Users</h4>
                        </Col>
                        <Col lg='12'>
                        <table>
                            <thead>
                                {
                                    !loading &&
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                            {
                                loading ? <tr><td className="py-5 text-center fs-1 fw-bold">loading...</td></tr> :
                                data?.map((item)=>(
                                    <tr key={item.fields.uid.stringValue}>
                                        <td data-label="Image"><img src={item.fields.photoURL.stringValue} alt={item.fields.displayName.stringValue} /></td>
                                        <td data-label="Username">{item.fields.displayName.stringValue}</td>
                                        <td data-label="Email">{item.fields.email.stringValue}</td>
                                        <td data-label="Action"><button className="btn btn-danger" onClick={()=>deleteUser(item)}>Delete</button></td>
                                    </tr>
                                    ))
                            }
                            </tbody>
                        </table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default Users;