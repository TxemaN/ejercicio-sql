const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database:'Blog' ,
    password: "1234"

  });

  module.exports = {pool}