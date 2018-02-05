import React, { Component } from 'react';
import {connect} from "react-redux";

import { getDescription, getServiceName, getPrice, getBundlePrice } from "./Functions";
import ItemList from "./ItemList";



class MobileDetail extends Component {
  hidePopupDesc() {
    let facehole = document.getElementById('popup-desc');
    facehole.style.display = "none";
  }
  render() {

    return (
      <div>

        <div className="full centered large-title">
          <p>bundle details</p>
        </div>

        <section id="bod" className="app-body">

          <div>
            <div id="pack-one" className="card service-pack shadowed overflow-hidden">

              <div className="sub-header">
                <p>{this.props.bundleName}</p>
              </div>

              <ItemList list_array={this.props.list_array} functionalityDepth={2} />

              <div className="sub-footer">
                {this.props.bundleTotal}
              </div>

            </div>
            <div id="popup-desc" className="overlay">
              <div className="card popup shadow">
                <div className="sub-header">
                  {this.props.service}
                </div>

                <div className="list-container">
                  {this.props.description}
                </div>

                <div className="sub-footer">
                  {this.props.price}
                </div>

                <div className="button-container">
                  <p onClick={this.hidePopupDesc.bind(this)} className="simple-button shadowed popup-button">close</p>
                </div>
              </div>
            </div>


          </div>

        </section>
      </div>
    );
  }
}

class DesktopDetail extends Component {
  render() {

    return (
      <div>

        <div className="full centered large-title">
          <p>{this.props.bundleName} bundle</p>
        </div>

        <section id="bod" className="app-body">

          <div className="flex-center-top">
            <div id="item-showcase" className="card service-pack shadowed overflow-hidden inline doublewide">

              <div className="sub-header">
                <p>services & deliverables</p>
              </div>

              <ItemList list_array={this.props.list_array} functionalityDepth={2}/>

              <div className="sub-footer">
                {/*<p className="sub-footer-price">$1800</p>*/}
              </div>

            </div>
            <div id="sidebar" className="inline">
              <div id="shopping-cart">
                <div id="pack-one" className="card service-pack shadowed overflow-hidden">

                  <div className="sub-header">
                    <p>shopping cart</p>
                  </div>

                  <ItemList list_array={this.props.list_array} functionalityDepth={0}/>

                  <div className="sub-footer">
                    {this.props.bundleTotal}
                  </div>

                </div>
              </div>
              <div id="description-box" className="">
                <div id="pack-one" className="card service-pack shadowed overflow-hidden inline">

                  <div className="sub-header">
                    <p>description</p>
                  </div>

                  <div className="list-container">
                    {this.props.description}
                  </div>

                  <div className="sub-footer">
                    {/*<p className="sub-footer-price">$1800</p>*/}
                  </div>

                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }
}

class Detail extends Component {
  render() {
    let description, service, price, bundleTotal, bundleName, list;
    if (this.props.awesome.chosen_bundle === 0) {
      console.log("chosen_bundle = ", this.props.awesome.chosen_bundle);
      bundleName = "startup";
      list = this.props.awesome.startup;
      description = getDescription(this.props.awesome, this.props.awesome.startup);
      service = getServiceName(this.props.awesome, this.props.awesome.startup);
      price = getPrice(this.props.awesome, this.props.awesome.startup);
      bundleTotal = getBundlePrice(this.props.awesome.startup);
    } else if (this.props.awesome.chosen_bundle === 1) {
      console.log("chosen_bundle = ", this.props.awesome.chosen_bundle);
      bundleName = "recommended";
      list = this.props.awesome.recommended;
      description = getDescription(this.props.awesome, this.props.awesome.recommended);
      service = getServiceName(this.props.awesome, this.props.awesome.recommended);
      price = getPrice(this.props.awesome, this.props.awesome.recommended);
      bundleTotal = getBundlePrice(this.props.awesome.recommended);
    } else if (this.props.awesome.chosen_bundle === 2) {
      console.log("chosen_bundle = ", this.props.awesome.chosen_bundle);
      bundleName = "enterprise";
      list = this.props.awesome.enterprise;
      description = getDescription(this.props.awesome, this.props.awesome.enterprise);
      service = getServiceName(this.props.awesome, this.props.awesome.enterprise);
      price = getPrice(this.props.awesome, this.props.awesome.enterprise);
      bundleTotal = getBundlePrice(this.props.awesome.enterprise);
    }


    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileDetail list_array={list} description={description} service={service} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/> : <DesktopDetail list_array={list} description={description} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/>;

    return (

      <section id="bod" className="app-body">

        {relevantLayout}

        <div className="button-container">
          <a className="simple-button shadowed checkout" href="">checkout</a>
        </div>

      </section>
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
        payload: thing.target.innerText
      });

    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);