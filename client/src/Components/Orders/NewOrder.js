import React from 'react';
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
    <div className="row my-4">
      <div className="col-md-2 col-6">
        <label htmlFor="frameHeight" className="form-label">
          Ύψος
        </label>
        <input
          type="text"
          name="frameHeight"
          id="frameHeight"
          className="form-control"
          value={frameHeight}
          onChange={onChange}
        />
      </div>
      <div className="col-md-2 col-6">
        <label htmlFor="frameLength" className="form-label">
          Πλάτος
        </label>
        <input
          type="text"
          name="frameLength"
          id="frameLength"
          className="form-control"
          value={frameLength}
          onChange={onChange}
        />
      </div>
      <div className="col-md-2 col-12">
        <label htmlFor="frameDesc" className="form-label">
          Τύπος Κουφώματος
        </label>
        <select
          id="frameDesc"
          name="frameDesc"
          className="form-select"
          onChange={onChange}
        >
          {frame.map((item, index) => (
            <option key={index} value={item._id}>
              {item.typeOfFrame}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-2 col-6">
        <label htmlFor="qty" className="form-label">
          Ποσότητα
        </label>
        <input
          type="number"
          name="qty"
          id="qty"
          className="form-control"
          value={qty}
          onChange={onChange}
        />
      </div>
      <div className="col-md-2 col-6">
        <label htmlFor="price" className="form-label">
          Τιμή
        </label>
        <div className="input-group">
          <input
            type="text"
            name="price"
            id="price"
            className="form-control"
            value={price}
            onChange={onChange}
          />
          <span className="input-group-text">€</span>
        </div>
      </div>
    </div>
    <div className="row">
      <button type="button" className="btn btn-success mt-4" onClick={onAdd}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  </div>
);

const Item = ({ item, index, onRemove }) => (
  <li>
    <span className="lead list-item">
      <b>Διαστάσεις</b> : {item.frameHeight} X {item.frameLength} |{' '}
      {item.frameDesc} | <b>Ποσότητα</b> : {item.qty} |<b> Τιμή</b> :{' '}
      {item.price}€ |<b> Συνολική Τιμή</b> : {item.qty * item.price}€
    </span>
    <button
      type="button"
      className="btn btn-danger mx-4"
      onClick={(e) => onRemove(index)}
    >
      <i className="fas fa-trash"></i>
    </button>
  </li>
);

const List = ({ list, onRemove }) => (
  <ol className="my-4">
    {list.map((item, index) => (
      <Item key={index} item={item} index={index} onRemove={onRemove} />
    ))}
  </ol>
);

class NewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      customer: '',
      address: '',
      notes: '',
      frameHeight: '',
      frameLength: '',
      qty: 0,
      price: 0,
      frameDesc: '',
      frame: [],
      contentList: [],
      allCustomers: [],
      total: 0,
      color: '',
      windowOfFrame: '',
      typeFrame: '',
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
      frameDesc: document.getElementById('frameDesc').value,
      color: document.getElementById('color').value,
      windowOfFrame: document.getElementById('windowOfFrame').value,
      typeFrame: document.getElementById('typeFrame').value,
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
    const { frameHeight, frameLength, frameDesc, qty, price } = this.state;
    let total = 0;
    const newList = this.state.contentList.concat({
      frameHeight,
      frameLength,
      frameDesc,
      qty,
      price,
    });

    for (let content of newList) {
      total = total + content.qty * content.price;
    }

    this.setState({ contentList: newList, total });
  };

  handleRemove(i) {
    console.log(`position ${i}`);
    let total = 0;
    const newList2 = this.state.contentList.filter(
      (item, index) => index !== i
    );
    for (let content of newList2) {
      total = total + content.qty * content.price;
    }
    this.setState({ contentList: newList2, total });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/order/new', {
        address: this.state.address,
        content: this.state.contentList,
        notes: this.state.notes,
        customer: this.state.customer,
        color: this.state.color,
        windowOfFrame: this.state.windowOfFrame,
        typeFrame: this.state.typeFrame,
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
        <h3>Εισάγετε Προσφορά</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="address" className="form-label">
            Διεύθυνση :{' '}
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={this.state.address}
            onChange={this.onChange}
          />
          <label htmlFor="customer" className="form-label">
            Πελάτης :{' '}
          </label>
          <select
            name="customer"
            id="customer"
            className="form-select"
            onChange={this.onChange}
          >
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
          <label htmlFor="color" className="form-label">
            Χρώμα :{' '}
          </label>
          <input
            type="text"
            id="color"
            name="color"
            className="form-control"
            value={this.state.color}
            onChange={this.onChange}
          />
          <label htmlFor="windowOfFrame" className="form-label">
            Τζάμι :{' '}
          </label>
          <input
            type="text"
            id="windowOfFrame"
            name="windowOfFrame"
            className="form-control"
            value={this.state.windowOfFrame}
            onChange={this.onChange}
          />
          <label htmlFor="typeFrame" className="form-label">
            Τύπος :{' '}
          </label>
          <input
            type="text"
            id="typeFrame"
            name="typeFrame"
            className="form-control"
            value={this.state.typeFrame}
            onChange={this.onChange}
          />
          <label htmlFor="notes" className="form-label">
            Παρατηρήσεις :{' '}
          </label>
          <textarea
            className="form-control"
            id="notes"
            rows="5"
            name="notes"
            value={this.state.notes}
            onChange={this.onChange}
          ></textarea>
          <AddItem
            frameHeight={this.state.frameHeight}
            frameLength={this.state.frameLength}
            frame={this.state.frame}
            price={this.state.price}
            qty={this.state.qty}
            onChange={this.onChange}
            onAdd={this.OnAddContent}
          />
          <List list={this.state.contentList} onRemove={this.handleRemove} />
          <div className="text-center">
            <b className="display-6">
              Σύνολο Παραγγελίας : {this.state.total}€
            </b>
          </div>
          <button type="submit" className="btn btn-success col-12 my-3">
            Αποθήκευση
          </button>
        </form>
      </>
    );
  }
}

export default NewOrder;
