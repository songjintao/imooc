import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        Modal.alert('注销', '确认退出吗？', [
            {text: '取消', onPress: ()=>console.log('取消')},
            {text: '确认', onPress: ()=> {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            }}
        ])
    }

    render() {
        return this.props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt='' />}
                    title={this.props.user}
                    message={this.props.type==='boss' ? this.props.company : null}
                ></Result>
                <List renderHeader={()=>'简介'}>
                    <List.Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v=> <List.Item.Brief key={v}>{v}</List.Item.Brief>)}
                        {this.props.money?<List.Item.Brief>薪资:{this.props.money}</List.Item.Brief> : null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item onClick={this.logout}>退出登录</List.Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo} />
    }
}

export default User