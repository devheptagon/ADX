import { createStore } from "redux";
import rootReducer from "./rootReducer";
//import {writeLocalStorage, readLocalStorage} from '../utils/genericHelper';

export let store = null;

export const initStore = async () => {
  store = createStore(rootReducer);

  /* store.subscribe(() => {
    
  }); */
  return store;
};
