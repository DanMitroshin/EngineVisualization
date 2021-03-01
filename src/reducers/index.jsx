import {createStore, combineReducers, applyMiddleware} from 'redux';
import {user} from "./user";
import {courses} from "./courses";

const store_name = "Engine-v.0.0.5";

const logger = store => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

const saver = store => next => action => {
    let result = next(action);
    localStorage[store_name] = JSON.stringify(store.getState());
    return result;
};

const initStorage = (initialState = {}) => {
    if (localStorage.getItem(store_name) !== null) {
        return JSON.parse(localStorage.getItem(store_name));
    } else {
        localStorage.setItem(store_name, JSON.stringify(initialState));
        return initialState;
    }
};

export const storeFactory = (initialState = {}) => (
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({
            user,
            courses
        }),
        initStorage(initialState)
    )
);
