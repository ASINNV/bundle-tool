import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';



import Main from './components/Main';
import Detail from './components/Detail';
import Confirmation from './components/Confirmation';
import ReviewOrder from './components/ReviewOrder';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App default-gray-element">

          {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
          {/*</header>*/}
          {/*<p className="App-intro">*/}
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
          {/*</p>*/}

          <nav id="head" className="app-header dark-gray-element">
            <Link to="/" className="light-text">AMS</Link>
            <p className="test-banner">TEST MODE</p>
          </nav>


          <div id="granny-bod" className="content-container">

            <Route exact path="/" component={Main}/>
            <Route exact path="/startup" component={Detail}/>
            <Route exact path="/recommended" component={Detail}/>
            <Route exact path="/enterprise" component={Detail}/>
            <Route exact path="/custom" component={Detail}/>
            <Route exact path="/review-order" component={ReviewOrder}/>
            <Route exact path="/confirmation" component={Confirmation}/>


          </div>


          <section id="foot" className="app-footer full">
            <p>And Moore Studios &copy; {new Date().getFullYear()}</p>
          </section>


        </div>

      </Router>
    )
  }
}



export default App;

