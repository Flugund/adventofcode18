const { day5part1, day5part2 } = require('./index');

const fs = require('fs')


/*
console.log(day5part1('aA') === '')
console.log(day5part1('abBA') === '')
console.log(day5part1('abAB') === 'abAB')
console.log(day5part1('aabAAB') === 'aabAAB')
const test1 = day5part1('dabAcCaCBAcCcaDA')

console.log(test1 === 'dabCBAcaDA', test1, 'dabCBAcaDA')
*/

// console.log(day5part2('dabAcCaCBAcCcaDA'), 4)
console.log(day5part2('dabAcCaCBAcCcaDA') === 4)

const input = fs.readFileSync("./input", "utf8")

// console.log(day5part1(input).length)

// const res = fs.readFileSync("./result", "utf8")
// console.log(res.length)

console.log(day5part2(input))

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}