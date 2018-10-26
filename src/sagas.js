import {put, takeEvery, all, call, fork, takeLatest, cancel, select, take} from 'redux-saga/effects';

const delay=(ms) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('asasas')
        }, ms)
    })
}

export function* helloSaga() {
    console.log('Hello Sagas!')


}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    const task=yield call(delay, 1000);
    const state=yield select()
    console.log('ad, state', task, state);

    yield put({type : 'INCREMENT'})
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* watchMethods(action) {
    const {payload}=action;

    const isEdit=yield select(state => state.isEdit);

    if (isEdit) {
        const task=yield take(["CANCEL", "CONTINUE"]);
        if (task.type === "CONTINUE") {
            const origActions= payload.map(action => ({type : action.type, value : action.value}));
            yield all(origActions.map( action => put(action)));
            yield put({type: "IS_EDIT", isEdit: false})
        }
    }
    else {
        const origActions= payload.map(action => ({type : action.type, value : action.value}));
        yield all(origActions.map( action => put(action)));
    }
}

export default function* rootSaga() {
    let task;

    while (task=yield take("METHODS")) {
        // starts the task in the background
        const bgSyncTask=yield fork(watchMethods, task)

        const isEdit = yield select(state => state.isEdit);
        if (isEdit) {
            // wait for the user stop action
            const control=yield take("CONTROL")
            // user clicked stop. cancel the background task
            // this will cause the forked bgSync task to jump into its finally block
            if (control.payload && control.payload.command === "cancel") {
                console.log("cancel")
                yield put({
                    type : "CANCEL",
                })
            }
            else if (control.payload && control.payload.command === "continue") {
                yield put({
                    type : "CONTINUE",
                })
            }
        }
    }
}
