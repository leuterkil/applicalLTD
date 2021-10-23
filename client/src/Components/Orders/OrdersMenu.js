import React from 'react';
import AllOrdersMenu from './AllOrders';
class OrdersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h2 className="text-center">Λίστα Παραγγελιών</h2>
        <AllOrdersMenu />
      </>
    );
  }
}

export default OrdersMenu;
