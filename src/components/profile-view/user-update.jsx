import React, { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { Container, Row, Col, Card, Form, Button, Link } from 'react-bootstrap';

export function UserUpdate(props) {
  const accessToken = localStorage.getItem('token');
  // console.log(props);
  const [username, setUsername] = useState(props.user.username);
  const [password, setPassword] = useState(props.user.password);
  const [email, setEmail] = useState(props.user.email);
  const [birthday, setBirthday] = useState(props.user.birthday);

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must be 8 characters long');
      isReq = false;
    }

    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is invalid');
      isReq = false;
    }

    return isReq;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const isReq = validate();

    if (isReq) {
      axios
        .put(
          `http://localhost:8080/users/${props.user._id}`,

          {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          const data = response.data;

          // console.log(data);
          alert('Update sucessfull!');
          window.open('/', '_self');
        })
        .catch((response) => {
          // console.error(response);
          alert('Unable to register!');
        });
    }
  };

  return (
    <Container>
      <Row className="align-items-center" height="100vh">
        <Col>
          <Card>
            <Card.Header className="text-center font-weight-bold">
              <h5>Update your infos here:</h5>
            </Card.Header>

            <Form style={{ width: '80%', margin: '1rem auto' }}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  // value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={props.user.username}
                />

                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: (minimum 8 characters)</Form.Label>
                <Form.Control
                  type="password"
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength="8"
                />
                {/* code added here to display validation error */}
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={props.user.email}
                />
                {/* code added here to display validation error */}
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  // value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder={props.user.birthday}
                />
              </Form.Group>

              <Form.Group className="text-center" style={{ margin: '1rem' }}>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={handleUpdateProfile}
                  style={{ margin: '1rem' }}
                >
                  Update
                </Button>
                <p></p>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
