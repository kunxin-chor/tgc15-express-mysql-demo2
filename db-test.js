// make sure that we require in mysql2/promise
// we want to use promise version
// the promise version allows us to use async/await
const mysql = require('mysql2/promise');

async function run() {
    // create a connection to the database
    const connection = await mysql.createConnection({
        host: 'localhost', // localhost means the current machine
        user: 'root',
        password: '',
        database: 'sakila'
    });
    // execute function returns an array of return values
    // the first element of the array is all the rows from the database

    // -- long form version
    // let results = await connection.execute("SELECT * FROM actor");
    // let actors = results[0];

    // -- short form version
    // uses array destructuring
    let [actors] = await connection.execute("SELECT * from actor");

    console.log(actors);

}

run();