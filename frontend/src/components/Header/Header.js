import {
    Navbar,
    Container,
    NavDropdown,
    Nav
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../actions/userActions"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout())
        navigate("/", { replace: true})
    }

    return (
        <>
            <Navbar bg="primary" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Shelf Indulgence</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='m-auto'>
                        </Nav>
                        <Nav>
                        <Nav.Link href="/searchbooks">Search Books</Nav.Link>
                        <Nav.Link href="/allbooks">All Books</Nav.Link>
                        {userInfo ? (
                            <>
                            
                            <Nav.Link className="nav-link" href="/mybooks">
                                    My Books
                                </Nav.Link>
            
                            <NavDropdown 
                            title={`${userInfo.name}`}
                            id="navbarScrollingDropdown"
                            >
                                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}
                                >
                                    Logout</NavDropdown.Item>
                            </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                            )}
                        </Nav>                   
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header