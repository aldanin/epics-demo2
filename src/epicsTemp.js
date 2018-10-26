import 'rxjs';
import {Observable, of} from 'rxjs';
import {combineEpics, ofType} from 'redux-observable';
import * as actions from './actions';
import {map, mergeMap} from 'rxjs/operators'
import { filter, mapTo, delay } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

// action creators
// const fetchUser = username => ({ type: 'PING1', payload: username });
 const fetchUserFulfilled = payload => ({ type: 'PONG', payload });

// epic
const fetchUserEpic = action$ => {
    console.log('asdasdadasd')
    return action$.pipe(
        ofType('PING'),
        mergeMap(action =>
            ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
                map(response => fetchUserFulfilled(response))
            )
        )
)};

// later...
// dispatch({ type: 'PING' });

// const fetchUserEpic=(action$, state$) => {
//     return action$.ofType('METHODS')
//                   .pipe(
//                       mergeMap(() => {
//                               const state=state$.value;
//                               if (state.isEdit) {
//                                   return action$.ofType('CONTROL')
//                                                 .pipe(
//                                                     map(control => {
//                                                         if (control.payload && control.payload.command === "cancel") {
//                                                             return {
//                                                                 type : "CANCEL",
//                                                             }
//                                                         }
//                                                         else if (control.payload && control.payload.command === "continue") {
//                                                             return {
//                                                                 type : "CONTINUE",
//                                                             }
//                                                         }
//                                                     })
//                                                 )
//                               }
//                               else {
//                                   const f=of;
//                                   return of({type : 'INCREMENT'})
//                               }
//                           }
//                       )
//                   )
// }

// const fetchUserEpic = (action$, state$) => {
//     console.log(action$, state$);
//     action$.map(()=>({type:'fetch_user_ing'}))
//     // action$
//     //     .ofType("METHODS")
//     //     //.map(()=>({type:'fetch_user_ing'}))
//     //     .do(action => console.log('action', action))
//     //     .map(action=>({type : 'INCREMENT'}))
//     //     // .flatMap(()=>{
//     //     //     const isEdit = state$.isEdit;
//     //     //     // return Observable
//     //     //     //     // .ajax
//     //     //     //     // .get('/api/user/1')
//     //     //     //     .map(user => ({ type: 'fetch_user_done', user }))
//     //     //     //     .takeUntil(action$.ofType('fetch_user_cancel'))
//     //     // })
// }

/**
 * there is only one epic.
 */
export const rootEpic=combineEpics(
    //fetchUser,
    fetchUserEpic
);