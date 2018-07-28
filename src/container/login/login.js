import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {login} from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form'

@connect(
    state=> state.user,
    {login}
)
@imoocFrom
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.register = this.register.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        this.state = {
            user: '',
            pwd: ''
        }
    }
    register() {
        this.props.history.push('/register')
    }
    handleLogin() {
        this.props.login(this.props.state)
    }
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }
    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login'? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <h2>我是登录页</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=> {this.props.handleChange('user', v)}}
                        >用户</InputItem>
                        <InputItem
                            onChange={v=>{this.props.handleChange('pwd', v)}}
                            type='password'
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div> 
        )
    }
}
export default Login