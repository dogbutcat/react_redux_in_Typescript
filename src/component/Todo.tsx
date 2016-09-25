import * as React from 'react';
import { ITodo } from '../constants/TodoConstants'

interface IProps extends ITodo{
    onClick:any;
}

export default class Todo extends React.Component<IProps,any>{
    render(){
        var styleObj ={
            textDecoration:this.props.completed?'line-through':'none',
            cursor:this.props.completed?'default':'pointer'
        }
        return (
            <li onClick={this.props.onClick} style={styleObj}>
                {this.props.text}
            </li>
        )
    }
}