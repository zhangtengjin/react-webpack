/*
* @Author: 12574
* @Date:   2018-11-05 19:53:14
* @Last Modified by:   12574
* @Last Modified time: 2018-11-05 19:57:10
*/

child = () => {
    let ele = document.createElement('div');
    ele.innerHTML = 'hah,我是第二个出口文件';
    return ele;
}
document.getElementById('root').appendChild(child());