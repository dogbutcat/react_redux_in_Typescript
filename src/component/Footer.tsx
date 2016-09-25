import * as React from 'react';
import {VisibilityFilters} from '../constants/TodoConstants'
// import Test from './Test'

interface IProps {
    filter: string;
    onFilterChange: any;
}

export default class Footer extends React.Component<IProps, any>{
    shouldComponentUpdate(np:IProps,ns){
        return np.filter!==this.props.filter;
    }
    handleRadio(e){
        var filter = e.target.value;
        this.props.onFilterChange(filter);
    }
    renderFilter(contents) {
        var radio = [];
        for (var key in contents) {
            var value = contents[key];
            radio.push(<span key={key}><input type="radio" name="filter" onChange={(e)=>this.handleRadio(e)} value={value} checked={this.props.filter === value}/> {value}</span>)
        }
        return radio
    }
    render() {
        return (
            <div>
                {this.renderFilter(VisibilityFilters) }
            </div>
        )
    }
}

