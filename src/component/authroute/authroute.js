import React from 'react'
import axios from 'axios'
import { withRouter }from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        // 获取用户信息
        axios.get('/user/info')
        .then(res=> {
            if(res.status === 200 ) {
                if(res.data.code === 200) {
                    //有登陆信息的
                }else {
                    this.props.history.push('/login')
                }
            }
        })
        .catch(err=> {
            throw Error(err)
        })
    }

    render() {
        return (
            <h3>authroute</h3>
        )
    }
}
export default AuthRoute