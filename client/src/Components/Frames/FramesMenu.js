import React from 'react';
import AllFrames from './AllFrames';
class FramesMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h2>Λίστα Κουφωμάτων</h2>
        <AllFrames />
      </>
    );
  }
}

export default FramesMenu;
