import React, { Component } from "react";
import { connect } from "react-redux";

class ItemList extends Component {
  setActiveFuncWrapper(e) {
    let target = e.target;

    const isMobile = window.innerWidth < 480;

    while (target.tagName !== "LI") {
      target = target.parentNode;
    }

    if (isMobile) {

      let popup = document.getElementById('popup-desc');
      // let facehole = document.getElementById('popup-desc');
      // facehole.style.display = 'block';
      // facehole.setAttribute('style', 'display: block !important');

      this.props.setActiveItem(Number(target.id.slice(10)));

      if (popup !== null) {
        if (popup.style.display === "" || popup.style.display === "none") {
          popup.style.display = "flex";
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
        // if (target.className.indexOf(" active") !== -1) {
        //   target.className = target.className.slice(0, target.className.indexOf(' active'));
        // }
        // this.props.setActiveItem(-1);
        target.className = target.className + " active";
        console.log("same target.childNodes[0] = ", target.childNodes[0]);
      } else {
        // for (let i = 0; i < target.parentNode.childNodes.length; i++) {
        //   if (target.parentNode.childNodes[i].className.indexOf(' active') !== -1) {
        //     target.parentNode.childNodes[i].className = target.parentNode.childNodes[i].className.slice(0, target.parentNode.childNodes[i].className.indexOf(' active'));
        //   }
        //
        // }
        target.className = target.className + " active";
        this.props.setActiveItem(Number(target.id.slice(10)));

        // if (target.childNodes[0].className.indexOf(" custom-hoverable") !== -1) {
        //   target.childNodes[0].className = target.childNodes[0].className.slice(0, target.childNodes[0].className.indexOf(" custom-hoverable"));
        //   console.log("same target.childNodes[0] = ", target.childNodes[0]);
        // } else {
        //   target.childNodes[0].className += " custom-hoverable";
        //   console.log("same target.childNodes[0] = ", target.childNodes[0]);
        // }

      }

    }

  }
  selectItem(e) {
    let target = e.target;

    while (target.tagName !== "DIV") {
      target = target.parentNode;
    }

    let myObj = this.props.awesome.custom[target.id.slice(6)];
    let myList = this.props.awesome.custom;
    let selectAllButton = document.getElementById('select-all-button');
    let allSelected = true;

    console.log(target, "target target target");

    if (selectAllButton.checked === true) {
      selectAllButton.checked = false;
    }

    if (this.props.awesome.custom[target.id.slice(6)].include === false) {
      myObj.include = true;
      myList[target.id.slice(6)] = myObj;
    } else if (this.props.awesome.custom[target.id.slice(6)].include === true) {
      myObj.include = false;
      myList[target.id.slice(6)] = myObj;
    }
    this.props.setInclusion(myList);
    localStorage.setItem("custom_list", JSON.stringify(myList));

    for (let i = 0; i < myList.length; i++) {
      if (myList[i].include === false) {
        allSelected = false;
      }
    }
    if (selectAllButton.checked === false && allSelected === true) {
      selectAllButton.checked = true;
    }

    // if (target.innerHTML === '&#10003;') {
    // } else if (e.target.innerHTML === '&#10005;') {
    // } else {
    // }
  }
  deactivateItems() {
    let item_containers = document.getElementsByClassName('active');
    for (let i = 0; i < item_containers.length; i++) {
      item_containers[i].className = item_containers[i].className.slice(0, item_containers[i].className.indexOf(' active'));
    }
    this.props.setActiveItem(-1);
  }

  render() {
    var newArray = [];
    let possibleP;
    let unorderedList;
    const isMobile = window.innerWidth < 480;

    if (this.props.page === "detail") {

      if (isMobile === true) {  // mobile block
        for (let i = 0; i < this.props.list_array.length; i++) {
          if (this.props.list_array[i].include === true) {
            possibleP = <div className="line-item-checkmark green-text inline noselect flex-vertical-center">&#10003;</div>;
          } else {
            possibleP = <div className="line-item-checkmark red-text inline noselect flex-vertical-center">&#10005;</div>;
          }
          if (this.props.functionalityDepth === 2) {
            newArray.push(<li key={i} id={"list-item-" + i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 1) {
            newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 0) {
            newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          }

        }
        unorderedList = <div className="list-container height-equalizer responsive-container"><ul className="line-item-container small-text">{newArray}</ul></div>;

      } else {  // desktop block
        for (let i = 0; i < this.props.list_array.length; i++) {
          if (this.props.list_array[i].include === true) {
            possibleP = <div className="line-item-checkmark green-text inline noselect flex-vertical-center">&#10003;</div>;
          } else {
            possibleP = <div className="line-item-checkmark red-text inline noselect flex-vertical-center">&#10005;</div>;
          }
          if (this.props.functionalityDepth === 2) {
            newArray.push(<li key={i} id={"list-item-" + i} className="flex relative" onMouseEnter={this.setActiveFuncWrapper.bind(this)}>{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 1) {
            newArray.push(<li key={i} className="flex relative" onMouseEnter={this.setActiveFuncWrapper.bind(this)}>{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 0) {
            newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          }

        }
        unorderedList = <div className="list-container height-equalizer responsive-container"><ul className="line-item-container small-text" onMouseLeave={this.deactivateItems.bind(this)}>{newArray}</ul></div>;
      }

    } else if (this.props.page === "custom") {

      if (isMobile === true) {  // mobile block
        for (let i = 0; i < this.props.list_array.length; i++) {
          if (this.props.list_array[i].include === true) {
            possibleP = <div id={"check-" + i} className="custom-line-item-checkmark line-item-checkmark inline noselect flex-vertical-center" onClick={this.selectItem.bind(this)}><p className="the-check">&#10003;</p><p className="box green-box"/></div>;
          } else {
            possibleP = <div id={"check-" + i} className="custom-line-item-equis line-item-checkmark inline noselect flex-vertical-center" onClick={this.selectItem.bind(this)}><p className="the-equis">&#10005;</p><p className="box"/></div>;
          }
          if (this.props.functionalityDepth === 3) {
            newArray.push(<li key={i} id={"list-item-" + i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 2) {
            newArray.push(<li key={i} id={"list-item-" + i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 1) {
            newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 0) {
            newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          }

        }
        unorderedList = <div className="list-container height-equalizer responsive-container"><ul className="line-item-container small-text">{newArray}</ul></div>;

      } else {  // desktop block
        for (let i = 0; i < this.props.list_array.length; i++) {
          if (this.props.list_array[i].include === true) {
            possibleP = <div id={"check-" + i} className="custom-line-item-checkmark line-item-checkmark inline noselect flex-vertical-center" onClick={this.selectItem.bind(this)}><p className="the-check">&#10003;</p><p className="box green-box"/></div>;
          } else {
            possibleP = <div id={"check-" + i} className="custom-line-item-equis line-item-checkmark inline noselect flex-vertical-center" onClick={this.selectItem.bind(this)}><p className="the-equis">&#10005;</p><p className="box"/></div>;
          }
          if (this.props.functionalityDepth === 3) {
            newArray.push(<li key={i} id={"list-item-" + i} className="flex relative" onMouseEnter={this.setActiveFuncWrapper.bind(this)}>{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 2) {
            newArray.push(<li key={i} id={"list-item-" + i} className="flex relative" onMouseEnter={this.setActiveFuncWrapper.bind(this)}>{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 1) {
            newArray.push(<li key={i} className="flex relative" onMouseEnter={this.setActiveFuncWrapper.bind(this)}>{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          } else if (this.props.functionalityDepth === 0) {
            newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
          }

        }
        unorderedList = <div className="list-container height-equalizer responsive-container"><ul className="line-item-container small-text" onMouseLeave={this.deactivateItems.bind(this)}>{newArray}</ul></div>;
      }

    } else if (this.props.page === "confirmation") {

      for (let i = 0; i < this.props.list_array.length; i++) {
        if (this.props.list_array[i].include === true) {
          possibleP = <div className="line-item-checkmark green-text inline noselect flex-vertical-center">&#10003;</div>;
          newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p><p className="line-item-price flex-vertical-center">${this.props.list_array[i].price}</p></li>);
        }
      }
      unorderedList = <ul className="line-item-container small-text">{newArray}</ul>;

    } else if (this.props.page === "home") {

      for (let i = 0; i < this.props.list_array.length; i++) {
        if (this.props.list_array[i].include === true) {
          possibleP = <div className="line-item-checkmark green-text inline noselect flex-vertical-center">&#10003;</div>;
        } else {
          possibleP = <div className="line-item-checkmark red-text inline noselect flex-vertical-center">&#10005;</div>;
        }

        if (this.props.functionalityDepth === 2 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} id={"list-item-" + i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p></li>);
        } else if (this.props.functionalityDepth === 1 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p></li>);
        } else if (this.props.functionalityDepth === 0 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p></li>);
        }

      }
      if (this.props.featured === true) {
        unorderedList = <div className="list-container featured-container"><ul className="line-item-container small-text">{newArray}</ul></div>;
      } else {
        unorderedList = <div className="list-container"><ul className="line-item-container small-text">{newArray}</ul></div>;
      }

    } else {

      for (let i = 0; i < this.props.list_array.length; i++) {
        if (this.props.list_array[i].include === true) {
          possibleP = <div className="line-item-checkmark green-text inline noselect flex-vertical-center">&#10003;</div>;
        } else {
          possibleP = <div className="line-item-checkmark red-text inline noselect flex-vertical-center">&#10005;</div>;
        }
        if (this.props.functionalityDepth === 2 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} id={"list-item-" + i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p></li>);
        } else if (this.props.functionalityDepth === 1 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect" onClick={this.setActiveFuncWrapper.bind(this)}>{this.props.list_array[i].name}</p></li>);
        } else if (this.props.functionalityDepth === 0 && this.props.list_array[i].include === true) {
          newArray.push(<li key={i} className="flex relative">{possibleP}<p className="line-item-name inline noselect">{this.props.list_array[i].name}</p></li>);
        }

      }

      unorderedList = <div className="list-container responsive-container"><ul className="line-item-container small-text">{newArray}</ul></div>;

    }

    return (
      <div>
        {unorderedList}
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
    setActiveItem: (myNumber) => {
      dispatch({
        type: "SET_ACTIVE_ITEM",
        payload: myNumber
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