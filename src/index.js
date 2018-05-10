import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'//支持redux异步
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import reducers from './reducer'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'

import AuthRoute from './component/authroute/authroute'

import './error-msg.css'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f//支持redux扩展

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
))

function Boss() {
    return <h2>BOSS页面</h2>
}

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Route path='/boss' component={Boss}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)
