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

    // one route to display the form to add the actor
    app.get('/actor/create', async function(req,res){
        res.render('create_actor');
    });

    app.post('/actor/create', async function(req,res){
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;

        // destructure with renames
        // const { first_name:firstName, last_name:lastName } = req.body;

        const query = "INSERT INTO actor (first_name, last_name) VALUES (?, ?);"
        await connection.execute(query, [ 
            firstName, lastName
        ])
        res.redirect('/actors')
    })

    // edit actor
    app.get('/actor/:actor_id/edit', async function(req,res){
        let actorId = req.params.actor_id;
        let results = await connection.execute(
            "SELECT * FROM actor WHERE actor_id = ?", [actorId]);
        // let actor = results[0][0];  // results[0] will always be an array, even if
        //                          // there are no results or only one result

        let rows = results[0];
        let actor = rows[0];
        
        res.render('edit_actor',{
            'actor': actor
        })
    })

    // process the form for editing actor
    app.post('/actor/:actor_id/edit', async function(req,res){

        const query = 'UPDATE actor SET first_name=?, last_name=? WHERE actor_id = ?'
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const actorId = req.params.actor_id;
        await connection.execute(query, [firstName, lastName, actorId])
        res.redirect('/actors');
    })
}
main();


// start the server to listen for connection
app.listen(3000, function(){
    console.log("Server has started");
});