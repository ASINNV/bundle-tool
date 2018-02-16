import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";

import { getDescription, getServiceName, getPrice, getBundlePrice } from "./Functions";
import ItemList from "./ItemList";

const ReactButton = paypal.Button.driver('react', {React, ReactDOM});

class MyCartComponent extends Component {
  render() {
    let totalString = String(this.props.total);

    let client = {
      sandbox:    'AXsTAGYfcX30a0HM5vpU2zGBjLA_IT2-PIr0tQHR0-cR6MFOpXuy-vrhEqxysOsdDafIaVRgeDx7L7Ir',
      production: 'AZ1NoBsqKYEyoE9ZKUBc3-DUGOe0BUDc0_DBmoSTAiqktxTYsz-vh24692U901fFC1alEHwMZ2PiZ50l'
    };

    let payment = (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: totalString, currency: 'USD' }
            }
          ]
        }
      });
    };

    let onAuthorize = (data, actions) => {
      return actions.payment.execute().then((payment) => {

        // The payment is complete!
        // You can now show a confirmation message to the customer
        this.props.pushableHistory.push('/confirmation');
      });
    };
    // let shape = this.props.isItMobile ? 'rect' : 'pill';
    let shape, size;
    if (this.props.isItMobile) {
      size = 'medium';
    } else {
      size = 'large';
    }
    return (
      <div className='shoppingCart vert-margin-20'>

        <ReactButton
          env={'sandbox'}
          style={{
            size: size,
            color: 'blue',
            shape: 'pill',
            label: 'checkout',
            tagline: false
          }}
          client={client}
          payment={payment}
          commit={true}
          onAuthorize={onAuthorize} />

      </div>
    );
  }
}

class MobileReviewOrder extends Component {
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
                <p>review your order</p>
              </div>

              <div className="vert-margin-large hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">YOU'RE ABOUT TO BUY</p>
                  <p className="green-text">{this.props.bundleName}</p>
                  <p className="small-text confirmation-niceties">PACKAGE</p>
                </div>

                <div className="confirmation-list-container vert-margin-30">
                  <ItemList list_array={this.props.list_array} functionalityDepth={0} page="confirmation" />
                </div>

                <div>
                  <p className="light-text centered small-title">TOTAL</p>
                  <h1 className="medium-title vert-margin-10 green-text">
                    <p className="sub-footer-price">${this.props.bundleTotal}</p>
                  </h1>
                  {this.props.paymentMethodDirections}
                </div>

                {this.props.paymentMethod === "credit" ? <MyCartComponent total={this.props.bundleTotal} isItMobile={this.props.isMobile} pushableHistory={this.props.pageHistory}/> : null}

              </div>


              <div className="sub-footer"></div>

            </div>

          </div>

        </section>

      </div>
    );
  }
}

class DesktopReviewOrder extends Component {
  render() {
    return (
      <div>

        <section id="bod" className="app-body relative">

          <Link to="/" className="back-button">&larr; home</Link>

          <div className="flex-center-top">
            <div id="item-showcase" className="card service-pack shadowed overflow-hidden inline triplewide auto-height bottom-margin-medium">





              <div className="sub-header light-text">
                <p>review your order</p>
              </div>

              <div className="vert-margin-30 hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">YOU'RE ABOUT TO BUY</p>
                  <p className="green-text">{this.props.bundleName}</p>
                  <p className="small-text confirmation-niceties">PACKAGE</p>
                </div>

                <div className="confirmation-list-container vert-margin-30">
                  <ItemList list_array={this.props.list_array} functionalityDepth={0} page="confirmation" />
                </div>

                <div>
                  <p className="light-text centered small-title">TOTAL</p>
                  <h1 className="medium-title vert-margin-10 green-text">
                    <p className="sub-footer-price">${this.props.bundleTotal}</p>
                  </h1>
                  {this.props.paymentMethodDirections}
                </div>

                {this.props.paymentMethod === "credit" ? <MyCartComponent total={this.props.bundleTotal} pushableHistory={this.props.pageHistory}/> : null}

              </div>






              <div className="sub-footer"></div>

            </div>
          </div>

        </section>
      </div>
    );
  }
}

class ReviewOrder extends Component {
  render() {
    let description, service, price, bundleTotal, bundleName, list, page, selectAllElement = null, paymentMethod;
    let storedVar = Number(localStorage.getItem("chosen_bundle"));
    if (localStorage.getItem("payment_method")) {
      paymentMethod = localStorage.getItem("payment_method");
    } else {
      paymentMethod = this.props.awesome.paymentMethod;
    }

    let paymentMethodDirections = <div className="light-text smallish-text spaced-line-height"><p className="block">You didn't select a payment method</p><p className="block">Go back, choose again, and pick a payment method next time.</p></div>;

    let date = new Date();
    let newdate = new Date(date);

    newdate.setDate(newdate.getDate() + 14);

    let dd = newdate.getDate();
    let mm = newdate.getMonth() + 1;
    let y = newdate.getFullYear();

    let someFormattedDate = mm + '/' + dd + '/' + y;


    switch (paymentMethod) {
      case "credit":
        paymentMethodDirections = <div className="light-text smallish-text spaced-line-height"><p className="block">Please click the button below to checkout</p></div>;
        break;
      case "cash":
        paymentMethodDirections = <div className="light-text smallish-text spaced-line-height"><p className="light-text smallish-text spaced-line-height">You chose to pay by {paymentMethod}</p><p className="block">Please come to our office to pay, the address is as follows:</p><p className="block">Arena Cove, Unit G</p><p className="light-text smallish-text spaced-line-height">Please submit payment by {someFormattedDate}</p></div>;
        break;
      case "check":
        paymentMethodDirections = <div className="light-text smallish-text spaced-line-height"><p className="light-text smallish-text spaced-line-height">You chose to pay by {paymentMethod}</p><p className="block">Please mail your check to the following address:</p><p className="block">P.O. BOX 444, Point Arena, CA 95468</p><p className="light-text smallish-text spaced-line-height">Please submit payment by {someFormattedDate}</p></div>;
        break;
      default:
        console.log('hit the default on the confirmation page');
    }

    if (storedVar) {

      if (storedVar === 1) {
        // console.log(localStorage.getItem("chosen_bundle"));
        // console.log(storedVar);
        bundleName = "startup";
        list = this.props.awesome.startup;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (storedVar === 2) {
        // console.log(localStorage.getItem("chosen_bundle"));
        // console.log(storedVar);
        bundleName = "recommended";
        list = this.props.awesome.recommended;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
        console.log(bundleTotal);
      } else if (storedVar === 3) {
        // console.log(localStorage.getItem("chosen_bundle"));
        // console.log(storedVar);
        bundleName = "enterprise";
        list = this.props.awesome.enterprise;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (storedVar === 4) {
        // console.log(localStorage.getItem("chosen_bundle"));
        // console.log(storedVar);
        bundleName = "custom";

        if (localStorage.getItem("custom_list")) {
          list = JSON.parse(localStorage.getItem("custom_list"));
        } else {
          list = this.props.awesome.custom;
        }

        page = "custom";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
        selectAllElement = <input type="checkbox" id="select-all-button" className="select-all" />;
      }
    } else {
      if (this.props.awesome.chosen_bundle === 0) {
        bundleName = "startup";
        list = this.props.awesome.startup;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (this.props.awesome.chosen_bundle === 1) {
        bundleName = "recommended";
        list = this.props.awesome.recommended;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (this.props.awesome.chosen_bundle === 2) {
        bundleName = "enterprise";
        list = this.props.awesome.enterprise;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (this.props.awesome.chosen_bundle === 3) {
        bundleName = "custom";

        if (localStorage.getItem("custom_list")) {
          list = JSON.parse(localStorage.getItem("custom_list"));
        } else {
          list = this.props.awesome.custom;
        }

        page = "custom";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
        selectAllElement = <input type="checkbox" id="select-all-button" className="select-all" />;
      }
    }

    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileReviewOrder pageHistory={this.props.history} isMobile={isMobile} list_array={list} page={page} selectAllElement={selectAllElement} paymentMethodDirections={paymentMethodDirections} paymentMethod={paymentMethod} description={description} service={service} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/> : <DesktopReviewOrder pageHistory={this.props.history} isMobile={isMobile} list_array={list} page={page} selectAllElement={selectAllElement} paymentMethodDirections={paymentMethodDirections} paymentMethod={paymentMethod} description={description} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/>;

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

export default connect(mapStateToProps)(ReviewOrder);