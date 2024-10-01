export const SHOW_MODAL = (getdata , status)=>{
    return(dispatch)=>{
        // dispatch({type:"SHOW_LOADER" , Seconds:getdata})

            // console.log(getdata , status)
        dispatch({
            type: 'SHOW_MODAL', 
            response: getdata,
            // status:  '404' 
              status: status ? status.status : '404'
            // severity: 'error'
          });
    }
}