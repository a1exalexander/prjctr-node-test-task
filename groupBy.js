const groupBy = (array, func) => {
  if (Array.isArray(array) && typeof func === 'function') {
    return array.reduce((prev, cur) => {
      const key = String(func(cur));
      const groupedCopy = { ...prev };
      if (!Array.isArray(groupedCopy[key])) {
        groupedCopy[key] = [];
      }
      groupedCopy[key].push(cur);
      return groupedCopy;
    }, {});
  }
  return {};
};

console.log(invert({ a: 'some', b: 'object', c: 1 })); // { 'some': 'a', 'object': 'b', '1': 'c' }
