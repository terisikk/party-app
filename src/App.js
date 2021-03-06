import React, { Component } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';

import config from './config';
import TeaserPage from './containers/TeaserPage';
import Header from './containers/Header';
import Bingo from './containers/BingoContainer';
import CardGame from './containers/CardGameContainer';
import Apps from './containers/AppsContainer';
import SoundBoard from './containers/SoundboardContainer';
import Instructions from './containers/InstructionsContainer';
import Settings from './containers/SettingsContainer';
import Drinkmusic from './containers/DrinkmusicContainer';
import Login from './containers/LoginContainer';
import Gallery from './containers/GalleryContainer';
import Photo from './containers/PhotoContainer';
import Bubble from './components/Bubble';

import * as authActions from './actions/auth';
import { isAuthenticated } from './util/authUtils';

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

  #update-notification {
    position:fixed;
    bottom: 0;
    width: 100%;
    cursor:pointer;

    & .notification-content {
      width: 320px;
      padding: 1rem;
      margin: 0 auto;
      background: #fff;
      border-radius: 5px 5px 0 0;
      border: 2px solid #bfbdbd;
      box-shadow: 0px -1px 29px -6px rgba(0,0,0,0.75);

     & a {
       cursor: pointer;
       font-weight: bold;
       font-size: 1.4em;
       text-transform: uppercase;
     }
    }
  }
`;

class App extends Component {
  render() {
    const isStarted = moment().isAfter(config.eventDate);

    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <React.Fragment>
            <Route path="/" component={isStarted ? Header : TeaserPage} />
            {isAuthenticated() ? (
              isStarted && (
                <AnimatedSwitch
                  atEnter={{ opacity: 0 }}
                  atLeave={{ opacity: 0 }}
                  atActive={{ opacity: 1 }}
                  className="switch-wrapper"
                >
                  <Route exact path="/" component={Apps} />
                  <Route path="/instructions" component={Instructions} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/bingo" component={Bingo} />
                  <Route path="/cardgame" component={CardGame} />
                  <Route path="/soundboard" component={SoundBoard} />
                  <Route path="/drinkmusic" component={Drinkmusic} />
                  <Route path="/gallery" component={Gallery} />
                  <Route path="/photo/:sharecode" component={Photo} />
                </AnimatedSwitch>
              )
            ) : (
              <Login />
            )}
          </React.Fragment>
        </Router>
        {isStarted && <Bubble />}
      </div>
    );
  }
}

export default App;
