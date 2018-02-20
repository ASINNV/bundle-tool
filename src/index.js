import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";


const initialState = {
  startup: [
    { name: "marketing services",
      description: "FIRST: This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 100,
      include: true
    },
    { name: "graphics services",
      description: "Number 2 it'll be sweet when we get these populated with real content.",
      price: 250,
      include: true
    },
    { name: "web services",
      description: "3 3 3 3 3 3 cription will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 300,
      include: true
    },
    { name: "video services",
      description: "4 4 4 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 825,
      include: false
    },
    { name: "IT services",
      description: "5 5 5 5 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 60,
      include: false
    },
    { name: "business development services",
      description: "6 6 6 6 6 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 175,
      include: false
    },
    { name: "consultation services",
      description: "7 7 7 7 7 7 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 150,
      include: false
    },
    { name: "repair services",
      description: "8 8 8 8 8 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 90,
      include: false
    }
  ],
  recommended: [
    { name: "marketing services",
      description: "9 9 9 9 9 9 9 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 100,
      include: true
    },
    { name: "graphics services",
      description: "10 10 10 10 10 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 250,
      include: true
    },
    { name: "web services",
      description: "11 11 11 11 11 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 300,
      include: true
    },
    { name: "video services",
      description: "12 12 12 12 12 12 12 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 825,
      include: true
    },
    { name: "IT services",
      description: "13 13 13 13 13 13 13 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 60,
      include: true
    },
    { name: "business development services",
      description: "14 14 14 14 14 14 14 14 14 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 175,
      include: true
    },
    { name: "consultation services",
      description: "15 15 15 15 15 15 15 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 150,
      include: false
    },
    { name: "repair services",
      description: "16 16 16 16 16 16 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 90,
      include: false
    }

  ],
  enterprise: [
    { name: "marketing services",
      description: "17 17 17 17 17 17 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 100,
      include: true
    },
    { name: "graphics services",
      description: "18 18 18 18 18 18 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 250,
      include: true
    },
    { name: "web services",
      description: "19 19 19 19 19 19 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 300,
      include: true
    },
    { name: "video services",
      description: "20 20 20 20 20 20 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 825,
      include: true
    },
    { name: "IT services",
      description: "21 21 21 21 21 21 21 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 60,
      include: true
    },
    { name: "business development services",
      description: "22 22 22 22 22 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 175,
      include: true
    },
    { name: "consultation services",
      description: "23 23 23 23 23 23 23 23 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 150,
      include: true
    },
    { name: "repair services",
      description: "24 24 24 24 24 24 24 24 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 90,
      include: true
    }
  ],
  custom: [
    { name: "marketing services",
      description: "25 25 25 25 25 25 25 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 100,
      include: false
    },
    { name: "graphics services",
      description: "26 26 26 26 26 26 26 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 250,
      include: false
    },
    { name: "web services",
      description: "27 27 27 27 27 27 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 300,
      include: false
    },
    { name: "video services",
      description: "2828282828This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 825,
      include: false
    },
    { name: "IT services",
      description: "29292929This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 60,
      include: false
    },
    { name: "business development services",
      description: "3030303030This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 175,
      include: false
    },
    { name: "consultation services",
      description: "31 31 31 31 31 31 31 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 150,
      include: false
    },
    { name: "repair services",
      description: "32 32 32 32 32 32 32 32 This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      price: 90,
      include: false
    }
  ],
  default_item: {
    description: "Please mouse over a line item for more information.",
    price: 0
  },
  chosen_bundle: 1,
  paymentMethod: 'none',
  active_item: -1,
  user_data: {
    firstName: "Default"
  },
  order_confirmed: false
};

const awesomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PACKAGE_SELECTION":
      if (typeof(action.payload) === "number") {
        state = {
          ...state,
          chosen_bundle: action.payload

        };
        console.log("hey, it worked perfectly.");
      } else if (typeof(Number(action.payload) === "number" && typeof(Number(action.payload)) < 3 && typeof(Number(action.payload)) >= 0)) {
        state = {
          ...state,
          chosen_bundle: Number(action.payload)

        };
        console.log("hey, it worked but not quite.");
      } else {
        console.log("You need to enter a number, asshole.");
      }
      break;

    case "SET_ITEM_SELECTION":
      break;
    case "SET_PAYMENT_METHOD":
      state = {
        ...state,
        paymentMethod: action.payload
      };
      break;
    case "SET_USER_DATA":
      state = {
        ...state,
        user_data: action.payload
      };
      break;
    case "SET_ORDER_CONFIRMATION":
      state = {
        ...state,
        order_confirmed: action.payload
      };
      break;
    case "SET_ACTIVE_ITEM":
      state = {
        ...state,
        active_item: action.payload
      };
      break;
    case "SET_INCLUSION":
      state = {
        ...state,
        custom: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};
const okayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHOICE":
      state = {
        ...state,
        chosen_bundle: action.payload

      };
      break;
    default:
      return state;
  }
  return state;
};

const store = createStore(combineReducers({awesomeReducer, okayReducer}), applyMiddleware(createLogger()));

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
