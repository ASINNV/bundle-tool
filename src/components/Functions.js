import React from "react";

export const createList = (array) => {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    var possibleP;
    if (array[i].include === true) {
      possibleP = <p className="line-item-checkmark inline">&#10003;</p>;
    } else {
      possibleP = <p className="line-item-checkmark inline">&#10005;</p>;
    }
    newArray.push(<li key={i} className="flex">{possibleP}<span className="line-item-name inline">{array[i].name}</span></li>);
  }
  return newArray;
};


export const getDescription = (myObj, list) => {
  var possibleP;

  if (myObj.active_item > -1 && list !== undefined && list !== null) {

    possibleP = <p className="description-p">{list[myObj.active_item].description}</p>;
    return <div className="description-container light-text">{possibleP}</div>;

  } else {

    possibleP = <p className="description-p">{myObj.default_item.description}</p>;
    return <div className="description-container light-text">{possibleP}</div>;

  }

};

export const getServiceName = (myObj, list) => {
  if (myObj.active_item > -1 && list !== undefined && list !== null) {
    if (list[myObj.active_item].name.length > 20) {
      return <p>{list[myObj.active_item].name.slice(0, 20)}&hellip;</p>;
    } else {
      return <p>{list[myObj.active_item].name}</p>;
    }

  }
};

export const getPrice = (myObj, list) => {
  if (myObj.active_item > -1 && list !== undefined && list !== null) {
    return <p className="sub-footer-price">${list[myObj.active_item].price}</p>;
  } else {
    return <p className="sub-footer-price">${myObj.default_item.price}</p>;
  }

};

export const getBundlePrice = (list) => {
  let total = 0;
  if (list !== undefined && list !== null) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].include === true) {
        total += list[i].price;
      }
    }
    return total;
  }


};