
const day1 = (input) => {
    return input.reduce((a, b) => parseInt(a) + parseInt(b), 0)
}

const day1part2 = (input) => {
    const frequenzyMap = {
        0: 1
    }

    return findDuplicate(input, frequenzyMap)
}

const findDuplicate = (input, frequenzyMap, f = 0) => {
    let twice

    f = input.reduce((a, b) => {
        const frequenzy = parseInt(a) + parseInt(b)

        if (frequenzyMap[frequenzy] === 1 && twice === undefined) {
            twice = frequenzy
        } else {
            frequenzyMap[frequenzy] = 1
        }

        return frequenzy
    }, f)

    if (twice === undefined) {
        twice = findDuplicate(input, frequenzyMap, f)
    }  

    return twice
}

module.exports = {
    day1,
    day1part2
}