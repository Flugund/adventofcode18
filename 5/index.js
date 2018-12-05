const isSameLetter = (character1, character2) => {
    return character1.toUpperCase() === character2.toUpperCase()
}

const isOppositePolarity = (character1, character2) => {
    return character1 !== character2
}

const clearReactivePolymers = (input) => {
    const characters = input.split('')

    let state = characters.pop()
    
    while (characters.length) {
        const character = characters.pop()

        if (
            state[state.length - 1] &&
            isSameLetter(state[state.length - 1], character) &&
            isOppositePolarity(state[state.length - 1], character)
        ) {
            state = state.substring(0, state.length - 1)
        } else {
            state += character
        }
    }

    return state
}

const day5part1 = (input) => {
    return clearReactivePolymers(input).length
}

function getAllCharacters(input) {
    return Object.values(input.split('').reduce((characterMap, char) => {
        characterMap[char.toUpperCase()] = char.toUpperCase() 

        return characterMap
    }, {}))
}

function removeAllCharacters(character, input) {
    const regex = new RegExp(character.toLowerCase() + "|" + character.toUpperCase(), "g")

    return input.replace(regex, '')
}

const day5part2 = (input) => {
    const allCharacters = getAllCharacters(input)

    return allCharacters.map((character) => {
        const redactedInput = removeAllCharacters(character, input)

        const res = day5part1(redactedInput)

        console.log(res)

        return res
    }).sort((a, b) => a - b)[0]
}

module.exports = {
    day5part1,
    day5part2
}