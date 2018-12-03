const { day3part1, day3part2 } = require('./index');

const fs = require('fs')

/*
console.log(day3part1([ 
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2',
]) === 4)*/

const input = fs.readFileSync("./input", "utf8").split(/\r?\n/)

console.log(day3part2(input))

/*console.log(day3part2([ 
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2',
]))*/