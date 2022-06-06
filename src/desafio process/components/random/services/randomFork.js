console.log("desde el hijo");
process.on('message', data => {

    let numberObject = {}
    let keys = []
    for (let index = 0; index < data.cant; index++) {
        let randomNumber = parseInt(Math.floor(Math.random() * 10000)+1)
        //console.log(randomNumber);
        keys.push(randomNumber)
    }
    const occurrences = keys.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
    process.send(occurrences)
    process.exit()

})





