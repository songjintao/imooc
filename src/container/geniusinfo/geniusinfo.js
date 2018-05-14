import React from 'react'
import { NavBar } from 'antd-mobile'
import AvatorSelector from '../../component/avatar-selector/avatar-selector'

class GeniusInfo extends React.Component {
    render() {
        return (
            <div>
                <NavBar mode="dark">GeniusInfo</NavBar>
                <AvatorSelector></AvatorSelector>
            </div>
            
        )
    }
}

export default GeniusInfo