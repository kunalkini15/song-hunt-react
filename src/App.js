import React, { Component } from 'react'
import {Router, Route, Redirect } from "react-router-dom";
import './styles.css';
import history from './history';
import Home from './containers/Home';
import UserHome from './containers/UserHome';
import ArtistHome from './containers/ArtistHome';
import {reactLocalStorage} from 'reactjs-localstorage';

const ProtectedRoute = ({ component: Comp, path,  ...rest }) => {
  return (
        <Route
              path={path}
              render={props => {
                    return reactLocalStorage.get('email',undefined, true) ? <Comp {...rest} /> : <Redirect to="/" />;

              }
            }
        />
  );
};
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
    <Route exact path="/" component={() => <Home/>} />
          <ProtectedRoute path="/user" component={() => <UserHome/>}/>
          <ProtectedRoute path="/artist" component={() => <ArtistHome/>}/>
        </Router>
      </div>
    )
  }
}
