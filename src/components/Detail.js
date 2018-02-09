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

        <div className="full centered large-title green-text">
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
      <div className="inner-content-container">

        <div className="full centered large-title green-text">
          <p>{this.props.bundleName} bundle</p>
        </div>

        <p id="required-popup">please pick at least one item to checkout</p>

        <section id="bod" className="app-body">

          <div className="flex-center-top">
            <div id="item-showcase" className="card service-pack shadowed overflow-hidden inline doublewide">

              {this.props.selectAllElement === null ? false : this.props.selectAllElement}

              <div className="sub-header">
                <p>services & deliverables</p>
              </div>

              <ItemList list_array={this.props.list_array} functionalityDepth={2} page={this.props.page} />

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

                  <ItemList list_array={this.props.list_array} functionalityDepth={0} page="other" />

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
  submitInformation(e) {
    // e.preventDefault();
    let myForm = document.querySelector('form');

    let companyName = myForm.elements["companyName"].value;
    let firstName = myForm.elements["firstName"].value;
    let lastName = myForm.elements["lastName"].value;
    let emailAddress = myForm.elements["emailAddress"].value;
    let phoneNumber = myForm.elements["phoneNumber"].value;
    let paymentMethod = myForm.elements["paymentMethod"].value;

    let data = {
      companyName: companyName,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod
    };
    let url = 'https://hooks.zapier.com/hooks/catch/2779749/z5cyhi/';

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data)
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));



    // history.push('/confirmation');

    // appendData([ ["Void", "Canvas", "Website"], ["Paul", "Shan", "Human"] ]);

    // let myForm = document.querySelector("form");
    // let firstName = myForm.elements["firstName"].value;
    // let lastName = myForm.elements["lastName"].value;
    // let companyName = myForm.elements["companyName"].value;
    // let emailAddress = myForm.elements["emailAddress"].value;
    // let phoneNumber = myForm.elements["phoneNumber"].value;
    // let paymentMethod = myForm.elements["paymentMethod"].value;
    // let key = 'AIzaSyBaGao4jb7-lPFLspVj-Lvt3Q0-Gj1Abpo';
    // let myUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1s4MibybITpXT9uVFpIF3okokjoveKRZil8dNF_m6MFE/values/A1:append?includeValuesInResponse=false&insertDataOption=INSERT_ROWS&responseDateTimeRenderOption=SERIAL_NUMBER&responseValueRenderOption=FORMATTED_VALUE&valueInputOption=USER_ENTERED&key=' + key;
    // fetch(myUrl).then(() => {
    //   console.log('success');
    // }).catch(() => {
    //   console.log('failure');
    // })

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

    if (this.props.awesome.chosen_bundle === 3 && allFalse === true) {
      required.style.display = 'block';
    } else {
      let checkout = document.getElementById('checkout-window');
      if (checkout.className.indexOf(' flex-centered') !== -1) {
        checkout.className = checkout.className.slice(0, checkout.className.indexOf(' flex-centered'));
        document.querySelector("form").reset();

      } else {
        checkout.className += " flex-centered";

      }
      console.log(checkout.className);
      if (required.style.display === 'block') {
        required.style.display = 'none';
      }
    }


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
      document.getElementById('select-all-button').checked = true;
    } else {
      for (let i = 0; i < newCustom.length; i++) {
        newCustom[i].include = false;
      }
      this.props.setInclusion(newCustom);
      document.getElementById('select-all-button').checked = false;
    }
  }

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
      selectAllElement = <input type="checkbox" id="select-all-button" className="select-all" onClick={this.selectAll.bind(this)}/>;
    }


    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileDetail list_array={list} page={page} selectAllElement={selectAllElement} description={description} service={service} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/> : <DesktopDetail list_array={list} page={page} selectAllElement={selectAllElement} description={description} price={price} bundleTotal={bundleTotal} bundleName={bundleName}/>;

    return (

      <section id="bod" className="app-body">

        {relevantLayout}

        <div className="button-container">
          <div className="simple-button shadowed checkout" onClick={this.toggleCheckout.bind(this)}>checkout</div>
        </div>

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
                <input className="user-input" type="text" name="companyName" placeholder="Company Name"/>
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
                <select className="user-input" name="paymentMethod" id="">
                  <option value="credit">Credit Card</option>
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div className="label-input-couplet">
                <Link to="/confirmation" type="submit" className="user-input user-input-button" onClick={this.submitInformation.bind(this)}>confirm order</Link>
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
        payload: thing.target.innerText
      });

    },
    setInclusion: (myList) => {
      dispatch({
        type: "SET_INCLUSION",
        payload: myList
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);