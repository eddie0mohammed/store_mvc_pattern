
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');

const errorController = require('./controllers/error');





const app = express();

//templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

//serving static files from PUBLIC
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminData.router);
app.use(shopRoutes);


//404 error
app.use(errorController.error)




app.listen(3000, () => {
    console.log('server listening on port 3000');
})