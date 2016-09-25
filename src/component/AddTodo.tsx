import * as React from 'react'

interface IProps{
    onAddClick:any;
}

export default class AddTodo extends React.Component<IProps,any>{
    _input:HTMLInputElement;
    handleClick(){
        var text = this._input.value.trim();
        this.props.onAddClick(text);
        this._input.value='';
    }
    render(){
        return (
            <div>
                <input type="text" ref={a=>this._input=a}/>
                <button onClick={()=>this.handleClick()}> Add </button>
            </div>
        )
    }
}