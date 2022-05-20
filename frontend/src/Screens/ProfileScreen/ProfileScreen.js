import React, { useEffect } from 'react'
import { Button, Card, ListGroupItem, ListGroup, Badge } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { listBooks } from '../../actions/booksActions';
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from '../../components/ErrorMessage';

const ProfileScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, userInfo, error } = userLogin;


    return (
        <MainScreen title='MY PROFILE'>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={userInfo.pic} />
                <Card.Body>
                    <Card.Title>{`${userInfo.name}'s profile`}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{`Email: ${userInfo.email}`}</ListGroupItem>
                </ListGroup>
            </Card>










        </MainScreen>
    )
}

export default ProfileScreen
