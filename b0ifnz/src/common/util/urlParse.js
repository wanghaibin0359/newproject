export function urlParse () {
  let url = window.location.search;
  // ['?id=12345', '&a=b']
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((val) => {
      let tempArr = val.substr(1).split('=');
      let key = tempArr[0];
      let values = tempArr[1];
      obj[key] = values;
    })
  }
  return obj;
}
