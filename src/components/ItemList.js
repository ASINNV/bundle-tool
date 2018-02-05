import React, { Component } from "react";
import { connect } from "react-redux";

class ItemList extends Component {
  setActiveFuncWrapper(e) {
    let helper = e.target.tagName;
    let target = e.target;

    const isMobile = window.innerWidth < 480;

    while (helper !== "LI") {
      helper = e.target.parentNode.tagName;
      target = e.target.parentNode;
    }

    if (isMobile) {

      let popup = document.getElementById('popup-desc');
      // let facehole = document.getElementById('popup-desc');
      // console.log("facehole: ", facehole);
      // facehole.style.display = 'block';
      // facehole.setAttribute('style', 'display: block !important');

      this.props.setActiveItem(Number(target.id.slice(10)));

      if (popup !== null) {
        if (popup.style.display === "" || popup.style.display === "none") {
          popup.style.display = "block";
        } else {
          popup.style.display = "none";
        }
      }

    } else {

      let item_containers = document.getElementsByClassName('active');
      for (let i = 0; i < item_containers.length; i++) {
        item_containers[i].className = item_containers[i].className.slice(0, item_containers[i].className.indexOf(' active'));
      }

      if (this.props.awesome.active_item === Number(target.id.slice(10))) {
        if (target.className.indexOf(" active") !== -1) {
          target.className = target.className.slice(0, target.className.indexOf(' active'));
        }
        this.props.setActiveItem(-1);
      } else {
        for (let i = 0; i < target.parentNode.childNodes.length; i++) {
          target.parentNode.childNodes[i].className = target.parentNode.childNodes[i].className.slice(0, target.parentNode.childNodes[i].className.indexOf(' active'));
        }
        target.className = target.className + " active";
        this.props.setActiveItem(Number(target.id.slice(10)));
      }

    }

  }
  selectItem(e) {
    let myObj = this.props.awesome.custom[e.target.id.slice(6)];
    let myList = this.props.awesome.custom;

    if (this.props.awesome.custom[e.target.id.slice(6)].include === false) {
      myObj.include = true;
      myList[e.target.id.slice(6)] = myObj;
      // console.log(myObj);
    } else if (this.props.awesome.custom[e.target.id.slice(6)].include === true) {
      myObj.include = false;
      myList[e.target.id.slice(6)] = myObj;
      // console.log(myObj);
    }
    this.props.setInclusion(myList);
    // console.log("THIS IS THE TARGET, HEY DUDE:", e.target);

    // console.log(e.target, this.props.awesome.custom[e.target.id.slice(6)]);
    // if (e.target.innerHTML === '&#10003;') {
    //   console.log("check");
    // } else if (e.target.innerHTML === '&#10005;') {
    //   console.log('x');
    // } else {
    //   console.log('neither');
    // }
  }

  render() {
    var newArray = [];
    let possibleP;
    if (this.props.page === "detail") {

      for (let i = 0; i < this.props.list_array.length; i++) {
        if (this.props.list_array[i].include === true) {
          possibleP = <p className="line-item-checkmark green-text inline noselect">&#10003;</p>;
        } else {
          possibleP = <p className="line-item-checkmark red-text inline noselect">&#10005;</p>;
        }
        if (this.props.functionalityDepth === 2) {
          newArray.push(<li key={i} id={"list-item-" + i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        } else if (this.props.functionalityDepth === 1) {
          newArray.push(<li key={i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        } else if (this.props.functionalityDepth === 0) {
          newArray.push(<li key={i} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        }

      }

    } else if (this.props.page === "custom") {

      for (let i = 0; i < this.props.list_array.length; i++) {
        if (this.props.list_array[i].include === true) {
          possibleP = <p id={"check-" + i} className="line-item-checkmark green-text inline noselect" onClick={this.selectItem.bind(this)}>&#10003;</p>;
        } else {
          possibleP = <p id={"check-" + i} className="line-item-checkmark red-text inline noselect" onClick={this.selectItem.bind(this)}>&#10005;</p>;
        }
        if (this.props.functionalityDepth === 3) {
          newArray.push(<li key={i} id={"list-item-" + i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        } else if (this.props.functionalityDepth === 2) {
          newArray.push(<li key={i} id={"list-item-" + i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        } else if (this.props.functionalityDepth === 1) {
          newArray.push(<li key={i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        } else if (this.props.functionalityDepth === 0) {
          newArray.push(<li key={i} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        }

      }

    } else {

      for (let i = 0; i < this.props.list_array.length; i++) {
        if (this.props.list_array[i].include === true) {
          possibleP = <p className="line-item-checkmark green-text inline noselect">&#10003;</p>;
        } else {
          possibleP = <p className="line-item-checkmark red-text inline noselect">&#10005;</p>;
        }
        if (this.props.functionalityDepth === 2 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} id={"list-item-" + i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        } else if (this.props.functionalityDepth === 1 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        } else if (this.props.functionalityDepth === 0 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
        }

      }

    }

    return (
      <div className="list-container">
        <ul className="line-item-container small-text">
          {/*{this.props.startup_items}*/}
          {newArray}
        </ul>
      </div>
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
    setActiveItem: (numbo) => {
      dispatch({
        type: "SET_ACTIVE_ITEM",
        payload: numbo
      });

    },
    setInclusion: (myList) => {
      dispatch({
        type: "SET_INCLUSION",
        payload: myList
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);