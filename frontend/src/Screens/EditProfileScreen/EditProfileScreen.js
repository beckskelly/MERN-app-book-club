import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

import MainScreen from "../../components/MainScreen"
import "./EditProfileScreen.css"
import { updateProfile, deleteProfile } from "../../actions/userActions";
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage";

const EditProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();

    const navigate = useNavigate()
    const dispatch = useDispatch(); //from redux

    const userLogin = useSelector((state) => state.userLogin); //takes userloginstate, to autofill all fields in form
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate); //to update the state
    const { loading, error, success } = userUpdate;

    const deleteUser = useSelector((state) => state.deleteUser)
    const { user } = deleteUser

    useEffect(() => {
        if (!userInfo) {
          navigate("/", { replace:true })
        } else {
          setName(userInfo.name);
          setEmail(userInfo.email);
          setPic(userInfo.pic);
        }
      }, [navigate, userInfo]);

    const postDetails = (pics) => {
        if (!pics) {
            return setPicMessage("Please select an image")
        }
        setPicMessage(null)

        if (!pics.type === 'image/jpg' || pics.type === 'image/png') {
            const data = new FormData()
            data.append('file', pics)
            data.append('upload_preset', 'shelfindulgence')
            data.append('cloud_name', 'dussind5s')
            fetch('https://api.cloudinary.com/v1_1/dussind5s/image/upload', {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setPic(data.url.toString())
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            return setPicMessage("Please select an image that is png or jpg")
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(password === confirmPassword)
    
        dispatch(updateProfile({ name, email, password, pic }));
      };


    return (
        <MainScreen title="EDIT PROFILE">
            <div>
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form
                        onSubmit={submitHandler}
                        >
                            {loading && <LoadingSpinner />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>{" "}
                            {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </Form.Group>
                            <Button type="submit" varient="primary">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={pic} alt={name} className="profilePic" />
                    </Col>
                </Row>           
                                <Button
                                    size='lg'
                                    //className='landingbutton'
                                    variant='btn btn-outline-danger'
                                    onClick={() => dispatch(deleteProfile( userInfo._id ))}
                                >
                                    DELETE ACCOUNT
                                </Button>
              
            </div>

        </MainScreen>
    );
};

export default EditProfileScreen
