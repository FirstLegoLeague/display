import React, { Component } from 'react'
import '../../../scss/components/NumericSlider.scss'

const DEFAULT_MIN = "0"
const DEFAULT_MAX = "1000"

class NumericSlider extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        return <input id={this.props.setting.key} name={this.props.setting.key}
            type="range" min={this.props.min || DEFAULT_MIN} max={this.props.max || MADEFAULT_MAX} 
            defaultValue={this.props.setting.value} className="slider"
            onChange={this.props.onUpdate}/>
    }
}

export default NumericSlider