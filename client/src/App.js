import React from 'react';
import './App.css';
import Home from './Components/Home';
const axios = require('axios');

const serverUrl = 'http://localhost:4000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { admin: [] };
  }
  componentDidMount() {
    axios.get(`${serverUrl}/admin/616a9bbbc57b382a3f40f1c3`).then((res) => {
      this.setState({ admin: res.data });
    });
  }
  render() {
    return (
      <>
        <Home name={this.state.admin.username} />
      </>
    );
  }
}

export default App;
