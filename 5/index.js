const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const clearReactivePolymers = (input) => {
    return input.split('').reduce((state, character) => {
        if (
            Math.abs(state.charCodeAt(state.length - 1) - character.charCodeAt(0)) === 32
        ) {
            state = state.slice(0, -1)
        } else {
            state += character
        }

        return state
    }, '')
}


const day5part1 = (input) => clearReactivePolymers(input).length

const getAllCharacters = (input) => 
    Object.values(input.split('').reduce((characterMap, char) => {
        characterMap[char.toUpperCase()] = char.toUpperCase() 

        return characterMap
    }, {}))

function removeAllCharacters(character, input) {
    const regex = new RegExp(character.toLowerCase() + "|" + character.toUpperCase(), "g")

    return input.replace(regex, '')
}

const day5part2 = async (input) => {
    const allCharsChunks = chunkArray(getAllCharacters(input), 7)
    
    const resultChunks = await Promise.all(allCharsChunks.map((charChunk) => {
        console.log('Creating worker')
        
        const start = Date.now()
        return createWorker(charChunk, input).then(res => console.log(Date.now() - start) || res)
    }))

    return resultChunks.sort((a, b) => a - b)[0]
}

const createWorker = (charChunk, input) => {
    return new Promise((resolve, reject) => {
        let w = new Worker(__filename, { workerData: { input, charChunk } });
    
        w.on('message', (result) => { 
            resolve(result);
        })
        
        w.on('error', (msg) => {
            reject(msg);
        });

        w.on('exit', (code) => {
            if(code != 0)
                  console.error(new Error(`Worker stopped with exit code ${code}`))
        });
    })   
}

function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

if(!isMainThread) {
    try {
        const start = Date.now()

        const result = workerData.charChunk
            .map((character) => removeAllCharacters(character, workerData.input))
            .map(day5part1)
            .sort((a, b) => a - b)[0]

        console.log('Worker step: ' +  (Date.now() - start))

        parentPort.postMessage(result);

    } catch(err) {
        console.log(err)
    }
} 

module.exports = {
    day5part1,
    day5part2
}