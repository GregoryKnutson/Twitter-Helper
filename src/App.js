import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { PrivateRoute, PrivateRouteWithAuth } from "./verifyLogin"
import Home from './components/Home/Home';
import Login from './components/Login/Login'
import SentimentAnalysis from "./components/SentimentAnalysis/SentimentAnalysis";
import oauths from "./components/oauth";
import Register from "./components/Register/Register";

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <PrivateRouteWithAuth path="/home" component={Home} />
        <PrivateRouteWithAuth path="/analysis" component={SentimentAnalysis} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/api/oauth" component={oauths}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;