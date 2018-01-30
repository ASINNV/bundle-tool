import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import ReactSwipe from 'react-swipe';

class MobileLayout extends Component {
  render() {
    return (
      <ReactSwipe className="carousel" swipeOptions={{continuous: true, startSlide: 1}}>
        <div>
          <div id="pack-one" className="card service-pack shadowed overflow-hidden">

            <div className="sub-header">
              <p>startup</p>
            </div>

            <div className="list-container">
              <ul className="line-item-container small-text">
                {this.props.startup}
              </ul>
            </div>

            <div className="sub-footer">
              <p className="sub-footer-price">$1800</p>
            </div>

          </div>
        </div>
        <div>
          <div id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden">

            <div className="sub-header recommended-header">
              <p>recommended</p>
            </div>

            <div className="list-container">
              <ul className="line-item-container small-text">
                {this.props.recommendation}
              </ul>
            </div>

            <div className="sub-footer recommended-footer">
              <p className="sub-footer-price">$3000</p>
            </div>

          </div>
        </div>
        <div>
          <div id="pack-three" className="card service-pack shadowed overflow-hidden">

            <div className="sub-header">
              <p>enterprise</p>
            </div>

            <div className="list-container">
              <ul className="line-item-container small-text">
                {this.props.enterprise}
              </ul>
            </div>

            <div className="sub-footer">
              <p className="sub-footer-price">$5000</p>
            </div>

          </div>
        </div>

      </ReactSwipe>
    );
  }
}

class DesktopCards extends Component {
  render() {
    return (
      <div className="flex-centered">
        <div id="pack-one" className="card service-pack shadowed overflow-hidden">

          <div className="sub-header">
            <p>startup</p>
          </div>

          <div className="list-container">
            <ul className="line-item-container small-text">
              {this.props.startup}
            </ul>
          </div>

          <div className="sub-footer">
            <p className="sub-footer-price">$1800</p>
          </div>

        </div>
        <div id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden">

          <div className="sub-header recommended-header">
            <p>recommended</p>
          </div>

          <div className="list-container">
            <ul className="line-item-container small-text">
              {this.props.recommendation}
            </ul>
          </div>

          <div className="sub-footer recommended-footer">
            <p className="sub-footer-price">$3000</p>
          </div>

        </div>
        <div id="pack-three" className="card service-pack shadowed overflow-hidden">

          <div className="sub-header">
            <p>enterprise</p>
          </div>

          <div className="list-container">
            <ul className="line-item-container small-text">
              {this.props.enterprise}
            </ul>
          </div>

          <div className="sub-footer">
            <p className="sub-footer-price">$5000</p>
          </div>

        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {

    const startup_deliverables = [
      { name: "marketing services",
        include: true
      },
      { name: "graphics services",
        include: true
      },
      { name: "web services",
        include: true
      }
    ];
    const recommended_deliverables = [
      { name: "marketing services",
        include: true
      },
      { name: "graphics services",
        include: true
      },
      { name: "web services",
        include: true
      },
      { name: "video services",
        include: true
      },
      { name: "IT services",
        include: true
      },
      { name: "business development services",
        include: true
      }
    ];
    const enterprise_deliverables = [
      { name: "marketing services",
        include: true
      },
      { name: "graphics services",
        include: true
      },
      { name: "web services",
        include: true
      },
      { name: "video services",
        include: true
      },
      { name: "IT services",
        include: true
      },
      { name: "business development services",
        include: true
      },
      { name: "consultation services",
        include: true
      },
      { name: "repair services",
        include: true
      }
    ];

    function createList(array) {
      var newArray = [];
      for (var i = 0; i < array.length; i++) {
        var possibleP;
        if (array[i].include === true) {
          possibleP = <p className="line-item-checkmark inline">&#10004;</p>;
        } else {
          possibleP = <p className="line-item-checkmark inline">X</p>;
        }
        newArray.push(<li className="flex">{possibleP}<span className="line-item-name inline">{array[i].name}</span></li>);
      }
      return newArray;
    }
    var startup = createList(startup_deliverables);
    var recommendation = createList(recommended_deliverables);
    var enterprise = createList(enterprise_deliverables);


    const isMobile = window.innerWidth < 480;
    const relevantLayout = isMobile ? <MobileLayout startup={startup} recommendation={recommendation} enterprise={enterprise}/> : <DesktopCards startup={startup} recommendation={recommendation} enterprise={enterprise}/>;


    return (
      <div className="App default-gray-element">

        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}

        <nav id="head" className="app-header dark-gray-element light-text">
          <p>AMS</p>
        </nav>
        <section id="bod" className="app-body">
          <div className="full centered large-title">
            <p>choose one</p>
          </div>

          {relevantLayout}

          <div className="full centered or">
            <p>-or-</p>
          </div>
          <div className="button-container">
            <a className="simple-button shadowed" href="#">custom project</a>
          </div>

        </section>
        <section id="foot" className="app-footer full">
          <p>And Moore Studios &copy; {new Date().getFullYear()}</p>
        </section>


      </div>
    );
  }
}

export default App;



    {/*<ReactSwipe className="carousel" swipeOptions={{continuous: true, startSlide: 1, centeredSlides: true}}>*/}
      {/*<div id="pack-one" className="card service-pack shadowed overflow-hidden">*/}

        {/*<div className="sub-header">*/}
          {/*<p>startup</p>*/}
        {/*</div>*/}

        {/*<div className="list-container">*/}
          {/*<ul className="line-item-container small-text">*/}
            {/*{startup}*/}
          {/*</ul>*/}
        {/*</div>*/}

        {/*<div className="sub-footer">*/}
          {/*<p className="sub-footer-price">$1800</p>*/}
        {/*</div>*/}

      {/*</div>*/}
      {/*<div id="pack-two" className="card service-pack featured-pack shadowed overflow-hidden">*/}

        {/*<div className="sub-header recommended-header">*/}
          {/*<p>recommended</p>*/}
        {/*</div>*/}

        {/*<div className="list-container">*/}
          {/*<ul className="line-item-container small-text">*/}
            {/*{recommendation}*/}
          {/*</ul>*/}
        {/*</div>*/}

        {/*<div className="sub-footer recommended-footer">*/}
          {/*<p className="sub-footer-price">$3000</p>*/}
        {/*</div>*/}

      {/*</div>*/}
      {/*<div id="pack-three" className="card service-pack shadowed overflow-hidden">*/}

        {/*<div className="sub-header">*/}
          {/*<p>enterprise</p>*/}
        {/*</div>*/}

        {/*<div className="list-container">*/}
          {/*<ul className="line-item-container small-text">*/}
            {/*{enterprise}*/}
          {/*</ul>*/}
        {/*</div>*/}

        {/*<div className="sub-footer">*/}
          {/*<p className="sub-footer-price">$5000</p>*/}
        {/*</div>*/}

      {/*</div>*/}
    {/*</ReactSwipe>*/}