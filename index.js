const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const mysql = require('mysql2/promise');
const helpers = require('handlebars-helpers')({
    'handlebars': hbs.handlebars
})

// create the express application
const app = express();

// 1. set the public folder (where the image files, css and js files are stored)
app.use(express.static('public'));

// 2. set the view engine to be hbs
app.set('view engine', 'hbs');

// 3. enable form processing
app.use(express.urlencoded({
    'extended': false
}))

// 4. enable template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// routes

async function main() {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sakila'
    })

    // req -> contains the data sent to the server via the client
    // res -> allows us to send data back to the client
    app.get('/actors', async function(req,res){

        // execute() returns an array as the return value
        // the first element of the array contains the rows from the database
        let results = await connection.execute("select * from actor");
        let actors = results[0];

        // shortcut using array destructuring:
        // let [actors] = await connection.execute("select * from actor");

        // console.log(actors);

        res.render('actors',{
            'actors': actors
        })

    })
}
main();


// start the server to listen for connection
app.listen(3000, function(){
    console.log("Server has started");
});