import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
    }
    register() {
        this.props.history.push('/register')
    }
    login() {
        this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <h2>我是注册页</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.login} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register