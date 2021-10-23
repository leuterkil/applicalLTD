import React from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

class AllFrames extends React.Component {
  constructor(props) {
    super(props);
    this.state = { frames: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/frame/all').then((res) => {
      this.setState({ frames: res.data });
    });
  }

  deleteFrame(id, e) {
    axios.delete(`http://localhost:4000/frame/${id}`).then((res) => {
      console.log(res.data);
      const el = document.querySelector(`#fid${id}`);

      // remove the list item
      el.parentElement.removeChild(el);
    });
  }
  render() {
    return (
      <>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-success " to="/frames/new">
            Νέο Κούφωμα <i className="fas fa-plus"></i>
          </Link>
        </div>
        <ul className="list-container py-2 px-2 my-3">
          {this.state.frames.map((frame, index) => (
            <li
              className="my-2 px-3 py-3 d-flex"
              id={`fid${frame._id}`}
              key={index}
            >
              <h3 className="col-6">
                <span className="indexes">{index + 1}</span>
                <Link
                  className="list-link"
                  key={index}
                  to={`/frames/${frame._id}`}
                >
                  {frame.typeOfFrame}
                </Link>
              </h3>
              <div className="d-flex justify-content-end col-6">
                <button
                  className="btn btn-link"
                  onClick={(e) => this.deleteFrame(frame._id, e)}
                >
                  <i className="fas fa-trash text-danger"></i>
                </button>
                <button className="btn btn-link">
                  <Link to={`/frames/edit/${frame._id}`}>
                    <i className="fa fa-pencil text-black"></i>
                  </Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllFrames;
