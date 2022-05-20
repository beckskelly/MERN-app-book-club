import { Container, Row, Button } from "react-bootstrap"
import {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./LandingPage.css"

const LandingPage = () => {
    const navigate = useNavigate()

    // if user is logged in, it will push us to our mybooks page
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")

        if (userInfo) {
            navigate("/mybooks", { replace:true } )
        }
    }, [])


    return (
        <div className="main">
            <div className="layer">
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to Shelf Indulgence</h1>
                            <p className='subtitle'>An online book club where members can find and review books!</p>
                        </div>
                        <div className='buttonContainer'>
                            <a href="/login">
                                <Button size='lg'
                                    className='landingbutton'
                                >
                                    Login
                                </Button>
                            </a>
                            <a href="/register">
                                <Button
                                    size='lg'
                                    className='landingbutton'
                                    variant='secondary'
                                >
                                    Register
                                </Button>
                            </a>
                        </div>
                        
                    </div>
                </Row>
            </Container>
        </div>
        </div>
    )
}

export default LandingPage;