export function increment(value) {
    const dispatchFunc = dispatch => {
        dispatch({
            type : "INCREMENT",
            value : 1
        })
    }

    return thunk(dispatchFunc);
}

export function decrement(value) {
    const dispatchFunc = dispatch => {
        dispatch({
            type : "DECREMENT",
            value : 1
        })
    }

    return thunk(dispatchFunc);
}

export function asyncIncrement(value) {
    const dispatchFunc = dispatch => {
        dispatch({
            type : "INCREMENT_ASYNC",
            value : 1
        })
    }

    return thunk(dispatchFunc);
}

export function thunk(dispatchFunc) {
    const func =  dispatch => {
        return dispatchFunc(dispatch);
    }
    const dd  = func();

    return dd;
}

//onInc: () => dispatch({ type: "INCREMENT", value: 1 }),
   // onDec: () => dispatch({ type: "DECREMENT", value: 1 }),
   // onIncAsync: () => dispatch({ type: "INCREMENT_ASYNC", value: 1 })