import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { projectListReducer } from "./Reducers/ProjectReducers";

const reducer = combineReducers({
  projectList: projectListReducer,
});

const initialState = {
  projects: [],
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
