const floatNumber = 2.1;

const multiplyFloatNumber = (num, multiplier) => num * (multiplier || 2);

console.log(multiplyFloatNumber(floatNumber));
console.log(multiplyFloatNumber(floatNumber, 5));
