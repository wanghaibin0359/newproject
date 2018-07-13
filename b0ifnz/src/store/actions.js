/*
* @Author: 59246
* @Date:   2018-05-22 09:31:02
* @Last Modified by:   59246
* @Last Modified time: 2018-05-22 10:55:15
*/
import {ajax} from '../action/util';
export default {
  test (context) {
    console.log(context);
  },
  asyncGetGoods (context) {
      console.log('正在加载数据')
      return ajax.get('/goods').then((datas) => {
        context.commit('setGoods', datas.data)
        console.log('数据加载完成')
        return datas.data;
      })
  },
  asyncGetSeller (context) {
   return ajax.get('/seller').then((datas) => {
     context.commit('setSeller', datas.data)
     return datas.data
   })
  },
  asyncGetRating (context) {
    return ajax.get('/ratings').then((datas) => {
      context.commit('setRating', datas.data)
      return datas.data
    })
  }
}

