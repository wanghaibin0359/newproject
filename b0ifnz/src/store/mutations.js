/*
* @Author: 59246
* @Date:   2018-05-22 09:31:02
* @Last Modified by:   59246
* @Last Modified time: 2018-05-22 10:55:21
*/

export default {
  drop (state, el) {
    console.log(1)
    let root = el.vm.$root;
    root.$children[0].$refs.shopcarts.drop(el.el)
  }
}
