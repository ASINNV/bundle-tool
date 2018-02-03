import React from "react";

export const createList = (array) => {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    var possibleP;
    if (array[i].include === true) {
      possibleP = <p className="line-item-checkmark inline">&#10004;</p>;
    } else {
      possibleP = <p className="line-item-checkmark inline">X</p>;
    }
    newArray.push(<li key={i} className="flex">{possibleP}<span className="line-item-name inline">{array[i].name}</span></li>);
  }
  return newArray;
};


export const getDescription = (myObj) => {
  var possibleP;

  if (myObj.active_item > -1) {

    possibleP = <p className="description-p">{myObj.startup[myObj.active_item].description}</p>;
    console.log(myObj.startup[myObj.active_item], myObj.active_item);
    return <div className="description-container light-text">{possibleP}</div>;

  } else {

    possibleP = <p className="description-p">{myObj.default_item.description}</p>;
    return <div className="description-container light-text">{possibleP}</div>;

  }

};