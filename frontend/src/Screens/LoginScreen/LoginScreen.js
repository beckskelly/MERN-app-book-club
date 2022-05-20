import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import LoadingSpinner from '../../components/LoadingSpinner'
import './LoginScreen.css'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

const LoginScreen = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin) //useSelector is used to access the state
    const { loading, error, userInfo} = userLogin // destructur out variables from this state


    useEffect(() => {
        if (userInfo) {
            navigate("/mybooks", { replace:true })
        }
    },[navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        dispatch(login(email, password))
    };


    return (

        <MainScreen title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <LoadingSpinner />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email}
                            placeholder="Enter email" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New here? <Link to="/register">Sign up here!</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default LoginScreen

// REDUX
// store - one common place for the applications state  
// reducers - directly manipulating or changing the state of the application
// action - event that describes somethign that happened in the application. Tells the reducer what to do and how to manipulate the state
// type - what action to perform next
// payload - what is going to be transferred to the reducer


// action -> reducer -> store -> application