import { combineReducers } from 'redux'
import * as extend from 'extend';

import {TodoActions,CreateTodo} from '../actions/TodoActions';
import TodoConstants, {VisibilityFilters} from '../constants/TodoConstants';

const todoApp = combineReducers({
    VisibilityFilter: setVisibilityFilter,
    todos: todos
})

function todos(state = [], action:TodoActions) {
    switch (action.type) {
        case TodoConstants.CREATE:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case TodoConstants.TOGGLE_TODO:
            return state.map((v, index) => {
                return action.index === index ? extend({}, v, {
                    completed: !v.completed
                }) : v;
            })
        default:
            return state;
    }
}

function setVisibilityFilter(state = VisibilityFilters.SHOW_ALL, action:TodoActions) {
    switch (action.type) {
        case TodoConstants.SET_VISIBILITY_FILTER:
            return action.filter;    
        default:
            return state;
    }
}

export {todoApp,TodoActions,VisibilityFilters}
