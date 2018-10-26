import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppEpic from './App-epics';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootEpic } from './epics';

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import 'rxjs';
import { createEpicMiddleware } from 'redux-observable';

//const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware();

//const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const store = createStore(reducer, applyMiddleware(epicMiddleware));

//sagaMiddleware.run(rootSaga)
epicMiddleware.run(rootEpic)
ReactDOM.render(<Provider store={store}><AppEpic /></Provider>, document.getElementById('root'));

