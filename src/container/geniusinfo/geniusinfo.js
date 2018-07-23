import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatorSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            avatar: '',
            desc: ''
        }
        this.onChange = this.onChange.bind(this)
        this.update = this.update.bind(this)
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    update() {
        this.props.update(this.state)
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">GeniusInfo</NavBar>
                <AvatorSelector
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                ></AvatorSelector>
                <InputItem onChange={(v) => { this.onChange('title', v) }}>
                    应聘职位
                </InputItem>
                <TextareaItem
                    title='个人简介'
                    row={3}
                    autoHeight
                    onChange={(v) => { this.onChange('desc', v) }}>
                </TextareaItem>
                <Button
                    onClick={this.update}
                    type='primary'>
                    保存
                </Button>
            </div>
        )
    }
}

export default GeniusInfo