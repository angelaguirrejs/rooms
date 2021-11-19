const express = require('express');
const morgan = require('morgan');

const app = express();

//Settings

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes

app.use(require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log(`Middleware on port 3000`);
});