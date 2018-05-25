/*
* @Author: 59246
* @Date:   2018-05-25 10:40:18
* @Last Modified by:   59246
* @Last Modified time: 2018-05-25 14:23:35
*/
 function getStarArray(count, size, score) {
	let starArr = [];
	// 判断星星先看全得有几个
	let allStar = ((Math.floor(score * 2)) / 2);
	let onStar = Math.floor(allStar);
	let halfStar = allStar % 1;
	for (let i = 0; i < onStar; i++) {
		if (size === 1) {
			starArr.push('star_on_1')
		} else if (size === 2) {
			starArr.push('star_on_2')
		} else if (size === 3) {
			starArr.push('star_on_3')
		}
	}
	// 判断是不是有半颗星的
	if (halfStar > 0) {
		if (size === 1) {
			starArr.push('star_half_1')
		} else if (size === 2) {
			starArr.push('star_half_2')
		} else if (size === 3) {
			starArr.push('star_half_3')
		}
	}
	// 把剩下的off加进
	while (count > starArr.length) {
		if (size === 1) {
			starArr.push('star_off_1')
		} else if (size === 2) {
			starArr.push('star_off_2')
		} else if (size === 3) {
			starArr.push('star_off_3')
		}
	}
	return starArr
}
export {getStarArray}
