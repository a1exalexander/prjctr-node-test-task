const invert = (obj) => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    const entries = Object.entries(obj);
    const reversedValues = entries.map((args) => args.reverse());
    const inverted = Object.fromEntries(reversedValues);
    return inverted;
  }
  return {};
};

console.log(groupBy([3.6, 3.7, 6.4, 8.9], Math.floor)); // { '3': [3.6, 3.7], '6': [6.4], '8': [8.9] }
