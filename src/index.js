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
      include: true
    },
    { name: "graphics services",
      description: "Number 2 it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "web services",
      description: "333333 cription will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    }
  ],
  recommendation: [
    { name: "marketing services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "graphics services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "web services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "video services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "IT services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "business development services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    }

  ],
  enterprise: [
    { name: "marketing services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "graphics services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "web services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "video services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "IT services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "business development services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "consultation services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    },
    { name: "repair services",
      description: "This is where the description will go. Awesome, it'll be sweet when we get these populated with real content.",
      include: true
    }
  ],
  default_item: {
    description: "Please click a line item for more information."
  },
  chosen_bundle: 1,
  active_item: -1
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

    case "SET_ACTIVE_ITEM":
      state = {
        ...state,
        active_item: action.payload
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
