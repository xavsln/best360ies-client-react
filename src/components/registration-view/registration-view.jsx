import React, { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // validate user inputs
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password, email, birthday);
    /* Send a request to the server */

    const isReq = validate();

    if (isReq) {
      axios
        .post('http://localhost:8080/users', {
          username: username,
          password: password,
          email: email,
          birthday: birthday,
        })
        .then((response) => {
          const data = response.data;

          // console.log(data);
          alert('Registration sucessfull, please login!');
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
          <Card style={{ width: '30rem', margin: '5rem auto' }}>
            <Card.Header className="text-center font-weight-bold">
              <h2>Register here:</h2>
            </Card.Header>

            <Form style={{ width: '80%', margin: '1rem auto' }}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                />
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: (minimum 8 characters)</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {/* code added here to display validation error */}
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder="Birthday"
                />
              </Form.Group>

              <Form.Group className="text-center" style={{ margin: '1rem' }}>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  style={{ margin: '1rem' }}
                >
                  Submit
                </Button>
                <p></p>
                <p>
                  If already registered, <Link to={'/'}>Log-in</Link>
                </p>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};
