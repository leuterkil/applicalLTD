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
        <Link to="/frames/new">Νέο Κούφωμα</Link>
        <ul>
          {this.state.frames.map((frame, index) => (
            <li id={`fid${frame._id}`} key={index}>
              <Link key={index} to={`/frames/${frame._id}`}>
                {frame.typeOfFrame}
              </Link>
              <button onClick={(e) => this.deleteFrame(frame._id, e)}>
                Διαγραφή
              </button>
              <button>
                <Link to={`/frames/edit/${frame._id}`}>Επεξεργασία</Link>
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default AllFrames;
