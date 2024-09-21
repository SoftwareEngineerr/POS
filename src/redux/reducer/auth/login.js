import { generateUniqueInteger } from "../../../hooks/unqniue/unqniue";

const initialState = {
    status: '',
    response: '',
    errormessage: '',
    permission: '',
    veriPermission: '',
    veritoken: '',
    returntoHome: false,
    userdata: '',
    Time: '',
    getrestToken: null,
};

const Auth = (state = initialState , action) => {
    switch(action.type){
        // Login Cases
        case 'FETCH_DATA_SUCCESS':
            return {...state , status: action.response , userdata: action.userdata, permission: true }
        case 'FETCH_DATA_ERROR':
            return {...state , status: action.error , permission: false , errormessage: action.response, Time:  generateUniqueInteger()}
        case 'TOKENNOTVALID' :
            return {...state , permission: false}
        // Showing error on Model 

        case 'SHOWING_ERROR_ON_MODEL':
            return {...state ,  errormessage: action.error, Time:  generateUniqueInteger()}
            
        default : 
        return state;
    }
}
export default Auth;



// const uniqueNumber = generateUniqueInteger();
// console.log(uniqueNumber);
