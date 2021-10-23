import React from 'react';
import AllCustomers from './AllCustomers';

class CustomersMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h2 className="text-center">Λίστα Πελατών</h2>
        <AllCustomers />
      </>
    );
  }
}

export default CustomersMenu;
