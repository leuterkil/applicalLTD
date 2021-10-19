import React from 'react';
import { useHistory } from 'react-router-dom';
const axios = require('axios');

const AddItem = ({
  frameHeight,
  frameLength,
  price,
  qty,
  frame,
  onChange,
  onAdd,
}) => (
  <div>
    <input
      type="text"
      name="frameHeight"
      id="frameHeight"
      value={frameHeight}
      onChange={onChange}
    />
    <input
      type="text"
      name="frameLength"
      id="frameLength"
      value={frameLength}
      onChange={onChange}
    />
    <select id="singleFrame" name="singleFrame" onChange={onChange}>
      {frame.map((item, index) => (
        <option key={index} value={item._id}>
          {item.typeOfFrame}
        </option>
      ))}
    </select>
    <input type="number" name="qty" id="qty" value={qty} onChange={onChange} />
    <input
      type="text"
      name="price"
      id="price"
      value={price}
      onChange={onChange}
    />
    <button type="button" onClick={onAdd}>
      Add
    </button>
  </div>
);

const List = ({ list, onRemove }) => (
  <ol>
    {list.map((item, index) => (
      <li key={index} id={index}>
        {item.frameHeight} * {item.frameLength} | {item.singleFrame} |{' '}
        {item.qty} | {item.price} | συνολική τιμή : {item.qty * item.price}
        <button onClick={onRemove}>Διαγραφή</button>
      </li>
    ))}
  </ol>
);

class NewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: '',
      address: '',
      notes: '',
      frameHeight: '',
      frameLength: '',
      qty: 0,
      price: 0,
      singleFrame: '',
      frame: [],
      contentList: [],
      allCustomers: [],
    };
  }
  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to upd ate the state
    */
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      singleFrame: document.getElementById('singleFrame').value,
    });
  };

  componentDidMount() {
    axios.get('http://localhost:4000/customer/all').then((res) => {
      this.setState({
        allCustomers: res.data,
      });
    });
    axios.get('http://localhost:4000/frame/all').then((res) => {
      this.setState({
        frame: res.data,
      });
    });
  }

  OnAddContent = () => {
    const { frameHeight, frameLength, singleFrame, qty, price } = this.state;
    const newList = this.state.contentList.concat({
      frameHeight,
      frameLength,
      singleFrame,
      qty,
      price,
    });

    this.setState({ contentList: newList });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/order/new', {
        address: this.state.address,
        content: this.state.contentList,
        notes: this.state.notes,
        customer: this.state.customer,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          address: '',
          customer: '',
          contentList: [],
          notes: '',
        });
        alert('Success');
        Array.from(document.querySelectorAll('input')).forEach(
          (input) => (input.value = '')
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <>
        <h3>Εισάγετε Παραγγελία</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="address">Διεύθυνση : </label>
          <input
            type="text"
            id="address"
            name="address"
            value={this.state.address}
            onChange={this.onChange}
          />
          <label htmlFor="customer">Πελάτης : </label>
          <select name="customer" id="customer" onChange={this.onChange}>
            <option default>Επιλέξτε Πελάτη</option>
            {this.state.allCustomers.map((customer, index) => (
              <option
                id={`cid${customer._id}`}
                key={index}
                value={customer._id}
              >
                {customer.firstName} {customer.lastName}{' '}
              </option>
            ))}
          </select>
          <label htmlFor="notes">Παρατηρήσεις : </label>
          <input
            type="textarea"
            id="notes"
            name="notes"
            value={this.state.notes}
            onChange={this.onChange}
          />
          <AddItem
            frameHeight={this.state.frameHeight}
            frameLength={this.state.frameLength}
            frame={this.state.frame}
            price={this.state.price}
            qty={this.state.qty}
            onChange={this.onChange}
            onAdd={this.OnAddContent}
          />
          <List list={this.state.contentList} />
          <button type="submit">Αποθήκευση</button>
        </form>
      </>
    );
  }
}

export default NewOrder;
