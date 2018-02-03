import React, { Component } from 'react';
import {connect} from "react-redux";
// import DesktopCards from './DesktopCards';
// import MobileCards from './MobileCards';
import { getDescription } from "./Functions";
import ItemList from "./ItemList";

// class MobileStartup extends Component {
//   render() {
//     return (
//       <section id="bod" className="app-body">
//         <div className="full centered large-title">
//           <p>package details</p>
//         </div>
//
//         <div>
//           <div id="pack-one" className="card service-pack shadowed overflow-hidden">
//
//             <div className="sub-header">
//               <p>startup_items</p>
//             </div>
//
//             <div className="list-container">
//               <ul className="line-item-container small-text">
//                 {startup_items}
//               </ul>
//             </div>
//
//             <div className="sub-footer">
//               <p className="sub-footer-price">$1800</p>
//             </div>
//
//           </div>
//         </div>
//         <div className="button-container">
//           <a className="simple-button shadowed checkout" href="">checkout</a>
//         </div>
//       </section>
//     );
//   }
// }

// class DesktopStartup extends Component {
//   render() {
//     return (
//       <div>
//
//       </div>
//     );
//   }
// }





class MobileStartupDetail extends Component {
  hidePopupDesc() {
    let facehole = document.getElementById('popup-desc');
    facehole.setAttribute('style', 'display: none');
  }
  render() {

    return (
      <div>
        <section id="bod" className="app-body">

          <div>
            <div id="pack-one" className="card service-pack shadowed overflow-hidden">

              <div className="sub-header">
                <p>startup</p>
              </div>

              <ItemList list_array={this.props.list_array} functionalityDepth={2} />

              <div className="sub-footer">
                <p className="sub-footer-price">$1800</p>
              </div>

            </div>
            <div id="popup-desc" className="overlay">
              <div className="card popup shadow">
                <div className="sub-header">
                  <p>description</p>
                </div>

                <div className="list-container">
                  {this.props.description}
                </div>

                <div className="sub-footer">
                  <p className="sub-footer-price">$350</p>
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

class DesktopStartupDetail extends Component {
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
                  <p className="sub-footer-price package-price">$1800</p>
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

class StartupDetail extends Component {
  render() {
    // var startup_items = createList(this.props.awesome.startup);
    var description = getDescription(this.props.awesome);

    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileStartupDetail list_array={this.props.awesome.startup} description={description}/> : <DesktopStartupDetail list_array={this.props.awesome.startup} description={description}/>;

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

export default connect(mapStateToProps, mapDispatchToProps)(StartupDetail);