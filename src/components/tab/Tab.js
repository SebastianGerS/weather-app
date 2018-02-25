import React, { Component } from 'react';
import './Tab.css';

class Tab extends Component {
 
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