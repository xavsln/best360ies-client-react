import React from 'react';
import PropTypes from 'prop-types';
import PanosList from '../panos-list/panos-list';

import axios from 'axios';

import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './panos-experience.scss';

export class PanosExperience extends React.Component {
  render() {
    const { panos, onBackClick } = this.props;

    return (
      <>
        <div className="experienceTitle">
          <img
            src={require('../../images/left-arrow.png')}
            width={'30px'}
            onClick={() => onBackClick(null)}
          />
          {/* <Button
            className="experienceBackBtn"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button> */}

          <h1>{panos[0].experiences[0]}</h1>
        </div>
        <PanosList panos={panos} />
      </>
    );
  }
}

// PanoView.propTypes = {
//   pano: PropTypes.shape({
//     panoUrl: PropTypes.string.isRequired,
//     // googlePanoId: PropTypes.string.isRequired,
//     latitude: PropTypes.number.isRequired,
//     longitude: PropTypes.number.isRequired,
//     // heading: PropTypes.number.isRequired,
//     // pitch: PropTypes.number.isRequired,
//     country: PropTypes.string.isRequired,
//     areaName: PropTypes.string.isRequired,
//     // addedByUserId: PropTypes.string.isRequired,
//     staticImgUrl: PropTypes.string.isRequired,
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };
