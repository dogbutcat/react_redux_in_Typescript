export default {
    CREATE: 'CREATE',
    GET_ALL: 'GET_ALL',
    TOGGLE_TODO: 'TOGGLE_TODO',
    SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER'
}

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export interface TodoState {
    VisibilityFilter?: string;
    todos?: ITodo[];
}

export interface ITodo {
    text: string;
    completed: boolean;
}