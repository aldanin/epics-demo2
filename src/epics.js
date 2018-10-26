import 'rxjs';
import {Observable, of, from, concat} from 'rxjs';
import {combineEpics, ofType} from 'redux-observable';
import * as actions from './actions';
import {ajax} from 'rxjs/observable/dom/ajax';
import {map, mergeMap, switchMap, takeUntil} from 'rxjs/operators'

const handleControl=(action$, state$, origActions) => {
    return action$.pipe(
        ofType("CONTROL"),
        switchMap(control => {
            if (control.payload && control.payload.command === "cancel") {
                return of(1).pipe(map(() => ({
                    type : "CANCEL",
                })))
            }
            else if (control.payload && control.payload.command === "continue") {
                const finalActions = origActions.concat([{type: "IS_EDIT", isEdit: false},{type: "CONTROL_DONE"}]);
                return from(finalActions);
            }
        }),
        takeUntil(action$.pipe(
            ofType("IS_EDIT")
        ))
    )
}

const fetchUserEpic=(action$, state$) => {
    return action$.pipe(
        ofType("METHODS"),
        switchMap(action => {
            const origActions=action.payload;

            const isEdit=state$.value.isEdit;
            if (isEdit) {
                return handleControl(action$, state$, origActions);
            }
            else {
                return from(origActions);
            }
        }),
    )
}

/**
 * there is only one epic.
 */
export const rootEpic=combineEpics(
    fetchUserEpic,
);