import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class PanoView extends React.Component {
  constructor() {
    super();
    this.currentUser = localStorage.getItem('user');
    this.currentUserId = localStorage.getItem('_id');
    this.accessToken = localStorage.getItem('token');

    this.addPanoToFavList = this.addPanoToFavList.bind(this);
  }

  addPanoToFavList = (pano, userID) => {
    // console.log('currentUserId: ', userID);
    axios
      .post(
        // `http://localhost:8080/users/${userID}/panos/${pano._id}`,
        `https://best360ies-api.herokuapp.com/users/${userID}/panos/${pano._id}`,
        { userId: userID },
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      )
      .then((response) => {
        const data = response.data;
        // localStorage.setItem('favoritePanos', data.favoritePanos);

        alert('Pano added to the list of favorites!');
        // window.open('/', '_self');
      })
      .catch((err) => {
        console.error(err);

        alert('Unable to add pano to the list of favorite panos!');
      });
  };

  render() {
    const { pano, onBackClick } = this.props;

    return (
      <Row className="pano-view justify-content-md-center mt-5">
        <Col>
          <div className="pano-poster mb-1">
            <a href={pano.panoUrl} target="_blank">
              <img
                src={pano.staticImgUrl}
                className="img-fluid"
                alt="Static image of a panoramic photo"
                crossOrigin="anonymous"
              />
            </a>
          </div>
        </Col>

        <Col md={7}>
          <div className="pano-description text-justify mb-1">
            <span className="label font-weight-bold">Title: </span>
            <span className="value">
              <b>{pano.title}</b>
            </span>
          </div>

          <div className="pano-title mb-1">
            <span className="label font-weight-bold">Country: </span>
            <span className="value">{pano.country}</span>
          </div>

          <div className="pano-description text-justify mb-1">
            <span className="label font-weight-bold">Area name: </span>
            <span className="value">{pano.areaName}</span>
          </div>

          <div className="pano-description text-justify mb-1">
            <span className="label font-weight-bold">Latitude: </span>
            <span className="value">{pano.latitude}</span>
          </div>

          <div className="pano-description text-justify mb-1">
            <span className="label font-weight-bold">Longitude: </span>
            <span className="value">{pano.longitude}</span>
          </div>

          <div className="pano-description text-justify mb-1">
            <span className="label font-weight-bold">Experiences: </span>
            <span className="value">{pano.experiences}</span>
          </div>

          <br />
          <br />

          <div className="mb-3">
            <Button
              variant="warning"
              onClick={() => {
                this.addPanoToFavList(pano, this.currentUserId);
              }}
            >
              Add pano to Favorites
            </Button>
          </div>

          <div>
            <Button
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

PanoView.propTypes = {
  pano: PropTypes.shape({
    panoUrl: PropTypes.string.isRequired,
    // googlePanoId: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    // heading: PropTypes.number.isRequired,
    // pitch: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    areaName: PropTypes.string.isRequired,
    // addedByUserId: PropTypes.string.isRequired,
    staticImgUrl: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
