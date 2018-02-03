import React, { Component } from 'react';
import {connect} from "react-redux";
// import DesktopCards from './DesktopCards';
// import MobileCards from './MobileCards';
import {createList} from "./Functions";



class Detail extends Component {
  render() {
    var startup = createList(this.props.awesome.startup);

    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileDetailZero startup={startup} recommendation={recommendation} enterprise={enterprise}/> : <DesktopDetail startup={startup} recommendation={recommendation} enterprise={enterprise}/>;

    return (
      <section id="bod" className="app-body">
        <div className="full centered large-title">
          <p>package details</p>
        </div>

        <div>
          <div id="pack-one" className="card service-pack shadowed overflow-hidden">

            <div className="sub-header">
              <p>startup</p>
            </div>

            <div className="list-container">
              <ul className="line-item-container small-text">
                {startup}
              </ul>
            </div>

            <div className="sub-footer">
              <p className="sub-footer-price">$1800</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);