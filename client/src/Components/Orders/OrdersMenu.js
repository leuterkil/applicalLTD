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
        <h1>Λίστα Παραγγελιών</h1>
        <AllOrdersMenu />
      </>
    );
  }
}

export default OrdersMenu;
