export function saveStore (id, key, val) {
  let seller = window.localStorage.__store__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = val;
  window.localStorage.__store__ = JSON.stringify(seller);
}
export function getStore (id, key, def) {
  console.log(id)
  let seller = window.localStorage.__store__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ref = seller[key];
  return ref || def;
}
