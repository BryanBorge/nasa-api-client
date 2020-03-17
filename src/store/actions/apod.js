import { FETCH_APOD } from "./actionTypes";

export const fetchAPOD = (dispatch) => {
console.log('here in the action')
  fetch("https://api.nasa.gov/planetary/apod?api_key=kvrxQ3qubIwJq4LxYXvFeer9WgfGn8ngDH9e2snK")
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: FETCH_APOD,
        payload: data
      });
    });
};
