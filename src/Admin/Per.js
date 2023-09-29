import { Col, Container, Row } from "react-bootstrap"
import './Per.css'
import accessImg from '../assets/images/3814338.jpg'
import { useEffect } from "react"
const Per = ()=>{
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return( 
        <section className="per">
            <Container>
                <Row>
                    <Col lg='12' md='12' sm='12'>
                        <img src={accessImg} alt="access denied"/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Per