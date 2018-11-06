/*
* @Author: 12574
* @Date:   2018-11-06 11:03:00
* @Last Modified by:   12574
* @Last Modified time: 2018-11-06 14:21:52
*/

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';


import Login from '../src/pages/login/index.js';
import Home from '../src/pages/home/index.js';
import Counter from '../src/pages/counter/counter.js';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Route path='/' exact component={Home} ></Route>
                        <Route path='/counter' exact component={Counter} ></Route>
                        <Route path='/login' exact component={Login} ></Route>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}
export default App