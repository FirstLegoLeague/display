import React, { Component } from 'react'
import '../../../scss/components/NumericSlider.scss'

const MIN = "10"
const MAX = "1000"

class NumericSlider extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        return <input id={this.props.setting.key} name={this.props.setting.key}
            type="range" min={this.props.min || MIN} max={this.props.max || MAX} defaultValue={this.props.setting.value} className="slider"
            onChange={this.props.onUpdate}/>
    }
}

export default NumericSlider