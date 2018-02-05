import React, { Component } from 'react';
import {connect} from "react-redux";
// import DesktopCards from './DesktopCards';
// import MobileCards from './MobileCards';
import { getDescription, getServiceName, getPrice, getBundlePrice } from "../components/Functions";
import ItemList from "../components/ItemList";



class MobileRecommendedDetail extends Component {
  hidePopupDesc() {
    let facehole = document.getElementById('popup-desc');
    facehole.style.display = "none";
    // facehole.setAttribute('style', 'display: none');
  }
  render() {

    return (
      <div>
        <section id="bod" className="app-body">

          <div>
            <div id="pack-one" className="card service-pack shadowed overflow-hidden">

              <div className="sub-header">
                <p>recommended</p>
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

class DesktopRecommendedDetail extends Component {
  render() {

    return (

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
    );
  }
}

class RecommendedDetail extends Component {
  render() {
    // var recommended_items = createList(this.props.awesome.recommended);
    var description = getDescription(this.props.awesome, this.props.awesome.recommended);
    var service = getServiceName(this.props.awesome, this.props.awesome.recommended);
    var price = getPrice(this.props.awesome, this.props.awesome.recommended);
    var bundleTotal = getBundlePrice(this.props.awesome.recommended);

    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileRecommendedDetail list_array={this.props.awesome.recommended} description={description} service={service} price={price} bundleTotal={bundleTotal}/> : <DesktopRecommendedDetail list_array={this.props.awesome.recommended} description={description} price={price} bundleTotal={bundleTotal}/>;

    return (

      <section id="bod" className="app-body">
        <div className="full centered large-title">
          <p>package details</p>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedDetail);