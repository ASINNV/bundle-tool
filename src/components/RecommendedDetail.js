import React, { Component } from 'react';
import {connect} from "react-redux";
// import DesktopCards from './DesktopCards';
// import MobileCards from './MobileCards';
// import { getDescription } from "./Functions";
import ItemList from "./ItemList";



class RecommendedDetail extends Component {
  render() {
    // var recommendation = createList(this.props.awesome.recommendation);

    // const isMobile = window.innerWidth < 480;
    // const relevantLayout = isMobile ? <MobileRecommendation startup={startup} recommendation={recommendation} enterprise={enterprise}/> : <DesktopRecommendation startup={startup} recommendation={recommendation} enterprise={enterprise}/>;

    return (
      <section id="bod" className="app-body">
        <div className="full centered large-title">
          <p>package details</p>
        </div>

        <div>
          <div id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden">

            <div className="sub-header recommended-header">
              <p>recommended</p>
            </div>

            <ItemList list_array={this.props.awesome.recommendation} functionalityDepth={2}/>

            <div className="sub-footer recommended-footer">
              <p className="sub-footer-price">$3000</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedDetail);