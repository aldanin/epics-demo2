export function increment(value) {
    return methods([{
        type: "INCREMENT",
        value
    }]);
}

export function decrement(value) {
    return methods([{
        type: "DECREMENT",
        value: 1
    }]);
}

export function asyncIncrement(value) {
    return methods([{
        type: "INCREMENT_ASYNC",
        value: 1
    }]);
}

export function control(payload) {
    return {
        type: "CONTROL",
        payload
    }
}

export function methods(actions) {
    const finAction  = {
        type: "METHODS",
        payload: actions.concat({type: "PONG"})
    }

    return finAction;
}


//onInc: () => dispatch({ type: "INCREMENT", value: 1 }),
   // onDec: () => dispatch({ type: "DECREMENT", value: 1 }),
   // onIncAsync: () => dispatch({ type: "INCREMENT_ASYNC", value: 1 })