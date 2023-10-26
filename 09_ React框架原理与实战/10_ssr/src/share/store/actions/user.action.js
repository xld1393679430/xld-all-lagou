import axios from "axios";

export const SAVE_USER = "SAVE_USER";

export const fetchUser = () => async (dispatch) => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  dispatch({
    type: SAVE_USER,
    payload: data,
  });
};
