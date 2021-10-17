import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AllCustomers from './AllCustomers';

class CustomersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Router>
          <Link to="/all">
            <h2>Λίστα πελατών</h2>
          </Link>
          <Switch>
            <Route path="/all">
              <AllCustomers />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default CustomersMenu;
