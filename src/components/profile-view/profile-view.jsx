import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import axios from 'axios';

// import { UserInfo } from './user-info';
import { UserUpdate } from './user-update';

import { Container, Row, Col, Card, Figure, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export function ProfileView(props) {
  // console.log('Props from ProfileView: ', props);

  const panos = props.panos;

  const currentUser = localStorage.getItem('user');

  const currentUserId = localStorage.getItem('_id');

  const accessToken = localStorage.getItem('token');

  // Declare user as a stateful value
  const [user, setUser] = useState('');

  // Declare favoritePanos as a stateful value
  const [favoritePanos, setFavoritePanos] = useState([]);

  // Declare addedPanos as a stateful value
  const [addedPanos, setAddedPanos] = useState([]);

  // getUser function will fetch data from the API
  // user state and Panos state will be set

  const getUser = () => {
    axios
      // .get(`http://localhost:8080/users/${currentUserId}`, {
      .get(`https://best360ies.herokuapp.com/users/${currentUserId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setUser(response.data);

        setFavoritePanos(response.data.favoritePanos);
        console.log(
          'response.data.favoritePanos: ',
          response.data.favoritePanos
        );

        setAddedPanos(response.data.addedPanos);

        console.log('response.data.addedPanos: ', response.data.addedPanos);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();

    console.log('addedPanos: ', addedPanos);
  }, []);

  const removeFav = (p_id) => {
    // Confirmation box
    let confirmActionMessage = confirm(
      'Are you sure you want to delete this pano from your favorite panos list?'
    );
    if (confirmActionMessage) {
      axios.delete(
        // `http://localhost:8080/users/${currentUserId}/panos/${p_id}`,
        `https://best360ies.herokuapp.com/users/${currentUserId}/panos/${p_id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log('Pano removed');

      alert('Pano successfully deleted from the list of favorites.');

      // Reload the page to see the updated list of favorite Panos
      window.location.reload(false);
    } else {
      alert('Pano not deleted from the list.');
    }
  };

  const deletePano = (p_id) => {
    // Confirmation box
    let confirmActionMessage = confirm(
      'Are you sure you want to delete this pano from the gloabl panos list?'
    );
    if (confirmActionMessage) {
      axios.delete(
        // `http://localhost:8080/panos/${p_id}/users/${currentUserId}`,
        `https://best360ies.herokuapp.com/panos/${p_id}/users/${currentUserId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log('Pano removed from global collection.');

      alert('Pano successfully deleted from the global collection.');

      // Reload the page to see the updated list of Panos added by the user
      window.location.reload(false);
    } else {
      alert('Pano not deleted from the global collection.');
    }
  };

  const onDeregister = (user_id) => {
    console.log(user_id);
    // Confirmation box
    let confirmActionMessage = confirm(
      'Are you sure you want to deregister from Best360ies?'
    );
    if (confirmActionMessage) {
      // axios.delete(`http://localhost:8080/users/${user_id}`, {
      axios.delete(`https://best360ies.herokuapp.com/users/${user_id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('User removed');
      alert('User deleted from the list.');

      // Remove the saved used data from browser storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('_id');
      localStorage.removeItem('email');
      localStorage.removeItem('birthday');
      localStorage.removeItem('userData');

      // Update state to show the initial view after User logged out
      this.setState({
        user: null,
      });
    } else {
      alert('User not deleted from the list.');
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Your Profile information:</h4>
              </Card.Title>
              <p>Id: {user._id}</p>
              <p>Name: {user.username}</p>
              <p>Email: {user.email}</p>
              {user.birthday && <p>Birthday: {user.birthday.slice(0, 10)}</p>}
              <Button
                variant="danger"
                onClick={() => {
                  onDeregister(user._id);
                }}
                href="/"
              >
                Deregister
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Profile update:</h4>
              </Card.Title>
              <UserUpdate user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Favorite Panos:</h4>
              </Card.Title>
              <Row>
                {favoritePanos.map((panoId) => {
                  let pano = panos.find((p) => p._id === panoId);

                  return (
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="fav-pano"
                      key={pano._id}
                    >
                      <Figure>
                        <Link to={`panos/${pano._id}`}>
                          <Figure.Image
                            width={256}
                            height={256}
                            alt={pano.country}
                            src={pano.staticImgUrl}
                            crossOrigin="anonymous"
                          />
                          <Figure.Caption>{pano.country}</Figure.Caption>
                          <Figure.Caption>{pano.areaName}</Figure.Caption>
                        </Link>
                        <Button
                          variant="warning"
                          onClick={() => removeFav(pano._id)}
                        >
                          Remove from list
                        </Button>
                      </Figure>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Panos added by me:</h4>
              </Card.Title>
              <Row>
                {addedPanos.map((panoId) => {
                  let pano = panos.find((p) => p._id === panoId);

                  return (
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="fav-pano"
                      key={pano._id}
                    >
                      <Figure>
                        <Link to={`panos/${pano._id}`}>
                          <Figure.Image
                            width={256}
                            height={256}
                            alt={pano.country}
                            src={pano.staticImgUrl}
                            crossOrigin="anonymous"
                          />
                        </Link>
                        <Figure.Caption>{pano.country}</Figure.Caption>
                        <Figure.Caption>{pano.areaName}</Figure.Caption>
                        <Button
                          variant="danger"
                          onClick={() => deletePano(pano._id)}
                        >
                          Delete from gobal collection
                        </Button>
                      </Figure>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  panos: PropTypes.arrayOf(
    PropTypes.shape({
      panoUrl: PropTypes.string.isRequired,
      // googlePanoId: PropTypes.string.isRequired,
      // latitude: PropTypes.number.isRequired,
      // longitude: PropTypes.number.isRequired,
      // heading: PropTypes.number.isRequired,
      // pitch: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      areaName: PropTypes.string.isRequired,
      // addedByUserId: PropTypes.string.isRequired,
      staticImgUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  // user: PropTypes.string.isRequired,
};
