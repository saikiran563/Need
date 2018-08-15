import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, number } from "@storybook/addon-knobs/react";
import SmartSearchContainer from "./SmartSearchContainer.jsx";
import SmartSearch from "./SmartSearch.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { combineReducers } from "redux";
import searchReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const story = storiesOf("SmartSearch", module);

story.addDecorator(withKnobs);

const configureStore = rootReducer => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

const rootReducer = combineReducers({
  search: searchReducer
});

const store = configureStore(rootReducer);

story.add("Large", () => {
  return (
    <ReduxProvider store={store}>
      <SmartSearchContainer profile={{}} small={false} />
    </ReduxProvider>
  );
});

story.add("Small", () => {
  return (
    <ReduxProvider store={store}>
      <SmartSearchContainer profile={{}} small={true} />
    </ReduxProvider>
  );
});

story.add("Static", () => {
  return (
    <div>
      Set reactGlobals.discoverHub = false in global vars to get static banner
    </div>
  );
});
