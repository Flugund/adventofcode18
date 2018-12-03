const { day2part1, day2part2 } = require('./index');

const fs = require('fs')
/*
console.log(day2part1([ 
    'abcdef', 
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab'
]) === 12)*/

console.log(day2part2([
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz',
]) === 'fgij')

const input = fs.readFileSync("./input", "utf8").split(/\r?\n/)

console.log(day2part2(input))