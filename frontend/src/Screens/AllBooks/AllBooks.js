import { useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import { useNavigate } from 'react-router-dom'
import { Button, Card, ListGroupItem, ListGroup, Badge } from 'react-bootstrap'
import "./AllBooks.css"
import { useDispatch, useSelector } from 'react-redux'
import { listAllBooks } from '../../actions/allbooksActions';
import { addToFavsUser } from '../../actions/userActions'

const AllBooks = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const allbookList = useSelector((state) => state.allbookList)
    const { books } = allbookList


    const addToFavs = useSelector((state) => state.addToFavs)
    const { title } = addToFavs

    useEffect(() => {
        dispatch(listAllBooks())
    },[dispatch, navigate]) 

    return (
        <MainScreen title="ALL BOOKS"><br />

                <div style={{
                        display: "flex",
                        flexWrap: "wrap"
                }}>
                {books?.map((book) => (
                    <Card 
                        key={book._id}
                        style={{ 
                            width: '18rem', 
                            margin: 10, 
                            }}>
                    <Card.Img variant="top" src="https://ichef.bbci.co.uk/images/ic/1200x675/p08j8hmv.jpg" />
                    <Card.Body>
                        <Card.Title 
                            style={{
                                display: "flex",
                                textDecoration: "none",
                                flex: 1,
                                alignSelf: "center",
                                fontsize: 18,
                            }}
                            >
                            {`TITLE: ${book.title}`}</Card.Title>
                        <Card.Text>
                            {book.blurb}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem 
                        //value={author}
                        >{`AUTHOR: ${book.author}`}</ListGroupItem>
                        <ListGroupItem>{book.datePublished}</ListGroupItem>
                        <ListGroupItem>{`PRICE: $${book.price}`}</ListGroupItem>
                        <ListGroupItem>{`RATING: ${book.rating}`}</ListGroupItem>
                        <ListGroupItem><Badge bg="success">{`GENRES: ${book.genre}`}</Badge></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Button 
                            onClick={() => dispatch(addToFavsUser(book.title))}
                            variant="success" 
                            className="mx-2" 
                            size="lg"
                            style={{margin:10}}
                            >
                                Add to Favs
                        </Button>
                    </Card.Body>
                </Card>

                    ))}
                </div>


        </MainScreen>
    )
}

export default AllBooks