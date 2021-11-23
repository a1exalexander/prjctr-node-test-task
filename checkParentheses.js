const checkParentheses = (str) => {
  const splited = str.split('');

  const isValid = (brackets) => {
    const filtered = splited.filter((symbol) => {
      return brackets.includes(symbol);
    });
    if (filtered.length % 2) return false;
    return !filtered.reduce((prev) => {
      return prev.replace(brackets, '');
    }, filtered.join(''));
  };

  const isRoundBracketsValid = isValid('()');
  const isBracesValid = isValid('{}');
  const isSquareBrackets = isValid('[]');

  return isRoundBracketsValid && isBracesValid && isSquareBrackets;
};

console.log(checkParentheses('--()--')); // true
console.log(checkParentheses('-a]--[')); // false
console.log(checkParentheses('dsa{vsfs{ad')); // false
console.log(checkParentheses('j78(g5b]uyg')); // false
console.log(checkParentheses(',m{i987y}hj')); // true
console.log(checkParentheses('dsa[3ed---:]::')); // true
