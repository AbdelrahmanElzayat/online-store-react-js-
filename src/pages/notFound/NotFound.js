import './notFound.css'
import not_found_img from '../../assets/images/6333685.jpg'
const NotFound = ()=>{
    return(
        <section className='notFound_Section'>
            <img src={not_found_img} alt='not found' />
        </section>
    )
}

export default NotFound