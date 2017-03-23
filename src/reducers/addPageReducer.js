import axios from 'axios';

const initialState = {
    group: 0,
};

const pageReducer = (state= initialState, action) => {
    const newState = Object.assign({}, prevState);

    switch(action.type){
        case "ADD_PAGE":
            // do something here
        break;

        default:
          return state;
    }
    return newState;
}

export default pageReducer;


export const addPage = () => (dispatch) => {

}

const add = (group) => ({
    type: "ADD_PAGE",
    group,
})