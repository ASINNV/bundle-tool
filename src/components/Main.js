import React, { Component } from "react";

import DesktopCards from "./DesktopCards";
import MobileCards from "./MobileCards";
import {connect} from "react-redux";
import { Link } from "react-router-dom";

class Main extends Component {
  render() {


    // function createList(array) {
    //   var newArray = [];
    //   for (var i = 0; i < array.length; i++) {
    //     var possibleP;
    //     if (array[i].include === true) {
    //       possibleP = <p className="line-item-checkmark inline">&#10004;</p>;
    //     } else {
    //       possibleP = <p className="line-item-checkmark inline">X</p>;
    //     }
    //     newArray.push(<li key={i} className="flex">{possibleP}<span className="line-item-name inline">{array[i].name}</span></li>);
    //   }
    //   return newArray;
    // }
    // var startup = createList(this.props.awesome.startup);
    // var recommended = createList(this.props.awesome.recommended);
    // var enterprise = createList(this.props.awesome.enterprise);

    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileCards /> : <DesktopCards startup={this.props.awesome.startup} recommended={this.props.awesome.recommended} enterprise={this.props.awesome.enterprise}/>;


    return (
      <section id="bod" className="app-body">
        <div className="full centered large-title green-text">
          <p>choose bundle</p>
        </div>

        {relevantLayout}

        <div className="full centered or">
          <p>-or-</p>
        </div>
        <div className="button-container">
          <Link to="/custom" className="simple-button shadowed">custom bundle</Link>
        </div>
      </section>
    );
  }
}

// export default Main;

const mapStateToProps = (state) => {
  return {
    awesome: state.awesomeReducer,
    okay: state.okayReducer
  };
};

export default connect(mapStateToProps)(Main);

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setPackage: (thing) => {
//       dispatch({
//         type: "SET_PACKAGE_SELECTION",
//         payload: thing
//       });
//
//     }
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Main);