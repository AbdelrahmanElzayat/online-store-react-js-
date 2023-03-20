import Img1 from "./images/third.jpg"; 
import Img2 from "./images/second.jpg"; 
import Img3 from './images/first.jpg';


function Slider(){
    return (
        <>
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={Img1} className="d-block w-100 height-300" alt="..." />
                    <div className="text-black carousel-caption d-none d-md-block">
                        <h1>it's easy to shopping</h1>
                        <h6>shopping from your home and get your product at fast time</h6>
                    </div>
                </div>
                <div className="carousel-item">
                 <img src={Img2} className="d-block w-100 height-300" alt="..."/>
                    <div className="text-black carousel-caption d-none d-md-block">
                        <h1>all products you love is here</h1>
                        <h6>shopping from your home and get your product at fast time</h6>
                    </div>
                </div>
                <div className="carousel-item">
                <img src={Img3} className="d-block w-100 height-300" alt="..." />
                <div className="text-black carousel-caption d-none d-md-block">
                        <h1>explore our wide range of products</h1>
                        <h6>shopping from your home and get your product at fast time</h6>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </>
    );
}
export default Slider;