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
                    {/* <Switch>
                        <Route path='/login' exact component={Auth}></Route>
                        <Route path='/dashboard' component={Dashboard}></Route>
                        <Redirect to='/dashboard'></Redirect>
                    </Switch> */}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    {/* 只渲染第一次命中的组件 */}
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)
