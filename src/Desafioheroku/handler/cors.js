
let cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next()
};

module.exports = cors;

