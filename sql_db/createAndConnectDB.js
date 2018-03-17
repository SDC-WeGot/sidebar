const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';
const { Client } = require('pg')
const client = new Client(connectionString)

async function myDB () {

    await client.connect();
    
    const res = await client.query('CREATE TABLE restaruants(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)')
    console.log('okok') // Hello world!
    await client.end()

    const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
    const values = ['brianc', 'brian.m.carlson@gmail.com']
    
    // callback
    client.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
      }
    })
    
    // promise
    client.query(text, values)
      .then(res => {
        console.log(res.rows[0])
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
      })
      .catch(e => console.error(e.stack))
    
    // async/await
    try {
      const res = await pool.query(text, values)
      console.log(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch(err) {
      console.log(err.stack)
    }
    
}

myDB();


///////////-----------------------------/////////////

// const pgp = require('pg-promise')();

// const cn = {
//     host: 'localhost',
//     port: 5432,
//     database: 'wegot-sidebar',
//     user: 'student',
//     password: 'student'
// };


