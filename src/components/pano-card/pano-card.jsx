import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import axios from 'axios';

export class PanoCard extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = localStorage.getItem('user');
    this.currentUserId = localStorage.getItem('_id');
    this.accessToken = localStorage.getItem('token');
  }

  addToFav = (p_id) => {
    // Confirmation box
    let confirmActionMessage = confirm(
      'Are you sure you want to add this pano to your favorite panos list?'
    );
    console.log('p_id: ', p_id);

    console.log('Current userId: ', this.currentUserId);

    if (confirmActionMessage) {
      axios.post(
        // `http://localhost:8080/users/${this.currentUserId}/panos/${p_id}`,
        `https://best360ies.herokuapp.com/users/${this.currentUserId}/panos/${p_id}`,
        { user: this.currentUser },
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );
      console.log(
        `https://best360ies.herokuapp.com/users/${this.currentUserId}/panos/${p_id}`
      );
      console.log('Pano added');

      alert('Pano successfully added to the list of favorites.');

      // Reload the page to see the updated list of favorite Panos
      window.location.reload(false);
    } else {
      alert('Pano not added to the list.');
    }
  };

  render() {
    const { pano } = this.props;
    return (
      <Card>
        <div style={{ maxHeight: '20rem', overflow: 'hidden' }}>
          <a href={pano.panoUrl} target="_blank">
            <Card.Img
              variant="top"
              src={pano.staticImgUrl}
              alt="Static image of the panoramic photo"
              crossOrigin="anonymous"
            />
          </a>
        </div>

        <Card.Body>
          <Card.Title>{pano.country}</Card.Title>
          <Card.Text>{pano.areaName}</Card.Text>
          <Link to={`/panos/${pano._id}`}>
            <Button variant="link">See details</Button>
          </Link>
          <Button variant="warning" onClick={() => this.addToFav(pano._id)}>
            Add to Favorites
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

PanoCard.propTypes = {
  pano: PropTypes.shape({
    panoUrl: PropTypes.string.isRequired,
    staticImgUrl: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    areaName: PropTypes.string.isRequired,
  }).isRequired,
};
