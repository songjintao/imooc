import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)

        this.state = {
            type: 'genius',
            user: '',
            pwd: '',
            repeatpwd: ''
        }

        this.handleRegister = this.handleRegister.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    login() {
        this.props.history.push('/login')
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleRegister() {
        console.log(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <h2>我是注册页</h2>
                <WingBlank>
                    <List>
                        <InputItem 
                            onChange={v=>this.handleChange('user', v)}
                        >用户</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.handleChange('pwd', v)}
                        >密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.handleChange('repeatpwd', v)}
                        >密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem
                            checked={this.state.type === 'genius'}
                            onChange={()=> {
                                this.handleChange('type', 'genius')
                            }}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={()=> {
                                this.handleChange('type', 'boss')
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