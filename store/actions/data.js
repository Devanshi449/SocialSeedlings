import axios from "axios";
import { actionTypes } from "../types";

export const setTheme = (payload) => {
  return {
    type: actionTypes.TOGGLE_THEME,
  };
};

export const setUser=(payload)=>{
    return{
        type : "SET_USER",payload
    }
}
