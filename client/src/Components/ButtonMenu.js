import React from 'react';
import CustomersMenu from './Customers/CustomersMenu';
import FramesMenu from './Frames/FramesMenu';
import Frame from './Frames/Frame';
import EditFrame from './Frames/EditFrame';
import NewFrame from './Frames/NewFrame';
import OrdersMenu from './Orders/OrdersMenu';
import NewOrder from './Orders/NewOrder';
import OrderDetails from './Orders/OrderDetails';
import EditOrder from './Orders/EditOrder';
import Customer from './Customers/Customer';
import EditCustomer from './Customers/EditCustomer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NewCustomer from './Customers/NewCustomer';

import './styles/ButtonMenu.css';

class ButtonMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Router>
          <div className="menu-container d-flex justify-content-around my-4 px-2 py-2">
            <Link
              className="links btn btn-primary px-5 py-3 my-2"
              to="/customers"
            >
              Πελάτες
            </Link>
            <Link className="links btn btn-primary px-5 py-3 my-2" to="/frames">
              Κουφώματα
            </Link>
            <Link className="links btn btn-primary px-5 py-3 my-2" to="/orders">
              Παραγγελίες
            </Link>
          </div>
          <Switch>
            <Route path="/customers/new">
              <NewCustomer />
            </Route>
            <Route path="/customers/edit/:cid">
              <EditCustomer />
            </Route>

            <Route path="/customers/:cid">
              <Customer />
            </Route>
            <Route path="/customers">
              <CustomersMenu />
            </Route>
            <Route path="/frames/new">
              <NewFrame />
            </Route>
            <Route path="/frames/edit/:fid">
              <EditFrame />
            </Route>
            <Route path="/frames/:fid">
              <Frame />
            </Route>
            <Route path="/frames">
              <FramesMenu />
            </Route>
            <Route path="/orders/new">
              <NewOrder />
            </Route>
            <Route path="/orders/edit/:oid">
              <EditOrder />
            </Route>
            <Route path="/orders/:oid">
              <OrderDetails />
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
