import React from 'react'
import APP from './App'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from './Auth.redux'

@connect(
    state=>state.auth,
    {logout}
)
class Dashboard extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        const match = this.props.match
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                <h1>独立团</h1>
                {this.props.isAuth?<button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li>
                        <Link to={`${match.url}`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/two`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/three`}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={`${match.url}`} exact  component={APP}></Route>
                <Route path={`${match.url}/two`} component={Two}></Route>
                <Route path={`${match.url}/three`} component={Three}></Route>
            </div>
        )
        return this.props.isAuth? app: redirectToLogin
    }
}

function Two() {
    return <h2>二营</h2>
}
function Three() {
    return <h2>骑兵连</h2>
}

export default Dashboard