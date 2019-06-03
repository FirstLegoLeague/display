import React, { Component } from 'react'
import '../../../scss/components/NumericSlider.scss'

class NumericSlider extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        return [<input id={this.props.setting.key} name={this.props.setting.key}
            type="range" min="10" max="10000" defaultValue={this.props.setting.value} className="slider"
            onChange={this.props.onUpdate}/>]
    }
}

export default NumericSlider