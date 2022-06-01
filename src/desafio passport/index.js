const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const res = require('express/lib/response');
let config = require('./config/index.js');
const mongoStore = require("connect-mongo");
const expressSession = require("express-session");
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const { passport } = require('./components/login/controller/passportController')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next()
});





app.use(expressSession({
    store: mongoStore.create({
        mongoUrl: "mongodb+srv://root:root@cluster0.5dnqz.mongodb.net/everdadb?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: "secret",
    resave: false,
    rolling: true,
    cookie: { maxAge: 1000 * 60 * 10 },
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/loginRouter'))
app.use('/', require('./routes/viewsRouter'))


