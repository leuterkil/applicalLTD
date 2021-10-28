import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import { AuthRoute, ProtectedRoute } from './util/route';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
const axios = require('axios');
axios.defaults.withCredentials = true;

const serverUrl = 'http://localhost:4000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { admin: [] };
  }
  componentDidMount() {}
  render() {
    return (
      <>
        <center>
          <img src="https://res.cloudinary.com/diyjlmw18/image/upload/w_200,ar_16:9,c_fill,g_auto,e_sharpen/v1635186278/AplicalLTD/64227245_1023024817899638_8711578648622137344_n.jpg_qnu0co.jpg" />
        </center>
        <Router>
          <Switch>
            <AuthRoute path="/login" component={Login} />
            <ProtectedRoute path="/" component={Home} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
