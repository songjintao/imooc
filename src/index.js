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
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'

import AuthRoute from './component/authroute/authroute'

import './index.css'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f//支持redux扩展

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
))

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route component={Dashboard}></Route>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)
