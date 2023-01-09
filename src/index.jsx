import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

// import { createStore } from 'redux'; => createStore deprecated, see below instead
// Method below allows us to create the store for states
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesAppReducers from './reducers/reducers';

import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

// Create a store that knows the reducers clubed into the movieAppReducers variable
const store = createStore(moviesAppReducers, devToolsEnhancer());

// Main component
class Best360iesApplication extends React.Component {
  render() {
    return (
      // As the entire App is wrapped into Provider store, the store will be accesiible from the entire App
      <Provider store={store}>
        <Container fluid>
          <Container style={{ marginTop: '5rem' }}>
            <MainView />
          </Container>
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(Best360iesApplication), container);
