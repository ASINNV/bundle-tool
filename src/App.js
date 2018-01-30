import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
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
          <div className="flex-centered">
            <div id="pack-one" className="card service-pack shadowed">

              <div className="sub-header">
                <p>startup</p>
              </div>

              <ul className="line-item-container small-text">
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
              </ul>

              <div className="sub-footer">
                <p className="sub-footer-price">$1800</p>
              </div>

            </div>
            <div id="pack-two" className="card service-pack featured-pack shadowed">

              <div className="sub-header recommended-header">
                <p>recommended</p>
              </div>

              <ul className="line-item-container small-text">
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
              </ul>

              <div className="sub-footer recommended-footer">
                <p className="sub-footer-price">$3000</p>
              </div>

            </div>
            <div id="pack-three" className="card service-pack shadowed">

              <div className="sub-header">
                <p>enterprise</p>
              </div>

              <div className="list-container">
                <ul className="line-item-container small-text">
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                  <li><span className="line-item-checkmark">&#10004;</span><span className="line-item-name">awesome deliverable</span></li>
                </ul>
              </div>

              <div className="sub-footer">
                <p className="sub-footer-price">$5000</p>
              </div>

            </div>
          </div>
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
