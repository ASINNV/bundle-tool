import React, { Component } from 'react';
import {connect} from "react-redux";

import { getDescription, getServiceName, getPrice, getBundlePrice } from "./Functions";
import ItemList from "./ItemList";



class MobileConfirmation extends Component {
  render() {


    let date = new Date();
    let newdate = new Date(date);

    newdate.setDate(newdate.getDate() + 14);

    let dd = newdate.getDate();
    let mm = newdate.getMonth() + 1;
    let y = newdate.getFullYear();

    let someFormattedDate = mm + '/' + dd + '/' + y;

    return (
      <div>

        {/*<div className="full centered large-title green-text"><p>Thank You!</p></div>*/}

        <section id="bod" className="app-body">

          <div className="flex-center-top">
            <div id="item-showcase" className="card service-pack shadowed overflow-hidden inline triplewide auto-height vert-margin-20">





              <div className="sub-header light-text">
                <p>order confirmation</p>
              </div>

              <div className="vert-margin-large hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">YOU BOUGHT THE</p>
                  <p className="green-text">{this.props.bundleName}</p>
                  <p className="small-text confirmation-niceties">PACKAGE</p>
                </div>

                <div className="confirmation-list-container vert-margin-30">
                  <ItemList list_array={this.props.list_array} functionalityDepth={0} page="confirmation" />
                </div>

                <div>
                  <p className="light-text centered small-title">TOTAL</p>
                  <h1 className="medium-title vert-margin-10 green-text">{this.props.bundleTotal}</h1>
                  <p className="light-text smallish-text spaced-line-height">Please submit payment by {someFormattedDate}</p>
                </div>

              </div>






              <div className="sub-footer">
                <p className="sub-footer-price light-text">THANK YOU!</p>
              </div>

            </div>
          </div>

        </section>
      </div>
    );
  }
}

class DesktopConfirmation extends Component {
  render() {



    let date = new Date();
    let newdate = new Date(date);

    newdate.setDate(newdate.getDate() + 14);

    let dd = newdate.getDate();
    let mm = newdate.getMonth() + 1;
    let y = newdate.getFullYear();

    let someFormattedDate = mm + '/' + dd + '/' + y;

    return (
      <div>

        <section id="bod" className="app-body">

          <div className="flex-center-top">
            <div id="item-showcase" className="card service-pack shadowed overflow-hidden inline triplewide auto-height vert-margin-20">





              <div className="sub-header light-text">
                <p>order confirmation</p>
              </div>

              <div className="vert-margin-30 hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">YOU BOUGHT THE</p>
                  <p className="green-text">{this.props.bundleName}</p>
                  <p className="small-text confirmation-niceties">PACKAGE</p>
                </div>

                <div className="confirmation-list-container vert-margin-30">
                  <ItemList list_array={this.props.list_array} functionalityDepth={0} page="confirmation" />
                </div>

                <div>
                  <p className="light-text centered small-title">TOTAL</p>
                  <h1 className="medium-title vert-margin-10 green-text">{this.props.bundleTotal}</h1>
                  <p className="light-text smallish-text spaced-line-height">Please submit payment by {someFormattedDate}</p>
                </div>

              </div>






              <div className="sub-footer">
                <p className="sub-footer-price light-text">THANK YOU!</p>
              </div>

            </div>
          </div>

        </section>
      </div>
    );
  }
}

class Confirmation extends Component {
  render() {
    let description, service, price, bundleTotal, bundleName, list, page, selectAllElement = null;
    if (this.props.awesome.chosen_bundle === 0) {
      bundleName = "startup";
      list = this.props.awesome.startup;
      page = "detail";
      description = getDescription(this.props.awesome, this.props.awesome.startup);
      service = getServiceName(this.props.awesome, this.props.awesome.startup);
      price = getPrice(this.props.awesome, this.props.awesome.startup);
      bundleTotal = getBundlePrice(this.props.awesome.startup);
    } else if (this.props.awesome.chosen_bundle === 1) {
      bundleName = "recommended";
      list = this.props.awesome.recommended;
      page = "detail";
      description = getDescription(this.props.awesome, this.props.awesome.recommended);
      service = getServiceName(this.props.awesome, this.props.awesome.recommended);
      price = getPrice(this.props.awesome, this.props.awesome.recommended);
      bundleTotal = getBundlePrice(this.props.awesome.recommended);
    } else if (this.props.awesome.chosen_bundle === 2) {
      bundleName = "enterprise";
      list = this.props.awesome.enterprise;
      page = "detail";
      description = getDescription(this.props.awesome, this.props.awesome.enterprise);
      service = getServiceName(this.props.awesome, this.props.awesome.enterprise);
      price = getPrice(this.props.awesome, this.props.awesome.enterprise);
      bundleTotal = getBundlePrice(this.props.awesome.enterprise);
    } else if (this.props.awesome.chosen_bundle === 3) {
      bundleName = "custom";
      list = this.props.awesome.custom;
      page = "custom";
      description = getDescription(this.props.awesome, this.props.awesome.custom);
      service = getServiceName(this.props.awesome, this.props.awesome.custom);
      price = getPrice(this.props.awesome, this.props.awesome.custom);
      bundleTotal = getBundlePrice(this.props.awesome.custom);
      selectAllElement = <input type="checkbox" id="select-all-button" className="select-all" />;
    }


    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileConfirmation list_array={list} page={page} selectAllElement={selectAllElement} description={description} service={service} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/> : <DesktopConfirmation list_array={list} page={page} selectAllElement={selectAllElement} description={description} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/>;

    return (

      <section id="bod" className="app-body">

        {relevantLayout}

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

export default connect(mapStateToProps)(Confirmation);