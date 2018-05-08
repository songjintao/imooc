import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from './index.redux'

// App = connect(mapStatetoProps, actionCreators)(App)
@connect(
    // 需要放到props里的属性
    state=>({num: state.counter}), 
    // 需要放到props里的方法 自动dispatch
    {addGun, removeGun, addGunAsync }
)
class App extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>回收武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        )
    }
}

export default App
