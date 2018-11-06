/*
* @Author: 12574
* @Date:   2018-11-03 17:39:33
* @Last Modified by:   12574
* @Last Modified time: 2018-11-05 18:57:32
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.less';

class Hello extends Component {
    render() {
        return (
            <div>
                hello, webpack,i'm react
            </div>
        )
    }
}

ReactDOM.render(
    <Hello/>,
    document.getElementById('root')
)