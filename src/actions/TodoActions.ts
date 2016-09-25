import { Action,ActionCreator } from 'redux'
import TodoConstants from '../constants/TodoConstants';

export interface TodoActions extends Action{
    index?:number;
    filter?:string;
    text?:string;
}

export const CreateTodo = TodoConstants.CREATE;
export type CreateTodo ={
    
}
export const toggle = TodoConstants.TOGGLE_TODO;
export type toggle={
}
export const setFilter = TodoConstants.SET_VISIBILITY_FILTER;
export type setFilter={
}

function addTodo(text):TodoActions{
    return {
        type:TodoConstants.CREATE,
        text:text
    }
}

function toggleTodo(index):TodoActions{
    return {
        type:TodoConstants.TOGGLE_TODO,
        index:index
    }
}

function setVisibilityFilter(filter):TodoActions{
    return {
        type:TodoConstants.SET_VISIBILITY_FILTER,
        filter:filter
    }
}

export {addTodo,toggleTodo,setVisibilityFilter}