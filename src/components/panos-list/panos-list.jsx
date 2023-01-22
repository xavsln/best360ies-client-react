import React from 'react';
// import Col from 'react-bootstrap/Col';
import { Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

// import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { PanoCard } from '../pano-card/pano-card';

const mapStateToProps = (state) => {
  const { visibilityFilterReducer } = state;
  return { visibilityFilterReducer };
};

// Create an Array with a selection of 6 panos choosen ramdomly from the collection

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function PanosList(props) {
  const { panos, visibilityFilterReducer } = props;
  let filteredPanos = panos;

  if (visibilityFilterReducer !== '') {
    filteredPanos = panos.filter((p) =>
      p.country.toLowerCase().includes(visibilityFilterReducer.toLowerCase())
    );
  }

  if (!panos) return <div className="main-view" />;

  // Apply the chooseRandom to filteredPanos to reduce the number of panos and choose randomly
  let reducedPanosRandomly = getMultipleRandom(filteredPanos, 16);

  // return filteredPanos.map((m) => (
  return reducedPanosRandomly.map((m) => (
    <Col xl={3} lg={4} md={6} sm={12} xs={12} key={m._id}>
      <PanoCard pano={m} />
    </Col>
  ));
}

export default connect(mapStateToProps)(PanosList);
