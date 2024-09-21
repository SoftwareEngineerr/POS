import axios from "axios";
import { UserData } from "../../hooks/FirstTimeWebSrn/Websrn";

// const loaderTimer=() =>{
//   setTimeout(() => {
//     dispatch({ type: "SHOW_LOADER", Seconds: '0' });
//   }, 1000);
// }
export const loginauth = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SHOW_LOADER", Seconds: "getdata" });

      // Check the payload.api value
      console.log('Sending request to:', payload.api);
      const url = payload.api;
      const res = await axios.post(url, payload);

      if (res.status === 200) {
        setTimeout(() => {
          dispatch({ type: "SHOW_LOADER", Seconds: '0' });
        }, 1000);
        console.log('Login successful');
        sessionStorage.setItem("User_Data", JSON.stringify(res.data));
        dispatch({
          type: 'FETCH_DATA_SUCCESS',
          response: res.data.token,
          userdata: res.data
        });
      } else {
        setTimeout(() => {
          dispatch({ type: "SHOW_LOADER", Seconds: '0' });
        }, 1000);
        console.error('Unexpected response:', res);
        dispatch({
          type: 'FETCH_DATA_ERROR',
          error: res.status,
          response: res.data
        });

        dispatch({
          type: 'SHOW_MODAL',
          response: res.data,
          status: '404'
        });
      }
    } catch (err) {
      setTimeout(() => {
        dispatch({ type: "SHOW_LOADER", Seconds: '0' });
      }, 1000);
      console.log(err)
      console.error('Error While logging:', err);

      //   let errorStatus = err.response ? err.response.status : 'Unknown Error';
      //   let errorMessage = err.response ? err.response.data : 'Unknown Error';

      //   if (errorStatus === 401) {
      //     errorMessage = 'Invalid email or password';
      //   }

      //   dispatch({
      //     type: 'FETCH_DATA_ERROR',
      //     error: errorStatus,
      //     response: err.response.data
      //   });

      dispatch({
        type: 'SHOW_MODAL',
        response: err.response.data,
        status: '404'
      });
    }
  };
};

export const checklogin = () => {
  // console.log(UserData.token);

  // TODO: Add token validation logic here if needed

  return (dispatch) => {
    dispatch({
      type: 'FETCH_DATA_SUCCESS',
      response: UserData.token,
      userdata: UserData
    });
  };
};


export const Logout = (payload) => {
  return async (dispatch) => {
    try {
      sessionStorage.clear();
      dispatch({ type: 'TOKENNOTVALID' })
    }
    catch (err) {
      dispatch({ type: 'FETCH_DATA_ERROR', error: 'server error' })
    }
  }
}