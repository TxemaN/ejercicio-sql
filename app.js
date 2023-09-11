const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());


app.use('/api/v1/blog/entries', require('./routes/entriesRoutes'));





app.listen(port, () => {
    console.log(`Servidor ON en ${port}`)
})