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

  render() {
    var newArray = [];
    for (var i = 0; i < this.props.list_array.length; i++) {
      var possibleP;
      if (this.props.list_array[i].include === true) {
        possibleP = <p className="line-item-checkmark inline noselect">&#10003;</p>;
      } else {
        possibleP = <p className="line-item-checkmark inline noselect">&#10005;</p>;
      }
      if (this.props.functionalityDepth === 2) {
        newArray.push(<li key={i} id={"list-item-" + i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
      } else if (this.props.functionalityDepth === 1) {
        newArray.push(<li key={i} onClick={this.setActiveFuncWrapper.bind(this)} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
      } else if (this.props.functionalityDepth === 0) {
        newArray.push(<li key={i} className="flex">{possibleP}<span className="line-item-name inline noselect">{this.props.list_array[i].name}</span></li>);
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

    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);