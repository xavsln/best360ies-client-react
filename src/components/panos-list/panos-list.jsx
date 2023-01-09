import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

// import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { PanoCard } from '../pano-card/pano-card';

const mapStateToProps = (state) => {
  const { visibilityFilterReducer } = state;
  return { visibilityFilterReducer };
};

function PanosList(props) {
  const { panos, visibilityFilterReducer } = props;
  let filteredPanos = panos;

  if (visibilityFilterReducer !== '') {
    filteredPanos = panos.filter((p) =>
      p.country.toLowerCase().includes(visibilityFilterReducer.toLowerCase())
    );
  }

  if (!panos) return <div className="main-view" />;

  return filteredPanos.map((m) => (
    <Col lg={3} md={4} sm={6} xs={12} key={m._id}>
      <PanoCard pano={m} />
    </Col>
  ));
}

export default connect(mapStateToProps)(PanosList);
