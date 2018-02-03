import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { createList } from "./Functions";
// import ItemList from "./ItemList";

class DesktopCards extends Component {
  crazyFunc(e) {
    let three = document.getElementById('pack-three');
    let two = document.getElementById('pack-two');
    let one = document.getElementById('pack-one');

    let whoa = e.target;
    let setting = 1;

    function findCard(startingPoint) {

      if (startingPoint.parentNode === three) {
        setting = 2;
      } else if (startingPoint.parentNode === two) {
        setting = 1;
      } else if (startingPoint.parentNode === one) {
        setting = 0;
      } else {
        findCard(startingPoint.parentNode)
      }
      return startingPoint;
    }
    findCard(whoa);


    if (this.props.awesome.chosen_bundle === setting) {
      this.props.setPackage(1);
    } else {
      this.props.setPackage(setting);
    }
  }
  render() {
    return (
      <div className="flex-centered">
        <Link to="/startup" id="pack-one" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

          <div className="sub-header">
            <p>startup</p>
          </div>

          {/*<ItemList list_array={this.props.awesome.startup} functionalityDepth={1} />*/}
          <div className="list-container">
            <ul className="line-item-container small-text">
              {createList(this.props.startup)}
            </ul>
          </div>

          <div className="sub-footer">
            <p className="sub-footer-price">$1800</p>
          </div>

        </Link>
        <Link to="/recommended" id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

          <div className="sub-header recommended-header">
            <p>recommended</p>
          </div>

          {/*<ItemList list_array={this.props.awesome.recommendation} functionalityDepth={1} />*/}
          <div className="list-container">
            <ul className="line-item-container small-text">
              {createList(this.props.recommendation)}
            </ul>
          </div>

          <div className="sub-footer recommended-footer">
            <p className="sub-footer-price">$3000</p>
          </div>

        </Link>
        <Link to="/enterprise" id="pack-three" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

          <div className="sub-header">
            <p>enterprise</p>
          </div>

          {/*<ItemList list_array={this.props.awesome.enterprise} functionalityDepth={1} />*/}
          <div className="list-container">
            <ul className="line-item-container small-text">
              {createList(this.props.enterprise)}
            </ul>
          </div>

          <div className="sub-footer">
            <p className="sub-footer-price">$5000</p>
          </div>

        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    awesome: state.awesomeReducer,
    okay: state.okayReducer
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPackage: (thing) => {
      dispatch({
        type: "SET_PACKAGE_SELECTION",
        payload: thing
      });

    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopCards);