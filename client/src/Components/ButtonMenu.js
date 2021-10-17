import React from 'react';
import CustomersMenu from './Customers/CustomersMenu';
import FramesMenu from './Frames/FramesMenu';
import OrdersMenu from './Orders/OrdersMenu';
import Customer from './Customers/Customer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ButtonMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Router>
          <Link to="/customers">Πελάτες</Link>
          <Link to="/frames">Κουφώματα</Link>
          <Link to="/orders">Παραγγελίες</Link>

          <Switch>
            <Route path="/customers/:cid">
              <Customer />
            </Route>
            <Route path="/customers">
              <CustomersMenu />
            </Route>
            <Route path="/frames">
              <FramesMenu />
            </Route>
            <Route path="/orders">
              <OrdersMenu />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default ButtonMenu;
