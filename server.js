const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to the remote database...');
}).catch((err) => {
    console.log(err);
})

const app = express();
// setup template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars')
// setup express static public folder for CSS, JS, and images
app.use(express.static('public'));
// setup body parser to encode url
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// create collection with mongoose
const Schema = mongoose.Schema;
const Message = mongoose.model('message', new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message:{
        type: String
    }
}));
// setup environment variables
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/getMessage', (req, res) =>{
    const newMessage = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }
});

app.get('/experience', (req, res) => {
    res.render('experience');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})