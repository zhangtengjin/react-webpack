/*
* @Author: 12574
* @Date:   2018-11-06 14:10:24
* @Last Modified by:   zhang
* @Last Modified time: 2018-11-06 14:49:09
*/

import * as constants from './constants.js';


export function increment() {
    return {type: constants.INCREMENT}
}

export function decrement() {
    return {type: constants.DECREMENT}
}

export function reset() {
    return {type: constants.RESET}
}