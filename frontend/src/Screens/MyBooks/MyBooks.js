import React, { useEffect } from 'react'
import { Button, Card, ListGroupItem, ListGroup, Badge } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { listBooks } from '../../actions/booksActions';
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from '../../components/ErrorMessage';
// import "./MyBooks.css"


const MyBooks = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const bookList = useSelector((state) => state.bookList)
    const { loading, books, error } = bookList

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(listBooks())
        if (!userInfo) {
            navigate("/", { replace:true })
        }
    },[dispatch, navigate, userInfo]) // list of dependancies

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {

        }
    }
    return (
        <MainScreen title={`Welcome Back ${userInfo.name}`}><br />
        <h2 style={{margin:20}}>Reading list</h2>
            <Link to='/addbooks'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
                    Add books
                </Button>
                </Link>
                <div style={{
                        display: "flex",
                        flexWrap: "wrap"
                }}>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <LoadingSpinner />}
                {books?.map((book) => (
                    <Card 
                        key={book._id}
                        style={{ 
                            width: '18rem', 
                            margin: 10, 
                            }}>
                    
                    <Card.Img variant="top" src="https://ichef.bbci.co.uk/images/ic/1200x675/p08j8hmv.jpg" />
                    <Card.Body>
                        <Card.Title href={`/book/${book._id}`}>
                            <a
                            href={`/book/${book._id}`}
                            style={{
                                display: "flex",
                                textDecoration: "none",
                                flex: 1,
                                cursor: "pointer",
                                alignSelf: "center",
                                fontsize: 18,
                            }}
                            >
                            {book.title}</a></Card.Title>
                        <Card.Text>
                            {book.blurb}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{book.author}</ListGroupItem>
                        <ListGroupItem>{book.datePublished}</ListGroupItem>
                        <ListGroupItem><Badge bg="success">{book.genre}</Badge></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Button                            
                            variant="success" 
                            className="mx-2" 
                            size="lg"
                            style={{margin:10}}
                            >
                                Write a Review
                        </Button>
                        <Button variant="primary" className="mx-2">Buy Book</Button>
                        <Button 
                        variant="danger" 
                        className="mx-2"
                        onClick={() => deleteHandler(book._id)}
                        >
                            Delete</Button>
                    </Card.Body>
                </Card>

                    ))}
                </div>

        </MainScreen>
    )
}

export default MyBooks