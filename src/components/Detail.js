import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// const fetch = require('node-fetch');
// import fetch from "node-fetch";

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

        <div className="full centered large-title green-text vert-margin-large">
          <p>bundle details</p>
        </div>

        <p id="required-popup">please pick at least one item to checkout</p>

        <section id="bod" className="app-body">

          <div>
            <div id="pack-one" className="card service-pack shadowed overflow-hidden">
              {this.props.selectAllElement === null ? false : this.props.selectAllElement}

              <div className="sub-header">
                <p>{this.props.bundleName}</p>
              </div>

              <ItemList list_array={this.props.list_array} functionalityDepth={2} page={this.props.page} />

              <div className="sub-footer">
                <p className="sub-footer-price">${this.props.bundleTotal}</p>
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
  showTooltip(e) {

    let helper = e.target.tagName;
    let target = e.target;

    while (helper !== "DIV") {
      helper = e.target.parentNode.tagName;
      target = e.target.parentNode;
    }
    // console.log(helper, target);

    let header = document.getElementById(target.id);
    let element = document.createElement('p');

    element.id = "explainer";
    if (target.id === "services-header") {
      element.innerText = "All services & deliverables offered by And Moore Studios. Those with a green check mark are included in your bundle.";
    } else if (target.id === "cart-header") {
      element.innerText = "A list of all services & deliverables to be included at checkout. A total price can be found at the bottom of this window.";
    } else if (target.id === "description-header") {
      element.innerText = "Please click on a service in the window on the left to see its description here.";
    }

    header.appendChild(element);

    setTimeout(() => {
      element.style.opacity = 1;
    }, 150);

  }
  hideTooltip(e) {

    let helper = e.target.tagName;
    let target = e.target;

    while (helper !== "DIV") {
      helper = e.target.parentNode.tagName;
      target = e.target.parentNode;
    }
    // console.log(helper, target);

    let header = document.getElementById(target.id);

    if (document.getElementById('explainer')) {
      let element = document.getElementById('explainer');
      // element.style.opacity = 0;
      header.removeChild(element);

    }

  }
  render() {
    return (
      <div className="inner-content-container">

        <div className={this.props.detailClass}>
          <p className="small-text white-text">YOU'RE LOOKING AT THE</p>
          <p className="large-title">{this.props.bundleName}</p>
          <p className="confirmation-niceties white-text">PACKAGE</p>

        </div>

        <section id="bod" className="app-body">

          <div className="flex-center-top">
            <div id="item-showcase" className="card service-pack shadowed overflow-hidden inline doublewide responsive-card">

              {this.props.selectAllElement === null ? false : this.props.selectAllElement}

              <div id="services-header" className="sub-header" onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>
                <p>services & deliverables</p>
              </div>

              <ItemList list_array={this.props.list_array} functionalityDepth={2} page={this.props.page} />

              <div className="sub-footer">
                {/*<p className="sub-footer-price">$1800</p>*/}
              </div>

            </div>
            <div id="sidebar" className="inline">
              <div id="shopping-cart">
                <div id="pack-one" className="card service-pack shadowed overflow-hidden responsive-card">

                  <div id="cart-header" className="sub-header" onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>
                    <p>shopping cart</p>
                  </div>

                  <ItemList list_array={this.props.list_array} functionalityDepth={0} page="other" />

                  <div className="sub-footer">
                    <p className="sub-footer-price">${this.props.bundleTotal}</p>
                  </div>

                </div>
              </div>
              <div id="description-box" className="">
                <div id="pack-one" className="card service-pack shadowed overflow-hidden inline responsive-card">

                  <div id="description-header" className="sub-header" onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>
                    <p>description</p>
                  </div>

                  <div className="list-container responsive-container">
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
  submitInformation(e) {
    e.preventDefault();
    // if (localStorage.getItem("chosen_bundle")) {
    //   this.props.setPackage(Number(localStorage.getItem("chosen_bundle")));
    // }

    let myForm = document.querySelector('form');

    // if (myForm.elements["companyName"].value !== "") {
    //   console.log(myForm.elements["companyName"].value);
    // } else {
    //   console.log("NO COMPANY NAME");
    // }

    let companyName = myForm.elements["companyName"].value;
    let firstName = myForm.elements["firstName"].value;
    let lastName = myForm.elements["lastName"].value;
    let emailAddress = myForm.elements["emailAddress"].value;
    let phoneNumber = myForm.elements["phoneNumber"].value;
    let paymentMethod = myForm.elements["paymentMethod"].value;
    let bundlePriceData;
    let bundle = "didn't work";
    let services = [];

    localStorage.setItem("payment_method", paymentMethod);
    this.props.setPaymentMethod(paymentMethod);


    let screen = "data not found";
    const isMobile = window.innerWidth < 480;

    if (isMobile) {
      screen = "mobile";
    } else {
      screen = "desktop";
    }



    let data = {
      companyName: companyName,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod,
      browserAndOS: navigator.userAgent,
      screenSize: screen
    };


    switch (this.props.awesome.chosen_bundle) {
      case 0:
        bundle = 'startup';
        services = this.props.awesome.startup;
        break;
      case 1:
        bundle = 'recommended';
        services = this.props.awesome.recommended;
        break;
      case 2:
        bundle = 'enterprise';
        services = this.props.awesome.enterprise;
        break;
      case 3:
        bundle = 'custom';
        services = this.props.awesome.custom;
        break;
      default:
        bundle = 'recommended';
        services = this.props.awesome.recommended;
        // console.log("The default case was executed: line 197 in Detail.js")
    }

    bundlePriceData = getBundlePrice(this.props.awesome[bundle]);
    data.bundlePriceData = bundlePriceData;


    // localStorage.setItem("bundle_total", JSON.stringify();


    data.chosenBundle = bundle; // set the chosen bundle after switch statement handles routing

    services.forEach(function(service) {
      if (service.include === true) {               // if service is included in purchase
        data[service.name.split(' ')[0]] = 'yes';   // record it as a 'yes' in Google Sheets
      } else {
        data[service.name.split(' ')[0]] = 'no';    // else, record it as a 'no'
      }
    });


    localStorage.setItem("user_data", JSON.stringify(data));
    // this.props.history.push('/review-order');

    let count = 0;

    for (let i = 0; i < myForm.elements.length; i++) {
      if (myForm.elements[i].value === "pick" || myForm.elements[i].value === "") {
        // console.log('please fill in the payment method field.');
        myForm.elements[i].className += " required-field";
        count += 1;
      } else if (myForm.elements[i].className.indexOf(' required-field') !== -1) {
          myForm.elements[i].className = myForm.elements[i].className.slice(0, myForm.elements[i].className.indexOf(' required-field'));
      }
    }

    if (count === 0) {
      this.props.setUserData(data);
      this.props.history.push('/review-order');

    }

    // let count = 0;
    //
    // for (let i = 0; i < myForm.elements.length; i++) {
    //   if (myForm.elements[i].value === "pick" || myForm.elements[i].value === "") {
    //     // console.log('please fill in the payment method field.');
    //     myForm.elements[i].className += " required-field";
    //     count += 1;
    //   } else if (myForm.elements[i].className.indexOf(' required-field') !== -1) {
    //       myForm.elements[i].className = myForm.elements[i].className.slice(0, myForm.elements[i].className.indexOf(' required-field'));
    //   }
    // }
    //
    // if (count === 0) {
    //   fetch(url, {
    //     method: 'POST', // or 'PUT'
    //     body: JSON.stringify(data)
    //   }).then(res => res.json())
    //     .catch((error) => {
    //       // console.error('Error:', error)
    //     })
    //     .then((response) => {
    //       // console.log('Success:', response)
    //       this.props.history.push('/review-order');
    //     })
    //     .catch((error) => {
    //       // console.error('Error:', error);
    //     });
    // }



  }
  toggleCheckout() {
    let custom = this.props.awesome.custom;
    let allFalse = true;
    let required = document.getElementById('required-popup');

    for (let i = 0; i < custom.length; i++) {
      if (custom[i].include === true) {
        allFalse = false;
      }
    }

    if ((this.props.awesome.chosen_bundle === 3 && allFalse === true) || (Number(localStorage.getItem("chosen_bundle")) === 4 && allFalse === true)) {
      required.style.display = 'block';
    } else {
      let checkout = document.getElementById('checkout-window');
      if (checkout.className.indexOf(' flex-centered') !== -1) {
        checkout.className = checkout.className.slice(0, checkout.className.indexOf(' flex-centered'));
        document.querySelector("form").reset();

      } else {
        checkout.className += " flex-centered";

      }
      // console.log(checkout.className);
      if (required.style.display === 'block') {
        required.style.display = 'none';
      }
    }

    this.refs.companyNameInput.focus(); // automatically focus on the first input field of the form for user convenience


  }
  selectAll() {
    let needSelecting;
    let newCustom = this.props.awesome.custom;

    for (let i = 0; i < this.props.awesome.custom.length; i++) {
      if (this.props.awesome.custom[i].include === false) {
        needSelecting = true;
      }
    }
    if (needSelecting === true) {
      for (let i = 0; i < newCustom.length; i++) {
        newCustom[i].include = true;
      }
      this.props.setInclusion(newCustom);
      localStorage.setItem("custom_list", JSON.stringify(newCustom));
      document.getElementById('select-all-button').checked = true;
    } else {
      for (let i = 0; i < newCustom.length; i++) {
        newCustom[i].include = false;
      }
      this.props.setInclusion(newCustom);
      document.getElementById('select-all-button').checked = false;
    }
  }
  componentDidMount() {
    if (this.props.awesome.chosen_bundle === 3) {
      let needSelecting = false;

      for (let i = 0; i < this.props.awesome.custom.length; i++) {
        if (this.props.awesome.custom[i].include === false) {
          needSelecting = true;
        }
      }
      if (needSelecting === false) {
        document.getElementById('select-all-button').checked = true;
      }
    }

  }
  render() {
    let description, service, price, bundleTotal, bundleName, list, page, selectAllElement = null;
    let detailClassName = "centered bottom-margin-medium recommended-image"
    let storedVar = Number(localStorage.getItem("chosen_bundle"));




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
        detailClassName = "centered bottom-margin-medium startup-image";

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
        detailClassName = "centered bottom-margin-medium recommended-image";

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
        detailClassName = "centered bottom-margin-medium enterprise-image";
      } else if (storedVar === 4) {
        // console.log(localStorage.getItem("chosen_bundle"));
        // console.log(storedVar);
        bundleName = "custom";
        list = this.props.awesome.custom;
        page = "custom";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
        detailClassName = "centered bottom-margin-medium custom-image";

        selectAllElement = <input type="checkbox" id="select-all-button" className="select-all" onClick={this.selectAll.bind(this)}/>;
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
        detailClassName = "centered bottom-margin-medium startup-image";
      } else if (this.props.awesome.chosen_bundle === 1) {
        bundleName = "recommended";
        list = this.props.awesome.recommended;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
        detailClassName = "centered bottom-margin-medium recommended-image";
      } else if (this.props.awesome.chosen_bundle === 2) {
        bundleName = "enterprise";
        list = this.props.awesome.enterprise;
        page = "detail";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
        detailClassName = "centered bottom-margin-medium enterprise-image";
      } else if (this.props.awesome.chosen_bundle === 3) {
        bundleName = "custom";
        list = this.props.awesome.custom;
        page = "custom";
        description = getDescription(this.props.awesome, list);
        service = getServiceName(this.props.awesome, list);
        price = getPrice(this.props.awesome, list);
        bundleTotal = getBundlePrice(list);
        detailClassName = "centered bottom-margin-medium custom-image";
        selectAllElement = <input type="checkbox" id="select-all-button" className="select-all" onClick={this.selectAll.bind(this)}/>;
      }
    }


    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileDetail list_array={list} page={page} selectAllElement={selectAllElement} description={description} service={service} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/> : <DesktopDetail list_array={list} detailClass={detailClassName} page={page} selectAllElement={selectAllElement} description={description} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/>;

    return (

      <section id="bod" className="app-body relative">

        <Link to="/" className="back-button">&larr; back</Link>

        {relevantLayout}

        <div className="button-container">
          <div className="simple-button shadowed checkout" onClick={this.toggleCheckout.bind(this)}>confirm bundle</div>
        </div>

        <p id="required-popup">please pick at least one item to checkout</p>

        <div id="checkout-window" className="overlay">
          <div className="form-card shadow">
            <span className="corner-x" onClick={this.toggleCheckout.bind(this)}>&#10005;</span>
            <div className="full centered checkout-title green-text">
              <p>client info</p>
            </div>

            <form action="" className="user-form">
              <p className="user-input-label left">personal info</p>
              <div className="label-input-couplet">
                {/*<label className="user-input-label" htmlFor="companyName">Company Name</label>*/}
                <input className="user-input" type="text" name="companyName" placeholder="Company Name" ref="companyNameInput"/>
              </div>
              <div className="label-input-couplet">
                {/*<label className="user-input-label" htmlFor="firstName">First Name</label>*/}
                <input className="user-input" type="text" name="firstName" placeholder="First Name"/>
              </div>
              <div className="label-input-couplet">
                {/*<label className="user-input-label" htmlFor="lastName">Last Name</label>*/}
                <input className="user-input" type="text" name="lastName" placeholder="Last Name"/>
              </div>
              <div className="label-input-couplet">
                {/*<label className="user-input-label" htmlFor="emailAddress">Email Address</label>*/}
                <input className="user-input" type="email" name="emailAddress" placeholder="Email Address"/>
              </div>
              <div className="label-input-couplet">
                {/*<label className="user-input-label" htmlFor="phoneNumber">Phone Number</label>*/}
                <input className="user-input" type="text" name="phoneNumber" placeholder="Phone Number"/>
              </div>
              <p className="user-input-label left">payment method</p>
              <div className="label-input-couplet">
                {/*<label className="user-input-label" htmlFor="paymentMethod">Payment Method</label>*/}
                <select className="user-input" name="paymentMethod" id="" defaultValue="pick">
                  <option value="pick">Select a method…</option>
                  <option value="credit">Credit Card</option>
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div className="label-input-couplet">
                <p className="user-input user-input-button" onClick={this.submitInformation.bind(this)}>review your order</p>
              </div>
            </form>

          </div>
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
        payload: thing
      });

    },
    setInclusion: (myList) => {
      dispatch({
        type: "SET_INCLUSION",
        payload: myList
      });
    },
    setPaymentMethod: (paymentMethod) => {
      dispatch({
        type: "SET_PAYMENT_METHOD",
        payload: paymentMethod
      });
    },
    setUserData: (userDataObj) => {
      dispatch({
        type: "SET_USER_DATA",
        payload: userDataObj
      });
    },
    setBundleTotal: (myNumber) => {
      dispatch({
        type: "SET_BUNDLE_TOTAL",
        payload: myNumber
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);