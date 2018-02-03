import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';



import Main from './components/Main';
import StartupDetail from './components/StartupDetail';
import RecommendedDetail from './components/RecommendedDetail';
import EnterpriseDetail from './components/EnterpriseDetail';


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
          </nav>


          <div>

            <Route exact path="/" component={Main}/>
            <Route exact path="/startup" component={StartupDetail}/>
            <Route exact path="/recommended" component={RecommendedDetail}/>
            <Route exact path="/enterprise" component={EnterpriseDetail}/>

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

