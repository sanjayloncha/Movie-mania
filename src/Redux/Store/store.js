import  { legacy_createStore } from "redux" ;
import { reducer } from "../Reducer/reducer";

export const myStore = legacy_createStore(reducer) ;