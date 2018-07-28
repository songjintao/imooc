import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import {connect } from 'react-redux'
import {register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
    state=>state.user,
    {register}
)
@imoocForm
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)

        // this.state = {
        //     type: 'genius',
        //     user: '',
        //     pwd: '',
        //     repeatpwd: ''
        // }

        this.handleRegister = this.handleRegister.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }
    login() {
        this.props.history.push('/login')
    }
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }
    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }
    handleRegister() {
        this.props.register(this.props.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect  to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <h2>我是注册页</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}
                        >用户</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('repeatpwd', v)}
                        >密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem
                            checked={this.props.state.type === 'genius'}
                            onChange={()=> {
                                this.props.handleChange('type', 'genius')
                            }}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.props.state.type === 'boss'}
                            onChange={()=> {
                                this.props.handleChange('type', 'boss')
                            }}
                        >
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.login} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register