import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

// import the required action (Redux)
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      controlid="formFilter"
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilterReducer}
      placeholder="filter"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
