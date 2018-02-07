import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ItemList from "./ItemList";

import { getBundlePrice } from "./Functions";

class MobileCards extends Component {
  crazyFunc(e) {
    let three = document.getElementById('pack-three');
    let two = document.getElementById('pack-two');
    let one = document.getElementById('pack-one');

    let whoa = e.target;
    let setting = 1;

    this.props.awesome.active_item = -1; // reset displayed description to default

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

    this.props.setPackage(setting);
  }

  render() {
    var startupBundlePrice = getBundlePrice(this.props.awesome.startup);
    var recommendedBundlePrice = getBundlePrice(this.props.awesome.recommended);
    var enterpriseBundlePrice = getBundlePrice(this.props.awesome.enterprise);
    return (
      <ReactSwipe className="carousel" swipeOptions={{continuous: false, startSlide: 1}}>
        <div>
          <Link to="/startup" id="pack-one" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

            <div className="sub-header">
              <p>startup</p>
            </div>

            <ItemList list_array={this.props.awesome.startup} functionalityDepth={1} page="other"/>

            <div className="sub-footer">
              {startupBundlePrice}
            </div>

          </Link>
        </div>
        <div>

          <Link to="/recommended" id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

            <div className="sub-header green-bg">
              <p>recommended</p>
            </div>

            <ItemList list_array={this.props.awesome.recommended} functionalityDepth={1} page="other"/>

            <div className="sub-footer green-bg">
              {recommendedBundlePrice}
            </div>

          </Link>
        </div>
        <div>
          <Link to="/enterprise" id="pack-three" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

            <div className="sub-header">
              <p>enterprise</p>
            </div>

            <ItemList list_array={this.props.awesome.enterprise} functionalityDepth={1} page="other"/>

            <div className="sub-footer">
              {enterpriseBundlePrice}
            </div>

          </Link>
        </div>

      </ReactSwipe>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileCards);