import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col} from 'react-bootstrap'
import './ProductCard.css'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {cartActions} from '../../rtk/slices/CartSlice'

import { toast } from 'react-toastify';

const ProductCard = (props)=>{

    const dispatch = useDispatch();
    const addToCart = ()=>{

        dispatch(cartActions.addItem(props.item))
        toast.success("Product Added Successfully")
    }
    

    return(
        <Col lg="3" md="4">
            <Card className='mb-3'>
                <motion.div whileHover={{scale:.9}}>
                    <Card.Img whileHover={{scale:.9}} variant="top" className='cardImg' src={props.item.fields.imgUrl.stringValue}/>
                </motion.div>
                <Card.Body className='p-2'>
                    <Card.Title className='cardTitle'>
                        <Link to={`/shop/${props.item.name.split("/")[props.item.name.split("/").length-1]}`}>{props.item.fields.title.stringValue}</Link>
                    </Card.Title>
                    <Card.Text>{props.item.fields.category.stringValue}</Card.Text>
                    <Card.Text className='d-flex align-items-center justify-content-between'>
                        <span className='price'>${props.item.fields.price.stringValue}</span> 
                        <motion.div whileTap={{scale:1.2}}>
                            {/* <Button style={{background:'#0a1d37'}} onClick={()=>dispatch(addToCart(props.item))}> */}
                            <Button className='addCard btn btn-dark' onClick={addToCart}>+</Button> 
                        </motion.div>
                    </Card.Text> 
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard;