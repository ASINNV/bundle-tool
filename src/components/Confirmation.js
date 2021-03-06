import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from "react-router-dom";

import { getDescription, getServiceName, getPrice, getBundlePrice } from "./Functions";
import ItemList from "./ItemList";

class MobileConfirmation extends Component {
  render() {

    return (
      <div>

        {/*<div className="full centered large-title green-text"><p>Thank You!</p></div>*/}

        <section id="bod" className="app-body">

          <div className="flex-center-top">
            <div id="item-showcase" className="card shadowed overflow-hidden inline triplewide auto-height vert-margin-20">





              <div className="sub-header light-text">
                <p>order confirmation</p>
              </div>

              <div className="vert-margin-large hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">YOU PURCHASED</p>
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
    return (
      <div>

        <section id="bod" className="app-body relative">

          <Link to="/" className="back-button">&larr; home</Link>

          <div className="flex-center-top">
            <div id="item-showcase" className="card shadowed overflow-hidden inline triplewide auto-height bottom-margin-medium">





              <div className="sub-header light-text">
                <p>order confirmation</p>
              </div>

              <div className="vert-margin-30 hor-margin-20">
                <div className="full centered light-text medium-title vert-margin-20">
                  <p className="small-text dark-text">YOU PURCHASED</p>
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

              </div>






              <div className="sub-footer">
                <p className="sub-footer-price light-text">THANK YOU!</p>
              </div>

            </div>
          </div>
          <div className="centered block dark-text vert-margin-20">
            <p onClick={window.print} className="classic-link">PRINT THIS PAGE</p>
          </div>

        </section>
      </div>
    );
  }
}

class Confirmation extends Component {
  handleNavigation() {
    let bod = document.getElementById('bod');
    if (bod && document.getElementsByClassName.length > 0) {
      if (bod.className.indexOf(' hidden-view') !== -1) {
        bod.className = bod.className.slice(0, bod.className.indexOf(' hidden-view'));
      }
      if (bod.className.indexOf(' animate-in') !== -1) {
        bod.className = bod.className.slice(0, bod.className.indexOf(' animate-in'));
      }
      bod.className += ' animate-out';
    }
    setTimeout(() => {
      this.props.history.push('/');
    }, 150);

  }
  componentDidMount() {
    setTimeout(() => {
      let bod = document.getElementById('bod');
      if (bod && document.getElementsByClassName.length > 0) {
        bod.className = bod.className.slice(0, bod.className.indexOf(' hidden-view'));
        bod.className += ' animate-in';
      }
    }, 50);
  }
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
        paymentMethodDirections = <div className="light-text smallish-text spaced-line-height"><p className="light-text smallish-text spaced-line-height">Your order is now complete.</p></div>;
        break;
      case "cash":
        paymentMethodDirections = <div className="light-text smallish-text spaced-line-height vert-margin-20"><p className="light-text smallish-text spaced-line-height">Deliver payment to:</p><p className="block blue-text">And Moore Studios<br/>790 Port Road, Unit G<br/>Point Arena, CA 95468</p><p className="light-text smallish-text spaced-line-height">Please submit payment by {someFormattedDate}</p></div>;
        break;
      case "check":
        paymentMethodDirections = <div className="light-text smallish-text spaced-line-height vert-margin-20"><p className="light-text smallish-text spaced-line-height">Mail check to:</p><p className="block blue-text">And Moore Studios<br/>P.O. BOX 445<br/>Point Arena, CA 95468</p><p className="light-text smallish-text spaced-line-height">Please submit payment by {someFormattedDate}</p></div>;
        break;
      default:
        console.log('hit the default on the confirmation page');
    }

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

    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileConfirmation isMobile={isMobile} list_array={list} page={page} selectAllElement={selectAllElement} paymentMethodDirections={paymentMethodDirections} paymentMethod={paymentMethod} description={description} service={service} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/> : <DesktopConfirmation isMobile={isMobile} list_array={list} page={page} selectAllElement={selectAllElement} paymentMethodDirections={paymentMethodDirections} paymentMethod={paymentMethod} description={description} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/>;

    let confirmedOrder;

    if (localStorage.getItem("order_confirmed")) {
      confirmedOrder = localStorage.getItem("order_confirmed") ? relevantLayout : <div><h2 className="medium-title vert-margin-10 light-text">Oops!</h2><p className="light-text small-text">Looks like you haven't ordered anything.</p><a onClick={this.handleNavigation.bind(this)} className="simple-button green-button narrow-button vert-margin-30">Get Started</a></div>;
    } else {
      confirmedOrder = this.props.awesome.order_confirmed ? relevantLayout : <div><h2 className="medium-title vert-margin-10 light-text">Oops!</h2><p className="light-text small-text">Looks like you haven't ordered anything.</p><a onClick={this.handleNavigation.bind(this)} className="simple-button green-button narrow-button vert-margin-30">Get Started</a></div>;
    }

    return (

      <section id="bod" className="app-body hidden-view">

        {confirmedOrder}

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