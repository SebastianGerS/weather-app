import React, { Component } from 'react';
import './Tab.css';

class Tab extends Component {
  constructor(props) {
    super(props);
  }
  getIndex = () => {
    this.props.changeTab(this.props.index);
  }

  render() {
    return(
      <li onClick={this.getIndex} className="tab">{this.props.name}</li>
    );
  }
}
export default Tab;