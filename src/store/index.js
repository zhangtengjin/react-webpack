/*
* @Author: 12574
* @Date:   2018-11-06 14:11:33
* @Last Modified by:   12574
* @Last Modified time: 2018-11-06 14:20:25
*/
import { createStore, } from 'redux';
import reducer from './reducer.js';

const store = createStore(reducer);

export default store;