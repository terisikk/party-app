import React, { Component } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import TeaserPage from './containers/TeaserPage';
import FrontPage from './containers/FrontPage';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fjalla+One|Noto+Sans:400,700');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Fjalla One', sans-serif;
  }

  body {
    background: #fff;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

class App extends Component {
  render() {
    const isStarted = moment().isAfter('2018-12-26 18:29:00');

    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <Route
            path="/"
            exact
            component={isStarted ? FrontPage : TeaserPage}
          />
        </Router>
      </div>
    );
  }
}

export default App;
