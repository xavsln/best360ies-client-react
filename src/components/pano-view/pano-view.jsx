import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const currentUser = localStorage.getItem('user');

const currentUserId = localStorage.getItem('_id');

const accessToken = localStorage.getItem('token');

const addPanoToFavList = (pano) => {
  axios
    .post(
      `http://localhost:8080/users/${currentUserId}/panos/${pano._id}`,
      // { user: currentUser },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((response) => {
      const data = response.data;
      localStorage.setItem('favoritePanos', data.favoritePanos);

      alert('Pano added to the list of favorites!');
      // window.open('/', '_self');
    })
    .catch((err) => {
      console.error(err);
      alert('Unable to add pano to the list of favorite panos!');
    });
};

export class PanoView extends React.Component {
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

          <br />
          <br />

          <div className="mb-3">
            <Button
              variant="success"
              onClick={() => {
                addPanoToFavList(pano);
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
