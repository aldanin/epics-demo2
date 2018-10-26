import 'rxjs';
import {Observable, of} from 'rxjs';
import {combineEpics, ofType} from 'redux-observable';
import * as actions from './actions';
import {ajax} from 'rxjs/observable/dom/ajax';
import {map, mergeMap} from 'rxjs/operators'

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

const fetchUserEpic=(action$, state$) => {
    console.log(action$, state$);
    return action$
        .pipe(
            ofType("METHODS"),
            mergeMap((action) => {
                const isEdit=state$.isEdit;
                if (isEdit) {
                    return action$.pipe(
                        map(action => action.payload)
                    )
                }
                else {
                    return action$.pipe(
                        map(action => action.payload)
                    )
                }
            })
        )
}

/**
 * there is only one epic.
 */
export const rootEpic=combineEpics(
    fetchUserEpic
);