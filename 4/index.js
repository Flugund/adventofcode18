
function parseTime (datestring) {
    var parts = datestring.match(/(\d+)\-(\d+)\-(\d+)\s(\d+):(\d+)/);

    return Date.UTC(+parts[1], parts[2]-1, +parts[3], +parts[4], +parts[5]);
}

const transformLogEntries = (input) => {

    let eventState = {}

    return input.map(entry => {
        const result = entry.match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/)

        const date = '2018' + result[0].substring(4, result[0].length)

        const timestamp = parseTime(date)

        const event = entry.substring(19, entry.length)

        return {
            timestamp,
            date,
            event
        }
    })
    .sort(sortLogEntries)
    .reduce((sleepingList, entry) => {
        const guardId = entry.event.match(/\d+/g)

        if (guardId) {
            eventState = {
                guardId: guardId[0]
            }
        }
        
        if (entry.event === 'wakes up') {
            eventState.endTime = entry.timestamp
            eventState.endDate = entry.date

            sleepingList.push(eventState)

            eventState = {
                guardId: eventState.guardId,
            }
        }
        
        if (entry.event === 'falls asleep') {
            eventState.startTime = entry.timestamp
            eventState.startDate = entry.date
        }

        return sleepingList
        
    }, [])
}

const sortLogEntries = (a, b) => {
    return a.timestamp - b.timestamp
}

const timeAsleepPerId = (sleepPerId, entry) => {
    if (sleepPerId[entry.guardId] === undefined) {
        sleepPerId[entry.guardId] = { quardId : entry.guardId, sleepTime: 0 }
    }  

    sleepPerId[entry.guardId].sleepTime += entry.endTime - entry.startTime

    return sleepPerId
}

const getSleepiestGuard = (a, b) => {
    return b.sleepTime - a.sleepTime 
}

const getAllMinutes = (startDate, endDate) => {
    const parseStartMinute = parseInt(startDate.substring(startDate.length-2, startDate.length))
    const parseStartHour = parseInt(startDate.substring(startDate.length-5, startDate.length-3))

    const parseEndMinute = parseInt(endDate.substring(endDate.length-2, endDate.length))
    const parseEndHour = parseInt(endDate.substring(endDate.length-5, endDate.length-3))
    
    // console.log(parseStartMinute, parseStartHour)
    // console.log(parseEndMinute, parseEndHour)

    const minutes = []

    for (let hour = parseStartHour; hour <= parseEndHour; hour++) {
        for (let minute = parseStartMinute; minute < 60 && minute < parseEndMinute; minute++) {
            console.log(minute)
            minutes.push(minute)
        }
    }

    return minutes
}

const groupBySleeptMinute = (a, b) => {
    console.log(b.startDate, b.endDate, b)

    const minutes = getAllMinutes(b.startDate, b.endDate)

    minutes.forEach(minute => {
        if (a[minute] === undefined) {
            a[minute] = {
                sleptMinute: minute,
                times: 0,
                guardId: b.guardId
            }
        }
    
        a[minute].times++
    })
    
    return a
}

const day4part1 = (input) => {
    const sortedLogs = 
        transformLogEntries(input)

    const guardId = 
        Object.values(sortedLogs
            .reduce(timeAsleepPerId, {}))
            .sort(getSleepiestGuard)[0].quardId

    console.log(guardId)

    const minute = 
        Object.values(sortedLogs
            .filter((entry) => entry.guardId === guardId)
            .reduce(groupBySleeptMinute, {}))
            .sort((a, b) => b.times - a.times)[0].sleptMinute

    console.log(minute)

    return guardId * minute
}

const day4part2 = (input) => {
    const sortedLogs = 
        transformLogEntries(input)

    const guardId = 
        Object.values(sortedLogs
            .reduce(timeAsleepPerId, {}))
            
            .sort(getSleepiestGuard)[0].quardId


    const guardIds = Object.values(sortedLogs.reduce((a, b) => {
        a[b.guardId] = b.guardId

        return a
    }, {}))

    // console.log(guardIds)

    const guardMinutes = 
        guardIds.map(guardId =>
            Object.values(sortedLogs
                .filter((entry) => entry.guardId === guardId)
                .reduce(groupBySleeptMinute, {}))
                    .sort((a, b) => b.times - a.times)[0])

    const winner = guardMinutes.sort((a, b) => b.times - a.times)[0]


    return winner.guardId * winner.sleptMinute
}

module.exports = {
    day4part1,
    day4part2
}