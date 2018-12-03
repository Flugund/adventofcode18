const { day1, day1part2} = require('./index');
const fs = require('fs')
/*
console.log(day1([ +1, +1, +1 ]) === 3)
console.log(day1([ +1, +1, -2 ]) === 0)
console.log(day1([ -1, -2, -3 ]) === -6)
*/

console.log(day1part2([ +1, -1 ]) === 0)
console.log(day1part2([ +3, +3, +4, -2, -4 ]) === 10)
console.log(day1part2([ -6, +3, +8, +5, -6 ]) === 5)
console.log(day1part2([ +7, +7, -2, -7, -4 ]) === 14)

const input = fs.readFileSync("./input", "utf8").split(/\r?\n/)

// console.log(day1(input))
console.log(day1part2(input))