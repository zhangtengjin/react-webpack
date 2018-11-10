/*
* @Author: 12574
* @Date:   2018-11-06 11:27:46
* @Last Modified by:   12574
* @Last Modified time: 2018-11-06 16:46:14
*/

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/login">登录</Link></li>
                    <li><Link to="/counter">计数</Link></li>
                </ul>
            </div>
        )
    }
}
export default Home;