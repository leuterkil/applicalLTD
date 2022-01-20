import React from 'react';
import { withRouter } from 'react-router-dom';
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
  <div className="row">
    <div className="col-md-2 col-6">
      <label htmlFor="frameHeight" className="form-label">
        Ύψος
      </label>
      <input
        className="form-control"
        type="text"
        name="frameHeight"
        id="frameHeight"
        value={frameHeight}
        onChange={onChange}
      />
    </div>
    <div className="col-md-2 col-6">
      <label htmlFor="frameLength" className="form-label">
        Πλάτος
      </label>
      <input
        className="form-control"
        type="text"
        name="frameLength"
        id="frameLength"
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
        onChange={onChange}
        className="form-select"
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
        className="form-control"
        name="qty"
        id="qty"
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
    <button
      type="button"
      className="btn btn-success col-12 my-4"
      onClick={onAdd}
    >
      <i className="fas fa-plus"></i>
    </button>
  </div>
);

const Item = ({ item, index, onRemove }) => (
  <li>
    <span className="lead list-item">
      <b>Διαστάσεις </b> : {item.frameHeight} * {item.frameLength} |{' '}
      {item.frameDesc} | <b>Ποσότητα</b> : {item.qty} | <b>Τιμή</b> :{' '}
      {item.price}€ | <b>Συνολική Τιμή</b> : {item.qty * item.price}€
    </span>
    <button
      type="button"
      className="btn btn-danger mx-3"
      onClick={(e) => onRemove(index)}
    >
      <i className="fas fa-trash"></i>
    </button>
  </li>
);

const List = ({ list, onRemove }) => (
  <ol>
    {list.map((item, index) => (
      <Item key={index} item={item} index={index} onRemove={onRemove} />
    ))}
  </ol>
);

class EditOrder extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      customerObj: [],
      customer: '',
      frameObj: [],
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

  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      frameDesc: document.getElementById('frameDesc').value,
      color: document.getElementById('color').value,
      windowOfFrame: document.getElementById('windowOfFrame').value,
      typeFrame: document.getElementById('typeFrame').value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const oid = this.props.match.params.oid;
    axios
      .put(`/order/${oid}`, {
        address: this.state.address,
        content: this.state.contentList,
        frameDesc: this.state.contentList.frameDesc,
        notes: this.state.notes,
        customer: this.state.customer,
        color: this.state.color,
        windowOfFrame: this.state.windowOfFrame,
        typeFrame: this.state.typeFrame,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  handleRemove(i) {
    let total = 0;
    const newList2 = this.state.contentList.filter(
      (item, index) => index !== i
    );
    for (let content of newList2) {
      total = total + content.qty * content.price;
    }
    this.setState({ contentList: newList2, total });
  }

  componentDidMount() {
    const oid = this.props.match.params.oid;
    let total = 0;
    axios.get(`/order/${oid}`).then((res) => {
      res.data.content.map((item) => {
        item.frameDesc = item.frameDesc._id;
      });
      for (let content of res.data.content) {
        total = total + content.qty * content.price;
      }
      this.setState({
        address: res.data.address,
        notes: res.data.notes,
        customer: res.data.customer._id,
        customerObj: res.data.customer,
        contentList: res.data.content,
        color: res.data.color,
        windowOfFrame: res.data.windowOfFrame,
        typeFrame: res.data.typeFrame,
        total,
      });
    });
    axios.get('/customer/all').then((res) => {
      this.setState({
        allCustomers: res.data,
      });
    });
    axios.get('/frame/all').then((res) => {
      this.setState({
        frame: res.data,
      });
    });
  }

  render() {
    return (
      <>
        <h3>Επεξεργασία Προσφοράς</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="address" className="form-label">
            Διεύθυνση :{' '}
          </label>
          <input
            type="text"
            id="address"
            className="form-control"
            name="address"
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
            <option default value={this.state.customerObj._id}>
              {this.state.customerObj.firstName}{' '}
              {this.state.customerObj.lastName}
            </option>
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
            className="form-control"
            type="text"
            id="color"
            name="color"
            value={this.state.color}
            onChange={this.onChange}
          />
          <label htmlFor="windowOfFrame" className="form-label">
            Τζάμι :{' '}
          </label>
          <input
            className="form-control"
            type="text"
            id="windoOfFrame"
            name="windowOfFrame"
            value={this.state.windowOfFrame}
            onChange={this.onChange}
          />
          <label htmlFor="typeFrame" className="form-label">
            Τύπος :{' '}
          </label>
          <input
            className="form-control"
            type="text"
            id="typeFrame"
            name="typeFrame"
            value={this.state.typeFrame}
            onChange={this.onChange}
          />
          <label htmlFor="notes" className="form-label">
            Παρατηρήσεις :{' '}
          </label>
          <textarea
            className="form-control mb-3"
            id="notes"
            name="notes"
            value={this.state.notes}
            onChange={this.onChange}
            rows="5"
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
          <List list={this.state.contentList} onRemove={this.handleRemove} />
          <br />
          <div className="text-center">
            <b className="display-6">
              Σύνολο Παραγγελίας : {this.state.total}€
            </b>
          </div>
          <button type="submit" className="btn btn-success col-12 mt-3">
            Ενημέρωση
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(EditOrder);
