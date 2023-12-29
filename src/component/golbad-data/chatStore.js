import { createStore } from "redux";
import { globalReducer } from "./chat";

const store = createStore(globalReducer);

export default store;
