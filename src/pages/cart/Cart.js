import './cart.css';
import Helmet from '../../components/Helmet/Helmet';
import CommonSection from '../../components/UI/CommonSection';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../rtk/slices/CartSlice';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useEffect } from 'react';

const Cart = ()=>{

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return(
        <>
            <Helmet title='Cart'/>
            <CommonSection title = 'Shopping Cart'/>

            <section className='my-5'>
                <Container>
                    <Row>
                        <Col lg='9' md='12' sm='12'>
                            {cartItems.length === 0? <h2 className='fs-4 text-center'>No Items Added To The Cart</h2>:
                            (
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Del</th>
                                            <th scope="col">Dec</th>
                                            <th scope="col">Inc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item,index)=>(
                                            <Tr item = {item} key={index}/>
                                        ))}
                                     </tbody>
                                </table>

                            )}
                        </Col>
                        <Col lg='3'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h6>SubTotal</h6>
                                <span className='fs-4 fw-bold'>${totalAmount}</span>
                            </div>
                            <p className='fs-6 my-3'>Taxes And Shipping Will Calculate In Checkout</p>
                            <div>
                                <button className='check_btn w-100'>
                                    <Link to='/checkout'>Checkout</Link>
                                </button>
                                <button className='check_btn mt-4 w-100'>
                                    <Link to='/shop'>Continue Shopping</Link>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

const Tr = (props)=>{
    const dispatch = useDispatch();

    function deleteProduct(){

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
          
          swalWithBootstrapButtons.fire({
            title: `Are you sure to Delete "${props.item.title.stringValue}" ? `,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success',
                  dispatch(cartActions.deleteItem(props.item.name))
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }})
        }

    const decreseItem = ()=>{
        dispatch(cartActions.decreseItem(props.item.name));
    }
    
    const increseItem = ()=>{
        dispatch(cartActions.addItem(props.item));
    }

    return(
        <>
            <tr key={props.index}>
                <td data-label="Image"><img src={props.item.imgUrl.stringValue} alt='carImg' /></td>
                <td data-label="Title" className='prTitle'>{props.item.title.stringValue}</td>
                <td data-label="Price">{props.item.price.stringValue}</td>
                <td data-label="Qty">{props.item.quantity}</td>
                <td data-label="Del">
                    {/* <motion.span whileTap={{scale:1.2}} onClick={deleteProduct}>
                        <i className="ri-delete-bin-line"></i>
                    </motion.span> */}
                    <Button className='inBtn btn btn-danger btn-sm' onClick={deleteProduct}><i className="ri-delete-bin-line"></i></Button> 
                </td>
                <td data-label="Dec">
                    <Button className='inBtn btn btn-info ' onClick={decreseItem}>-</Button> 
                </td>
                <td data-label="Inc">
                    <Button className='inBtn btn btn-primary ' onClick={increseItem}>+</Button> 
                </td>
            </tr>
        </>
    );
}
export default Cart;