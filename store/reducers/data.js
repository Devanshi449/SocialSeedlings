import { actionTypes } from "../types";

export const initialState = {
  theme: "light",
};

function toggleTheme(theme) {
  return theme === "light" ? "dark" : "light";
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_THEME:
      return {
        ...state,
        theme: toggleTheme(state.theme),
      };
    case "SET_USER":
        return{
            ...state,
            user: action.payload
        }
    default:
      return state;
  }

};

export default dataReducer;
