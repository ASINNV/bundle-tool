import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import { createList } from "./Functions";
// import ItemList from "./ItemList";
// import { getBundlePrice } from "./Functions";

class DesktopCards extends Component {
  crazyFunc(e) {
    let three = document.getElementById('three-dimensional-card-3');
    let two = document.getElementById('three-dimensional-card-2');
    let one = document.getElementById('three-dimensional-card-1');

    let thing = e.target;
    let setting = 1;

    while (thing.tagName !== "A") {
      thing = thing.parentNode;
    }

    this.props.awesome.active_item = -1; // reset displayed description to default

    function findCard(startingPoint) {

      if (startingPoint === three) {
        setting = 2;
      } else if (startingPoint === two) {
        setting = 1;
      } else if (startingPoint === one) {
        setting = 0;
      } else {
        findCard(startingPoint)
      }
      return startingPoint;
    }
    findCard(thing);

    this.props.setPackage(setting);
    localStorage.setItem("chosen_bundle", setting + 1);
    console.log(localStorage.getItem("chosen_bundle"), "dfajshdlfkjasdhflkajsdhflaksdjhflkj");

    this.props.pageAnimation();
  }
  // showButton(e) {
  //   if (document.getElementById('floating-button')) {
  //
  //   } else {
  //     let target = e.target;
  //
  //     while (target.tagName !== "A") {
  //       target = target.parentNode;
  //     }
  //     let myElement = document.createElement('div');
  //     let myInnerElement = document.createElement('p');
  //     myInnerElement.innerText = "see details";
  //     myInnerElement.className = "overlay-button";
  //     myElement.className = "overlay-backdrop absolute flex-centered";
  //     myElement.id = "floating-button";
  //     // let myElement = <p className="overlay-button absolute-center">Hello</p>;
  //     myElement.appendChild(myInnerElement);
  //     target.appendChild(myElement);
  //
  //     setTimeout(() => {
  //       myElement.style.opacity = 1;
  //     }, 50);
  //   }
  // }
  // removeButton(e) {
  //   let target = e.target;
  //   let elementToRemove = document.getElementById('floating-button');
  //   while (target.tagName !== "A") {
  //     target = target.parentNode;
  //   }
  //
  //   if (elementToRemove) {
  //     target.removeChild(elementToRemove);
  //   }
  // }
  depth(e) {
    let thing = e.target;

    while (thing.tagName !== "A") {
      thing = thing.parentNode;
    }

    let card = document.getElementById(thing.id);
    if (card !== null) {
      var cardRect = card.getBoundingClientRect();

      var percentX = Math.round(((e.clientX - cardRect.left)/1.5) - 100);
      var percentY = Math.round(((e.clientY - cardRect.top)/2) - 100);

      card.style.cssText = "transform: translateX(0px) translateY(0px) translateZ(45px) scaleX(1) scaleY(1) scaleZ(1) rotateX(" + Math.round(percentY/-20) + "deg) rotateY(" + Math.round(percentX/20) + "deg) rotateZ(0deg) skewX(0deg) skewY(0deg);";
      // card.style.cssText = "transform: translateX(0px) translateY(0px) translateZ(45px) scaleX(1) scaleY(1) scaleZ(1) rotateX(" + Math.round(percentY/-15) + "deg) rotateY(" + Math.round(percentX/15) + "deg) rotateZ(0deg) skewX(0deg) skewY(0deg); box-shadow: " + Math.round(percentX/-15) + "px " + Math.round(percentY/-15) + "px 28px 0 rgba(0, 0, 0, .4);"; // with dynamic box-shadow
    }
  }
  leavingDepth(e) {
    let thing = e.target;

    while (thing.tagName !== "A") {
      thing = thing.parentNode;
    }

    let card = document.getElementById(thing.id);

    // card.style.cssText = "transform: translateX(0px) translateY(0px) translateZ(0px) scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg) skewY(0deg); box-shadow: 0 7px 15px 0 rgba(0, 0, 0, .3); transition: box-shadow .5s ease, transform .5s ease;";
    card.style.cssText = "transform: translateX(0px) translateY(0px) translateZ(0px) scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skewX(0deg) skewY(0deg); transition: transform .5s ease;";
  }
  render() {
    // var startupBundlePrice = getBundlePrice(this.props.awesome.startup);
    // var recommendedBundlePrice = getBundlePrice(this.props.awesome.recommended);
    // var enterpriseBundlePrice = getBundlePrice(this.props.awesome.enterprise);

    return (
      <div className="flex-centered perspective-parent">

        <a id="three-dimensional-card-1" onMouseMove={this.depth.bind(this)} onMouseLeave={this.leavingDepth.bind(this)} onClick={this.crazyFunc.bind(this)}>
          <div className="card-image" />
          <div className="card-info">
            <p className="card-name">STARTUP</p>
            <p className="card-desc">Operating on a budget? This bundle will get you up-and-running in no time.</p>
            <p className="card-arrow">&rarr;</p>
          </div>
        </a>

        <a id="three-dimensional-card-2" onMouseMove={this.depth.bind(this)} onMouseLeave={this.leavingDepth.bind(this)} onClick={this.crazyFunc.bind(this)}>
          <div className="card-image" />
          <div className="card-info">
            <p className="card-name">RECOMMENDED</p>
            <p className="card-desc">This bundle will provide you with everything you need while still keeping costs down as much as possible.</p>
            <p className="card-arrow">&rarr;</p>
          </div>
        </a>

        <a id="three-dimensional-card-3" onMouseMove={this.depth.bind(this)} onMouseLeave={this.leavingDepth.bind(this)} onClick={this.crazyFunc.bind(this)}>
          <div className="card-image" />
          <div className="card-info">
            <p className="card-name">ENTERPRISE</p>
            <p className="card-desc">If you've got money to blow, this bundle is for you. You'll get it all, no expense spared.</p>
            <p className="card-arrow">&rarr;</p>
          </div>

        </a>

        {/*<a id="three-dimensional-card-4" onMouseMove={this.depth.bind(this)} onMouseLeave={this.leavingDepth.bind(this)} onClick={this.crazyFunc.bind(this)}>*/}
          {/*<div className="card-image" />*/}
          {/*<div className="card-info">*/}
            {/*<p className="card-name">CUSTOM</p>*/}
            {/*<p className="card-desc">Mix and match different services to build a perfectly tailored bundle for your business.</p>*/}
            {/*<p className="card-arrow">&rarr;</p>*/}
          {/*</div>*/}

        {/*</a>*/}

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