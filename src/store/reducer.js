/*
* @Author: 12574
* @Date:   2018-11-06 14:11:44
* @Last Modified by:   zhang
* @Last Modified time: 2018-11-06 14:27:50
*/
import { combineReducers } from 'redux';
import { reducer as counterReducer } from '../pages/counter/store';
const reducer = combineReducers({
    counter: counterReducer
})
export default reducer;