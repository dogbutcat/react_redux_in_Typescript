import { TodoState } from './../constants/TodoConstants';
import { combineReducers } from 'redux'
import * as extend from 'extend';

import * as TodoActions from '../actions/TodoActions';
import TodoConstants, {VisibilityFilters,ITodo} from '../constants/TodoConstants';

const todoApp = combineReducers<TodoState>({
    VisibilityFilter: setVisibilityFilter,
    todos: todos
})

function todos(state = [], action:TodoActions.TodoActions) {
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

function setVisibilityFilter(state = VisibilityFilters.SHOW_ALL, action:TodoActions.TodoActions) {
    switch (action.type) {
        case TodoConstants.SET_VISIBILITY_FILTER:
            return action.filter;    
        default:
            return state;
    }
}

export {todoApp,TodoActions,VisibilityFilters}
