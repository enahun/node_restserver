require('./config/config');
const express = require('express')
const bodyParser = require('body-parser')
const color = require('colors')
    // Using Node.js `require()`
const mongoose = require('mongoose');

const app = express()
    //Port configuration
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())
    //Importar rutas del usuario
app.use(require('./routes/usuario'));


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos en linea!'.green);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: ${process.env.PORT}`);
})