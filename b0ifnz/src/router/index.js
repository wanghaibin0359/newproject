/*
* @Author: 59246
* @Date:   2018-05-22 09:37:00
* @Last Modified by:   59246
* @Last Modified time: 2018-05-23 10:37:26
*/
// import goods from 'src/components/goods/goods';
//  import ratings from 'src/components/ratings/ratings';
// import seller from 'src/components/seller/seller';

const router = {
	mode: 'history',
	routes: [
		{	path: '/goods',
			component: (resolve) => require(['src/components/goods/goods'], resolve)
		},
		{path: '/ratings',
			component: (resolve) => require(['src/components/ratings/ratings'], resolve)
		},
		{path: '/seller',
			component: (resolve) => require(['src/components/seller/seller'], resolve),
      name: 'sellers'
		}],
  linkActiveClass: 'active'
	}
export default router;
