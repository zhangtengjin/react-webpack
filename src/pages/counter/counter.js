/*
* @Author: 12574
* @Date:   2018-11-06 13:37:06
* @Last Modified by:   zhang
* @Last Modified time: 2018-11-06 14:51:41
*/
import React, {Component} from 'react';
import {increment, decrement, reset} from '../counter/store/actionCreators.js';
import { connect } from 'react-redux';
class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数{this.props.counter}</div>
                <button onClick={() => this.props.increment()}>自增</button>
                <button onClick={() => this.props.decrement()}>自减</button>
                <button onClick={() => this.props.reset()}>重置</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter.count
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Counter);