let { fork } = require('child_process')


let getRandomNumbers = async (req, res, next) => {
    let randomProcess = fork('./components/random/services/randomFork.js')
    let quantity = req.query
    if (!quantity.cant) quantity.cant = 1000000000
    randomProcess.send(quantity)
    randomProcess.on('message', response => {
        res.send(response)
        console.log("termine");
    })

}





module.exports = {
    getRandomNumbers
}