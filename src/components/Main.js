import React, { Component } from "react";

import DesktopCards from "./DesktopCards";
import MobileCards from "./MobileCards";
import {connect} from "react-redux";
// import { Link } from "react-router-dom";

class Main extends Component {
  loadCustomPage(e) {
    const isMobile = window.innerWidth < 480;

    let customPageNumber = 3;
    this.props.setPackage(customPageNumber);
    localStorage.setItem('chosen_bundle', customPageNumber + 1);

    if (!isMobile) {

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
        this.props.history.push('/custom');
      }, 150);
    } else {
      this.props.history.push('/custom');
    }

  }
  pageAnimation() {
    let myPath = '/';
    if (localStorage.getItem("chosen_bundle")) {
      switch (localStorage.getItem("chosen_bundle")) {
        case "1":
          myPath = '/startup';
          break;
        case "2":
          myPath = '/recommended';
          break;
        case "3":
          myPath = '/enterprise';
          break;
        default:
          console.log("not in localStorage");
      }
    } else {
      switch (this.props.awesome.chosen_bundle) {
        case 0:
          myPath = '/startup';
          break;
        case 1:
          myPath = '/recommended';
          break;
        case 2:
          myPath = '/enterprise';
          break;
        default:
          console.log("not in awesome reducer");
      }
    }

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
      this.props.history.push(myPath);
    }, 200);

  }
  componentDidMount() {
    setTimeout(() => {
      let bod = document.getElementById('bod');
      if (bod && document.getElementsByClassName.length > 0) {
        bod.className = bod.className.slice(0, bod.className.indexOf(' hidden-view'));
        bod.className += ' animate-in';
      }
    }, 50);
    localStorage.clear(); // remove all locally stored key/value pairs when visiting root directory
  }

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
    const relevantLayout = isMobile ? <MobileCards /> : <DesktopCards pageAnimation={this.pageAnimation.bind(this)} startup={this.props.awesome.startup} recommended={this.props.awesome.recommended} enterprise={this.props.awesome.enterprise}/>;


    return (
      <section id="bod" className="app-body hidden-view">
        <div className="full centered vert-margin-large">
          <p className="large-title green-text">Choose a Bundle</p>
          <p className="large-subtitle gray-text">or Create Your Own</p>
        </div>

        {relevantLayout}

        <div className="full centered or">
          <p>-or-</p>
        </div>
        <div className="button-container">
          <a className="simple-button green-button narrow-button" onClick={this.loadCustomPage.bind(this)}>
            <p className="">Create a Bundle</p>
          </a>
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

// export default connect(mapStateToProps)(Main);

const mapDispatchToProps = (dispatch) => {
  return {
    setPackage: (thing) => {
      dispatch({
        type: "SET_PACKAGE_SELECTION",
        payload: thing
      });

    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);