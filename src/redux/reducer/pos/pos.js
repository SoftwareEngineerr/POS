const initialState = {
    data:'',
};

const FETCHPOS = (state = initialState , action ) => {
    switch(action.type){
        // Show Loader
        case 'FETCH_POS':
            return {...state , data: action }   
        default : 
        return state;
    }
}
export default FETCHPOS;
