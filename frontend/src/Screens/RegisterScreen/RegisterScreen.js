import { useState, useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import './RegisterScreen.css'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

const RegisterScreen = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate("/mybooks", { replace:true })
        }
    },[navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password!==confirmpassword) {
            setMessage("Passwords do not match. Try again.")
        }
        else {
            dispatch(register(name,email,password))
        }
    }

    return (
        <MainScreen title='REGISTER'>
            <div className="registerContainer">
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                {loading && <LoadingSpinner />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
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
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Already have an account? <Link to="/login">Sign in here!</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen
