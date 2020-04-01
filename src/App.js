import React, { Component } from 'react'
import {Router, Route, Redirect, Switch } from "react-router-dom";
import './styles.css';
import history from './history';
import Home from './containers/Home';
import UserHome from './containers/UserHome';
import ArtistHome from './containers/ArtistHome';
import {reactLocalStorage} from 'reactjs-localstorage';
import {message} from 'antd';

const ProtectedRoute = ({ component: Comp, path,  ...rest }) => {
  const currentPath = path;
  const storedPath = reactLocalStorage.get('path',"/", true)
  return (
        <Route
              path={path}
              render={props => { 
                    if(reactLocalStorage.get('email',undefined, true) && 
                            currentPath ===  reactLocalStorage.get('path',undefined, true)) 
                      return <Comp {...rest} /> 
                    else
                    {
                      message.error("You are not authorized to view the page you have requested");
                               
                      return <Redirect to={storedPath} />
                    }
                      

              }
            }
            {...rest}
        />
  );
};

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={() => <Home/>} />
            <ProtectedRoute exact={true} path="/user" component={() => <UserHome/>}/>
            <ProtectedRoute exact={true} path="/artist" component={() => <ArtistHome/>}/>
            <Route component={() => <Home/>} />
          </Switch>
        </Router>
      </div>
    )
  }
}
