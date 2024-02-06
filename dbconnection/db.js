const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123',
  port: 5432,
});

client.connect((err, client, done) => {
    if (err) throw err;
    client.query('SELECT  *  FROM products', (err, res) => {
        if (err)
            console.log(err.stack);
        else {
            console.log(res.rows);
        }
        client.end()
    })
})