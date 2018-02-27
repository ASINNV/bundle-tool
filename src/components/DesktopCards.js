import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import { createList } from "./Functions";
import ItemList from "./ItemList";
import { getBundlePrice } from "./Functions";

class DesktopCards extends Component {
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
    localStorage.setItem("chosen_bundle", setting + 1);
    console.log(localStorage.getItem("chosen_bundle"), "dfajshdlfkjasdhflkajsdhflaksdjhflkj");

    this.props.pageAnimation();
  }
  showButton(e) {
    if (document.getElementById('floating-button')) {

    } else {
      let target = e.target;

      while (target.tagName !== "A") {
        target = target.parentNode;
      }
      let myElement = document.createElement('div');
      let myInnerElement = document.createElement('p');
      myInnerElement.innerText = "see details";
      myInnerElement.className = "overlay-button";
      myElement.className = "overlay-backdrop absolute flex-centered";
      myElement.id = "floating-button";
      // let myElement = <p className="overlay-button absolute-center">Hello</p>;
      myElement.appendChild(myInnerElement);
      target.appendChild(myElement);

      setTimeout(() => {
        myElement.style.opacity = 1;
      }, 150);
    }
  }
  removeButton(e) {
    let target = e.target;
    let elementToRemove = document.getElementById('floating-button');
    while (target.tagName !== "A") {
      target = target.parentNode;
    }

    if (elementToRemove) {
      target.removeChild(elementToRemove);
    }
  }
  render() {
    var startupBundlePrice = getBundlePrice(this.props.awesome.startup);
    var recommendedBundlePrice = getBundlePrice(this.props.awesome.recommended);
    var enterpriseBundlePrice = getBundlePrice(this.props.awesome.enterprise);

    return (
      <div className="flex-centered">
        <a id="pack-one" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)} onMouseOver={this.showButton.bind(this)} onMouseLeave={this.removeButton.bind(this)}>

          <div className="sub-header">
            <p>startup</p>
          </div>

          <ItemList list_array={this.props.awesome.startup} functionalityDepth={0} page="home" />
          {/*<div className="list-container">*/}
            {/*<ul className="line-item-container small-text">*/}
              {/*{createList(this.props.startup)}*/}
            {/*</ul>*/}
          {/*</div>*/}

          <div className="sub-footer">
            <p className="sub-footer-price">${startupBundlePrice}</p>
          </div>

        </a>
        <a id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)} onMouseOver={this.showButton.bind(this)} onMouseLeave={this.removeButton.bind(this)}>

          <div className="sub-header green-bg">
            <p>recommended</p>
          </div>

          <ItemList list_array={this.props.awesome.recommended} functionalityDepth={0} page="home" featured={true} />

          <div className="sub-footer green-bg">
            <p className="sub-footer-price">${recommendedBundlePrice}</p>
          </div>

        </a>
        <a id="pack-three" className="card service-pack shadowed overflow-hidden" onClick={this.crazyFunc.bind(this)} onMouseOver={this.showButton.bind(this)} onMouseLeave={this.removeButton.bind(this)}>

          <div className="sub-header">
            <p>enterprise</p>
          </div>

          <ItemList list_array={this.props.awesome.enterprise} functionalityDepth={0} page="home" />

          <div className="sub-footer">
            <p className="sub-footer-price">${enterpriseBundlePrice}</p>
          </div>

        </a>
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