import React, { Component } from 'react';
import {connect} from "react-redux";
// import DesktopCards from './DesktopCards';
// import MobileCards from './MobileCards';
// import { getDescription } from "./Functions";
import ItemList from "./ItemList";



class EnterpriseDetail extends Component {
  render() {
    // var enterprise = createList(this.props.awesome.enterprise);

    // const isMobile = window.innerWidth < 480;
    // const relevantLayout = isMobile ? <MobileEnterprise startup={startup} recommendation={recommendation} enterprise={enterprise}/> : <DesktopEnterprise startup={startup} recommendation={recommendation} enterprise={enterprise}/>;

    return (
      <section id="bod" className="app-body">
        <div className="full centered large-title">
          <p>package details</p>
        </div>

        <div>
          <div id="pack-three" className="card service-pack shadowed overflow-hidden">

            <div className="sub-header">
              <p>enterprise</p>
            </div>

            <ItemList list_array={this.props.awesome.enterprise} functionalityDepth={2}/>

            <div className="sub-footer">
              <p className="sub-footer-price">$5000</p>
            </div>

          </div>
        </div>

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
    setChoice: (thing) => {
      thing.preventDefault();
      dispatch({
        type: "SET_SELECTION",
        payload: thing.target.innerText
      });

    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterpriseDetail);