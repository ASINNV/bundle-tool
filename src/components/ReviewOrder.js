import React, { Component } from 'react';
import {connect} from "react-redux";
// import { Link } from "react-router-dom";
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

        let url = 'https://hooks.zapier.com/hooks/catch/2779749/z5cyhi/';
        let data;

        if (localStorage.getItem("user_data")) {
          data = JSON.parse(localStorage.getItem("user_data"));
        } else {
          data = this.props.awesome.user_data;
        }

        this.props.setOrderConfirmed(true);
        localStorage.setItem("order_confirmed", "true");

        fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data)
        }).then(res => res.json())
          .catch((error) => {
            // console.error('Error:', error)
          })
          .then((response) => {
            // console.log('Success:', response)
            this.props.pageHistory.push('/confirmation');
          })
          .catch((error) => {
            // console.error('Error:', error);
          });



      });
    };
    // let shape = this.props.isItMobile ? 'rect' : 'pill';

    return (
      <div className='shoppingCart vert-margin-20'>

        <ReactButton
          env={'sandbox'}
          style={{
            size: this.props.size,
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

    return (
      <div>

        {/*<div className="full centered large-title green-text"><p>Thank You!</p></div>*/}

        <section id="bod" className="app-body">

          <div className="flex-center-top">
            <div id="item-showcase" className="card shadowed overflow-hidden inline triplewide auto-height vert-margin-20">





              <div className="sub-header light-text">
                <p>review your order</p>
              </div>

              <div className="vert-margin-large hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">ORDER SUMMARY</p>
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
                  {this.props.paymentButton}
                </div>

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

          <div className="back-button" onClick={this.props.handleNavigation.bind(this)}>&larr; back</div>

          <div className="flex-center-top">
            <div id="item-showcase" className="card shadowed overflow-hidden inline triplewide auto-height bottom-margin-medium">





              <div className="sub-header light-text">
                <p>review your order</p>
              </div>

              <div className="vert-margin-30 hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">ORDER SUMMARY</p>
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
                  {this.props.paymentButton}
                </div>

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
  completeOrder(e) {

    let url = 'https://hooks.zapier.com/hooks/catch/2779749/z5cyhi/';
    let data;

    if (localStorage.getItem("user_data")) {
      data = JSON.parse(localStorage.getItem("user_data"));
      // console.log("user_data from localStorage ", JSON.parse(data));
    } else {
      data = this.props.awesome.user_data;
      // console.log("user_data from redux: ", data);
    }

    this.props.setOrderConfirmation(true);
    localStorage.setItem("order_confirmed", "true");

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data)
    }).then(res => res.json())
      .catch((error) => {
        // console.error('Error:', error)
      })
      .then((response) => {
        // console.log('Success:', response)
        this.props.history.push('/confirmation');
      })
      .catch((error) => {
        // console.error('Error:', error);
      });

  }
  handleNavigation(e) {
    console.log(e);
    console.log(this.props.history);
    this.props.history.goBack();
  }
  render() {
    let description, service, price, bundleTotal, bundleName, list, page, selectAllElement = null, paymentMethod, paymentButton;
    let storedVar = Number(localStorage.getItem("chosen_bundle"));

    if (storedVar) {

      if (storedVar === 1) {
        bundleName = "startup";
        list = this.props.awesome.startup;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (storedVar === 2) {
        bundleName = "recommended";
        list = this.props.awesome.recommended;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (storedVar === 3) {
        bundleName = "enterprise";
        list = this.props.awesome.enterprise;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
      } else if (storedVar === 4) {
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

    if (localStorage.getItem("payment_method")) {
      paymentMethod = localStorage.getItem("payment_method");
    } else {
      paymentMethod = this.props.awesome.paymentMethod;
    }

    const isMobile = window.innerWidth < 480;

    let size;
    if (isMobile) {
      size = 'medium';
    } else {
      size = 'large';
    }

    if (paymentMethod === "credit") {
      paymentButton = <MyCartComponent total={bundleTotal} size={size} setOrderConfirmed={this.props.setOrderConfirmation.bind(this)} pageHistory={this.props.history}/>;
    } else if (paymentMethod === "cash" || paymentMethod === "check") {
      paymentButton = <div onClick={this.completeOrder.bind(this)} className="simple-button blue-button top-margin-30"><p>place your order</p></div>;
    } else {
      paymentButton = <div className="light-text smallish-text spaced-line-height"><p className="block">You didn't select a payment method</p><p className="block">Go back, choose again, and pick a payment method next time.</p></div>;
    }


    const relevantLayout = isMobile ? <MobileReviewOrder isMobile={isMobile} list_array={list} page={page} selectAllElement={selectAllElement} paymentButton={paymentButton} paymentMethod={paymentMethod} description={description} service={service} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/> : <DesktopReviewOrder handleNavigation={this.handleNavigation.bind(this)} isMobile={isMobile} list_array={list} page={page} selectAllElement={selectAllElement} paymentButton={paymentButton} paymentMethod={paymentMethod} description={description} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/>;

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

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderConfirmation: (myBoolean) => {
      dispatch({
        type: "SET_ORDER_CONFIRMATION",
        payload: myBoolean
      });

    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);