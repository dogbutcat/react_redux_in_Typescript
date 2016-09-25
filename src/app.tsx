import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { VisibilityFilters,TodoState,ITodo } from './constants/TodoConstants'
import * as TodoActions from './actions/TodoActions'
// import {addTodo,getAll,toggleTodo,setVisibilityFilter,TodoActions} from './actions/TodoActions'
import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';
import Footer from './component/Footer';

interface IProps{
    dispatch:any;
    // visibilityFilter:any;
    // visibleTodos:any;
}

interface StateProps{
    visibleTodos:ITodo[];
    visibilityFilter:string;
}

interface DispatchProps{
    addTodo(text:string);
    toggleTodo(index:number);
    setVisibilityFilter(filter:string);
}

export type HomeProps = IProps & StateProps;

@connect<StateProps,any,any>(mapStateToProps)
export default class App extends React.Component<HomeProps,any>{
    render(){
        const {visibilityFilter,visibleTodos,dispatch} = this.props;
        return (
            <div>
                <AddTodo onAddClick={text=>dispatch(TodoActions.addTodo(text))}>
                </AddTodo>

                <TodoList todos={visibleTodos} onClick={todo=>dispatch(TodoActions.toggleTodo(todo))}>
                </TodoList>

                <Footer filter={visibilityFilter} onFilterChange={filter=>dispatch(TodoActions.setVisibilityFilter(filter))}>
                </Footer>
            </div>
        )
    }
}

function selectTodos(todos:ITodo[],filter){
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(v=>!v.completed)
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(v=>v.completed);
    }
}

function mapStateToProps(state:TodoState){
    return {
        visibleTodos:selectTodos(state.todos,state.VisibilityFilter),
        visibilityFilter:state.VisibilityFilter
    }
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators(TodoActions,dispatch);
// }