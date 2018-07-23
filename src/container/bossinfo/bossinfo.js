import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatorSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state=> state.user,
    {update}
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            money: '',
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
                { redirect && redirect !==path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">BossInfo</NavBar>
                <AvatorSelector
                    selectAvatar={(imgname)=> {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                ></AvatorSelector>
                <InputItem onChange={(v)=> {this.onChange('title', v)}}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v)=> {this.onChange('company', v)}}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v)=> {this.onChange('money', v)}}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    title='职位要求'
                    row={3}
                    autoHeight
                    onChange={(v)=> {this.onChange('desc', v)}}>
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

export default BossInfo