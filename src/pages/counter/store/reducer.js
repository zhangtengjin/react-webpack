/*
* @Author: 12574
* @Date:   2018-11-06 14:10:44
* @Last Modified by:   zhang
* @Last Modified time: 2018-11-06 14:50:22
*/

import * as constants from './constants';

const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case constants.INCREMENT:
            return {
                count: state.count + 1
            };
        case constants.DECREMENT:
            return {
                count: state.count - 1
            };
        case constants.RESET:
            return {count: 0};
        default:
            return state
    }
}