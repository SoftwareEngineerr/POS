export const POS = (Params) => {
    return(dispatch)=>{
        dispatch({type:"FETCH_POS" , response:Params})
    }   
}