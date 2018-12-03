const translateSquare = (square) => {
    const match = square.match(/\d+/g)

    return match
}

let idMap = {}

const fillMap = ([id, startX, startY, width, height], map) => {
    for (let x = parseInt(startX); x < parseInt(startX) + parseInt(width); x++) {
        for (let y = parseInt(startY); y < parseInt(startY) + parseInt(height); y++) {
            if (map[x] === undefined) {
                map[x] = {}
            }

            // console.log(id, x, y, width, height)

            if (map[x][y] === undefined) {
                if (idMap[id] !== 'X') { 
                    idMap[id] = id
                }
                map[x][y] = id
            } else {
                idMap[id] = 'X'
                idMap[map[x][y]] = 'X'

                map[x][y] = 'X'
            }
        }
    }

    // console.log(map)

    return map
}

const renderCoordrinateMap = (input) => {
    return input.reduce((map, square) => {
        const translatedSquare = translateSquare(square)

        return fillMap(translatedSquare, map)
    }, {})
}

const day3part1 = (input) => {
    const coordinateMap = renderCoordrinateMap(input)

    const arrayMap = 
        Object.keys(coordinateMap)
            .map(key => Object.values(coordinateMap[key]))
            .reduce(function(a, b) {
                return a.concat(b);
            }, [])

    return arrayMap.reduce((a, b) => {
        b === 'X' && a++

        return a
    }, 0)
}

const day3part2 = (input) => {
    idMap = {}

    day3part1(input)

    return Object.values(idMap).filter(value => value !== 'X')
}

module.exports = {
    day3part1,
    day3part2
}