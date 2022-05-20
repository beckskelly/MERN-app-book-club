import React, { useState, useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import {  Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useLocation  } from 'react-router-dom'
import {
    Button,
    Card,
    ListGroupItem,
    ListGroup,
    Badge,
    InputGroup,
    FormControl
} from 'react-bootstrap'
const SearchBooksScreen = () => {
    const location = useLocation();
    const navigate = useNavigate()

    //component state
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    const [sliderMax, setSliderMax] = useState(1000)
    const [maxPrice, setMaxPrice] = useState(888)

    const [filter, setFilter] = useState("")
    const [sorting, setSorting] = useState("");


    const params = location.search ? location.search : null;




    // side effects
    useEffect(() => {
        let cancel;

        const fetchData = async () => {
            setLoading(true)
            try {
                let query;

                if (params && !filter) {
                    query = params;
                  } else {
                    query = filter;
                  }
          
                  if (sorting) {
                    if (query.length === 0) {
                      query = `?sort=${sorting}`;
                    } else {
                      query = query + "&sort=" + sorting;
                    }
                  }
          
                const { data } = await axios({
                    method: "GET",
                    url: `/api/books/sort${query}`,
                    cancelToken: new axios.CancelToken((c) => (cancel = c)),
                });

                setBooks(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        return () => cancel()//so api isnt called twice
    }, [filter, params])


    const onSliderCommitHandler = (e) => {
        setMaxPrice(e.target.value)
        buildRangeFilter(maxPrice);
      };


    const buildRangeFilter = (maxPrice) => {
        const urlFilter = `?price[gte]=${0}&price[lte]=${maxPrice}`;
        setFilter(urlFilter);
        navigate(urlFilter);
      };
    

    return (

        <MainScreen title="SEARCH BOOKS"><br />
        



        <InputGroup
                className="mb-3"
                disabled={loading}>
                <label for="customRange2" class="form-label">Price Range</label>
                <input type="range" class="form-range"
                    min={0}
                    max={sliderMax} 
                    valueLabelDisplay="auto"
                    onChange={onSliderCommitHandler}
                    id="customRange2" />
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label for="lower">Minimum Price</label>
                        <input 
                        class="form-control" 
                        id="lower" 
                        type="number" 
                        disabled={loading}
                        // value={0}
                        />
                    </div>
                    <div class="col-sm-4">
                        <label for="upper">Maximum Price</label>
                        <input 
                        class="form-control" 
                        id="upper" 
                        type="number"
                        disabled={loading}
                        // value={1000}
                        />
                    </div>
                </div>
       
                <div class="form-check"  style={{
                    margin: "10px"
                }}>
                <input class="form-check-input" 
                type="radio" 
                value="" 
                id="flexCheckDefault"
                // onChange= 
                />
                <label class="form-check-label" for="flexCheckDefault">
                    Price: Highest - Lowest
                </label>
            </div>
            <div class="form-check"  style={{
                    margin: "10px"
                }}>
                <input class="form-check-input" type="radio" value="" id="flexCheckChecked" />
                <label class="form-check-label" for="flexCheckChecked">
                Price: Lowest - Highest
                </label>
            </div>
            </InputGroup><br />


            <InputGroup className="mb-3">
                <FormControl
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    placeholder="Search for books here"
                />
                <Button variant="outline-secondary" id="button-addon1">
                    Search
                </Button>
            </InputGroup>

            <Form>
            <div class="form-check"  style={{
                    margin: "10px"
                }}>
                <input class="form-check-input" 
                type="checkbox" 
                value="" 
                id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                    Comedy
                </label>
            </div>
            <div class="form-check"  style={{
                    margin: "10px"
                }}>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                <label class="form-check-label" for="flexCheckChecked">
                    Drama
                </label>
            </div>
            <div class="form-check"  style={{
                    margin: "10px"
                }}>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                <label class="form-check-label" for="flexCheckChecked">
                    Crime
                </label>
            </div>
            <div class="form-check"  style={{
                    margin: "10px"
                }}>
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                <label class="form-check-label" for="flexCheckChecked">
                    Action
                </label>
            </div>
        </Form>




   


        {books.map((book) => (
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
                <ListGroupItem><Badge bg="success">{book.genre}</Badge></ListGroupItem>
            </ListGroup>
            <Card.Body>
                <a hred={`/allbooks/${book._id}`}>
                <Button 
                    variant="success" 
                    className="mx-2" 
                    size="lg"
                    style={{margin:10}}
                    >
                        Add to Favs
                </Button>
                </a>
            </Card.Body>
        </Card>

            ))}

    

        </MainScreen>

    )
}

export default SearchBooksScreen
