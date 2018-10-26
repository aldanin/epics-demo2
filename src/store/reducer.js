const initialState = {
    counter: 0,
    isEdit: false,
    data: null
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case 'INCREMENT':
            newState.counter++;
            return newState;
        case 'INCREMENT_IF_ODD':
            newState.counter  = (newState.counter  % 2 !== 0) ? newState.counter  + 1 : newState.counter
            return newState
        case 'DECREMENT':
            newState.counter--;
            return newState;
        case 'OK':
            newState.counter = newState.counter + 1000;
            return newState;
        case 'IS_EDIT':
            newState.isEdit = action.isEdit;
            return newState;
        case 'PONG':
            console.log('PONGD');
            newState.data=action.payload;
            return newState;
        default:
            return newState
    }
    return newState;
};

export default reducer;