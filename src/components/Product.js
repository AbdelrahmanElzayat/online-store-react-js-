import { Link } from "react-router-dom";
import "./ProductClass.css";
function Product(props){
    return(
        <>
            <div className="card mb-3">
                <img src={props.pr.image} className="card-img-top imgCard" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.pr.title}</h5>
                    <p className="card-text">{props.pr.description}</p>
                    <p className="card-text">{props.pr.price} $</p>
                    {props.showBtn ? <Link href="#" className="btn btn-primary cardBtn" to={`/Product/${props.pr.id}`} >Details</Link> : null}
                </div>
            </div>
        </>
    )
}
export default Product;