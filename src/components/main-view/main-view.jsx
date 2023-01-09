import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// import required actions
import { setPanos, setUser } from '../../actions/actions';

import PanosList from '../panos-list/panos-list';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { MenuBar } from '../menu-bar/menu-bar';
import { PanoView } from '../pano-view/pano-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { AddPano } from '../add-pano/add-pano';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { Container, Row, Col, Button } from 'react-bootstrap';

class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // The token is stored in the browser to allow authentication from the Client side
    // getItem method allows to retrieve its value (or null if it does not exist)
    let accessToken = localStorage.getItem('token');

    if (accessToken !== null) {
      // If User already connected, its state value will be the one from the browser local storage
      this.props.setUser({
        user: localStorage.getItem('user'),
      });

      this.getPanos(accessToken);
    }
  }

  getPanos(token) {
    // We use axios library to fetch data from our API
    axios
      .get('http://localhost:8080/panos', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // We call setPanos action and pass the full panos list from the API. This will update the panos state in the Redux Store
        this.props.setPanos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    // Call the setUser action. This will update the user state with the Username value

    this.props.setUser({
      user: authData.user.username,
    });
    // location.reload();

    // When User logs in below data are stored into its browser
    // LocalStorage object allows to save key/value pairs in the browser
    localStorage.setItem('token', authData.token);

    // localStorage.setItem('userData', JSON.stringify(authData.user));

    localStorage.setItem('user', authData.user.username);
    localStorage.setItem('_id', authData.user._id);
    localStorage.setItem('role', authData.user.role);
    localStorage.setItem('email', authData.user.email);
    localStorage.setItem('birthday', authData.user.birthday);
    localStorage.setItem('favoritePanos', authData.user.favoritePanos);

    // Will trigger the getPanos function to fetch panos from the API
    this.getPanos(authData.token);
  }

  render() {
    // The panos state is extracted from the store (via props) thanks to the connect function below that allows to put the state into props (hence accessible into other component)
    let { panos, user } = this.props; // panos and user are extracted from this.props rather than from the this.state

    return (
      <Router>
        {/* <MenuBar user={user} /> */}
        <Container>
          <MenuBar user={user} />

          <Row className="main-view justify-content-md-center">
            {/* ================== */}
            {/* Root route */}
            {/* ================== */}
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (panos.length === 0)
                  return (
                    <div className="main-view">Loading please wait...</div>
                  );

                return (
                  <>
                    <Col xl={12} className="mb-3">
                      <VisibilityFilterInput />
                    </Col>
                    <PanosList panos={panos} />
                  </>
                );
              }}
            />

            {/* ======================================= */}
            {/* Read a specific Pano information route */}
            {/* ======================================= */}

            <Route
              path="/panos/:panoId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      {alert('You need to be logged in to see this page')}
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (panos.length === 0)
                  return <div className="main-view"></div>;

                let pano = panos.find((m) => m._id === match.params.panoId);

                return (
                  <Col md={8}>
                    <PanoView
                      pano={pano}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            {/* ======================= */}
            {/* New Pano creation route */}
            {/* ======================= */}

            <Route
              path="/addpano"
              render={() => {
                return <AddPano />;
              }}
            />

            {/* =========================== */}
            {/* New User Registration route */}
            {/* =========================== */}

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return <RegistrationView />;
              }}
            />
            {/* ============================= */}
            {/* Read User profile information */}
            {/* ============================= */}
            <Route
              path="/profile"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (panos.length === 0)
                  return (
                    <div className="main-view">Loading please wait...</div>
                  );

                return <ProfileView user={user} panos={panos} />;
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

// mapStateToProps is a function that—if defined—will allow the component (the one we want to connect) to subscribe to store updates.
// Any time the store is updated, this function will be called.
let mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    panos: state.panosReducer,
  };
};

// Allows to convert state (in this case our actions/functions) to props and make it available for use in designated components
// Thanks to that we will have access to setPanos and setUser functions (ie. actions) from the props
// This connect method will dispatch the actions
export default connect(mapStateToProps, {
  setUser,
  setPanos,
})(MainView);

MainView.propTypes = {
  panos: PropTypes.arrayOf(
    PropTypes.shape({
      panoUrl: PropTypes.string.isRequired,
      googlePanoId: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      heading: PropTypes.number.isRequired,
      pitch: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      areaName: PropTypes.string.isRequired,
      addedByUserId: PropTypes.string.isRequired,
      staticImgUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  // user: PropTypes.string.isRequired,
};
