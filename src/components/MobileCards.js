import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import { getDescription } from "./Functions";
import ItemList from "./ItemList";

class MobileCards extends Component {
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
  // crazyFunc(e) {
  //   let three = document.getElementById('pack-three');
  //   let two = document.getElementById('pack-two');
  //   let one = document.getElementById('pack-one');
  //
  //   let whoa = e.target;
  //   let setting = 1;
  //
  //   function awesome(whoa) {
  //
  //
  //     if (whoa.parentNode === three) {
  //       if (three.className.indexOf("selected") !== -1) {
  //         three.className = three.className.slice(0, three.className.indexOf("selected"));
  //       } else {
  //         two.className = two.className.slice(0, two.className.indexOf("selected"));
  //         one.className = one.className.slice(0, one.className.indexOf("selected"));
  //         three.className += " selected";
  //       }
  //       setting = 2;
  //     } else if (whoa.parentNode === two) {
  //       if (two.className.indexOf("selected") !== -1) {
  //         two.className = two.className.slice(0, two.className.indexOf("selected"));
  //       } else {
  //         three.className = three.className.slice(0, three.className.indexOf("selected"));
  //         one.className = one.className.slice(0, one.className.indexOf("selected"));
  //         two.className += " selected";
  //       }
  //       setting = 1;
  //     } else if (whoa.parentNode === one) {
  //       if (one.className.indexOf("selected") !== -1) {
  //         one.className = one.className.slice(0, one.className.indexOf("selected"));
  //       } else {
  //         two.className = two.className.slice(0, two.className.indexOf("selected"));
  //         three.className = three.className.slice(0, three.className.indexOf("selected"));
  //         one.className += " selected";
  //       }
  //       setting = 0;
  //     } else {
  //       awesome(whoa.parentNode)
  //     }
  //     return whoa;
  //   }
  //   awesome(whoa);
  //
  //
  //   if (this.props.awesome.chosen_bundle === setting) {
  //     this.props.setPackage(1);
  //   } else {
  //     this.props.setPackage(setting);
  //   }
  // }
  render() {
    return (
      <ReactSwipe className="carousel" swipeOptions={{continuous: true, startSlide: 1}}>
        <div>
          <Link to="/startup" id="pack-one" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

            <div className="sub-header">
              <p>startup</p>
            </div>

            <ItemList list_array={this.props.awesome.startup} functionalityDepth={1}/>

            <div className="sub-footer">
              <p className="sub-footer-price">$1800</p>
            </div>

          </Link>
        </div>
        <div>

          <Link to="/recommended" id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

            <div className="sub-header recommended-header">
              <p>recommended</p>
            </div>

            <ItemList list_array={this.props.awesome.recommendation} functionalityDepth={1}/>

            <div className="sub-footer recommended-footer">
              <p className="sub-footer-price">$3000</p>
            </div>

          </Link>
        </div>
        <div>
          <Link to="/enterprise" id="pack-three" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)}>

            <div className="sub-header">
              <p>enterprise</p>
            </div>

            <ItemList list_array={this.props.awesome.enterprise} functionalityDepth={1}/>

            <div className="sub-footer">
              <p className="sub-footer-price">$5000</p>
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