import React from 'react';
import { Link } from 'react-router-dom';
import AllOrdersMenu from './AllOrders';
class OrdersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h1>Orders Menu</h1>;
        <AllOrdersMenu />
      </>
    );
  }
}

export default OrdersMenu;
