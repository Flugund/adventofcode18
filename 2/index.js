
const count = (id, target) => {
    let map = {}

    id.split('').forEach((character) => {
        map[character] ? map[character]++ : map[character] = 1
    })

    // console.log(map)

    return Object.keys(map).reduce((a, b) => {
        if (map[b] === target) {
            a = 1
        }

        return a
    }, 0)
}

const day2part1 = (input) => {
    const res = input.reduce((counter, id) => {

        counter.three += count(id, 3)
        counter.two += count(id, 2)

        return counter
    }, { three: 0, two: 0 })



    return res.three * res.two
}

const diff = (str1, str2) => {
    const str1List = str1.split('')
    const str2List = str2.split('')

    return str1List.reduce((a, b, index) => {
        if (b !== str2List[index]) {
            a++
        }

        return a
    }, 0)
}

const common = (str1, str2) => {
    const str1List = str1.split('')
    const str2List = str2.split('')

    return str1List.reduce((a, b, index) => {
        if (b === str2List[index]) {
            a += b
        }

        return a
    }, '')
}

function cartesian() {
    var r = [], arg = arguments, max = arg.length-1;
    function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}


const day2part2 = (input) => {

    const cart = cartesian(input, input)

    console.log(cart)

    const [str1, str2] = cart.find((([id1, id2]) => diff(id1, id2) === 1))

    console.log(str1, str2)

    const str = common(str1, str2)

    console.log(str)

    return str
}

module.exports = {
    day2part1,
    day2part2
}