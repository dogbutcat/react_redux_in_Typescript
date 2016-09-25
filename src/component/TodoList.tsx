import * as React from 'react';
import { TodoState,ITodo } from '../constants/TodoConstants';
import Todo from './Todo'

interface IProps extends TodoState{
    onClick:any;
    todos:ITodo[];
}

export default class TodoList extends React.Component<IProps,any>{
    render(){
        return (
            <ul>
                {this.props.todos.map((v,index)=>{
                    return <Todo key={index} onClick={()=>this.props.onClick(index)} {...v}></Todo>
                })}
            </ul>
        )
    }
}