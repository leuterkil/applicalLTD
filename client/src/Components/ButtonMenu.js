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
import { AuthRoute, ProtectedRoute } from '../util/route';

import './styles/ButtonMenu.css';
import Login from './Login';

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
              className="links btn btn-primary px-0 px-md-5 py-3 my-2"
              to="/customers"
            >
              Πελάτες
            </Link>
            <Link
              className="links btn btn-primary px-0  px-md-5 py-3 my-2"
              to="/frames"
            >
              Κουφώματα
            </Link>
            <Link
              className="links btn btn-primary px-0  px-md-5 py-3 my-2"
              to="/orders"
            >
              Προσφορές
            </Link>
          </div>

          <Switch>
            <ProtectedRoute path="/customers/new" component={NewCustomer} />
            <ProtectedRoute
              path="/customers/edit/:cid"
              component={EditCustomer}
            />
            <ProtectedRoute path="/customers/:cid" component={Customer} />
            <ProtectedRoute path="/customers" component={CustomersMenu} />
            <ProtectedRoute path="/frames/new" component={NewFrame} />
            <ProtectedRoute path="/frames/edit/:fid" component={EditFrame} />
            <ProtectedRoute path="/frames/:fid" component={Frame} />
            <ProtectedRoute path="/frames" component={FramesMenu} />
            <ProtectedRoute path="/orders/new" component={NewOrder} />
            <ProtectedRoute path="/orders/edit/:oid" component={EditOrder} />
            <ProtectedRoute path="/orders/:oid" component={OrderDetails} />
            <ProtectedRoute path="/orders" component={OrdersMenu} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default ButtonMenu;
