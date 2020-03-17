import { FETCH_APOD } from "../actions/actionTypes";

const initialState = {
  picture: "",
  title: "",
  desc: "",
  copyRight: "",
  year: "",
  month: "",
  day: "",
  date: "",
  loading: false,
  success: true
};

export default function(state = initialState, action) {
  switch (action) {
    case FETCH_APOD:
        return {
            ...state,
            items: action.payload
        }
    default:
      return state;
  }
}
